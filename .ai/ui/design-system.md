# Design System Rules

## Token usage

Prefer semantic tokens:
- `bg-background`
- `text-foreground`
- `bg-card`
- `text-card-foreground`
- `border-border`
- `bg-primary`
- `text-primary-foreground`
- `bg-secondary`
- `text-muted-foreground`
- `text-destructive`

Do not hardcode client-specific colors in reusable components.

## Theme ownership

- Global defaults → `src/index.css`
- Client presentation values → `src/config/clientThemes.js`
- Theme application → `src/lib/theme.js`

When a client needs different colors, update the client configuration rather than styling a shared component for that client.

## Branding

Brand names, logo paths, typography choices, and other client identity values should come from configuration or approved brand assets.

Do not embed client identity in generic components.

## Typography and spacing

Reuse existing typography, radius, spacing, and shadow conventions.

Avoid introducing one-off tokens unless they solve a reusable requirement.

## Icons

Use Lucide React and existing icon-button patterns.

Icon-only controls need an accessible name and, where the action is not obvious, a tooltip.
