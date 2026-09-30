---
name: frontend-feature-workflow
description: Use when adding, changing, refactoring, or debugging a frontend page, route, navigation item, reusable UI component, mock-data CRUD flow, responsive UI, or client theme in this React and Vite project.
---

# Frontend Feature Workflow

## Purpose

Provide the standard implementation workflow for frontend changes in this repository.

The project is JavaScript/Vite with Tailwind CSS, shadcn-style Radix UI wrappers, React Router, client-theme configuration, and local mock data.

The backend is not present. Do not invent backend behavior.

## When to use

Use this skill when:
- creating a new page or feature
- modifying an existing page
- adding or changing a route
- adding navigation
- creating or refactoring reusable UI
- changing mock CRUD behavior
- changing responsive behavior
- changing client branding/theme behavior
- fixing a frontend feature-level defect

## Before editing

1. Read `AGENTS.md`.
2. Identify the owning page, route, component, hook, service, config, or data file.
3. Search for existing implementations before creating anything new.
4. Check:
   - `src/components/ui/`
   - `src/components/common/`
   - `src/components/layout/`
   - `src/hooks/`
   - `src/services/`
   - `src/data/`
   - `src/config/`
   - `src/routes/`
5. Inspect nearby callers/usages so existing APIs are preserved.
6. Identify the smallest relevant validation check.

## Ownership rules

- Route registration → `src/routes/`
- Shared navigation → `src/config/navigation.js`
- Low-level reusable primitives → `src/components/ui/`
- App-specific reusable compositions → `src/components/common/`
- Layout/shell → `src/components/layout/`
- Route-level screens → `src/pages/`
- Reusable view state/derived state → `src/hooks/`
- Data access/business operations → `src/services/`
- Local fixtures/mock records → `src/data/`
- Client presentation configuration → `src/config/clientThemes.js`
- Global application metadata → `src/config/app.js`

Do not create a second implementation when an existing component already satisfies the requirement.

## UI implementation

1. Prefer existing shadcn-style components.
2. Use semantic Tailwind/theme tokens.
3. Reuse existing icon and interaction patterns.
4. Keep components focused and reusable.
5. Avoid unnecessary state and prop complexity.
6. Do not introduce another UI library without explicit approval.
7. Do not add a dependency when existing project code can solve the problem.
8. Keep JavaScript unless TypeScript is explicitly requested.

## Client/theme implementation

When changing branding:
- keep client-specific values in configuration
- use `src/config/clientThemes.js`
- use semantic tokens
- do not hardcode a client name into reusable UI
- do not duplicate pages for presentation-only differences
- do not claim theme switching provides tenant isolation, authentication, or authorization

Current navigation is shared. Do not create client-specific navigation unless it is explicitly requested.

## Mock-data implementation

The current frontend uses local mock data.

When working on mock CRUD:
- preserve the existing data shape
- follow existing service/hook patterns
- handle create/read/update/delete states where applicable
- do not invent an API URL
- do not invent backend DTOs or database schemas
- do not replace mock behavior with network calls unless a real backend contract is provided

## Accessibility and responsive behavior

For user-facing changes, consider:
- keyboard interaction
- accessible labels
- focus states
- disabled states
- loading states
- empty states
- validation/error states
- long text
- narrow/mobile layouts
- wide desktop layouts

Icon-only controls need an accessible name.

## Validation

Use the narrowest relevant check first.

Then run:

```bash
npm run build
```

when feasible.

This repository currently has no configured automated test or lint script.

Do not claim automated tests passed when no test command was run.

## Completion report

When finished, report:
- files changed
- behavior implemented
- validation performed
- anything skipped or blocked
- any backend/API dependency that remains unimplemented
