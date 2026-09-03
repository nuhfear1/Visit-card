# Backend-ready architecture

Visit-card is currently exported as a static Next.js site and hosted on GitHub Pages. GitHub Pages cannot execute Next.js route handlers, Server Actions or server-only secrets. The frontend therefore talks to one stable public API origin, while the implementation behind that origin can evolve independently.

```text
Visit-card (GitHub Pages)
        -> Public API / gateway
            -> n8n orchestration
            -> CRM
            -> transactional email
            -> analytics and reporting
```

## Frontend configuration

Only one public value is required:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

The value is an origin without a trailing slash. It is public routing information, never a secret. CRM, n8n, email, OpenAI and anti-spam credentials belong in the backend environment.

When the variable is absent, the current project conversation form opens a pre-filled email. The site remains usable before the backend is deployed and during a backend outage investigation.

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

The public API can initially be a Vercel Function, Cloudflare Worker or small server. If the website later moves away from GitHub Pages, the same contract can be implemented with Next.js route handlers without changing the form or its copy.

The normative request and response schema lives in `docs/openapi.yaml`.
