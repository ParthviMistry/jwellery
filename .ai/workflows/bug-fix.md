# Frontend Bug-Fix Workflow

1. Reproduce or locate the reported behavior.
2. Identify the owning route, page, component, hook, service, data source, configuration, or theme token.
3. Inspect nearby callers and existing patterns.
4. Form a concrete local hypothesis for the cause.
5. Fix the cause in the owning layer.
6. Preserve unrelated user changes.
7. Avoid changing global tokens or unrelated modules unless they are actually the cause.
8. Run the narrowest relevant validation.
9. Run `npm run build` when feasible.
10. Report the cause, fix, and validation result accurately.
