# Environment And Secrets Contract

## Environment Inventory
- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID`
- `GITHUB_REPOSITORY`
- `GOOGLE_DRIVE_EXPORT_FOLDER_ID`

## Usage Map
- `PORT`: local server port
- `SUPABASE_*`: production persistence
- `VERCEL_*`: deployment binding
- `GITHUB_REPOSITORY`: release workflows and docs references
- `GOOGLE_DRIVE_EXPORT_FOLDER_ID`: export destination for docs packets

## Required Vs Optional
- Required for local sandbox: `PORT` only
- Required for live production: all remaining values

## Local Sandbox Defaults
- JSON file persistence replaces Supabase
- Docs remain local and GitHub Pages-ready
- No live deployment secrets are required

## Secret Ownership
- Jeremy or designated platform owner for GitHub, Vercel, Supabase, and Drive secrets

## Rotation And Revocation Rules
- Revoke tokens immediately after suspected exposure
- Rotate service-role keys before enabling live writes from an agent

## Missing Secret Behavior
- Keep system in sandbox mode
- Surface blocker in UI, docs, and release report

