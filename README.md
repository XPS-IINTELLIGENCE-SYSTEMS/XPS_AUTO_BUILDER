# XPS AUTO BUILDER

Sandbox-first AUTO BUILDER control plane for governed system builds, platform status, queueing, approvals, validation evidence, and release handoff.

## Current status

- Local frontend and backend are implemented in this repo.
- GitHub, Vercel, Supabase, and Google Drive targets are documented with a validated snapshot taken on May 26-27, 2026.
- GitHub Pages documentation output is prepared under `docs-site/`.
- Remote clone, push, deployment, and live database writes were not completed from this sandbox.

## Local run

```bash
npm start
```

Open `http://localhost:3000`.

## Local validation

```bash
npm test
npm run validate
```

## Key surfaces

- `/` operator control plane
- `/api/health` backend health
- `/api/overview` control-plane summary
- `/api/queue` governed queue APIs
- `/api/validation/run` validation evidence snapshot
- `docs-site/` GitHub Pages-ready docs

## Production targets verified in this run

- GitHub repo target: `XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER`
- Vercel project: `auto-builder`
- Vercel production domain: `auto-builder-livid.vercel.app`
- Supabase project ref: `prhppuuwcnmfdhwsagug`
- Supabase URL: `https://prhppuuwcnmfdhwsagug.supabase.co`
- Google Drive account: `strategicmindsadvisory@gmail.com`

## Blockers

- Direct `git clone` from GitHub returned HTTP 403 in this sandbox.
- No live GitHub push, Vercel deployment trigger, or Supabase migration execution was performed.
- Google Drive write/export destination was not specified and no Drive write tool was used in this run.

