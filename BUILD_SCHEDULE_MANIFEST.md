# BUILD_SCHEDULE_MANIFEST

## Primary scheduler pattern
Use **one primary recurring build loop** for `XPS_AUTO_BUILDER`.

### Default cadence
- every 30 minutes: bounded recursive build and repair pass
- once daily: packaging and release-readiness review
- once daily: strategic expansion review for next target-system modules

## Primary loop duties
Each recurring pass should:
- rehydrate from current repo and Drive canon
- validate the recursive engine state
- select one build objective
- invoke the correct skill subset
- publish validated artifacts
- append the ledger and next actions

## Scheduling rules
- prefer one persistent loop over scheduler sprawl
- keep one bounded objective per pass
- stop for approval on high-risk changes
- do not fabricate successful writes
- preserve continuity from the latest verified state

## Scaling rule
If the builder later manages multiple target systems, keep one master loop and treat target systems as queued profiles instead of creating uncontrolled overlapping tasks.
