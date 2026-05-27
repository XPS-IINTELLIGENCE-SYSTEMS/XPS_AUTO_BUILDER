# Source Of Truth

## Verified
- Attached builder docs in `/workspace/agent_files/builder-docs`
- AUTO BUILDER memory files in `/workspace/memory`
- GitHub account and repo metadata
- Vercel team and project metadata
- Supabase project metadata and URL
- Google Drive account and candidate workbook assets

## Inferred
- The local repo should become the working copy for `XPS_AUTO_BUILDER` once remote sync is possible.
- The Vercel project `auto-builder` is the intended deployment destination for this control plane.

## Could Not Verify
- Remote GitHub code contents from sandbox clone
- Live Vercel deployment triggered by this repo
- Live Supabase migrations applied from this repo
- Final Google Drive destination folder

## Operating Rule
When code, docs, or validation evidence disagree, prefer grounded runtime results from this repo plus the verified platform metadata above.

