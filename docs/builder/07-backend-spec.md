# Backend Specification

## Backend Objective
Serve the operational frontend and expose governed APIs for queue, approvals, health, validation, and scheduled job posture.

## Service Boundaries
- `server.mjs`: local process entry
- `src/server/app.mjs`: route handling
- `src/lib/store.mjs`: sandbox persistence and validation snapshot assembly
- `supabase/`: production-intent schema and seed layer

## API And Action Contracts
- `GET /api/health`: service readiness
- `GET /api/overview`: source-truth snapshot with metrics
- `GET /api/queue`: queue list
- `POST /api/queue`: create queue item
- `POST /api/queue/:id`: change lane
- `GET /api/approvals`: approval list
- `POST /api/approvals/:id`: change approval state
- `GET /api/validation/run`: evidence snapshot
- `GET /api/jobs/daily-sync`: scheduled sync stub
- `GET /api/jobs/queue-sweep`: scheduled sweep stub

## Auth And Access Rules
- Local sandbox mode is open for operator testing
- Production target should add Supabase-backed auth or Vercel-protected access before public release

## Storage And File Rules
- Sandbox uses JSON files in `storage/`
- Production target uses Supabase tables in `supabase/migrations/`
- Docs site is static and publishable to GitHub Pages

## Background Jobs And Workflows
- Vercel cron plan for `daily-sync` and `queue-sweep`
- GitHub Actions for CI and Pages deploy

## Logging And Observability
- Local console logs only in sandbox
- Validation report JSON and markdown act as evidence artifacts
- Production should add Vercel logs, Supabase logs, and structured event capture

## Backend Acceptance Criteria
- Health endpoint returns `ok: true`
- Queue create and update work
- Approval update works
- Validation endpoint exposes blockers and evidence

