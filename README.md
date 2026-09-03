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

## Progressive delivery: n8n first, backend later

The launch uses n8n production webhooks directly. This makes it possible to validate the complete acquisition, webinar and sales system before investing in a dedicated backend.

Set the relevant `NEXT_PUBLIC_N8N_*_WEBHOOK_URL` values in `.env.local` or as GitHub Actions repository variables. When the project conversation webhook is absent, the form falls back to a pre-filled email.

Later, setting `NEXT_PUBLIC_API_BASE_URL` moves public ingestion to the backend. The backend then delegates orchestration to n8n while the frontend payload and visitor experience remain unchanged. When both are configured, the backend takes priority.

The complete launch automation is documented in `docs/n8n-launch-system.md`. Future backend architecture and API contracts remain documented in `docs/backend-architecture.md` and `docs/openapi.yaml`.
