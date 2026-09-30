---
name: frontend-bug-fix
description: Use when investigating or fixing a React frontend bug, broken interaction, styling regression, route problem, import error, mock-data issue, or responsive defect in this project.
---

# Frontend Bug Fix Workflow

## Procedure

1. Read `AGENTS.md`.
2. Reproduce or locate the reported behavior.
3. Identify the owning route, page, component, hook, service, configuration, or theme token.
4. Inspect nearby callers and existing patterns before editing.
5. Form a concrete local hypothesis for the cause.
6. Make the smallest fix in the owning layer.
7. Do not change unrelated behavior or reset user-owned changes.
8. Check the relevant UI state and responsive behavior.
9. Run the narrowest available validation.
10. Run `npm run build` when feasible.

## Avoid

- Do not invent backend/API behavior.
- Do not replace a mock flow with a fake API.
- Do not solve a local component problem by changing global theme tokens unless the token is actually the cause.
- Do not introduce a new dependency for a bug that existing project code can solve.

## Report

State:
- root cause
- files changed
- fix applied
- validation result
- remaining limitation, if any
