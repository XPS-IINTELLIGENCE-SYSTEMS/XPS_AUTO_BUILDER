# Eden Vercel Preview Approval

Jeremy approved the preview-only lane for the Eden content-factory frontend.

Approved scope:
- Trigger GitHub/Vercel preview builds from this branch.
- Keep the frontend preview-only and draft-only.
- Keep protected external actions gated.

Not approved:
- Production deploys.
- Shopify writes.
- Stripe actions.
- Supabase schema changes.
- Vercel environment changes.
- External publishing.

This receipt exists to wake the preview workflow without changing production behavior.
