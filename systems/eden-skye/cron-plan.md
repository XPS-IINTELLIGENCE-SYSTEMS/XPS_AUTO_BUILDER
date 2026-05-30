# Eden Skye Cron Plan

## Purpose
Use scheduled automation to keep Eden Skye organized, inspected, validated, and moving through the Auto Builder system.

## Cadence
- Every 5 minutes: heartbeat, registry check, queue check, approval-state check.
- Hourly: content pipeline review and blocked task summary.
- Daily: analytics summary and next-action report.
- Weekly: roadmap, backlog, and source-truth review.

## Five-Minute Trigger Duties
- Read systems/eden-skye registry files.
- Confirm required docs exist.
- Inspect queue files when present.
- Check approval gates when present.
- Run lightweight validation.
- Write a report artifact.
- Escalate blocked tasks to Jeremy.

## Hard Rule
Scheduled automation may inspect, validate, report, and prepare next actions. It must not deploy, change secrets, change billing, change schemas, publish products, or alter production without verified approval.
