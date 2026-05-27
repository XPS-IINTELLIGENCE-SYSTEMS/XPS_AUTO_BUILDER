# Autonomous GPT Bridge

## Purpose
This bridge keeps AUTO BUILDER operational when a live system boundary is blocked, missing, or not directly callable in the current runtime.

## Bridge Rule
When a live step cannot be completed directly, the bridge converts it into one of four governed fallback paths:

1. Remote-ready release packet
2. Approval-gated export packet
3. Exact migration handoff
4. Verified post-release validation checklist

## Current Blocker Mappings

### GitHub remote sync blocker
- Primary path: direct push to `XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER`
- Bridge workaround: maintain remote-ready manifest, branch plan, commit message, and PR body inside repo until push can occur

### Vercel deployment blocker
- Primary path: deploy to project `auto-builder`
- Bridge workaround: keep `vercel.json`, project IDs, cron definitions, and post-deploy checks ready so the release step is one short action instead of a redesign

### Supabase migration blocker
- Primary path: apply migrations to `prhppuuwcnmfdhwsagug`
- Bridge workaround: ship exact SQL migration and seed files with validation notes

### Google Drive destination blocker
- Primary path: export final docs into the correct Drive folder
- Bridge workaround: hold the docs pack in repo and stop at an explicit approval gate instead of silently dropping the export

## Operator Outcome
The bridge turns blockers into smooth operator handoffs rather than dead ends.

