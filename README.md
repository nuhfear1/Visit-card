# Gary WILFRED-BORILLA — Personal Brand

Experimental personal-brand website built from the Portfolio-2026 base.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion

## Development

```bash
npm install
npm run dev
```

The initial import is intentionally sanitized: legacy personal links, third-party portfolio destinations, old portraits and non-commercial font assets were removed or replaced with placeholders before publication.

## Backend-ready API

The site remains compatible with GitHub Pages while using a stable public API boundary. The frontend never needs to know whether the backend delegates work to n8n, a CRM, an email provider or another service.

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` for development or as a GitHub Actions repository variable for Pages builds. When it is not configured, the conversation form falls back to a pre-filled email so the contact path remains usable.

Architecture and API contracts are documented in `docs/backend-architecture.md` and `docs/openapi.yaml`. The role of n8n behind the backend boundary is documented in `docs/n8n-endpoints.md`.
