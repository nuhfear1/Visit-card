# Gary launch system — n8n first

## Objective

Launch Gary with n8n as the operational nervous system, prove that the acquisition-to-sale loop works, then add a backend without rebuilding the funnel.

The proof is not traffic or impressions. It is a traceable chain:

```text
visitor -> registration -> attendance -> intent -> conversation -> opportunity -> sale -> case study
```

## Importable implementation

The repository now contains the complete generated pack:

- `n8n/gary-launch.bundle.json` for CLI import;
- `n8n/workflows/*.json` for individual UI import;
- `n8n/manifest.json` for dependency order and endpoints;
- `n8n/fixtures/*.json` for safe acceptance tests;
- `n8n/README.md` for credentials, provider mapping and activation.

The 22 workflows contain 185 connected nodes and import inactive. Provider credentials and signed-callback verification remain environment-specific and are bound in n8n, never committed to Git.

## Architecture by phase

### Phase 1 — launch and proof

```text
Visit-card / acquisition tools
        -> n8n public ingestion workflows
            -> durable event ledger
            -> HubSpot CRM
            -> Brevo transactional and nurture email
            -> webinar platform
            -> calendar
            -> internal notifications
            -> reporting
```

### Phase 2 — backend after proof

```text
Visit-card / acquisition tools
        -> backend API and event store
            -> private n8n workflows
                -> the same connected tools
```

The event names, versions, IDs and payloads remain stable between phases.

## Non-negotiable normalized data rules

Public producers may use a domain timestamp such as `submittedAt` and cannot know a
canonical contact key before identity resolution. S01 and S02 must convert every
accepted input into the normalized envelope below before it reaches the ledger or
another main workflow.

Every event must preserve:

| Field | Purpose |
|---|---|
| `schemaVersion` | Allows contracts to evolve without breaking old executions |
| `eventType` | Routes the event without guessing from payload content |
| `eventId` | Idempotency key preventing duplicate side effects |
| `correlationId` | Reconstructs one visitor or buyer journey across tools |
| `occurredAt` or domain timestamp | Orders events using source time |
| `sourceSystem` | Identifies Visit-card, CRM, webinar, email, calendar or another producer |
| `subjectKey` | Stable internal contact key assigned during identity resolution, never a tool-specific ID |
| `externalRefs` | Maps the same person or object across connected tools; empty on first contact if necessary |
| `consent` | Preserves the exact permission attached to the event |
| `payload` | Stores domain data without flattening away useful context |

Recommended external references:

```json
{
  "hubspotContactId": "",
  "hubspotDealId": "",
  "brevoContactId": "",
  "webinarRegistrantId": "",
  "webinarAttendanceId": "",
  "calendarBookingId": "",
  "proposalId": "",
  "n8nExecutionId": ""
}
```

Tool IDs must never replace `eventId`, `correlationId` or the internal `subjectKey`.
The original accepted payload is retained inside `payload`; normalization must not
silently discard an acquisition, consent, poll or commercial field.

## Systems of record

| Data | System of record during launch |
|---|---|
| Contacts, companies, opportunities, commercial stages | HubSpot |
| Immutable journey events and cross-tool references | Durable SQL event ledger |
| Email delivery and engagement detail | Brevo, mirrored as normalized events |
| Webinar registration, attendance and poll answers | Webinar platform, mirrored as normalized events |
| Meetings | Calendar platform, mirrored in CRM and ledger |
| Workflow executions and retries | n8n |
| Business KPIs | Reporting layer built from CRM plus event ledger |

n8n execution history is operational evidence, not the customer database. Raw events require a retention policy and should not be stored indefinitely inside execution logs.

## Shared n8n sub-workflows

| ID | Responsibility | Required output |
|---|---|---|
| S01 — Validate Event | Schema, allowlists, sizes, required fields and timestamps | Validated event or controlled rejection |
| S02 — Resolve Identity | Normalize email and resolve `subjectKey` plus external IDs | Canonical identity record |
| S03 — Append Ledger | Idempotent event insert and reference update | Stored event confirmation |
| S04 — Consent Guard | Check reply, marketing, suppression and legal state | Allowed actions list |
| S05 — Notify Human | Standardized internal alert with context and priority | Notification reference |
| S06 — Error & Retry | Classify retryable versus permanent errors | Retry, quarantine or alert decision |

Shared workflows must have explicit input fields, versioned outputs and no public triggers.

## Main workflow map

| ID | Trigger | Core work | Primary output |
|---|---|---|---|
| W00 — Error Operations | n8n Error Trigger | Classify failure, redact sensitive values, alert and link execution | Actionable incident |
| W01 — Project Conversation | Visit-card webhook | Validate, deduplicate, resolve identity, ledger, CRM upsert, notify Gary | Qualified conversation record |
| W02 — Masterclass Registration | Visit-card or webinar webhook | Register, capture source/UTM/consent, CRM upsert, ledger | Confirmed registration |
| W03 — Webinar Nurture | Registration or schedule | Confirmation, reminders, calendar link, timezone-safe timing | Attendance-ready registrant |
| W04 — Engagement & Attendance Sync | Webinar callback or Visit-card event | Attendance, duration, polls, questions, CTA clicks, replay and no-show state | Normalized engagement events |
| W05 — Intent Engine | New engagement event | Recalculate explainable score and temperature | Cold, warm, sales-ready or priority |
| W06 — Segmented Follow-up | Webinar end plus score | Participant, no-show, replay and high-intent branches | Relevant follow-up sequence |
| W07 — Diagnostic & Booking | Diagnostic request or calendar callback | Qualification, booking, CRM association and preparation status | Booked or nurtured lead |
| W08 — Pre-call Intelligence | Qualified booking | Gather site, history, engagement and declared problem; prepare human brief | Gary call brief |
| W09 — Sales Pipeline | CRM stage or meeting outcome | Tasks, next step, owner, loss reason, follow-up date | Current opportunity state |
| W10 — Proposal Follow-up | Proposal sent/viewed/expired | Timed human reminders and CRM updates | Proposal outcome |
| W11 — Content Factory | Approved webinar recording/transcript | Draft clips, posts, article, FAQ and emails for human approval | Reusable content assets |
| W12 — Client Onboarding | Deal won | Welcome, documents, kickoff, access checklist and delivery workspace | Ready-to-start client |
| W13 — Testimonial & Referral | Delivery milestone or result | Human-approved request, response capture and consent | Proof or referral opportunity |
| W14 — Reporting & Data Quality | Daily and weekly schedules | Funnel metrics, attribution, anomalies, duplicates and missing IDs | Operating dashboard and alerts |

## Canonical event catalogue

Start with a strict allowlist:

```text
project.conversation.submitted
masterclass.registration.submitted
masterclass.registration.confirmed
email.transactional.sent
email.delivered
email.clicked
webinar.attended
webinar.no_show
webinar.poll_answered
webinar.cta_clicked
webinar.reminder.reserved
webinar.reminder.sent
booking.clicked
replay.started
replay.completed
intent.score.changed
diagnostic.requested
booking.created
booking.completed
booking.cancelled
sales.opportunity.created
sales.stage_changed
proposal.sent
proposal.viewed
proposal.accepted
proposal.declined
client.won
client.onboarding.started
content.asset.drafted
content.asset.approved
testimonial.requested
testimonial.received
referral.requested
referral.received
```

Do not accept arbitrary event names from the browser.

## Intent scoring v1

The score is explainable and stored with its contributing signals.

| Signal | Points |
|---|---:|
| Registration | +5 |
| ICP-compatible company | +15 |
| Live attendance | +15 |
| More than 30 minutes watched | +10 |
| Poll answered | +5 |
| Problem needs action within 90 days | +15 |
| Diagnostic requested | +20 |
| Case study visit | +5 |
| Qualified booking | +40 |

Initial routing:

- `0–24`: nurture;
- `25–49`: warm;
- `50–74`: sales-ready;
- `75+`: immediate priority.

Scores are operating hypotheses, not promises. W14 must compare scores with bookings, opportunities and revenue so the model can be recalibrated.

## Human experience rules

- Gary reads and answers project conversations.
- AI may summarize, classify and draft; it does not autonomously diagnose or promise results.
- High-intent alerts help Gary respond quickly without exposing scoring to the visitor.
- Marketing consent is separate from a requested reply or webinar operational emails.
- No contact enters a newsletter from the project form alone.
- Content generated from webinars requires human approval before publication.
- Proposal and relationship follow-ups must stop when the CRM records a reply, refusal or suppression.

## Build order

### Foundation

1. W00 and S01–S06.
2. Event ledger schema and idempotency constraints.
3. Credential inventory and environment separation.
4. Test fixtures for valid, invalid, duplicate and replayed events.

### Launch core

1. W01 Project Conversation.
2. W02 Masterclass Registration.
3. W03 Webinar Nurture.
4. W04 Attendance Sync.
5. W05 Intent Engine.
6. W06 Segmented Follow-up.

### Sales core

1. W07 Diagnostic & Booking.
2. W08 Pre-call Intelligence.
3. W09 Sales Pipeline.
4. W10 Proposal Follow-up.

### Compounding loop

1. W11 Content Factory.
2. W12 Client Onboarding.
3. W13 Testimonial & Referral.
4. W14 Reporting & Data Quality.

## Launch gates

Do not buy meaningful cold traffic until all of these pass:

- webhook production URLs published and origin-restricted;
- duplicate submissions create one CRM side effect;
- no-show and attendee branches tested independently;
- suppression stops marketing branches everywhere;
- W00 alerts include the failed workflow and execution link;
- CRM, webinar, email and calendar identifiers reconcile to one `subjectKey`;
- dashboard reconstructs registration through revenue;
- manual fallback exists for critical communications;
- Gary has approved every visitor-facing email and sales handoff.

## KPIs

The operating dashboard tracks:

```text
traffic source
-> landing conversion
-> registration
-> attendance and replay
-> diagnostic request
-> qualified booking
-> opportunity
-> proposal
-> sale
-> revenue per registrant
```

Impressions and follower growth remain supporting signals, not launch success criteria.

## Backend handoff requirements

The later backend must be able to import the event ledger and external reference map, accept the same versioned public payloads, preserve `eventId` and `correlationId`, and trigger the existing n8n workflows through authenticated private calls or a queue.

No n8n workflow may depend on a browser-only field that is absent from the documented contract. No integration may hide its external ID exclusively inside a workflow node or execution log.
