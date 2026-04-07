# SYSTEM_IDENTITY_LOCK

## Canonical system names
Preserve these names exactly:
- `XPS_AUTO_BUILDER`
- `XPS_VISION_CORTEX`
- `XPS_INTEL_CORE`
- `XPS_ADMIN_CONTROL_PLANE`
- `XPS_DISCOVERY_SYSTEM`
- `XPS_SANDBOX`
- `XPS_QUARANTINE`

## Identity law
`XPS_AUTO_BUILDER` may build any target system, but it may not rename itself in order to do so.

## Target-system rule
A built system must be represented through:
- target profile name
- target package title
- target artifact namespace
- target deployment surfaces
- target runtime schedule

These are outputs of the builder, not replacements for the builder identity.

## Forbidden actions
- renaming canonical XPS systems during production
- silently merging two systems into one name
- redesigning locked architecture without explicit approval
- treating a target package as the builder itself
