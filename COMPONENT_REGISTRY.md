# COMPONENT_REGISTRY

## Core builder components

### builder-core
Role: target-system planning, artifact sequencing, mode selection.
Writes: specs, prompts, manifests, backlog, ledger notes.

### skill-router
Role: chooses which visible skill or skill set to invoke for the current pass.
Writes: routing notes, invoked-skill summary.

### recursive-build-engine
Role: runs the bounded rehydrate -> validate -> build -> verify -> log cycle.
Writes: next actions, next five queries, recursion notes.

### connector-reality-auditor
Role: classifies read/write reality for repo, Drive, scheduler, and connected apps.
Writes: verified vs blocked surface matrix.

### target-profile-manager
Role: turns a user request into a portable target-system profile.
Writes: target package spec, target prompts, target schedule.

### repo-publisher
Role: publishes validated artifacts to the writable repo surface.
Writes: repo files and release notes.

### drive-mirror-controller
Role: mirrors or maps canon artifacts to Drive when folder placement is verified.
Writes: mirror notes and placement map.

### scheduler-controller
Role: produces GPT Scheduler handoff docs and recurring loop prompts.
Writes: schedule manifest, handoff prompt, cadence notes.

### validation-gate
Role: blocks unsafe promotion, drift, duplicate canon, rename risk, and destructive edits.
Writes: blockers, quarantine routing, approval requirements.

### release-controller
Role: packages validated artifacts into a release-ready operating pack.
Writes: release notes, package summary, rollout guidance.

## Shared surfaces
- repo root canon
- connected Drive canon
- scheduler task prompt
- runtime ledger
- quarantine lane
