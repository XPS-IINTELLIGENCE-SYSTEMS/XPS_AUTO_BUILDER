# Validation Checklist

## Documentation Validation
- Builder docs exist
- Validation report exists
- Playbook and blocker report exist

## Source Validation
- GitHub repo target confirmed
- Vercel project confirmed
- Supabase project confirmed
- Google Drive account confirmed

## Frontend Validation
- `/` route renders
- Queue form works
- Approval actions work
- Responsive layout remains readable

## Backend Validation
- Health route returns 200
- Overview route exposes grounded metadata
- Queue create and update work
- Approval update works
- Validation route returns blocker list

## Agent And Workflow Validation
- Sandbox-first release rule is documented
- Approvals are explicit
- Cron routes exist
- GitHub Actions files exist

## Integration Validation
- GitHub, Vercel, Supabase, and Drive targets are grounded
- Live writes remain blocked or unexecuted unless explicitly verified

## End-To-End Validation
- Browser loads frontend
- Frontend calls backend successfully
- Backend persists sandbox changes

## Blocker Rules
- No release recommendation if remote sync, deployment, or production persistence is falsely implied

## Validation Signoff
- Local runtime passes
- Automated tests pass
- Blocker report remains current

