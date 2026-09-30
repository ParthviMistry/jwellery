# Regnor Jewellery Frontend — Agent Instructions

## Project scope

This repository is the React frontend for a white-label jewellery admin application.

Current stack:
- React 18
- Vite
- JavaScript (not TypeScript)
- Tailwind CSS
- shadcn-style UI components built with Radix UI
- React Router DOM
- Lucide React
- Recharts
- Local mock data

The current workspace is frontend-only. There is no ASP.NET backend, database, production authentication, authorization, or real API contract in this repository.

Future/reference backend:
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server

Do not treat future/reference documentation as implemented functionality.

## Core rules

1. Read the relevant existing code before editing.
2. Search for an existing component, hook, service, route, mock-data structure, or utility before creating a new one.
3. Use JavaScript. Do not convert files to TypeScript unless explicitly requested.
4. Use the existing `@` alias for imports.
5. Reuse the existing shadcn-style/Radix UI components.
6. Do not introduce another UI framework or dependency without explicit approval.
7. Use semantic theme tokens instead of hardcoded client colors.
8. Keep client-specific branding configuration-driven.
9. Do not hardcode client names, logos, API URLs, credentials, or environment-specific values into shared components.
10. Keep changes scoped to the requested task and preserve unrelated user changes.
11. Do not invent API endpoints, DTOs, database tables, authentication flows, or authorization rules.
12. Do not claim mock/demo behavior is production security or persistent backend behavior.

## Architecture ownership

- `src/routes/` — route registry.
- `src/config/navigation.js` — shared navigation labels and navigation structure.
- `src/config/app.js` — global application metadata/branding defaults.
- `src/config/clientThemes.js` — client theme definitions and presentation configuration.
- `src/config/clientOnboarding.js` — onboarding checklist/configuration.
- `src/context/` — cross-page client/theme state.
- `src/components/ui/` — low-level reusable UI primitives.
- `src/components/common/` — application-specific reusable compositions.
- `src/components/layout/` — application shell, sidebar, and topbar.
- `src/pages/` — route-level screens and business-area pages.
- `src/hooks/` — reusable view state and derived data.
- `src/services/` — data access/business operations; currently mock/local where implemented.
- `src/data/` — mock records and fixtures.
- `src/lib/` — shared utilities and theme application.
- `src/index.css` — global CSS and default semantic tokens.

Do not create a second route registry or a second shared UI system.

## White-label / multi-client rules

The current client theme system is presentation-focused.

Current implementation:
- `src/config/clientThemes.js` contains theme definitions.
- `src/context/ClientThemeContext.jsx` stores the selected theme.
- `src/lib/theme.js` applies theme CSS variables.
- `src/config/navigation.js` is shared across clients.
- Client-specific navigation, permissions, tenant isolation, and data security are NOT implemented.
- The theme selector is not currently an exposed production client-resolution mechanism.

Therefore:
- Add client branding through configuration/theme data.
- Do not duplicate pages for a new client when only presentation changes.
- Do not claim that theme selection provides tenant isolation or authorization.
- Do not implement per-client navigation unless explicitly requested.

## UI rules

- Prefer existing `src/components/ui/` primitives.
- Build application-specific compositions in `src/components/common/`.
- Use Tailwind for layout and spacing.
- Use semantic tokens such as `bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`, and `text-muted-foreground`.
- Use Lucide React for icons unless an existing project icon should be reused.
- Icon-only controls must have an accessible name.
- Preserve responsive behavior at mobile, tablet, and desktop widths.
- Handle relevant loading, empty, validation, error, disabled, and long-content states.

## Feature workflow

For substantial frontend implementation work, use:

`.agents/skills/frontend-feature-workflow/SKILL.md`

Other skills are available under `.agents/skills/` when their description matches the task.

## Validation

Available scripts:
- `npm run dev`
- `npm run build`
- `npm run preview`

There is currently no configured automated test or lint script.

After code changes:
1. Run the narrowest relevant check available.
2. Run `npm run build` when feasible.
3. For UI changes, inspect the affected screen and responsive states when a browser is available.
4. Never report tests/lint as passing if no such command exists or was not run.
5. Clearly report skipped or blocked validation.

## Git safety

- Preserve unrelated user changes.
- Do not reset, checkout, clean, or overwrite user work unless explicitly requested.
- Keep commits focused.
- Use feature/bugfix branches according to the team's Git workflow.

## Reference documentation

Project architecture:
- `.ai/architecture/frontend.md`
- `.ai/architecture/multi-client.md`

UI:
- `.ai/ui/shadcn.md`
- `.ai/ui/design-system.md`
- `.ai/ui/responsive.md`

Feature references:
- `.ai/features/admin-panel.md`
- `.ai/features/authentication.md`
- `.ai/features/client-portal.md`

Future backend/database references:
- `.ai/architecture/backend.md`
- `.ai/architecture/database.md`
- `.ai/backend/`
- `.ai/database/`

Human documentation:
- `docs/onboarding/client-onboarding.md`
- `docs/deployment/client-deployment.md`
- `docs/roadmap/implementation-roadmap.md`
