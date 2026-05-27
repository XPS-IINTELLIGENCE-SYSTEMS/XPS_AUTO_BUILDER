# GitHub, Vercel, Supabase, And Drive Handoff

## GitHub
- Intended repo: `XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER`
- Current blocker: sandbox cannot clone or push to repo over HTTPS
- Handoff action: move this repo contents into the target repo from a network-permitted environment

## Vercel
- Intended project: `auto-builder`
- Verified domains include `auto-builder-livid.vercel.app`
- Handoff action: connect this repo to the project and trigger deployment after secrets are set

## Supabase
- Intended project ref: `prhppuuwcnmfdhwsagug`
- Handoff action: apply `supabase/migrations/202605270001_init_auto_builder.sql`, then seed if desired

## Google Drive
- Connected account: `strategicmindsadvisory@gmail.com`
- Handoff action: confirm folder ID or native Docs destination, then export docs pack

