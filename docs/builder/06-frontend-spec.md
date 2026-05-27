# Frontend Specification

## Frontend Objective
Allow an operator to inspect current stage, queue state, approvals, integration posture, and validation evidence from one control surface.

## Required Routes
- `/` primary command surface
- `/handbook` docs preview surface mirroring GitHub Pages content

## Page Specifications
### `/`
- Components: status hero, metrics band, queue manager, approvals, integrations, validation
- Inputs: queue-item creation, queue lane updates, approval updates
- Outputs: visible queue mutations and refreshed metrics
- Empty states: queue and approvals still render headings and action entry points
- Error states: backend returns JSON errors

### `/handbook`
- Components: release blockers, production targets, doc references
- Goal: human-readable docs publishing surface for GitHub Pages

## Design System Rules
- Calm operator UI
- No card grid sprawl
- Mono headings for command feel
- Responsive layout with sticky rail on desktop
- Utility copy only

## Forms And Validation
- Queue add form requires title
- Queue and approval mutations require valid target IDs

## Accessibility Requirements
- Semantic headings
- Button labels reflect action
- Text contrast stays readable
- Inputs use accessible labels or placeholders paired with `aria-label`

## Analytics And Tracking Requirements
- Log future events for queue create, queue status change, approval change, validation refresh
- In sandbox, event tracking is documented but not wired to an external collector

## Frontend Acceptance Criteria
- Home route renders without client errors
- Queue creation works
- Status mutations work
- Validation panel refreshes from backend

