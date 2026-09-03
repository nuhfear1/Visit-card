# Backend-ready architecture

Visit-card is currently exported as a static Next.js site and hosted on GitHub Pages. GitHub Pages cannot execute Next.js route handlers, Server Actions or server-only secrets. The launch therefore uses n8n production webhooks directly. A dedicated backend becomes the public entry point only after the commercial system has proved its value.

```text
Launch: Visit-card -> n8n -> CRM / email / webinar / reporting
Later:  Visit-card -> Backend -> n8n -> the same connected tools
```

## Frontend configuration

The launch uses the relevant n8n production webhook variables. The later backend uses:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

The API value is an origin without a trailing slash. It is public routing information, never a secret. CRM, email, OpenAI and anti-spam credentials remain inside n8n during the launch, then move behind the backend boundary where appropriate.

Delivery priority is deterministic: backend when `NEXT_PUBLIC_API_BASE_URL` exists, otherwise n8n when the matching webhook exists, otherwise pre-filled email. This permits a later backend cutover without changing the form or its payload.

## Stable routes

| Method | Route | Purpose | Frontend state |
|---|---|---|---|
| `GET` | `/health` | Service readiness | Reserved |
| `POST` | `/v1/project-conversations` | Project conversation and optional diagnostic request | Implemented |
| `POST` | `/v1/masterclass/registrations` | Masterclass registration | Reserved |
| `POST` | `/v1/events` | Strictly allowlisted first-party engagement events | Reserved |

The browser sends `Idempotency-Key` with the event ID and `X-Client-Version`. The backend must allow these headers in CORS.

## Backend responsibilities

1. Allow only the known production and preview origins.
2. Validate request shape, content type, field lengths and email format.
3. Apply rate limiting and anti-abuse controls.
4. Verify Turnstile server-side when enabled.
5. Deduplicate requests using `Idempotency-Key` and `eventId`.
6. Return a request ID without exposing internal workflow or CRM identifiers.
7. Queue downstream work so a slow CRM or n8n execution does not block the visitor.
8. Apply retention and deletion policies to personal data.
9. Keep marketing consent separate; the contact payload explicitly sets it to `false`.

## Migration options

The public API can later be a Vercel Function, Cloudflare Worker or small server. If the website moves away from GitHub Pages, the same contract can be implemented with Next.js route handlers without changing the form, its copy or the n8n workflows behind it.

The normative request and response schema lives in `docs/openapi.yaml`.
