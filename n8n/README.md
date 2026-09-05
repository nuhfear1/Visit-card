# Gary launch automation pack

This directory contains the importable n8n implementation of the Gary Wilfred-Borilla launch system. It keeps the visitor experience human while structuring acquisition, webinar, sales and delivery operations behind the scenes.

## Deliverables

- `gary-launch.n8np`: the connected 22-workflow package and the only supported installation artifact.
- `workflows/*.json`: versioned sources for generation and review; don't import them separately.
- `import-order.json`: dependency inventory, stable IDs, webhook inventory and credential names.
- `config/gary-launch.config.example.json`: non-secret integration and campaign configuration.
- `credentials.example.json`: credential inventory without values.
- `fixtures/*.json`: safe requests for validation and duplicate testing.

All workflows import inactive. No API key, password, webhook secret or database connection is committed.

## Workflow inventory

| Group | IDs | Purpose |
|---|---|---|
| Foundation | W99, S01–S06, W00 | SQL ledger, validation, identity, idempotency, consent, alerts and failures |
| Acquisition | W01–W06 | Project conversation, registration, reminders, attendance, score and segmented follow-up |
| Sales | W07–W10 | Optional diagnostic/booking, factual pre-call brief, pipeline and proposal reminders |
| Compounding loop | W11–W14 | Content drafts, onboarding, proof/referral and revenue-chain reporting |

The full functional map is in `../docs/n8n-launch-system.md`.

## 1. Configure and regenerate

Create the ignored local configuration:

```bash
cp n8n/config/gary-launch.config.example.json n8n/config/gary-launch.config.json
```

Replace the webinar provider, event, URLs, sender and calendar values. Then rebuild and validate the JSON:

```bash
npm run n8n:generate
npm run n8n:validate
```

The configuration is intentionally baked into generated nodes. Regenerate the pack after changing a campaign date, webinar event or provider endpoint.

## 2. Create credentials in n8n

Create these credentials using the exact names below, then select them in the imported nodes:

| Name | n8n credential type | Value |
|---|---|---|
| `GWB Event Ledger Postgres` | Postgres | Dedicated database or schema connection |
| `GWB HubSpot Private App` | Header Auth | `Authorization: Bearer …` |
| `GWB Brevo API` | Header Auth | `api-key: …` |
| `GWB Webinar API` | Header Auth | Provider-specific authorization header |
| `GWB OpenAI API` | Header Auth | `Authorization: Bearer …` |
| `GWB Internal Webhook Auth` | Header Auth | `X-GWB-Workflow-Key: …` |

The placeholder credential IDs in the JSON are deliberate. n8n does not export secret values; bind the credentials after import.

Before activation:

- verify the Brevo sender and reply domain;
- create the HubSpot properties named in `gary-launch.config.json`;
- ensure the Postgres role can create the `gwb_launch` schema;
- configure every server-to-server callback to send the internal header, or replace that boundary with the selected provider's signed-webhook verification.

## 3. Import the connected system

Do not import the files under `workflows/` one by one. That can recreate workflow IDs and break `Execute Workflow` relationships. The former array bundle and the individual-workflow ZIP have both been removed.

`gary-launch.n8np` uses n8n's package format version 1. It contains all 22 workflows, all static sub-workflow requirements and their 47 `Execute Workflow` nodes. Import it as one transaction through n8n's public API CLI:

```bash
export N8N_URL="https://YOUR-N8N-INSTANCE"
export N8N_API_KEY="YOUR-N8N-API-KEY"
npm run n8n:import
```

The import runs with `workflow-conflict-policy=fail`, so it won't overwrite an existing workflow, and `credential-missing-mode=create-stub`, so n8n creates the six empty credential placeholders while preserving every node binding. Fill those credential stubs after import.

The editor's **Import from File** action imports one JSON workflow only and isn't the entry point for this multi-workflow system. If the installed n8n version has no `package import` command, stop and upgrade or provide the exact n8n version before attempting an alternative import.

Run `GWB | W99 | One-time Ledger Setup` manually once. Do not activate it.

Set `GWB | W00 | Error Operations` as the error workflow for W01–W14 in workflow settings. Then publish in this order:

1. S01–S06 and W00.
2. W01–W06.
3. W07–W10.
4. W11–W14.

## 4. Map provider adapters

The business envelope is fixed; vendor payloads are not. The normalization nodes are the only adapter seams:

| Source | Workflow and node | Required canonical values |
|---|---|---|
| Webinar provider | W02 `Register with Webinar Provider` | registrant ID and join URL |
| Webinar callback/export | W04 `Normalize Attendance` | email, attendance ID, duration, polls, questions and CTA |
| Calendar | W07 `Normalize Booking` | booking ID, status, email, time and notes |
| HubSpot | W09 `Normalize Sales Event` | immutable change ID, deal ID, contact email, stage and time |
| Approved transcript | W11 `Normalize Transcript` | source event ID, webinar ID and transcript |
| Deal won | W12 `Normalize Won Deal` | deal/contact IDs, email, offer and amount |

W04 also accepts Visit-card's strict first-party engagement envelope. Anonymous events are stored against their `correlationId`; when that journey has already been identified, S02 attaches the canonical `subjectKey` and W05 can recalculate intent.

Choose Livestorm or Zoom before activating W02/W04 and confirm its current request and response shape. The included mapping is provider-neutral and must not be assumed to verify a vendor signature automatically.

## 5. Test before publishing

Use the editor's test webhook URL first. Send fixtures with a JSON content type, for example:

```bash
curl -X POST "$N8N_TEST_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  --data-binary @n8n/fixtures/project-conversation.valid.json
```

Required acceptance tests:

1. The valid project fixture creates one subject, one submission event and one CRM side effect.
2. Sending the same fixture twice returns an accepted duplicate and creates no second side effect.
3. The invalid project fixture returns HTTP 400 and reaches no integration.
4. Attendance and no-show inputs reach different W06 content.
5. Marketing suppression blocks marketing actions while requested replies and registration messages stay separate.
6. A booking produces a factual brief and a Gary notification; it never sends an automated diagnosis.
7. W11 stores drafts but publishes nothing.
8. W14 reconciles registration, attendance, booking, opportunity, sale and revenue.

The structural validators check JSON parsing, code-node syntax, graph reachability, all 47 cross-workflow calls, stable sub-workflow references, webhook uniqueness, inactive imports, accidental secret patterns, the `.n8np` archive order and its package manifest. They do not replace an end-to-end run against the chosen n8n version and real provider sandboxes.

## 6. Connect Visit-card

After W01 passes production tests, set:

```bash
NEXT_PUBLIC_N8N_PROJECT_CONVERSATION_WEBHOOK_URL=https://YOUR_N8N/webhook/gwb/project-conversation
NEXT_PUBLIC_N8N_MASTERCLASS_REGISTRATION_WEBHOOK_URL=https://YOUR_N8N/webhook/gwb/masterclass-registration
NEXT_PUBLIC_N8N_EVENT_WEBHOOK_URL=https://YOUR_N8N/webhook/gwb/engagement-event
```

Keep the current email fallback until the production webhook and error alert have both been verified. Add server-side Turnstile verification and rate limiting before meaningful cold paid traffic.

## Backend handoff

The ledger stores the original payload, normalized event, `eventId`, `correlationId`, `subjectKey`, consent and every external tool reference. A later backend can ingest or replay the same event contract, then call the same private n8n workflows. The commercial proof phase therefore does not create a migration dead end.
