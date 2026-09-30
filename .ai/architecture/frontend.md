# Frontend Architecture

## Current scope

This repository is a frontend-only React application for a white-label jewellery admin platform.

Current stack:
- React 18
- Vite
- JavaScript
- Tailwind CSS
- shadcn-style components using Radix UI
- React Router DOM
- Lucide React
- Recharts
- local mock data

No backend or database is included in this workspace.

## Folder ownership

### `src/config/`
Configuration and application metadata:
- `app.js` — global application metadata and default branding
- `clientThemes.js` — client presentation/theme definitions
- `clientOnboarding.js` — onboarding checklist/configuration
- `navigation.js` — shared navigation and page titles

### `src/context/`
Cross-page state, currently including selected client theme state.

### `src/routes/`
The route registry. Do not create a second route registry.

### `src/pages/`
Route-level screens grouped by business area.

### `src/components/layout/`
Shared application shell:
- admin layout
- sidebar
- topbar

### `src/components/ui/`
Low-level reusable shadcn-style/Radix primitives.

### `src/components/common/`
Application-specific reusable compositions built from UI primitives.

### `src/hooks/`
Reusable view state and derived data.

### `src/services/`
Data access/business operations. Current implementations are local/mock where applicable.

### `src/data/`
Mock records and fixtures.

### `src/lib/`
Shared utilities and theme application logic.

### `src/index.css`
Global styles and default semantic tokens.

## Change ownership

Use the smallest appropriate layer.

- New route → `src/routes/`
- Navigation → `src/config/navigation.js`
- Reusable primitive → `src/components/ui/`
- Shared application composition → `src/components/common/`
- Page-specific UI → owning `src/pages/` module
- Reusable view state → `src/hooks/`
- Data operations → `src/services/`
- Mock records → `src/data/`
- Client presentation → `src/config/clientThemes.js`
- Global application metadata → `src/config/app.js`

## General rules

- Search before creating.
- Reuse before duplicating.
- Keep client branding configuration-driven.
- Use semantic theme tokens.
- Do not invent backend contracts.
- Keep changes scoped.
- Preserve unrelated user changes.
