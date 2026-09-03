# n8n endpoint contracts

Visit-card is exported as a static Next.js site. Browser-facing forms therefore post to external ingestion endpoints. The endpoint URLs are public routing information; all credentials and secrets must remain in n8n or in a gateway in front of n8n.

## Environment variables

| Variable | Browser event | Status |
|---|---|---|
| `NEXT_PUBLIC_PROJECT_CONVERSATION_ENDPOINT` | A visitor sends the project conversation form | Implemented |
| `NEXT_PUBLIC_MASTERCLASS_REGISTRATION_ENDPOINT` | A visitor registers for the masterclass | Reserved |
| `NEXT_PUBLIC_FUNNEL_EVENT_ENDPOINT` | A consented visitor produces a funnel engagement event | Reserved |

GitHub Pages receives these values from GitHub Actions repository variables. Never store HubSpot, Brevo, OpenAI, webinar-platform or Turnstile secrets in a `NEXT_PUBLIC_*` variable.

## 1. Project conversation

### Request

`POST NEXT_PUBLIC_PROJECT_CONVERSATION_ENDPOINT`

```json
{
  "schemaVersion": "1.0",
  "eventId": "1ec11d6e-c8ef-48a4-a371-0e2878396d20",
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

Allowed problem values are `conversion`, `manual-work`, `systems`, `strategy`, or an empty string.

### Success response

Return any `2xx` response. A minimal response is preferred:

```json
{ "accepted": true, "eventId": "1ec11d6e-c8ef-48a4-a371-0e2878396d20" }
```

The browser intentionally does not need CRM IDs, scores, internal notes or workflow details.

### Error response

Return `400` for an invalid payload, `403` for a failed anti-spam check, `409` for a conflicting event ID, `429` for rate limiting and `5xx` for a temporary workflow failure. Do not return internal stack traces.

## Recommended n8n pipeline

1. Webhook receives the request.
2. Validate the origin, method, content type, lengths and email format.
3. Reject or silently quarantine honeypot and rate-limit failures.
4. Verify Turnstile server-side when it is enabled.
5. Deduplicate on `eventId`, then normalize the email.
6. Create or update the HubSpot contact.
7. Store the selected problem, diagnostic request and acquisition context.
8. Produce a short internal brief for Gary. AI may summarize the message but must not send an autonomous verdict to the visitor.
9. Notify Gary and send a human-toned receipt if desired.
10. Log the workflow outcome without logging unnecessary personal data.

## Gateway and CORS

A small gateway in front of n8n is recommended for production. Allow the exact production origin `https://nuhfear1.github.io`, apply rate limiting, and forward only validated requests to the private n8n webhook.

If n8n is exposed directly, configure `OPTIONS` and `POST` responses with the exact allowed origin rather than `*`. Allow the `Content-Type` header and JSON requests.

## Idempotency and retention

- Treat `eventId` as the idempotency key.
- Keep suppression and deletion requests independent from marketing lists.
- The form explicitly sets `marketing: false`; do not add the contact to a newsletter without separate consent.
- Define a retention period for raw form payloads and remove data that is no longer needed.

## Reserved endpoints

The masterclass registration endpoint should reuse the envelope fields `schemaVersion`, `eventId`, `submittedAt`, `locale`, `source` and `acquisition`, with a dedicated `registration` object.

The funnel event endpoint must only be enabled after the consent and analytics strategy is implemented. It should accept a strict event allowlist and must never accept arbitrary event names or raw page content.
