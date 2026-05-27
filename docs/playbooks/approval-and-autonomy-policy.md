# Approval And Autonomy Policy

## Autonomy Allowed
- Queue creation
- Queue status movement in sandbox
- Validation report generation
- Docs generation and updates in repo

## Approval Required
- Production deployment
- Live GitHub push
- Live Supabase migration execution
- Google Drive export destination selection
- Any workflow that introduces outbound publishing or sensitive credentials

## Escalation Triggers
- Sandbox/runtime mismatch
- Failed tests
- Remote sync errors
- Missing secret or destination

## Recovery Rule
If a live dependency cannot be verified, keep the item blocked and keep the UI plus docs aligned with that state.

