# Frontend Code Review Checklist

## Architecture
- Correct route/page/component ownership?
- Existing components reused?
- No duplicate route registry or UI system?
- Hooks/services/data boundaries appropriate?
- No unnecessary dependencies?

## UI
- Semantic tokens used?
- No hardcoded client identity?
- Existing shadcn-style components reused?
- Accessible labels and keyboard behavior?
- Responsive behavior?
- Loading/empty/error/disabled states where relevant?

## Multi-client
- Client-specific values remain configuration-driven?
- No duplicated pages for branding-only changes?
- No false tenant/auth/security claims?
- No unimplemented per-client navigation assumptions?

## Backend boundary
- No invented API URLs?
- No invented DTOs/database schemas?
- No fake security claims?

## Validation
- Relevant behavior checked?
- `npm run build` run when feasible?
- Skipped checks clearly reported?
