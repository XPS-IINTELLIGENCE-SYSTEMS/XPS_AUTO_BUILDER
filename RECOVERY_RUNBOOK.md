# RECOVERY_RUNBOOK

## Recovery sequence
1. confirm canonical system names and source-of-truth order
2. rehydrate from repo canon and connected Drive canon
3. confirm the latest runtime ledger entry
4. confirm the backlog and scheduler handoff still match
5. verify connector reality before any write attempt
6. pause final writes if destination truth is unclear
7. quarantine unsafe or conflicting artifacts
8. resume with one bounded objective only after continuity is re-established

## Mandatory recovery outputs
- verified state summary
- exact blocker
- safe next correction step
- destinations still safe to write
- next five actions
