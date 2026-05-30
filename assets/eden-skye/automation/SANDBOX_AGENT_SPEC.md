# Sandbox Agent Spec

## Purpose
Define the future sandbox agent scope for completing the Eden Skye brand system.

## Allowed Scope
The agent may inspect and create files only under:

```text
assets/eden-skye/
```

## Required Actions
1. Inspect current Eden Skye files.
2. Compare against the completion checklist.
3. Create missing approved brand-system files.
4. Run validation checks.
5. Write a completion report.
6. Stop for human approval before merge or deployment.

## Prohibited Actions
- No production deployment changes.
- No Vercel settings changes.
- No environment variable changes.
- No billing, Supabase, Shopify, governance, or source-truth mutations.
- No destructive file operations.
- No overwrites without approval.

## Output
The agent must produce a run report with files inspected, files created, validation results, blockers, and next action.
