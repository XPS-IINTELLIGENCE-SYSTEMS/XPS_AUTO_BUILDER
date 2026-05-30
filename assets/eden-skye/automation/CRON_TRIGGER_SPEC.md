# Cron Trigger Spec

## Purpose
Define a future approved cron trigger for Eden Skye brand-system completion checks.

## Proposed Schedule

```cron
*/5 * * * *
```

## Meaning
Run every five minutes during an explicitly approved active build window.

## Guardrails
- Cron must be disabled by default unless approved.
- Cron may only inspect or create files under `assets/eden-skye/`.
- Cron must not mutate Vercel settings, env vars, billing, deployments, Supabase, Shopify, or governance files.
- Cron must write a completion report after every run.
- Human approval is required before merge, deploy, or canonical promotion.
