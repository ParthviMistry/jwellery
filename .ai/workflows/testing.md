# Frontend Validation

The current `package.json` provides:
- `npm run dev`
- `npm run build`
- `npm run preview`

There is currently no automated test or lint script.

## UI changes

When a browser is available:
- verify the affected screen
- verify the relevant interaction
- check narrow and wide layouts
- check loading/empty/error/validation states when applicable

## Mock CRUD changes

Verify applicable:
- create
- list/read
- edit
- delete
- search/filter
- empty state

## Reporting

Do not claim automated tests or lint passed if no such command exists or was not run.

Distinguish:
- editor diagnostics
- manual browser verification
- build result
- automated test result
