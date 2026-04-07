# SKILL_ORCHESTRATION_MANIFEST

## Purpose
Map all visible XPS skills into one usable operating swarm for `XPS_AUTO_BUILDER`.

## Core orchestration path
- `xps-universal-orchestrator` — entrypoint for workbook, Drive, and project-folder driven work
- `xps-auto-builder` — self-building canon and artifact generation
- `xps-agent-factory` — prompt swarm and scheduler compiler generation
- `xps-scheduler-fabric` — connector reality, routing, touchdown, and recurring loop safety
- `xps-integration-fabric` — connected-system routing across app surfaces
- `xps-intel-core-autopilot` — persistent operational control-plane logic

## Discovery and validation layers
- `xps-new-business-discovery`
- `xps-future-operator-detection`
- `xps-validation-scoring`
- `xps-hubspot-safe-write`
- `xps-playwright-agent`
- `xps-epoxy-agent`

## Strategic reasoning layers
- `xps-prediction-agent`
- `xps-simulation-agent`

## Meta-build layer
- `skill-creator` — create, improve, package, and maintain skill artifacts when the builder must extend the skill set itself

## Invocation law
For each serious build pass:
1. start with `xps-auto-builder` and `xps-universal-orchestrator`
2. invoke `xps-scheduler-fabric` when scheduler, routing, or connector truth matters
3. invoke `xps-agent-factory` when prompts, roles, or scheduler compilation need refresh
4. invoke target-specific skills only when the operating mode requires them
5. invoke `skill-creator` when a missing skill or a broken skill definition becomes the blocker

## Recursion law
The builder does **not** invoke every skill blindly every pass.
It uses all visible skills as an available swarm and selects the minimum sufficient subset for the current step.
That keeps recursion bounded, explainable, and recoverable.
