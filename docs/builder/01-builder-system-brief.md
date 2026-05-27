# Builder System Brief

## System Name
XPS AUTO BUILDER Control Plane

## System Type
Production-intent internal tool and operating system, implemented in sandbox-first local mode.

## Business Goal
Give the user a governed command surface for building, validating, releasing, and documenting autonomous business systems while keeping GitHub, Vercel, Supabase, and Google Drive aligned.

## Problem Solved
The current workspace contains source material and memory, but not a live control plane repo. This build restores that missing operational surface and pairs it with backend contracts, validation logic, and release handoff docs.

## Primary Users
- Jeremy as system owner and operator
- AUTO BUILDER as orchestration agent

## Secondary Users
- Technical operators handling release, docs, and validation
- Future collaborators reviewing queue, approvals, and blockers

## In Scope
- Frontend operator dashboard
- Backend API for health, overview, queue, approvals, and validation
- Supabase schema and seed files
- GitHub Actions workflows
- GitHub Pages documentation surface
- Vercel project configuration
- Builder docs, playbooks, validation report, and blocker report

## Out of Scope
- Live GitHub push from this sandbox
- Live Vercel deployment from this sandbox
- Live Supabase migration execution from this sandbox
- Direct Google Drive artifact publishing without a confirmed destination
- Direct Xyla execution

## End State
The repo can be run locally, tested end to end in sandbox, and handed off cleanly for remote sync into the verified GitHub/Vercel/Supabase targets.

## Success Criteria
- Frontend loads locally and reflects backend state.
- Backend endpoints pass automated tests.
- Production targets are documented with grounded IDs and URLs.
- Release blockers are explicit.
- GitHub Pages docs surface is ready for publishing.

## Delivery Standard
Production-grade docs and operational scaffolding with honest sandbox-first validation.

