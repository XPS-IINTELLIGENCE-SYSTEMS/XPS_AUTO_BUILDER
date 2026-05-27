# Operations Playbook

## Operating Model
Jeremy or an assigned operator uses the local control plane to inspect readiness, add tasks, clear approvals, and track blockers before remote promotion.

## Startup And Runbook
1. Run `npm start`.
2. Open `http://localhost:3000`.
3. Check Overview, Queue, Approvals, and Validation.
4. Run `npm test` and `npm run validate`.

## Monitoring And Alerts
- Watch for failed local tests.
- Watch for blocked queue items.
- Watch for pending approvals before production promotion.
- In production, add Vercel and Supabase alerting.

## Support Workflow
1. Reproduce in sandbox.
2. Check `/api/health` and `/api/validation/run`.
3. Review queue and blocker state.
4. Update docs if the fix changes operations.

## Maintenance Tasks
- Refresh platform snapshot before each release
- Re-run tests after each backend or UI change
- Keep `docs-site/` aligned with repo docs

## Documentation Upkeep
- Builder docs change when scope changes
- Validation report changes after each test pass
- Blocker report changes whenever a live dependency becomes verified or blocked

## Operator Handoff
New operators need the repo, the local run commands, the platform IDs, and the blocker list.

