# n8n behind the public API

n8n is the orchestration layer, not the browser-facing backend. Visit-card sends requests to the stable API described in `backend-architecture.md`; the backend validates and accepts them before triggering a private n8n webhook or queue.

```text
Browser -> Public API -> private n8n webhook -> CRM / email / reporting
```

This separation prevents a future change of n8n workflow or hosting from forcing a frontend deployment, and avoids exposing internal webhook URLs as the product contract.

## Project conversation event

After accepting `POST /v1/project-conversations`, the backend may forward a normalized internal event:

```json
{
  "type": "project.conversation.created",
  "version": "1.0",
  "requestId": "req_01H...",
  "eventId": "1ec11d6e-c8ef-48a4-a371-0e2878396d20",
  "receivedAt": "2026-09-03T10:00:01.000Z",
  "data": {
    "locale": "fr",
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
      "campaign": "growth-leaks"
    },
    "consent": {
      "replyRequested": true,
      "marketing": false
    }
  }
}
```

## Recommended workflow

1. Receive the authenticated internal event from the API or queue.
2. Deduplicate on `eventId`.
3. Normalize the email and create or update the CRM contact.
4. Store the project, diagnostic choice and useful acquisition context.
5. Produce a concise internal brief for Gary.
6. Notify Gary and optionally send a simple receipt.
7. Log the outcome against `requestId`, without retaining unnecessary raw personal data.

AI may summarize information for the internal brief. It must not issue an autonomous diagnosis or commercial response to the visitor.

## Security boundary

- The n8n webhook remains private and is never stored in `NEXT_PUBLIC_*` variables.
- The public API authenticates requests sent to n8n.
- The public API owns origin checks, schema validation, rate limiting and Turnstile verification.
- n8n owns orchestration, retries and downstream integrations.
- HubSpot, Brevo, OpenAI and webinar credentials remain server-side.

## Future events

The same pattern applies to `masterclass.registration.created` and allowlisted engagement events. Each event requires its own schema version and workflow; arbitrary event names or raw page content must never be forwarded.
