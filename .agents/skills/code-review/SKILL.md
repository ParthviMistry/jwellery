---
name: code-review
description: Use when reviewing frontend changes for correctness, regressions, architecture violations, accessibility issues, responsive problems, duplicate components, or unsupported backend assumptions.
---

# Frontend Code Review

Review defects and regressions before style preferences.

## Architecture

Check:
- correct route/page/component ownership
- reuse of existing components
- no duplicate route or UI systems
- correct hook/service/data boundaries
- no unnecessary dependencies
- JavaScript remains JavaScript unless explicitly requested

## UI

Check:
- semantic theme tokens
- no hardcoded client identity in reusable UI
- existing shadcn-style primitives are reused
- accessible labels for interactive controls
- keyboard behavior where relevant
- responsive behavior
- loading/empty/error/disabled states where relevant

## Multi-client

Check:
- client-specific values remain configuration-driven
- no duplicated pages for branding-only changes
- no false claim that theme selection provides tenant isolation/authentication/authorization
- no client-specific navigation unless explicitly implemented

## Backend boundary

Check:
- no invented API URLs
- no invented DTOs
- no invented database schema
- no security claims based on frontend demo behavior

## Validation

Check whether the relevant behavior was manually verified and whether `npm run build` was run.

Do not treat editor diagnostics as equivalent to build/test results.
