# RECURSIVE_BUILD_ENGINE

## Objective
Run `XPS_AUTO_BUILDER` as one bounded recursive loop that can keep building, repairing, and extending a target system without losing continuity.

## Loop contract
Each serious pass must do the following in order:
1. rehydrate from repo, Drive canon, runtime notes, and latest backlog
2. audit connector reality and approved write surfaces
3. classify state as verified, inferred, missing, blocked, or quarantined
4. choose exactly one operating mode
5. select exactly one primary artifact or blocker to address
6. invoke the minimum sufficient skill subset
7. publish only to verified destinations
8. re-read the destination when possible
9. append ledger, blockers, and next five actions
10. stop cleanly and hand off to the next scheduled pass

## Allowed recursive outputs
- next artifact to build
- next prompt to refresh
- next schedule adjustment
- next blocker correction
- next validation sweep
- next target-system module to assemble

## Forbidden recursive behavior
- running endless unsupervised mutation in one pass
- invoking every skill without routing discipline
- changing canonical names to match a target system
- claiming success without destination verification
- deleting canon because it appears redundant

## Stop conditions
Stop the current pass when:
- the primary artifact is completed
- a blocker requires approval
- destination access is not verified
- a rename or schema redesign is implied
- the pass would expand beyond one bounded objective
