# Release Bridge Packet

## Repo Target And Branch Plan
- Repository: `XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER`
- Base branch: `main`
- Recommended release branch: `codex/auto-builder-control-plane`
- Local commit prepared: `Initialize AUTO BUILDER control plane`

## Deployment Order
1. Push repo contents to GitHub
2. Publish `docs-site/` through GitHub Pages workflow
3. Connect repo to Vercel project `auto-builder`
4. Apply Supabase migration `202605270001_init_auto_builder.sql`
5. Export docs pack to confirmed Google Drive folder
6. Run production validation

## Smooth Workarounds
- If repo push is blocked: use GitHub connector branch plus file writes
- If deploy is blocked: rely on verified project metadata and keep validation on hold
- If Drive export is blocked: keep docs pack in repo and record the missing destination as approval-gated

