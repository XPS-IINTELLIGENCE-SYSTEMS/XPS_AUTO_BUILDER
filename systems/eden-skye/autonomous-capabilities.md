# Eden Skye Autonomous Capabilities Map

This file installs the Auto Builder orchestration side of the Eden Skye autonomous launch system.

## Control Plane Relationship

- Eden intelligence repo: `Strategic-Minds/EDEN_SKYE`
- Auto Builder orchestration repo: `XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER`
- Supabase runtime project: `prhppuuwcnmfdhwsagug`
- Verified Metricool test brand ID: `6316987`

Eden defines the brand, voice, creative strategy, offer logic, public persona, and approval-safe campaign intelligence.

Auto Builder defines lanes, queues, workers, provider checks, Vercel cron triggers, Supabase telemetry, bridge receipts, blockers, and approval gates.

## Required Runtime Methods

### Provider Readiness

Route:

- `GET /api/bridge/providers/runtime-status`

Purpose:

- confirm available provider configuration without exposing secrets
- check Supabase, Metricool, Meta/Facebook, Instagram, Google Workspace, Notion, Klaviyo, Xyla, and Opus readiness when supported

Expected output:

- ready providers
- missing configuration
- blocker list
- next action

### Social Draft Queue

Route:

- `POST /api/bridge/social-media/draft`

Purpose:

- accept approved-for-draft social content
- normalize the job into draft-only mode
- prevent unsafe public posting
- queue work for the social bridge worker

Required fields:

- `brandId`
- `network`
- `text`
- `platformTarget`
- `approvalState`
- `publishState`
- `source`
- `riskNotes`

Defaults:

- `brandId`: `6316987`
- `mode`: `draft_only`
- `approval_state`: `approved_for_draft`
- `publish_state`: `not_approved`

### Social Bridge Cron

Route:

- `GET /api/cron/social-bridge`

Purpose:

- claim the next safe queued draft
- attempt Metricool draft creation when configured
- dry-run when Metricool env is missing
- log action receipt, evidence, blocker, completion, or retry

Cron rule:

- every 5 minutes as trigger only

### Supabase Telemetry

Required tables:

- `runtime_telemetry_events`
- `bridge_tasks`
- `bridge_evidence`
- `bridge_blockers`
- `bridge_connector_actions`
- `approval_queue`
- `social_media_bridge`
- `autobuilder_bridge_state`

Purpose:

- keep visible receipts for every automation attempt
- avoid silent automation
- preserve blockers and approval holds

## Automation Lanes

### 1. Intake Lane

Reads:

- Eden repo source files
- Auto Builder source files
- Google Drive launch docs
- Supabase telemetry
- Shopify state
- Metricool queue and analytics
- Xyla content source state

Writes by default:

- internal summaries
- source maps
- blocker lists
- queue candidates

### 2. Planning Lane

Creates:

- campaign packets
- content batches
- social drafts
- Shopify offer recommendations
- media production briefs
- daily priorities

### 3. Production Lane

Creates:

- hooks
- scripts
- captions
- CTAs
- image prompts
- video prompts
- avatar performance notes
- repurpose maps

### 4. Distribution Lane

Moves only approved drafts into:

- Xyla draft or approved feed
- Metricool draft schedule
- SocialHub planner draft
- Shopify CTA paths after approval

### 5. Analytics Lane

Scores:

- views
- retention
- completion
- saves
- shares
- comments
- profile visits
- follow conversion
- Shopify clicks
- lead captures

Outputs:

- Kill
- Improve
- Clone

### 6. Governance Lane

Blocks:

- public posting without approval
- paid ads without approval
- Shopify mutation without approval
- Supabase migrations without approval
- Vercel production deploys without approval
- external sends without approval
- unverified claims
- fake engagement or platform evasion

## Start-Today Installation Checks

Before live operation, verify:

1. Eden manifest exists in `Strategic-Minds/EDEN_SKYE/autonomy/eden-auto-builder-sync-manifest.json`.
2. Auto Builder sync manifest exists in `systems/eden-skye/eden-auto-builder-sync.json`.
3. Supabase project `prhppuuwcnmfdhwsagug` has required telemetry and bridge tables.
4. Runtime provider status route returns without exposing secrets.
5. Social draft route accepts a draft-only test payload.
6. Social bridge cron logs dry-run or draft creation receipt.
7. Approval queue catches any public publish, paid ad, Shopify mutation, or external send.

## Launch Sprint Method

Daily operating loop:

1. Read source truth.
2. Generate drafts.
3. Run compliance and claim checks.
4. Queue safe drafts.
5. Route approved items.
6. Capture analytics.
7. Score winners.
8. Clone winners.
9. Refill queue.

## Human Approval Required

Approval is required before:

- public social publishing
- paid ad activation
- Shopify changes
- Supabase schema/data mutation
- Vercel production deployment
- payment, price, discount, or billing changes
- external email/SMS sending
- publishing testimonials, customer faces, income claims, product specs, warranty claims, safety claims, or certification claims

## Operating Target

The current growth target is 10,000 net followers per month across Facebook, Instagram, and TikTok.

Auto Builder should treat this as a measurable operating target, not a promise.

The approved growth method is:

- high-volume platform-native content
- founder trust transfer
- Eden cinematic attention clips
- epoxy proof and transformation content
- AI Can't Do This controversy and human-skill contrast
- creator/UGC leverage
- paid amplification of proven winners
- retargeting into Shopify/free-tool paths
- daily winner scoring and cloning

Forbidden:

- fake followers
- fake likes
- fake views
- bot comments
- engagement farms
- platform evasion
