# Vercel Workflow Spec

## Purpose
Define the future Vercel workflow design for completing the Eden Skye brand system.

## Scope
The workflow may inspect and create files only under `assets/eden-skye/`.

## Trigger Modes
- Manual trigger for controlled execution.
- Cron trigger during approved active build windows.

## Runtime Flow
1. Checkout repository.
2. Inspect `assets/eden-skye/`.
3. Compare current files against the completion checklist.
4. Create only missing approved brand-system files.
5. Run validation checks.
6. Write a completion report.
7. Stop for human approval before merge, deploy, or promotion.

## Guardrails
- Do not alter production deployment configuration.
- Do not modify Vercel project settings.
- Do not change environment variables.
- Do not touch billing, Supabase, Shopify, governance, or source-truth files.
- Prefer branch or pull-request execution for implementation.
