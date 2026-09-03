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

## Automation endpoints

The static site can send structured project conversations to n8n without embedding private credentials in the browser. Copy `.env.example` to `.env.local` for development, or configure the matching GitHub Actions repository variables for Pages builds.

When `NEXT_PUBLIC_PROJECT_CONVERSATION_ENDPOINT` is not configured, the conversation form falls back to a pre-filled email so the contact path remains usable.

The payload contracts and the expected n8n responses are documented in `docs/n8n-endpoints.md`.
