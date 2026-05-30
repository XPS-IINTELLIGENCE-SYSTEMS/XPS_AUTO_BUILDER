# Completion Acceptance Tests

## Purpose
Define pass/fail tests for the Eden Skye brand-system completion process.

## Required Tests

1. Required source folders exist under `assets/eden-skye/`.
2. Required markdown files are present and non-empty.
3. Required SVG files are present and parseable.
4. Approved color tokens are used consistently.
5. Template dimensions match their intended platform formats.
6. No files outside `assets/eden-skye/` are changed by the brand-system agent.
7. No deployment, billing, environment, Supabase, Shopify, or governance files are changed.
8. A completion report is generated after each run.

## Pass Condition
All required files exist, validation checks pass, and no out-of-scope changes are detected.

## Fail Condition
Any missing required file, invalid asset, out-of-scope mutation, or unapproved overwrite fails the run.
