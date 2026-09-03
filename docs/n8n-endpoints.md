# n8n delivery modes

n8n is the active orchestration layer for the launch and remains part of the architecture after a backend is introduced.

```text
Phase 1 — prove the system
Browser -> n8n production webhook -> CRM / email / webinar / reporting

Phase 2 — industrialize the proven system
Browser -> Public API -> private n8n webhook or queue -> the same tools
```

The form payload is identical in both phases. Only the configured delivery route changes.

## Delivery priority

1. If `NEXT_PUBLIC_API_BASE_URL` is configured, the site sends the payload to `POST /v1/project-conversations`.
2. Otherwise, if `NEXT_PUBLIC_N8N_PROJECT_CONVERSATION_WEBHOOK_URL` is configured, the site sends the same payload directly to that n8n production webhook.
3. Otherwise, the site opens a pre-filled email.

The masterclass and engagement variables reserve the same launch path for the next pages:

- `NEXT_PUBLIC_N8N_MASTERCLASS_REGISTRATION_WEBHOOK_URL`
- `NEXT_PUBLIC_N8N_EVENT_WEBHOOK_URL`

Use production webhook URLs only. n8n exposes separate test and production URLs, and the production webhook is registered when the workflow is published. Configure the Webhook node's Allowed Origins for the published Visit-card origin.

## Project conversation payload

```json
{
  "schemaVersion": "1.1",
  "eventType": "project.conversation.submitted",
  "eventId": "1ec11d6e-c8ef-48a4-a371-0e2878396d20",
  "correlationId": "anonymous-session-id",
  "submittedAt": "2026-09-03T10:00:00.000Z",
  "locale": "fr",
  "source": "visit-card",
  "contact": {
    "name": "Example Person",
    "email": "person@example.com",
    "organisation": "Example Company",
    "website": "https://example.com"
  },
  "project": {
    "message": "We want to improve the path from lead to sale.",
    "problem": "conversion"
  },
  "diagnostic": {
    "requested": true,
    "focus": "conversion",
    "context": "Most visitors leave before the form."
  },
  "acquisition": {
    "source": "linkedin",
    "medium": "organic",
    "campaign": "growth-leaks",
    "content": "post-01",
    "term": "",
    "referrer": "https://www.linkedin.com/",
    "landingPage": "https://nuhfear1.github.io/Visit-card/",
    "sessionId": "anonymous-session-id",
    "problem": "conversion"
  },
  "consent": {
    "replyRequested": true,
    "marketing": false
  }
}
```

`eventId` deduplicates one event. `correlationId` groups every later event belonging to the same journey. Both values must be preserved in CRM properties, the event ledger and downstream workflows.

## W01 ingestion responsibilities

1. Receive the browser request and respond quickly with a `2xx` status.
2. Validate `schemaVersion`, `eventType`, locale, problem key, field lengths and email format.
3. Reject malformed requests and silently discard the honeypot path.
4. Deduplicate on `eventId` before creating any external side effect.
5. Normalize email, website and UTM values.
6. Upsert the contact in the CRM.
7. Append the event to the durable event ledger.
8. Store external tool identifiers without replacing the canonical IDs.
9. Notify Gary and send a human receipt if configured.
10. Route failures to the shared error workflow.

AI may prepare an internal summary. It must never issue an autonomous diagnosis or commercial response to the visitor.

## Security during the direct-webhook phase

- Every credential remains inside n8n; only the webhook URL is public.
- Restrict Allowed Origins to the production website and approved previews.
- Verify content type, payload size and field allowlists before integrations run.
- Add Turnstile verification before paid traffic is activated.
- Apply rate limiting at the reverse proxy or hosting layer when available.
- Never use the n8n execution history as the durable customer database.
- Configure a shared Error Trigger workflow and alerts before publishing acquisition campaigns.

## Backend cutover

The later backend accepts the same versioned payload, stores or queues it, then calls n8n privately. Existing workflow inputs, event types, correlation IDs and external references remain unchanged. The cutover is therefore a configuration change, not a funnel rebuild.

See `n8n-launch-system.md` for the complete workflow map and `openapi.yaml` for the future public API contract.
