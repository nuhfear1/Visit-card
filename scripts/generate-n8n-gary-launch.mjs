import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  code,
  connect,
  createConnections,
  credentials,
  errorTrigger,
  executeWorkflow,
  httpRequest,
  ifNode,
  linear,
  manualTrigger,
  postgres,
  respond,
  schedule,
  sticky,
  subWorkflowTrigger,
  switchNode,
  webhook,
  workflow,
  workflowIds,
} from "./lib/n8n-workflow-builder.mjs";

const root = resolve(import.meta.dirname, "..");
const configPath = resolve(root, "n8n/config/gary-launch.config.json");
const exampleConfigPath = resolve(root, "n8n/config/gary-launch.config.example.json");
const outputDir = resolve(root, "n8n/workflows");

const readConfig = async () => {
  try {
    return JSON.parse(await readFile(configPath, "utf8"));
  } catch {
    return JSON.parse(await readFile(exampleConfigPath, "utf8"));
  }
};

const config = await readConfig();
const configLiteral = JSON.stringify(config);
const bakedConfigCode = `const config = ${configLiteral};\nreturn $input.all().map((item) => ({ json: { ...item.json, _config: config } }));`;
const extractWebhookCode = `const request = $json;\nconst body = request.body && typeof request.body === 'object' ? request.body : request;\nconst config = ${configLiteral};\nreturn [{ json: { ...body, _request: { headers: request.headers || {}, receivedAt: new Date().toISOString() }, _config: config } }];`;

const validationCode = `
const allowed = new Set([
  'project.conversation.submitted','masterclass.registration.submitted','masterclass.registration.confirmed',
  'crm.contact.upserted','email.transactional.sent','email.delivered','email.clicked',
  'webinar.attended','webinar.no_show','webinar.poll_answered','webinar.cta_clicked','booking.clicked',
  'replay.started','replay.completed','intent.score.changed','diagnostic.requested',
  'booking.created','booking.completed','booking.cancelled','sales.opportunity.created',
  'sales.stage.changed','proposal.sent','proposal.viewed','proposal.accepted','proposal.declined',
  'client.won','client.onboarding.started','content.asset.drafted','content.asset.approved',
  'content.transcript.ready','testimonial.requested','testimonial.received','referral.requested','referral.received',
  'webinar.reminder.reserved','webinar.reminder.sent','case.study.viewed'
]);
return $input.all().map((item) => {
  const event = { ...item.json };
  const errors = [];
  const email = event.normalizedEmail || event.contact?.email || event.registration?.email || event.attendee?.email || event.booking?.email || event.payload?.email || '';
  if (event.schemaVersion !== '1.1') errors.push('schemaVersion must be 1.1');
  if (!allowed.has(event.eventType)) errors.push('eventType is not allowed');
  if (!event.eventId || String(event.eventId).length < 8) errors.push('eventId is required');
  if (!event.correlationId || String(event.correlationId).length < 8) errors.push('correlationId is required');
  if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(email).trim())) errors.push('email is invalid');
  if (event.eventType === 'project.conversation.submitted') {
    if (!event.contact?.name || !event.contact?.email) errors.push('contact name and email are required');
    if (!event.project?.message || event.project.message.length < 20 || event.project.message.length > 4000) errors.push('project message length is invalid');
  }
  if (event.eventType === 'masterclass.registration.submitted' && (!event.registration?.name || !event.registration?.email)) errors.push('registration name and email are required');
  const identityEvents = new Set(['webinar.attended','webinar.no_show','booking.created','booking.completed','booking.cancelled','sales.opportunity.created','sales.stage.changed','client.won','testimonial.requested','referral.requested']);
  if (identityEvents.has(event.eventType) && !email) errors.push('email is required for identity resolution');
  const occurredAt = event.occurredAt || event.submittedAt || event._request?.receivedAt || new Date().toISOString();
  return { json: {
    ...event,
    occurredAt,
    sourceSystem: event.sourceSystem || event.source || 'unknown',
    externalRefs: event.externalRefs || {},
    payload: event.payload || Object.fromEntries(Object.entries(event).filter(([key]) => !key.startsWith('_'))),
    normalizedEmail: String(email).trim().toLowerCase(),
    valid: errors.length === 0,
    validationErrors: errors
  } };
});`;

const identityQuery = `
WITH upserted AS (
  INSERT INTO gwb_launch.subjects (email_normalized, display_name, organisation, external_refs, last_seen_at)
  SELECT $1, NULLIF($2, ''), NULLIF($3, ''), COALESCE($4::jsonb, '{}'::jsonb), now()
  WHERE NULLIF($1, '') IS NOT NULL
  ON CONFLICT (email_normalized) DO UPDATE SET
    display_name = COALESCE(EXCLUDED.display_name, gwb_launch.subjects.display_name),
    organisation = COALESCE(EXCLUDED.organisation, gwb_launch.subjects.organisation),
    external_refs = gwb_launch.subjects.external_refs || EXCLUDED.external_refs,
    last_seen_at = now()
  RETURNING subject_key, external_refs
), correlated AS (
  SELECT s.subject_key, s.external_refs
  FROM gwb_launch.events e
  JOIN gwb_launch.subjects s USING (subject_key)
  WHERE e.correlation_id = $6 AND e.subject_key IS NOT NULL
  ORDER BY e.occurred_at DESC
  LIMIT 1
), resolved AS (
  SELECT subject_key, external_refs FROM upserted
  UNION ALL
  SELECT subject_key, external_refs FROM correlated WHERE NOT EXISTS (SELECT 1 FROM upserted)
)
SELECT
  COALESCE((SELECT subject_key::text FROM resolved LIMIT 1), '') AS subject_key,
  COALESCE((SELECT external_refs FROM resolved LIMIT 1), '{}'::jsonb) AS external_refs,
  $5::jsonb AS original_event;`;

const identityReplacement = `={{ [
  $json.normalizedEmail,
  $json.contact?.name || $json.registration?.name || $json.attendee?.name || $json.booking?.name || '',
  $json.contact?.organisation || $json.registration?.organisation || $json.payload?.organisation || '',
  JSON.stringify($json.externalRefs || {}),
  JSON.stringify($json), $json.correlationId
] }}`;

const restoreIdentityCode = `const row = $json;\nconst event = typeof row.original_event === 'string' ? JSON.parse(row.original_event) : row.original_event;\nreturn [{ json: { ...event, subjectKey: row.subject_key, externalRefs: { ...(event.externalRefs || {}), ...(row.external_refs || {}) } } }];`;

const ledgerQuery = `
WITH inserted AS (
  INSERT INTO gwb_launch.events
    (event_id, correlation_id, subject_key, event_type, schema_version, source_system, occurred_at, consent, external_refs, payload, n8n_execution_id)
  VALUES ($1, $2, NULLIF($3, '')::uuid, $4, $5, $6, $7::timestamptz, $8::jsonb, $9::jsonb, $10::jsonb, $11)
  ON CONFLICT (event_id) DO NOTHING
  RETURNING event_id
)
SELECT EXISTS (SELECT 1 FROM inserted) AS inserted, $12::jsonb AS original_event;`;

const ledgerReplacement = `={{ [
  $json.eventId, $json.correlationId, $json.subjectKey || '', $json.eventType, $json.schemaVersion,
  $json.sourceSystem || $json.source || 'unknown', $json.occurredAt || $json.submittedAt,
  JSON.stringify($json.consent || {}), JSON.stringify($json.externalRefs || {}),
  JSON.stringify($json.payload || $json), $execution.id, JSON.stringify($json)
] }}`;

const restoreLedgerCode = `const row = $json;\nconst event = typeof row.original_event === 'string' ? JSON.parse(row.original_event) : row.original_event;\nreturn [{ json: { ...event, ledger: { inserted: Boolean(row.inserted), executionId: $execution.id } } }];`;

const consentCode = `return $input.all().map((item) => {\n  const event = item.json;\n  const consent = event.consent || {};\n  const suppressed = Boolean(event.suppressed || event.payload?.suppressed);\n  return { json: { ...event, permissions: { reply: !suppressed && consent.replyRequested === true, operational: !suppressed && (consent.registration === true || consent.replyRequested === true), marketing: !suppressed && consent.marketing === true, suppressed } } };\n});`;

const notificationCode = `return $input.all().map((item) => {\n  const event = item.json;\n  const cfg = event._config || ${configLiteral};\n  const note = event.notification || {};\n  const subject = note.subject || '[Gary Launch] Action requise';\n  const details = note.html || '<p>Un événement nécessite votre attention.</p><pre>' + JSON.stringify({ eventType: event.eventType, eventId: event.eventId, correlationId: event.correlationId, subjectKey: event.subjectKey, priority: note.priority || 'normal' }, null, 2) + '</pre>';\n  return { json: { ...event, delivery: { sender: { name: cfg.brevo.senderName, email: cfg.brevo.senderEmail }, to: [{ name: cfg.site.brandName, email: cfg.site.garyEmail }], subject, htmlContent: details } } };\n});`;

const retryCode = `return $input.all().map((item) => {\n  const input = item.json;\n  const status = Number(input.httpCode || input.statusCode || input.error?.httpCode || 0);\n  const retryable = status === 0 || status === 408 || status === 409 || status === 425 || status === 429 || status >= 500;\n  const attempt = Number(input.attempt || 1);\n  const delaySeconds = retryable ? Math.min(3600, Math.round(30 * Math.pow(2, Math.max(0, attempt - 1)))) : 0;\n  return { json: { ...input, retryDecision: retryable && attempt < 6 ? 'retry' : retryable ? 'quarantine' : 'permanent_failure', retryable, nextAttempt: attempt + 1, delaySeconds } };\n});`;

const hubspotUpsertBody = (sourceNode) => `={{ JSON.stringify({ inputs: [{ id: $('${sourceNode}').item.json.normalizedEmail, idProperty: 'email', properties: { email: $('${sourceNode}').item.json.normalizedEmail, firstname: ($('${sourceNode}').item.json.contact?.name || $('${sourceNode}').item.json.registration?.name || '').split(' ')[0] || '', lastname: ($('${sourceNode}').item.json.contact?.name || $('${sourceNode}').item.json.registration?.name || '').split(' ').slice(1).join(' '), company: $('${sourceNode}').item.json.contact?.organisation || $('${sourceNode}').item.json.registration?.organisation || '', [$('${sourceNode}').item.json._config.hubspot.correlationProperty]: $('${sourceNode}').item.json.correlationId, [$('${sourceNode}').item.json._config.hubspot.problemProperty]: $('${sourceNode}').item.json.project?.problem || $('${sourceNode}').item.json.acquisition?.problem || '' } }] }) }}`;

const brevoRequest = (workflowId, name, sourceNode, position) => httpRequest({
  workflowId,
  name,
  url: `={{ $('${sourceNode}').item.json._config.brevo.baseUrl + '/smtp/email' }}`,
  body: `={{ JSON.stringify($json.delivery) }}`,
  position,
  credential: credentials.brevo,
  headers: [{ name: "accept", value: "application/json" }],
});

const hubspotRequest = (workflowId, name, sourceNode, position) => httpRequest({
  workflowId,
  name,
  url: `={{ $('${sourceNode}').item.json._config.hubspot.baseUrl + '/crm/v3/objects/contacts/batch/upsert' }}`,
  body: hubspotUpsertBody(sourceNode),
  position,
  credential: credentials.hubspot,
  headers: [{ name: "Content-Type", value: "application/json" }],
});

const makeS01 = () => {
  const id = workflowIds.S01;
  const nodes = [subWorkflowTrigger(id), code(id, "Validate and Normalize", validationCode, [260, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S01 | Validate and Normalize Event", nodes, connections, description: "Allowlist, schema and normalization boundary for every event." });
};

const makeS02 = () => {
  const id = workflowIds.S02;
  const nodes = [subWorkflowTrigger(id), postgres(id, "Resolve Identity", identityQuery, identityReplacement, [260, 0]), code(id, "Restore Canonical Event", restoreIdentityCode, [520, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S02 | Resolve Identity", nodes, connections, description: "Resolve one durable subjectKey and preserve cross-tool references." });
};

const makeS03 = () => {
  const id = workflowIds.S03;
  const nodes = [subWorkflowTrigger(id), postgres(id, "Append Idempotent Event", ledgerQuery, ledgerReplacement, [260, 0]), code(id, "Restore Stored Event", restoreLedgerCode, [520, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S03 | Append Event Ledger", nodes, connections, description: "Idempotent immutable event insert for future backend replay." });
};

const makeS04 = () => {
  const id = workflowIds.S04;
  const nodes = [subWorkflowTrigger(id), code(id, "Apply Consent Guard", consentCode, [260, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S04 | Consent Guard", nodes, connections, description: "Separate replies, operational messages, marketing and suppression." });
};

const makeS05 = () => {
  const id = workflowIds.S05;
  const nodes = [subWorkflowTrigger(id), code(id, "Prepare Human Notification", notificationCode, [260, 0]), brevoRequest(id, "Notify Gary via Brevo", "Prepare Human Notification", [520, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S05 | Notify Gary", nodes, connections, description: "Standard human escalation without autonomous diagnosis." });
};

const makeS06 = () => {
  const id = workflowIds.S06;
  const nodes = [subWorkflowTrigger(id), code(id, "Classify Failure", retryCode, [260, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | S06 | Error and Retry Decision", nodes, connections, description: "Retryable, permanent and quarantine classification." });
};

const setupSql = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS gwb_launch;
CREATE TABLE IF NOT EXISTS gwb_launch.subjects (
  subject_key uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_normalized text NOT NULL UNIQUE,
  display_name text,
  organisation text,
  external_refs jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS gwb_launch.events (
  event_id text PRIMARY KEY,
  correlation_id text NOT NULL,
  subject_key uuid REFERENCES gwb_launch.subjects(subject_key),
  event_type text NOT NULL,
  schema_version text NOT NULL,
  source_system text NOT NULL,
  occurred_at timestamptz NOT NULL,
  consent jsonb NOT NULL DEFAULT '{}'::jsonb,
  external_refs jsonb NOT NULL DEFAULT '{}'::jsonb,
  payload jsonb NOT NULL,
  n8n_execution_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS gwb_events_subject_time_idx ON gwb_launch.events(subject_key, occurred_at DESC);
CREATE INDEX IF NOT EXISTS gwb_events_type_time_idx ON gwb_launch.events(event_type, occurred_at DESC);
CREATE INDEX IF NOT EXISTS gwb_events_correlation_idx ON gwb_launch.events(correlation_id);
CREATE TABLE IF NOT EXISTS gwb_launch.call_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), subject_key uuid NOT NULL REFERENCES gwb_launch.subjects(subject_key),
  booking_id text, brief text NOT NULL, source_event_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS gwb_launch.content_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), source_event_id text NOT NULL, asset_type text NOT NULL,
  title text, body text NOT NULL, status text NOT NULL DEFAULT 'draft', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS gwb_launch.operations (
  operation_key text PRIMARY KEY, subject_key uuid, operation_type text NOT NULL, status text NOT NULL,
  due_at timestamptz, payload jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now()
);`;

const makeW99 = () => {
  const id = workflowIds.W99;
  const nodes = [manualTrigger(id), postgres(id, "Create Gary Launch Schema", setupSql, undefined, [260, 0]), code(id, "Setup Complete", "return [{ json: { ready: true, schema: 'gwb_launch', completedAt: new Date().toISOString() } }];", [520, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | W99 | One-time Ledger Setup", nodes, connections, description: "Run once before activating the launch workflows." });
};

const makeW00 = () => {
  const id = workflowIds.W00;
  const redact = `const config = ${configLiteral};\nconst input = $json;\nconst raw = JSON.stringify(input);\nconst redacted = raw.replace(/[A-Za-z0-9_-]{28,}/g, '[REDACTED]');\nreturn [{ json: { schemaVersion: '1.1', eventType: 'workflow.failure', eventId: 'failure:' + (input.execution?.id || $execution.id), correlationId: input.execution?.id || $execution.id, occurredAt: new Date().toISOString(), sourceSystem: 'n8n', payload: JSON.parse(redacted), attempt: 1, _config: config } }];`;
  const prepare = `const event = $json;\nreturn [{ json: { ...event, notification: { priority: 'urgent', subject: '[Gary Launch] Échec du workflow ' + (event.payload.workflow?.name || 'inconnu'), html: '<h2>Un workflow a échoué</h2><p><strong>Exécution :</strong> ' + (event.payload.execution?.id || 'inconnue') + '</p><p><strong>Dernier nœud :</strong> ' + (event.payload.execution?.lastNodeExecuted || 'inconnu') + '</p><p>Ouvrez n8n pour diagnostiquer et relancer si nécessaire.</p>' } } }];`;
  const nodes = [errorTrigger(id), code(id, "Redact Failure", redact, [240, 0]), executeWorkflow(id, "S06 Retry Decision", workflowIds.S06, [480, 0]), code(id, "Prepare Incident", prepare, [720, 0]), executeWorkflow(id, "S05 Notify Gary", workflowIds.S05, [960, 0])];
  const connections = linear(createConnections(), nodes.map((item) => item.name));
  return workflow({ id, name: "GWB | W00 | Error Operations", nodes, connections, description: "Global error workflow with redaction, retry classification and alert." });
};

const makeW01 = () => {
  const id = workflowIds.W01;
  const trigger = webhook({ workflowId: id, name: "Project Conversation Webhook", path: "gwb/project-conversation", publicWebhook: true });
  trigger.parameters.options.allowedOrigins = config.site.allowedOrigins;
  const crmEvent = `const original = $('S04 Consent Guard').item.json;\nconst hubspotId = $json.results?.[0]?.id || '';\nreturn [{ json: { ...original, eventType: 'crm.contact.upserted', eventId: original.eventId + ':hubspot', occurredAt: new Date().toISOString(), sourceSystem: 'hubspot', externalRefs: { ...(original.externalRefs || {}), hubspotContactId: hubspotId }, payload: { sourceEventId: original.eventId, hubspotContactId: hubspotId, email: original.normalizedEmail } } }];`;
  const sideEffects = `const event = $json;\nconst cfg = event._config;\nconst requested = Boolean(event.diagnostic?.requested);\nconst name = event.contact?.name || 'Nouveau contact';\nconst esc=(value)=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');\nreturn [{ json: { ...event, notification: { priority: requested ? 'high' : 'normal', subject: '[Gary Launch] ' + (requested ? 'Projet + première lecture' : 'Nouvelle conversation projet') + ' — ' + name, html: '<h2>' + esc(name) + '</h2><p><strong>Email :</strong> ' + esc(event.normalizedEmail) + '</p><p><strong>Organisation :</strong> ' + esc(event.contact?.organisation || 'Non renseignée') + '</p><p><strong>Problème :</strong> ' + esc(event.project?.problem || 'À déterminer') + '</p><p>' + esc(event.project.message) + '</p><p><strong>Première lecture demandée :</strong> ' + (requested ? 'Oui' : 'Non') + '</p>' }, receipt: { sender: { name: cfg.brevo.senderName, email: cfg.brevo.senderEmail }, to: [{ name, email: event.normalizedEmail }], subject: 'Votre message est bien arrivé', htmlContent: '<p>Bonjour ' + esc(name.split(' ')[0]) + ',</p><p>Merci pour votre message. Je vais le lire personnellement et je reviendrai vers vous avec le contexte en tête.</p><p>Gary</p>' } } }];`;
  const nodes = [
    sticky(id, "Purpose", "## Conversation humaine\nLe diagnostic reste optionnel. Le workflow structure le contexte et alerte Gary ; il ne répond jamais à sa place.", [-80, -300]),
    trigger,
    code(id, "Extract Request", extractWebhookCode, [220, 0]),
    executeWorkflow(id, "S01 Validate Event", workflowIds.S01, [460, 0]),
    ifNode(id, "Valid Request?", "={{ $json.valid }}", "true", undefined, [700, 0]),
    respond(id, "Reject Invalid Request", "={{ { accepted: false, error: { code: 'invalid_request', details: $json.validationErrors } } }}", 400, [940, 180]),
    executeWorkflow(id, "S02 Resolve Identity", workflowIds.S02, [940, -40]),
    executeWorkflow(id, "S04 Consent Guard", workflowIds.S04, [1180, -40]),
    executeWorkflow(id, "S03 Store Submission", workflowIds.S03, [1420, -40]),
    ifNode(id, "New Submission?", "={{ $json.ledger?.inserted === true }}", "true", undefined, [1660, -40]),
    respond(id, "Accept Duplicate Safely", "={{ { accepted: true, duplicate: true, eventId: $json.eventId } }}", 202, [1900, 180]),
    respond(id, "Accept Conversation", "={{ { accepted: true, eventId: $json.eventId, correlationId: $json.correlationId } }}", 202, [1900, -40]),
    hubspotRequest(id, "Upsert HubSpot Contact", "S02 Resolve Identity", [2140, -40]),
    code(id, "Build CRM Reference Event", crmEvent, [2380, -40]),
    executeWorkflow(id, "S03 Store CRM Reference", workflowIds.S03, [2620, -40]),
    code(id, "Prepare Human Follow-up", sideEffects, [2860, -40]),
    executeWorkflow(id, "S05 Notify Gary", workflowIds.S05, [3100, -120]),
    ifNode(id, "Operational Reply Allowed?", "={{ $json.permissions?.reply === true }}", "true", undefined, [3100, 80]),
    brevoRequest(id, "Send Human Receipt", "Prepare Human Follow-up", [3340, 80]),
  ];
  const connections = createConnections();
  linear(connections, ["Project Conversation Webhook", "Extract Request", "S01 Validate Event", "Valid Request?"]);
  connect(connections, "Valid Request?", "S02 Resolve Identity", 0);
  connect(connections, "Valid Request?", "Reject Invalid Request", 1);
  linear(connections, ["S02 Resolve Identity", "S04 Consent Guard", "S03 Store Submission", "New Submission?"]);
  connect(connections, "New Submission?", "Accept Conversation", 0);
  connect(connections, "New Submission?", "Accept Duplicate Safely", 1);
  linear(connections, ["Accept Conversation", "Upsert HubSpot Contact", "Build CRM Reference Event", "S03 Store CRM Reference", "Prepare Human Follow-up"]);
  connect(connections, "Prepare Human Follow-up", "S05 Notify Gary");
  connect(connections, "Prepare Human Follow-up", "Operational Reply Allowed?");
  connect(connections, "Operational Reply Allowed?", "Send Human Receipt", 0);
  return workflow({ id, name: "GWB | W01 | Project Conversation", nodes, connections, description: "Visit-card conversation, optional diagnostic, ledger, CRM and human follow-up." });
};

const makeW02 = () => {
  const id = workflowIds.W02;
  const trigger = webhook({ workflowId: id, name: "Masterclass Registration Webhook", path: "gwb/masterclass-registration", publicWebhook: true });
  trigger.parameters.options.allowedOrigins = config.site.allowedOrigins;
  const confirmed = `const event = $('S02 Resolve Identity').item.json;\nconst provider = $json;\nconst registrantId = provider.id || provider.registrant_id || provider.data?.id || '';\nconst hubspotId = $('Upsert HubSpot Registrant').item.json.results?.[0]?.id || '';\nreturn [{ json: { ...event, eventType: 'masterclass.registration.confirmed', eventId: event.eventId + ':confirmed', occurredAt: new Date().toISOString(), sourceSystem: event._config.webinar.provider, externalRefs: { ...(event.externalRefs || {}), hubspotContactId: hubspotId, webinarRegistrantId: registrantId }, payload: { sourceEventId: event.eventId, webinar: { eventId: event._config.webinar.eventId, startsAt: event._config.webinar.startsAt, joinUrl: provider.join_url || provider.joinUrl || event._config.webinar.joinUrl, replayUrl: event._config.webinar.replayUrl }, hubspotContactId: hubspotId, registrantId } } }];`;
  const confirmationEmail = `const event = $json;\nconst cfg = event._config;\nconst name = event.registration?.name || 'Bonjour';\nconst esc=(value)=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');\nreturn [{ json: { ...event, delivery: { sender: { name: cfg.brevo.senderName, email: cfg.brevo.senderEmail }, to: [{ name, email: event.normalizedEmail }], subject: 'Inscription confirmée — Pourquoi votre acquisition ne scale pas', htmlContent: '<p>Bonjour ' + esc(name.split(' ')[0]) + ',</p><p>Votre inscription est confirmée.</p><p><strong>Date :</strong> ' + esc(new Date(cfg.webinar.startsAt).toLocaleString('fr-FR', { timeZone: cfg.reporting.timezone })) + '</p><p><a href="' + esc(event.payload.webinar.joinUrl || cfg.webinar.joinUrl) + '">Accéder à la masterclass</a></p><p>Gary</p>' } } }];`;
  const nodes = [
    trigger,
    code(id, "Extract Request", extractWebhookCode, [220, 0]),
    executeWorkflow(id, "S01 Validate Event", workflowIds.S01, [460, 0]),
    ifNode(id, "Valid Registration?", "={{ $json.valid }}", "true", undefined, [700, 0]),
    respond(id, "Reject Invalid Registration", "={{ { accepted: false, error: { code: 'invalid_registration', details: $json.validationErrors } } }}", 400, [940, 180]),
    executeWorkflow(id, "S02 Resolve Identity", workflowIds.S02, [940, -40]),
    executeWorkflow(id, "S04 Consent Guard", workflowIds.S04, [1180, -40]),
    executeWorkflow(id, "S03 Store Registration", workflowIds.S03, [1420, -40]),
    ifNode(id, "New Registration?", "={{ $json.ledger?.inserted === true }}", "true", undefined, [1660, -40]),
    respond(id, "Accept Duplicate Safely", "={{ { accepted: true, duplicate: true, eventId: $json.eventId } }}", 202, [1900, 180]),
    respond(id, "Accept Registration", "={{ { accepted: true, eventId: $json.eventId, correlationId: $json.correlationId } }}", 202, [1900, -40]),
    hubspotRequest(id, "Upsert HubSpot Registrant", "S02 Resolve Identity", [2140, -40]),
    httpRequest({ workflowId: id, name: "Register with Webinar Provider", url: `={{ $('S02 Resolve Identity').item.json._config.webinar.registrationUrl }}`, body: `={{ JSON.stringify({ event_id: $('S02 Resolve Identity').item.json._config.webinar.eventId, name: $('S02 Resolve Identity').item.json.registration.name, email: $('S02 Resolve Identity').item.json.normalizedEmail, correlation_id: $('S02 Resolve Identity').item.json.correlationId }) }}`, position: [2380, -40], credential: credentials.webinar, headers: [{ name: "Content-Type", value: "application/json" }] }),
    code(id, "Build Confirmation Event", confirmed, [2620, -40]),
    executeWorkflow(id, "S03 Store Confirmation", workflowIds.S03, [2860, -40]),
    code(id, "Prepare Confirmation Email", confirmationEmail, [3100, -120]),
    brevoRequest(id, "Send Registration Confirmation", "Prepare Confirmation Email", [3340, -120]),
    executeWorkflow(id, "W05 Score Registration", workflowIds.W05, [3100, 80]),
  ];
  const connections = createConnections();
  linear(connections, ["Masterclass Registration Webhook", "Extract Request", "S01 Validate Event", "Valid Registration?"]);
  connect(connections, "Valid Registration?", "S02 Resolve Identity", 0);
  connect(connections, "Valid Registration?", "Reject Invalid Registration", 1);
  linear(connections, ["S02 Resolve Identity", "S04 Consent Guard", "S03 Store Registration", "New Registration?"]);
  connect(connections, "New Registration?", "Accept Registration", 0);
  connect(connections, "New Registration?", "Accept Duplicate Safely", 1);
  linear(connections, ["Accept Registration", "Upsert HubSpot Registrant", "Register with Webinar Provider", "Build Confirmation Event", "S03 Store Confirmation"]);
  connect(connections, "S03 Store Confirmation", "Prepare Confirmation Email");
  connect(connections, "S03 Store Confirmation", "W05 Score Registration");
  connect(connections, "Prepare Confirmation Email", "Send Registration Confirmation");
  return workflow({ id, name: "GWB | W02 | Masterclass Registration", nodes, connections, description: "Registration, attribution, CRM, webinar provider, confirmation and initial score." });
};

const makeW03 = () => {
  const id = workflowIds.W03;
  const query = `SELECT e.event_id, e.subject_key::text, s.email_normalized, s.display_name, e.correlation_id, e.payload, e.external_refs, $1::jsonb AS config\nFROM gwb_launch.events e JOIN gwb_launch.subjects s USING(subject_key)\nWHERE e.event_type = 'masterclass.registration.confirmed'\nAND e.occurred_at > now() - interval '60 days';`;
  const selectDue = `const now = Date.now();\nconst windows = [{ key: '24h', at: 24*60*60*1000, tolerance: 15*60*1000 }, { key: '1h', at: 60*60*1000, tolerance: 15*60*1000 }, { key: '10m', at: 10*60*1000, tolerance: 10*60*1000 }];\nreturn $input.all().flatMap((item) => { const row=item.json; const cfg=typeof row.config==='string'?JSON.parse(row.config):row.config; const payload=typeof row.payload==='string'?JSON.parse(row.payload):row.payload; const startsAt=new Date(payload.webinar?.startsAt || cfg.webinar.startsAt).getTime(); const remaining=startsAt-now; const due=windows.find(w=>remaining<=w.at && remaining>w.at-w.tolerance); if(!due) return []; return [{ json: { schemaVersion:'1.1', eventType:'webinar.reminder.reserved', eventId:'reminder:'+row.event_id+':'+due.key+':reserved', correlationId:row.correlation_id, subjectKey:row.subject_key, occurredAt:new Date().toISOString(), sourceSystem:'n8n', normalizedEmail:row.email_normalized, externalRefs:row.external_refs||{}, consent:{registration:true,marketing:false}, payload:{sourceEventId:row.event_id, name:row.display_name||'', reminder:due.key, startsAt:new Date(startsAt).toISOString(), joinUrl:payload.webinar?.joinUrl||cfg.webinar.joinUrl}, _config:cfg } }]; });`;
  const email = `return $input.all().map(item=>{const e=item.json; const cfg=e._config; const label=e.payload.reminder==='24h'?'demain':e.payload.reminder==='1h'?'dans une heure':'dans dix minutes'; return {json:{...e,delivery:{sender:{name:cfg.brevo.senderName,email:cfg.brevo.senderEmail},to:[{name:e.payload.name||'',email:e.normalizedEmail}],subject:'La masterclass commence '+label,htmlContent:'<p>La masterclass « Pourquoi votre acquisition ne scale pas » commence '+label+'.</p><p><a href="'+e.payload.joinUrl+'">Rejoindre la session</a></p><p>Gary</p>'}}};});`;
  const sent = `const original=$('S03 Reserve Reminder').item.json; const messageId=$json.messageId||$json.message_id||''; return [{json:{...original,eventType:'webinar.reminder.sent',eventId:original.eventId+':sent',occurredAt:new Date().toISOString(),sourceSystem:'brevo',externalRefs:{...(original.externalRefs||{}),brevoMessageId:messageId},payload:{...original.payload,reservationEventId:original.eventId,deliveryStatus:'accepted',brevoMessageId:messageId}}}];`;
  const nodes = [schedule(id, "Every 15 Minutes", { field: "minutes", minutesInterval: 15 }), code(id, "Load Config", bakedConfigCode, [220, 0]), postgres(id, "Find Due Reminders", query, "={{ [JSON.stringify($json._config)] }}", [460, 0]), code(id, "Select Reminder Window", selectDue, [700, 0]), executeWorkflow(id, "S03 Reserve Reminder", workflowIds.S03, [940, 0]), ifNode(id,"New Reminder?","={{ $json.ledger?.inserted === true }}","true",undefined,[1180,0]), code(id, "Prepare Reminder Email", email, [1420, 0]), brevoRequest(id, "Send Webinar Reminder", "Prepare Reminder Email", [1660, 0]),code(id,"Build Reminder Sent Event",sent,[1900,0]),executeWorkflow(id,"S03 Store Reminder Sent",workflowIds.S03,[2140,0])];
  const connections = linear(createConnections(), ["Every 15 Minutes","Load Config","Find Due Reminders","Select Reminder Window","S03 Reserve Reminder","New Reminder?"]);
  connect(connections,"New Reminder?","Prepare Reminder Email",0); linear(connections,["Prepare Reminder Email","Send Webinar Reminder","Build Reminder Sent Event","S03 Store Reminder Sent"]);
  return workflow({ id, name: "GWB | W03 | Webinar Nurture", nodes, connections, description: "Idempotent 24h, 1h and 10-minute operational reminders." });
};

const makeW04 = () => {
  const id = workflowIds.W04;
  const normalize = `const request=$json; const body=request.body||request; const cfg=${configLiteral}; const email=String(body.email||body.attendee?.email||body.participant?.email||'').trim().toLowerCase(); const attended=body.attended!==false && Number(body.durationMinutes||body.duration||0)>0; const sourceId=body.id||body.attendanceId||body.participant?.id||$execution.id; return [{json:{schemaVersion:'1.1',eventType:attended?'webinar.attended':'webinar.no_show',eventId:'webinar:'+sourceId,correlationId:body.correlationId||body.correlation_id||sourceId,occurredAt:body.occurredAt||body.endedAt||new Date().toISOString(),sourceSystem:cfg.webinar.provider,attendee:{name:body.name||body.attendee?.name||'',email},externalRefs:{webinarAttendanceId:String(sourceId),webinarRegistrantId:String(body.registrantId||'')},consent:{registration:true,marketing:Boolean(body.marketingConsent)},payload:{email,name:body.name||'',durationMinutes:Number(body.durationMinutes||body.duration||0),polls:body.polls||[],questions:body.questions||[],ctaClicked:Boolean(body.ctaClicked),attended},_config:cfg}}];`;
  const normalizeEngagement = `const request=$json; const body=request.body||request; const cfg=${configLiteral}; const map={masterclass_cta_clicked:'webinar.cta_clicked',diagnostic_requested:'diagnostic.requested',replay_started:'replay.started',booking_clicked:'booking.clicked'}; const eventType=map[body.name]||''; return [{json:{schemaVersion:'1.1',eventType,eventId:String(body.eventId||'engagement:'+$execution.id),correlationId:String(body.correlationId||body.sessionId||$execution.id),occurredAt:body.occurredAt||new Date().toISOString(),sourceSystem:'visit-card',normalizedEmail:String(body.email||'').trim().toLowerCase(),externalRefs:{},consent:{registration:Boolean(body.registration),marketing:false},payload:{name:body.name,sessionId:body.sessionId,locale:body.locale||'fr',page:body.page||'',within90Days:Boolean(body.within90Days)},_config:cfg}}];`;
  const trigger = webhook({ workflowId:id, name:"Webinar Attendance Webhook", path:"gwb/webinar-attendance", publicWebhook:false });
  const engagementTrigger = webhook({ workflowId:id, name:"First-party Engagement Webhook", path:"gwb/engagement-event", publicWebhook:true, position:[0,220] });
  engagementTrigger.parameters.options.allowedOrigins = config.site.allowedOrigins;
  const nodes=[trigger,code(id,"Normalize Attendance",normalize,[240,0]),engagementTrigger,code(id,"Normalize First-party Engagement",normalizeEngagement,[240,220]),executeWorkflow(id,"S01 Validate Event",workflowIds.S01,[480,0]),ifNode(id,"Valid Engagement?","={{ $json.valid }}","true",undefined,[720,0]),respond(id,"Reject Engagement","={{ { accepted:false, error:{ code:'invalid_engagement', details:$json.validationErrors } } }}",400,[960,180]),executeWorkflow(id,"S02 Resolve Identity",workflowIds.S02,[960,-40]),executeWorkflow(id,"S03 Store Engagement",workflowIds.S03,[1200,-40]),ifNode(id,"New Engagement?","={{ $json.ledger?.inserted === true }}","true",undefined,[1440,-40]),respond(id,"Accept Duplicate Safely","={{ {accepted:true,duplicate:true,eventId:$json.eventId} }}",202,[1680,180]),respond(id,"Accept Engagement","={{ { accepted:true, eventId:$json.eventId } }}",202,[1680,-40]),ifNode(id,"Known Identity?","={{ Boolean($json.subjectKey) }}","true",undefined,[1920,-40]),executeWorkflow(id,"W05 Recalculate Intent",workflowIds.W05,[2160,-120]),ifNode(id,"Attendance Follow-up?","={{ ['webinar.attended','webinar.no_show'].includes($json.payload?.triggerEvent?.eventType) }}","true",undefined,[2400,-120]),executeWorkflow(id,"W06 Segment Follow-up",workflowIds.W06,[2640,-200])];
  const connections=createConnections(); linear(connections,["Webinar Attendance Webhook","Normalize Attendance","S01 Validate Event"]); linear(connections,["First-party Engagement Webhook","Normalize First-party Engagement","S01 Validate Event"]); linear(connections,["S01 Validate Event","Valid Engagement?"]); connect(connections,"Valid Engagement?","S02 Resolve Identity",0); connect(connections,"Valid Engagement?","Reject Engagement",1); linear(connections,["S02 Resolve Identity","S03 Store Engagement","New Engagement?"]); connect(connections,"New Engagement?","Accept Engagement",0); connect(connections,"New Engagement?","Accept Duplicate Safely",1); linear(connections,["Accept Engagement","Known Identity?"]); connect(connections,"Known Identity?","W05 Recalculate Intent",0); linear(connections,["W05 Recalculate Intent","Attendance Follow-up?"]); connect(connections,"Attendance Follow-up?","W06 Segment Follow-up",0);
  return workflow({id,name:"GWB | W04 | Engagement and Attendance Sync",nodes,connections,description:"Provider-neutral attendance plus allowlisted first-party CTA and replay event ingestion."});
};

const makeW05 = () => {
  const id=workflowIds.W05;
  const query=`SELECT COALESCE(jsonb_agg(jsonb_build_object('eventType',event_type,'occurredAt',occurred_at,'payload',payload) ORDER BY occurred_at),'[]'::jsonb) AS history, $2::jsonb AS trigger_event\nFROM gwb_launch.events WHERE subject_key=$1::uuid;`;
  const replacement=`={{ [$json.subjectKey, JSON.stringify($json)] }}`;
  const score=`const row=$json; const trigger=typeof row.trigger_event==='string'?JSON.parse(row.trigger_event):row.trigger_event; const history=typeof row.history==='string'?JSON.parse(row.history):row.history||[]; const has=(type,predicate=()=>true)=>history.some(e=>e.eventType===type&&predicate(e.payload||{})); const yes=new Set(['true','yes','oui','si','sim','ja','はい','是','예']); const urgentPoll=history.some(e=>(e.payload?.polls||[]).some(p=>/90|urgent|urgence|priorit/i.test(String(p.question||''))&&yes.has(String(p.answer||'').trim().toLowerCase()))); const signals={registration:has('masterclass.registration.submitted'),icpCompatible:Boolean(trigger.contact?.organisation||trigger.registration?.organisation||history.some(e=>e.payload?.organisation||e.payload?.contact?.organisation||e.payload?.registration?.organisation)),liveAttendance:has('webinar.attended'),watched30:has('webinar.attended',p=>Number(p.durationMinutes||0)>30),pollAnswered:has('webinar.poll_answered')||has('webinar.attended',p=>Array.isArray(p.polls)&&p.polls.length>0),urgent90:Boolean(trigger.payload?.within90Days)||history.some(e=>e.payload?.within90Days===true)||urgentPoll,diagnostic:has('diagnostic.requested')||Boolean(trigger.diagnostic?.requested)||history.some(e=>e.payload?.diagnostic?.requested===true),caseStudy:has('case.study.viewed'),qualifiedBooking:has('booking.created')}; const points={registration:5,icpCompatible:15,liveAttendance:15,watched30:10,pollAnswered:5,urgent90:15,diagnostic:20,caseStudy:5,qualifiedBooking:40}; const contributions=Object.entries(signals).filter(([,v])=>v).map(([key])=>({signal:key,points:points[key]})); const value=contributions.reduce((sum,s)=>sum+s.points,0); const temperature=value>=75?'priority':value>=50?'sales-ready':value>=25?'warm':'cold'; return [{json:{...trigger,schemaVersion:'1.1',eventType:'intent.score.changed',eventId:trigger.eventId+':score:'+value,occurredAt:new Date().toISOString(),sourceSystem:'n8n',consent:trigger.consent||{},payload:{score:value,temperature,contributions,triggerEvent:trigger},score:value,temperature,contributions}}];`;
  const restore=`const event=$('Calculate Explainable Score').item.json; const hubspotId=$json.results?.[0]?.id||event.externalRefs?.hubspotContactId||''; return [{json:{...event,externalRefs:{...(event.externalRefs||{}),hubspotContactId:hubspotId}}}];`;
  const nodes=[subWorkflowTrigger(id),postgres(id,"Load Journey Events",query,replacement,[240,0]),code(id,"Calculate Explainable Score",score,[480,0]),httpRequest({workflowId:id,name:"Update HubSpot Intent",url:`={{ $('Calculate Explainable Score').item.json._config.hubspot.baseUrl + '/crm/v3/objects/contacts/batch/upsert' }}`,body:`={{ JSON.stringify({ inputs:[{ id:$('Calculate Explainable Score').item.json.normalizedEmail, idProperty:'email', properties:{ email:$('Calculate Explainable Score').item.json.normalizedEmail, [$('Calculate Explainable Score').item.json._config.hubspot.scoreProperty]:String($('Calculate Explainable Score').item.json.score), [$('Calculate Explainable Score').item.json._config.hubspot.temperatureProperty]:$('Calculate Explainable Score').item.json.temperature } }] }) }}`,position:[720,0],credential:credentials.hubspot,headers:[{name:"Content-Type",value:"application/json"}]}),code(id,"Restore Score Event",restore,[960,0]),executeWorkflow(id,"S03 Store Score",workflowIds.S03,[1200,0])];
  const connections=linear(createConnections(),["When Executed by Another Workflow","Load Journey Events","Calculate Explainable Score","Update HubSpot Intent","Restore Score Event","S03 Store Score"]);
  return workflow({id,name:"GWB | W05 | Intent Engine",nodes,connections,description:"Explainable score with stored contributing signals and CRM temperature."});
};

const makeW06 = () => {
  const id=workflowIds.W06;
  const prepare=`const e=$json; const cfg=e._config; const trigger=e.payload?.triggerEvent||{}; const type=trigger.eventType; const first=(e.attendee?.name||trigger.attendee?.name||trigger.registration?.name||'').split(' ')[0]; let subject='Le replay de la masterclass'; let html='<p>Bonjour '+first+',</p><p>Voici le replay de la masterclass.</p><p><a href="'+cfg.webinar.replayUrl+'">Voir le replay</a></p><p>Gary</p>'; if(type==='webinar.attended'){subject='Merci pour votre présence'; html='<p>Bonjour '+first+',</p><p>Merci d’avoir participé. Voici le replay et les éléments à revoir tranquillement.</p><p><a href="'+cfg.webinar.replayUrl+'">Accéder au replay</a></p><p>Gary</p>';} if(type==='webinar.no_show'){subject='Vous n’avez pas pu être là — voici le replay'; html='<p>Bonjour '+first+',</p><p>Vous n’avez pas pu assister à la session. Voici le replay, sans pression.</p><p><a href="'+cfg.webinar.replayUrl+'">Voir la masterclass</a></p><p>Gary</p>';} const notification=e.temperature==='priority'?{priority:'urgent',subject:'[Gary Launch] Prospect prioritaire — score '+e.score,html:'<h2>Prospect prioritaire</h2><p>Score : '+e.score+'</p><p>Email : '+e.normalizedEmail+'</p><p>Signaux : '+e.contributions.map(s=>s.signal+' (+'+s.points+')').join(', ')+'</p><p><a href="'+cfg.calendar.bookingUrl+'">Préparer la prise de contact</a></p>'}:null; return [{json:{...e,delivery:{sender:{name:cfg.brevo.senderName,email:cfg.brevo.senderEmail},to:[{name:first,email:e.normalizedEmail}],subject,htmlContent:html},notification}}];`;
  const nodes=[subWorkflowTrigger(id),executeWorkflow(id,"S04 Consent Guard",workflowIds.S04,[240,0]),code(id,"Prepare Segmented Follow-up",prepare,[480,0]),ifNode(id,"Operational Email Allowed?","={{ $json.permissions?.operational === true }}","true",undefined,[720,0]),brevoRequest(id,"Send Segmented Follow-up","Prepare Segmented Follow-up",[960,-80]),ifNode(id,"Priority Prospect?","={{ $json.temperature === 'priority' }}","true",undefined,[960,120]),executeWorkflow(id,"S05 Notify Priority",workflowIds.S05,[1200,120])];
  const connections=createConnections(); linear(connections,["When Executed by Another Workflow","S04 Consent Guard","Prepare Segmented Follow-up","Operational Email Allowed?"]); connect(connections,"Operational Email Allowed?","Send Segmented Follow-up",0); connect(connections,"Prepare Segmented Follow-up","Priority Prospect?"); connect(connections,"Priority Prospect?","S05 Notify Priority",0);
  return workflow({id,name:"GWB | W06 | Segmented Webinar Follow-up",nodes,connections,description:"Attendee, no-show, replay and priority branches with consent guard."});
};

const makeW07 = () => {
  const id=workflowIds.W07;
  const normalize=`const request=$json; const b=request.body||request; const cfg=${configLiteral}; const id=String(b.id||b.uid||b.bookingId||$execution.id); const status=String(b.status||b.triggerEvent||'created').toLowerCase(); const type=status.includes('cancel')?'booking.cancelled':status.includes('complete')?'booking.completed':'booking.created'; const email=String(b.email||b.attendee?.email||b.responses?.email||'').trim().toLowerCase(); return [{json:{schemaVersion:'1.1',eventType:type,eventId:'booking:'+id+':'+type.split('.')[1],correlationId:b.correlationId||b.metadata?.correlationId||id,occurredAt:b.startTime||b.occurredAt||new Date().toISOString(),sourceSystem:cfg.calendar.provider,booking:{id,name:b.name||b.attendee?.name||'',email,startTime:b.startTime||b.start,timezone:b.timezone||'',notes:b.notes||''},normalizedEmail:email,externalRefs:{calendarBookingId:id},consent:{replyRequested:true,marketing:false},payload:b,_config:cfg}}];`;
  const notify=`const e=$json; return [{json:{...e,notification:{priority:e.eventType==='booking.created'?'high':'normal',subject:'[Gary Launch] '+e.eventType+' — '+(e.booking?.name||e.normalizedEmail),html:'<h2>'+e.eventType+'</h2><p>'+e.booking?.name+'</p><p>'+e.normalizedEmail+'</p><p>'+e.booking?.startTime+'</p><p>'+e.booking?.notes+'</p>'}}}];`;
  const nodes=[webhook({workflowId:id,name:"Calendar Booking Webhook",path:"gwb/calendar-booking",publicWebhook:false}),code(id,"Normalize Booking",normalize,[240,0]),executeWorkflow(id,"S01 Validate Event",workflowIds.S01,[480,0]),ifNode(id,"Valid Booking?","={{ $json.valid }}","true",undefined,[720,0]),respond(id,"Reject Booking","={{ {accepted:false,error:{code:'invalid_booking',details:$json.validationErrors}} }}",400,[960,180]),executeWorkflow(id,"S02 Resolve Identity",workflowIds.S02,[960,-40]),executeWorkflow(id,"S03 Store Booking",workflowIds.S03,[1200,-40]),ifNode(id,"New Booking Event?","={{ $json.ledger?.inserted === true }}","true",undefined,[1440,-40]),respond(id,"Accept Duplicate Safely","={{ {accepted:true,duplicate:true,eventId:$json.eventId} }}",202,[1680,180]),respond(id,"Accept Booking","={{ {accepted:true,eventId:$json.eventId} }}",202,[1680,-40]),code(id,"Prepare Booking Alert",notify,[1920,-40]),executeWorkflow(id,"S05 Notify Gary",workflowIds.S05,[2160,-140]),executeWorkflow(id,"W05 Recalculate Intent",workflowIds.W05,[2160,40]),executeWorkflow(id,"W08 Build Pre-call Brief",workflowIds.W08,[2400,40])];
  const connections=createConnections(); linear(connections,["Calendar Booking Webhook","Normalize Booking","S01 Validate Event","Valid Booking?"]); connect(connections,"Valid Booking?","S02 Resolve Identity",0); connect(connections,"Valid Booking?","Reject Booking",1); linear(connections,["S02 Resolve Identity","S03 Store Booking","New Booking Event?"]); connect(connections,"New Booking Event?","Accept Booking",0); connect(connections,"New Booking Event?","Accept Duplicate Safely",1); linear(connections,["Accept Booking","Prepare Booking Alert"]); connect(connections,"Prepare Booking Alert","S05 Notify Gary"); connect(connections,"Prepare Booking Alert","W05 Recalculate Intent"); connect(connections,"W05 Recalculate Intent","W08 Build Pre-call Brief");
  return workflow({id,name:"GWB | W07 | Diagnostic and Booking",nodes,connections,description:"Booking lifecycle associated with the optional diagnostic and canonical journey."});
};

const makeW08 = () => {
  const id=workflowIds.W08;
  const query=`SELECT s.display_name,s.email_normalized,s.organisation,s.external_refs,COALESCE(jsonb_agg(jsonb_build_object('eventId',e.event_id,'eventType',e.event_type,'occurredAt',e.occurred_at,'payload',e.payload) ORDER BY e.occurred_at),'[]'::jsonb) AS journey,$2::jsonb AS booking_event\nFROM gwb_launch.subjects s LEFT JOIN gwb_launch.events e USING(subject_key) WHERE s.subject_key=$1::uuid GROUP BY s.subject_key;`;
  const prompt=`const row=$json; const cfg=${configLiteral}; const journey=typeof row.journey==='string'?JSON.parse(row.journey):row.journey; const booking=typeof row.booking_event==='string'?JSON.parse(row.booking_event):row.booking_event; const instructions="Prépare un brief factuel en français pour Gary avant un appel. Résume le contexte déclaré, le problème, les interactions, les signaux d'intention et les questions à éclaircir. Ne pose aucun diagnostic définitif, ne promets aucun résultat et n'invente rien."; return [{json:{...booking,_config:cfg,briefRequest:{model:cfg.openai.model,input:[{role:'system',content:[{type:'input_text',text:instructions}]},{role:'user',content:[{type:'input_text',text:JSON.stringify({contact:{name:row.display_name,email:row.email_normalized,organisation:row.organisation},journey})}]}]}}}];`;
  const parse=`const event=$('Prepare Brief Prompt').item.json; const output=$json.output_text||($json.output||[]).flatMap(o=>o.content||[]).map(c=>c.text||'').join('\\n')||'Brief indisponible : consultez le parcours brut.'; const esc=(value)=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); return [{json:{...event,brief:output,notification:{priority:'high',subject:'[Gary Launch] Brief pré-appel — '+(event.booking?.name||event.normalizedEmail),html:'<h2>Brief pré-appel</h2><div style="white-space:pre-wrap">'+esc(output)+'</div>'}}}];`;
  const store=`INSERT INTO gwb_launch.call_briefs(subject_key,booking_id,brief,source_event_ids) VALUES($1::uuid,$2,$3,$4::jsonb) RETURNING id::text;`;
  const nodes=[subWorkflowTrigger(id),postgres(id,"Load Complete Journey",query,`={{ [$json.subjectKey,JSON.stringify($json)] }}`,[240,0]),code(id,"Prepare Brief Prompt",prompt,[480,0]),httpRequest({workflowId:id,name:"Generate Factual Brief",url:`={{ $('Prepare Brief Prompt').item.json._config.openai.baseUrl + '/responses' }}`,body:`={{ JSON.stringify($json.briefRequest) }}`,position:[720,0],credential:credentials.openai,headers:[{name:"Content-Type",value:"application/json"}]}),code(id,"Parse Human Brief",parse,[960,0]),postgres(id,"Store Pre-call Brief",store,`={{ [$json.subjectKey,$json.booking?.id||'', $json.brief, JSON.stringify([$json.eventId])] }}`,[1200,0]),executeWorkflow(id,"S05 Notify Gary",workflowIds.S05,[1440,0])];
  const connections=linear(createConnections(),["When Executed by Another Workflow","Load Complete Journey","Prepare Brief Prompt","Generate Factual Brief","Parse Human Brief"]);
  connect(connections,"Parse Human Brief","Store Pre-call Brief");
  connect(connections,"Parse Human Brief","S05 Notify Gary");
  return workflow({id,name:"GWB | W08 | Pre-call Intelligence",nodes,connections,description:"Fact-based AI-assisted brief for Gary, never an autonomous diagnosis."});
};

const makeW09 = () => {
  const id=workflowIds.W09;
  const normalize=`const request=$json; const b=request.body||request; const cfg=${configLiteral}; const dealId=String(b.dealId||b.objectId||b.id||$execution.id); const stage=String(b.stage||b.propertyValue||b.properties?.dealstage||'unknown'); const email=String(b.email||b.contact?.email||'').trim().toLowerCase(); const changeId=String(b.eventId||b.changeId||b.subscriptionId||b.occurredAt||b.occurredAtMs||'current'); return [{json:{schemaVersion:'1.1',eventType:b.eventType==='deal.created'?'sales.opportunity.created':'sales.stage.changed',eventId:'hubspot:deal:'+dealId+':'+stage+':'+changeId,correlationId:b.correlationId||b.properties?.gwb_correlation_id||dealId,occurredAt:b.occurredAt||new Date().toISOString(),sourceSystem:'hubspot',normalizedEmail:email,contact:{name:b.name||b.contact?.name||'',email,organisation:b.company||b.contact?.company||''},externalRefs:{hubspotDealId:dealId,hubspotContactId:String(b.contactId||'')},consent:{replyRequested:true,marketing:false},payload:{dealId,stage,amount:b.amount||b.properties?.amount||'',nextStep:b.nextStep||'',lossReason:b.lossReason||'',contactName:b.name||b.contact?.name||'',company:b.company||b.contact?.company||''},_config:cfg}}];`;
  const task=`const e=$json; const p=e.payload; const stage=String(p.stage).toLowerCase(); const important=['appointmentscheduled','qualifiedtobuy','presentationscheduled','contractsent','closedwon','closedlost'].includes(stage); return [{json:{...e,notification:important?{priority:stage==='closedwon'?'urgent':'high',subject:'[Gary Launch] Pipeline — '+p.stage,html:'<h2>'+p.stage+'</h2><p>Deal '+p.dealId+'</p><p>Prochaine étape : '+(p.nextStep||'À définir')+'</p><p>Motif de perte : '+(p.lossReason||'—')+'</p>'}:null,needsNotification:important}}];`;
  const proposalOp=`INSERT INTO gwb_launch.operations(operation_key,subject_key,operation_type,status,due_at,payload) VALUES($1,$2::uuid,'proposal_followup','pending',now()+interval '2 days',$3::jsonb) ON CONFLICT(operation_key) DO UPDATE SET status='pending',due_at=EXCLUDED.due_at,payload=EXCLUDED.payload,updated_at=now() RETURNING operation_key;`;
  const nodes=[webhook({workflowId:id,name:"HubSpot Pipeline Webhook",path:"gwb/hubspot-pipeline",publicWebhook:false}),code(id,"Normalize Sales Event",normalize,[240,0]),executeWorkflow(id,"S01 Validate Event",workflowIds.S01,[480,0]),ifNode(id,"Valid Sales Event?","={{ $json.valid }}","true",undefined,[720,0]),respond(id,"Reject Sales Event","={{ {accepted:false,error:{code:'invalid_sales_event',details:$json.validationErrors}} }}",400,[960,180]),executeWorkflow(id,"S02 Resolve Identity",workflowIds.S02,[960,-40]),executeWorkflow(id,"S03 Store Sales Event",workflowIds.S03,[1200,-40]),ifNode(id,"New Sales Event?","={{ $json.ledger?.inserted === true }}","true",undefined,[1440,-40]),respond(id,"Accept Duplicate Safely","={{ {accepted:true,duplicate:true,eventId:$json.eventId} }}",202,[1680,180]),respond(id,"Accept Sales Event","={{ {accepted:true,eventId:$json.eventId} }}",202,[1680,-40]),code(id,"Define Human Next Step",task,[1920,-40]),ifNode(id,"Important Stage?","={{ $json.needsNotification }}","true",undefined,[2160,-120]),executeWorkflow(id,"S05 Notify Gary",workflowIds.S05,[2400,-180]),ifNode(id,"Proposal Sent?","={{ String($json.payload.stage).toLowerCase() === 'contractsent' }}","true",undefined,[2160,80]),postgres(id,"Schedule Proposal Reminder",proposalOp,`={{ ['proposal:'+$json.payload.dealId,$json.subjectKey,JSON.stringify({dealId:$json.payload.dealId,contactName:$json.payload.contactName,company:$json.payload.company,sentAt:$json.occurredAt,viewed:false})] }}`,[2400,80])];
  const connections=createConnections(); linear(connections,["HubSpot Pipeline Webhook","Normalize Sales Event","S01 Validate Event","Valid Sales Event?"]); connect(connections,"Valid Sales Event?","S02 Resolve Identity",0); connect(connections,"Valid Sales Event?","Reject Sales Event",1); linear(connections,["S02 Resolve Identity","S03 Store Sales Event","New Sales Event?"]); connect(connections,"New Sales Event?","Accept Sales Event",0); connect(connections,"New Sales Event?","Accept Duplicate Safely",1); linear(connections,["Accept Sales Event","Define Human Next Step"]); connect(connections,"Define Human Next Step","Important Stage?"); connect(connections,"Important Stage?","S05 Notify Gary",0); connect(connections,"Define Human Next Step","Proposal Sent?"); connect(connections,"Proposal Sent?","Schedule Proposal Reminder",0);
  return workflow({id,name:"GWB | W09 | Sales Pipeline",nodes,connections,description:"CRM stages, next steps, owner context and loss reasons with selective alerts."});
};

const makeW10 = () => {
  const id=workflowIds.W10;
  const query=`SELECT operation_key,subject_key::text,status,due_at,payload,$1::jsonb AS config FROM gwb_launch.operations WHERE operation_type='proposal_followup' AND status='pending' AND due_at<=now() ORDER BY due_at LIMIT 100;`;
  const prepare=`return $input.all().map(item=>{const r=item.json; const cfg=typeof r.config==='string'?JSON.parse(r.config):r.config; const p=typeof r.payload==='string'?JSON.parse(r.payload):r.payload; return {json:{...r,_config:cfg,notification:{priority:p.viewed?'high':'normal',subject:'[Gary Launch] Proposition à suivre — '+(p.company||p.contactName||r.operation_key),html:'<h2>Suivi de proposition</h2><p>Contact : '+(p.contactName||'—')+'</p><p>Entreprise : '+(p.company||'—')+'</p><p>Envoyée : '+(p.sentAt||'—')+'</p><p>Vue : '+(p.viewed?'Oui':'Non')+'</p><p>Le système rappelle. Gary décide du message et du moment.</p>'}}};});`;
  const mark=`UPDATE gwb_launch.operations SET status='alerted',updated_at=now() WHERE operation_key=$1 RETURNING operation_key;`;
  const nodes=[schedule(id,"Every Weekday Morning",{field:"cronExpression",expression:"0 8 * * 1-5"}),code(id,"Load Config",bakedConfigCode,[220,0]),postgres(id,"Find Proposal Follow-ups",query,"={{ [JSON.stringify($json._config)] }}",[460,0]),code(id,"Prepare Proposal Reminder",prepare,[700,0]),executeWorkflow(id,"S05 Notify Gary",workflowIds.S05,[940,0]),postgres(id,"Mark Reminder Alerted",mark,"={{ [$('Prepare Proposal Reminder').item.json.operation_key] }}",[1180,0])];
  const connections=linear(createConnections(),["Every Weekday Morning","Load Config","Find Proposal Follow-ups","Prepare Proposal Reminder"]);
  linear(connections,["Prepare Proposal Reminder","S05 Notify Gary","Mark Reminder Alerted"]);
  return workflow({id,name:"GWB | W10 | Proposal Follow-up",nodes,connections,description:"Internal proposal reminders; Gary retains control of relationship messages."});
};

const makeW11 = () => {
  const id=workflowIds.W11;
  const normalize=`const request=$json; const b=request.body||request; const cfg=${configLiteral}; const transcript=String(b.transcript||'').trim(); return [{json:{schemaVersion:'1.1',eventType:'content.transcript.ready',eventId:String(b.eventId||'transcript:'+$execution.id),correlationId:String(b.correlationId||b.webinarId||$execution.id),occurredAt:b.occurredAt||new Date().toISOString(),sourceSystem:b.sourceSystem||cfg.webinar.provider,subjectKey:b.subjectKey||'',externalRefs:{webinarEventId:String(b.webinarId||cfg.webinar.eventId)},consent:{marketing:false},payload:{title:b.title||'Pourquoi votre acquisition ne scale pas',transcript},_config:cfg,valid:transcript.length>=200}}];`;
  const prompt=`const e=$json; const instructions='À partir de cette transcription, produis uniquement un objet JSON avec une clé assets. Assets doit contenir : 5 posts LinkedIn, 3 scripts vidéo courte, 1 plan d article, 1 email et 8 questions FAQ. Chaque élément contient type, title et body. Ton expert, concret, humain, sans promesse invérifiable. Les contenus sont des brouillons soumis à validation humaine.'; return [{json:{...e,aiRequest:{model:e._config.openai.model,input:[{role:'system',content:[{type:'input_text',text:instructions}]},{role:'user',content:[{type:'input_text',text:e.payload.transcript}]}]}}}];`;
  const parse=`const source=$('Prepare Content Prompt').item.json; const text=$json.output_text||($json.output||[]).flatMap(o=>o.content||[]).map(c=>c.text||'').join('')||'{}'; const fence=String.fromCharCode(96).repeat(3); let cleaned=text.trim(); if(cleaned.startsWith(fence)){cleaned=cleaned.slice(cleaned.indexOf('\\n')+1); if(cleaned.endsWith(fence)) cleaned=cleaned.slice(0,-3);} let parsed; try{parsed=JSON.parse(cleaned.trim());}catch{parsed={assets:[{type:'review',title:'Réviser la sortie IA',body:text}]};} const assets=Array.isArray(parsed.assets)?parsed.assets:[]; return assets.map((asset,index)=>({json:{...source,eventType:'content.asset.drafted',eventId:source.eventId+':asset:'+index,occurredAt:new Date().toISOString(),sourceSystem:'openai',payload:{sourceEventId:source.eventId,assetType:asset.type||'draft',title:asset.title||'',body:asset.body||'',status:'draft'}}}));`;
  const reviewAlert=`const items=$input.all(); if(items.length===0) return []; const event=items[0].json; return [{json:{...event,notification:{priority:'normal',subject:'[Gary Launch] Nouveaux contenus à valider',html:'<p>'+items.length+' brouillons ont été préparés à partir de la masterclass. Aucun contenu n’est publié automatiquement.</p>'}}}];`;
  const store=`INSERT INTO gwb_launch.content_assets(source_event_id,asset_type,title,body,status) VALUES($1,$2,$3,$4,'draft') RETURNING id::text;`;
  const nodes=[webhook({workflowId:id,name:"Approved Transcript Webhook",path:"gwb/content-transcript",publicWebhook:false}),code(id,"Normalize Transcript",normalize,[240,0]),ifNode(id,"Transcript Long Enough?","={{ $json.valid }}","true",undefined,[480,0]),respond(id,"Reject Short Transcript","={{ {accepted:false,error:{code:'transcript_too_short'}} }}",400,[720,180]),respond(id,"Accept Transcript","={{ {accepted:true,eventId:$json.eventId} }}",202,[720,-40]),code(id,"Prepare Content Prompt",prompt,[960,-40]),httpRequest({workflowId:id,name:"Draft Content Assets",url:`={{ $('Prepare Content Prompt').item.json._config.openai.baseUrl + '/responses' }}`,body:`={{ JSON.stringify($json.aiRequest) }}`,position:[1200,-40],credential:credentials.openai,headers:[{name:"Content-Type",value:"application/json"}]}),code(id,"Parse Draft Assets",parse,[1440,-40]),postgres(id,"Store Draft Asset",store,`={{ [$json.payload.sourceEventId,$json.payload.assetType,$json.payload.title,$json.payload.body] }}`,[1680,-160]),executeWorkflow(id,"S03 Store Asset Event",workflowIds.S03,[1680,40]),code(id,"Prepare Content Review Alert",reviewAlert,[1920,40]),executeWorkflow(id,"S05 Notify for Approval",workflowIds.S05,[2160,40])];
  const connections=createConnections(); linear(connections,["Approved Transcript Webhook","Normalize Transcript","Transcript Long Enough?"]); connect(connections,"Transcript Long Enough?","Accept Transcript",0); connect(connections,"Transcript Long Enough?","Reject Short Transcript",1); linear(connections,["Accept Transcript","Prepare Content Prompt","Draft Content Assets","Parse Draft Assets"]); connect(connections,"Parse Draft Assets","Store Draft Asset"); connect(connections,"Parse Draft Assets","S03 Store Asset Event"); linear(connections,["S03 Store Asset Event","Prepare Content Review Alert","S05 Notify for Approval"]);
  return workflow({id,name:"GWB | W11 | Content Factory",nodes,connections,description:"Webinar transcription to review-only content drafts; never auto-publishes."});
};

const makeW12 = () => {
  const id=workflowIds.W12;
  const normalize=`const request=$json; const b=request.body||request; const cfg=${configLiteral}; const dealId=String(b.dealId||b.id||$execution.id); const email=String(b.email||b.contact?.email||'').trim().toLowerCase(); return [{json:{schemaVersion:'1.1',eventType:'client.won',eventId:'client-won:'+dealId,correlationId:b.correlationId||dealId,occurredAt:b.occurredAt||new Date().toISOString(),sourceSystem:'hubspot',normalizedEmail:email,contact:{name:b.name||b.contact?.name||'',email,organisation:b.company||b.contact?.company||''},externalRefs:{hubspotDealId:dealId,hubspotContactId:String(b.contactId||'')},consent:{replyRequested:true,marketing:Boolean(b.marketingConsent)},payload:{dealId,offer:b.offer||'Growth System Sprint',amount:b.amount||'',kickoffTarget:b.kickoffTarget||''},_config:cfg}}];`;
  const start=`const e=$json; const cfg=e._config; const onboarding={...e,eventType:'client.onboarding.started',eventId:e.eventId+':onboarding',occurredAt:new Date().toISOString(),sourceSystem:'n8n',payload:{sourceEventId:e.eventId,dealId:e.payload.dealId,checklist:['Contrat et facturation','Accès aux outils','Données et tracking','Objectifs et KPI','Kickoff','Plan des 21 jours'],status:'started'}}; onboarding.delivery={sender:{name:cfg.brevo.senderName,email:cfg.brevo.senderEmail},to:[{name:e.contact.name,email:e.normalizedEmail}],subject:'Bienvenue — préparons le démarrage',htmlContent:'<p>Bonjour '+(e.contact.name||'').split(' ')[0]+',</p><p>Merci pour votre confiance. Je vais vous envoyer les éléments utiles pour préparer le démarrage et garder le kickoff centré sur l’essentiel.</p><p>Gary</p>'}; onboarding.notification={priority:'urgent',subject:'[Gary Launch] Nouveau client — '+(e.contact.organisation||e.contact.name),html:'<h2>Deal gagné</h2><p>'+e.contact.name+' — '+e.contact.organisation+'</p><p>Offre : '+e.payload.offer+'</p><p>Préparer le kickoff et les accès.</p>'}; return [{json:onboarding}];`;
  const op=`INSERT INTO gwb_launch.operations(operation_key,subject_key,operation_type,status,due_at,payload) VALUES($1,$2::uuid,'client_onboarding','started',now(),$3::jsonb) ON CONFLICT(operation_key) DO UPDATE SET status='started',payload=EXCLUDED.payload,updated_at=now() RETURNING operation_key;`;
  const nodes=[webhook({workflowId:id,name:"Deal Won Webhook",path:"gwb/client-won",publicWebhook:false}),code(id,"Normalize Won Deal",normalize,[240,0]),executeWorkflow(id,"S01 Validate Client Event",workflowIds.S01,[480,0]),ifNode(id,"Valid Client Event?","={{ $json.valid }}","true",undefined,[720,0]),respond(id,"Reject Client Event","={{ {accepted:false,error:{code:'invalid_client_event',details:$json.validationErrors}} }}",400,[960,180]),executeWorkflow(id,"S02 Resolve Client Identity",workflowIds.S02,[960,-40]),executeWorkflow(id,"S03 Store Client Won",workflowIds.S03,[1200,-40]),ifNode(id,"New Won Deal?","={{ $json.ledger?.inserted === true }}","true",undefined,[1440,-40]),respond(id,"Accept Duplicate Safely","={{ {accepted:true,duplicate:true,eventId:$json.eventId} }}",202,[1680,180]),respond(id,"Accept Won Deal","={{ {accepted:true,eventId:$json.eventId} }}",202,[1680,-40]),code(id,"Start Human Onboarding",start,[1920,-40]),executeWorkflow(id,"S03 Store Onboarding Event",workflowIds.S03,[2160,-40]),postgres(id,"Create Onboarding Checklist",op,`={{ ['onboarding:'+$json.payload.dealId,$json.subjectKey,JSON.stringify($json.payload)] }}`,[2400,-40]),brevoRequest(id,"Send Welcome Email","Start Human Onboarding",[2400,-180]),executeWorkflow(id,"S05 Notify Gary",workflowIds.S05,[2400,100])];
  const connections=createConnections(); linear(connections,["Deal Won Webhook","Normalize Won Deal","S01 Validate Client Event","Valid Client Event?"]); connect(connections,"Valid Client Event?","S02 Resolve Client Identity",0); connect(connections,"Valid Client Event?","Reject Client Event",1); linear(connections,["S02 Resolve Client Identity","S03 Store Client Won","New Won Deal?"]); connect(connections,"New Won Deal?","Accept Won Deal",0); connect(connections,"New Won Deal?","Accept Duplicate Safely",1); linear(connections,["Accept Won Deal","Start Human Onboarding","S03 Store Onboarding Event","Create Onboarding Checklist"]); connect(connections,"Start Human Onboarding","Send Welcome Email"); connect(connections,"Start Human Onboarding","S05 Notify Gary");
  return workflow({id,name:"GWB | W12 | Client Onboarding",nodes,connections,description:"Deal won to welcome, access checklist, kickoff preparation and internal alert."});
};

const makeW13 = () => {
  const id=workflowIds.W13;
  const normalize=`const request=$json; const b=request.body||request; const cfg=${configLiteral}; const approved=b.approved===true; const requestType=b.requestType==='referral'?'referral':'testimonial'; const email=String(b.email||'').trim().toLowerCase(); return [{json:{schemaVersion:'1.1',eventType:requestType==='referral'?'referral.requested':'testimonial.requested',eventId:String(b.eventId||(requestType+'-request:'+(b.clientId||$execution.id))),correlationId:String(b.correlationId||b.clientId||$execution.id),occurredAt:new Date().toISOString(),sourceSystem:'n8n',subjectKey:b.subjectKey||'',normalizedEmail:email,contact:{name:b.name||'',email,organisation:b.company||''},externalRefs:{hubspotContactId:String(b.hubspotContactId||'')},consent:{replyRequested:true,marketing:false},payload:{approved,requestType,result:b.result||'',clientId:b.clientId||''},_config:cfg,approved}}];`;
  const email=`const e=$json; const cfg=e._config; const referral=e.payload.requestType==='referral'; const subject=referral?'Une personne à qui cette approche pourrait être utile ?':'Un retour sur notre travail ?'; const body=referral?'<p>Si une personne de votre réseau rencontre un blocage comparable, une mise en relation simple me serait très utile. Seulement si cela vous paraît pertinent.</p>':'<p>Maintenant que nous avons du recul sur le projet, votre retour m’aiderait beaucoup. Quelques lignes sincères sur la situation de départ, le travail réalisé et ce qui a changé suffisent.</p><p>Si vous préférez, vous pouvez simplement répondre à cet email.</p>'; return [{json:{...e,delivery:{sender:{name:cfg.brevo.senderName,email:cfg.brevo.senderEmail},to:[{name:e.contact.name,email:e.normalizedEmail}],subject,htmlContent:'<p>Bonjour '+(e.contact.name||'').split(' ')[0]+',</p>'+body+'<p>Gary</p>'}}}];`;
  const nodes=[webhook({workflowId:id,name:"Approved Proof Request Webhook",path:"gwb/testimonial-request",publicWebhook:false}),code(id,"Normalize Proof Request",normalize,[240,0]),ifNode(id,"Human Approved?","={{ $json.approved }}","true",undefined,[480,0]),respond(id,"Reject Unapproved Request","={{ {accepted:false,error:{code:'human_approval_required'}} }}",409,[720,180]),executeWorkflow(id,"S01 Validate Proof Request",workflowIds.S01,[720,-40]),executeWorkflow(id,"S02 Resolve Client Identity",workflowIds.S02,[960,-40]),executeWorkflow(id,"S03 Reserve Testimonial Request",workflowIds.S03,[1200,-40]),ifNode(id,"New Testimonial Request?","={{ $json.ledger?.inserted === true }}","true",undefined,[1440,-40]),respond(id,"Accept Duplicate Safely","={{ {accepted:true,duplicate:true,eventId:$json.eventId} }}",202,[1680,180]),respond(id,"Accept Approved Request","={{ {accepted:true,eventId:$json.eventId} }}",202,[1680,-40]),code(id,"Prepare Testimonial Email",email,[1920,-40]),brevoRequest(id,"Send Testimonial Request","Prepare Testimonial Email",[2160,-40])];
  const connections=createConnections(); linear(connections,["Approved Proof Request Webhook","Normalize Proof Request","Human Approved?"]); connect(connections,"Human Approved?","S01 Validate Proof Request",0); connect(connections,"Human Approved?","Reject Unapproved Request",1); linear(connections,["S01 Validate Proof Request","S02 Resolve Client Identity","S03 Reserve Testimonial Request","New Testimonial Request?"]); connect(connections,"New Testimonial Request?","Accept Approved Request",0); connect(connections,"New Testimonial Request?","Accept Duplicate Safely",1); linear(connections,["Accept Approved Request","Prepare Testimonial Email","Send Testimonial Request"]);
  return workflow({id,name:"GWB | W13 | Testimonial and Referral",nodes,connections,description:"Human-approved testimonial request after a real delivery result."});
};

const makeW14 = () => {
  const id=workflowIds.W14;
  const metrics=`WITH base AS (SELECT event_type,subject_key,occurred_at,payload FROM gwb_launch.events WHERE occurred_at>=now()-interval '30 days'), quality AS (SELECT count(*) FILTER(WHERE subject_key IS NULL) missing_subject,count(*)-count(DISTINCT event_id) duplicate_ids FROM gwb_launch.events WHERE occurred_at>=now()-interval '30 days') SELECT (SELECT count(*) FROM base WHERE event_type='masterclass.registration.submitted') registrations,(SELECT count(*) FROM base WHERE event_type='webinar.attended') attendees,(SELECT count(*) FROM base WHERE event_type='webinar.no_show') no_shows,(SELECT count(*) FROM base WHERE event_type='diagnostic.requested' OR (event_type='project.conversation.submitted' AND payload->'diagnostic'->>'requested'='true')) diagnostics,(SELECT count(*) FROM base WHERE event_type='booking.created') bookings,(SELECT count(*) FROM base WHERE event_type='sales.opportunity.created') opportunities,(SELECT count(*) FROM base WHERE event_type='proposal.sent' OR (event_type='sales.stage.changed' AND lower(payload->>'stage')='contractsent')) proposals,(SELECT count(*) FROM base WHERE event_type='client.won') sales,COALESCE((SELECT sum(NULLIF(payload->>'amount','')::numeric) FROM base WHERE event_type='client.won'),0) revenue,(SELECT missing_subject FROM quality) missing_subject,(SELECT duplicate_ids FROM quality) duplicate_ids,$1::jsonb config;`;
  const summary=`const m=$json; const cfg=typeof m.config==='string'?JSON.parse(m.config):m.config; const attendance=m.registrations?Math.round(100*m.attendees/m.registrations):0; const bookingRate=m.attendees?Math.round(100*m.bookings/m.attendees):0; const revenuePerRegistrant=m.registrations?Math.round(Number(m.revenue)*100/Number(m.registrations))/100:0; return [{json:{...m,_config:cfg,notification:{priority:Number(m.missing_subject)>0?'high':'normal',subject:'[Gary Launch] Pilotage 30 jours — '+m.sales+' vente(s)',html:'<h2>Chaîne commerciale — 30 jours</h2><ul><li>Inscriptions : '+m.registrations+'</li><li>Participants : '+m.attendees+' ('+attendance+' %)</li><li>No-show : '+m.no_shows+'</li><li>Diagnostics demandés : '+m.diagnostics+'</li><li>Rendez-vous : '+m.bookings+' ('+bookingRate+' % des participants)</li><li>Opportunités : '+m.opportunities+'</li><li>Propositions : '+m.proposals+'</li><li>Ventes : '+m.sales+'</li><li>Revenu : '+m.revenue+'</li><li>Revenu / inscrit : '+revenuePerRegistrant+'</li></ul><h3>Qualité des données</h3><p>Événements sans subjectKey : '+m.missing_subject+' — doublons : '+m.duplicate_ids+'</p>'}}}];`;
  const nodes=[schedule(id,"Daily Reporting",{field:"cronExpression",expression:"0 8 * * *"}),code(id,"Load Config",bakedConfigCode,[220,0]),postgres(id,"Calculate Funnel Metrics",metrics,"={{ [JSON.stringify($json._config)] }}",[460,0]),code(id,"Build Operating Report",summary,[700,0]),executeWorkflow(id,"S05 Send Report to Gary",workflowIds.S05,[940,0])];
  const connections=linear(createConnections(),nodes.map(n=>n.name));
  return workflow({id,name:"GWB | W14 | Reporting and Data Quality",nodes,connections,description:"Revenue-chain KPIs, attribution-ready ledger quality and daily operating report."});
};

const workflows = [
  makeW99(), makeS01(), makeS02(), makeS03(), makeS04(), makeS05(), makeS06(), makeW00(),
  makeW01(), makeW02(), makeW03(), makeW04(), makeW05(), makeW06(), makeW07(), makeW08(),
  makeW09(), makeW10(), makeW11(), makeW12(), makeW13(), makeW14(),
];

const fileNames = {
  [workflowIds.W99]: "00-w99-ledger-setup.json",
  [workflowIds.S01]: "01-s01-validate-event.json",
  [workflowIds.S02]: "02-s02-resolve-identity.json",
  [workflowIds.S03]: "03-s03-append-ledger.json",
  [workflowIds.S04]: "04-s04-consent-guard.json",
  [workflowIds.S05]: "05-s05-notify-gary.json",
  [workflowIds.S06]: "06-s06-error-retry.json",
  [workflowIds.W00]: "07-w00-error-operations.json",
  [workflowIds.W01]: "10-w01-project-conversation.json",
  [workflowIds.W02]: "11-w02-masterclass-registration.json",
  [workflowIds.W03]: "12-w03-webinar-nurture.json",
  [workflowIds.W04]: "13-w04-attendance-sync.json",
  [workflowIds.W05]: "14-w05-intent-engine.json",
  [workflowIds.W06]: "15-w06-segmented-follow-up.json",
  [workflowIds.W07]: "16-w07-diagnostic-booking.json",
  [workflowIds.W08]: "17-w08-pre-call-intelligence.json",
  [workflowIds.W09]: "18-w09-sales-pipeline.json",
  [workflowIds.W10]: "19-w10-proposal-follow-up.json",
  [workflowIds.W11]: "20-w11-content-factory.json",
  [workflowIds.W12]: "21-w12-client-onboarding.json",
  [workflowIds.W13]: "22-w13-testimonial-referral.json",
  [workflowIds.W14]: "23-w14-reporting-data-quality.json",
};

await mkdir(outputDir, { recursive: true });
await Promise.all(workflows.map((item) => writeFile(resolve(outputDir, fileNames[item.id]), `${JSON.stringify(item, null, 2)}\n`)));
await writeFile(resolve(root, "n8n/gary-launch.bundle.json"), `${JSON.stringify(workflows, null, 2)}\n`);
await writeFile(resolve(root, "n8n/manifest.json"), `${JSON.stringify({
  name: "Gary Wilfred-Borilla launch system",
  schemaVersion: "1.0",
  generatedAt: new Date().toISOString(),
  workflowCount: workflows.length,
  importOrder: workflows.map((item) => ({ id: item.id, name: item.name, file: `workflows/${fileNames[item.id]}` })),
  publicWebhooks: {
    projectConversation: "/webhook/gwb/project-conversation",
    masterclassRegistration: "/webhook/gwb/masterclass-registration",
    engagementEvent: "/webhook/gwb/engagement-event",
  },
  authenticatedWebhooks: [
    "/webhook/gwb/webinar-attendance", "/webhook/gwb/calendar-booking", "/webhook/gwb/hubspot-pipeline",
    "/webhook/gwb/content-transcript", "/webhook/gwb/client-won", "/webhook/gwb/testimonial-request",
  ],
  credentials: Object.values(credentials).map((entry) => Object.values(entry)[0].name),
}, null, 2)}\n`);

console.log(`Generated ${workflows.length} n8n workflows in ${outputDir}`);
