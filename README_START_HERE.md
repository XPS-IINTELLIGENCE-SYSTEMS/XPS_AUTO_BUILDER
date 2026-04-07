# XPS_AUTO_BUILDER — START HERE

Read in this order:
1. `SYSTEM_IDENTITY_LOCK.md`
2. `SOURCE_OF_TRUTH_MANIFEST.md`
3. `COMPONENT_REGISTRY.md`
4. `UNIVERSAL_BUILD_SYSTEM_SPEC.md`
5. `SKILL_ORCHESTRATION_MANIFEST.md`
6. `RECURSIVE_BUILD_ENGINE.md`
7. `BUILD_SCHEDULE_MANIFEST.md`
8. `SCHEDULER_GPT_HANDOFF.md`
9. `AUTO_BUILDER_PROMPT_PACK.md`
10. `BUILD_BACKLOG.md`
11. `RUNTIME_LEDGER.md`
12. `RECOVERY_RUNBOOK.md`
13. `RELEASE_RUNBOOK.md`

## Current objective
Turn `XPS_AUTO_BUILDER` into a bounded universal builder that can:
- design and assemble any target system
- invoke all visible XPS skills as modular operators
- run as one recurring recursive loop under GPT Scheduler or any GPT-compatible operating surface
- preserve canonical XPS names while producing target-specific packs

## Current implementation surface
- Primary write surface: GitHub repo
- Canon/input context: connected Drive folder and accessible XPS artifacts
- Recurrence surface: GPT Scheduler / automations
