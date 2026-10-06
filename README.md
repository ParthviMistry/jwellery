# Regnor Jewellery Admin

A React + Vite frontend for a white-label jewellery administration platform.

The repository currently uses local mock data. A production ASP.NET backend, database, authentication, and authorization are not included in this workspace.

## Tech stack

- React 18
- Vite
- JavaScript
- Tailwind CSS
- shadcn-style UI components
- Radix UI
- React Router DOM
- Lucide React
- Recharts

## Project structure

```text
.
├── AGENTS.md
├── .agents/
│   └── skills/
├── .ai/
│   ├── architecture/
│   ├── features/
│   ├── ui/
│   └── workflows/
├── docs/
├── public/
└── src/
    ├── components/
    │   ├── common/
    │   ├── layout/
    │   └── ui/
    ├── config/
    ├── context/
    ├── data/
    ├── hooks/
    ├── lib/
    ├── pages/
    ├── routes/
    └── services/
```

## Architecture

The main frontend ownership model is:

```text
config/context
      ↓
routes/navigation
      ↓
pages
      ↓
components/hooks/services
      ↓
mock data
```

See `.ai/architecture/frontend.md` for detailed ownership rules.

## White-label themes

Client presentation is configured in:

```text
src/config/clientThemes.js
```

Theme state is handled by:

```text
src/context/ClientThemeContext.jsx
```

Theme CSS variables are applied through:

```text
src/lib/theme.js
```

This is currently a presentation/theme mechanism. It does not provide tenant isolation, authentication, authorization, or client-specific navigation.

See:

```text
.ai/architecture/multi-client.md
docs/onboarding/client-onboarding.md
```

## AI agent instructions

The repository is designed to work across multiple coding agents.

Universal project rules:

```text
AGENTS.md
```

Portable task skills:

```text
.agents/skills/
```

Project knowledge:

```text
.ai/
```

Human/project documentation:

```text
docs/
```

The `.agents/skills/` location is intentionally shared rather than creating separate copies for each AI tool.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

There is currently no automated test or lint script.

## Import alias

The project uses `@` for `src`.

```js
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

The alias is defined in `jsconfig.json` and `vite.config.js`.

## Adding UI

Before creating a new UI component:

1. Check `src/components/ui/`.
2. Check `src/components/common/`.
3. Search for an existing implementation.
4. Reuse the existing shadcn-style/Radix primitives.
5. Use semantic theme tokens.
6. Avoid adding another UI framework.

## Environment variables

Use Vite environment variables for environment-specific configuration.

Example:

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://localhost:5284
```

The frontend API client uses `VITE_API_BASE_URL`; during local development, Vite proxies requests from `/api` to `VITE_API_PROXY_TARGET`. The backend HTTP launch profile listens on `http://localhost:5284`; the HTTPS profile listens on `https://localhost:7242`. Change the proxy target to the profile you are running, then restart Vite.

Do not commit secrets.

Recommended local-only environment files:

```text
.env
.env.local
.env.*.local
```

## Git workflow

Use focused feature/bugfix branches.

Example:

```bash
git checkout -b feature/product-management
git status
git add .
git commit -m "Add product management UI"
git push origin feature/product-management
```

Create a Pull Request when the work is ready for review.

## Documentation

- Architecture → `.ai/architecture/`
- UI rules → `.ai/ui/`
- Feature scope → `.ai/features/`
- Validation/workflows → `.ai/workflows/`
- Client onboarding → `docs/onboarding/`
- Deployment → `docs/deployment/`
- Roadmap → `docs/roadmap/`
