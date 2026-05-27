# Data Model And Schema

## Entity List
- `build_runs`
- `queue_items`
- `approvals`
- `integration_snapshots`
- `validation_reports`

## Field Definitions
- `build_runs`: stage, status, timestamps
- `queue_items`: title, owner, lane, priority, platform, approval state, evidence, next action
- `approvals`: subject, status, severity, rule
- `integration_snapshots`: provider, status, detail
- `validation_reports`: status and JSON payload

## Relationships
- `queue_items` belongs to `build_runs`
- `approvals` belongs to `build_runs`

## State And Status Rules
- Queue lanes: `ready`, `awaiting-approval`, `blocked`, `done`
- Approval states: `pending`, `approved`, `rejected`

## Access Rules
- Service-role-only policies in the current migration draft

## Migration Rules
- Create parent tables before child tables
- Enable RLS after table creation
- Add policies only after RLS is enabled

## Sample Records
- Seed records in `supabase/seed.sql`
- Sandbox mirrors in `storage/*.json`

## Schema Acceptance Criteria
- Migration parses cleanly
- Seed data reflects initial operator state
- Tables cover queue, approval, integration, and validation needs

