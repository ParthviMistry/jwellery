---
name: responsive-ui
description: Use when creating or modifying user-facing layouts, forms, tables, dialogs, navigation, cards, or controls that must work across mobile, tablet, and desktop widths.
---

# Responsive UI Workflow

## Rules

- Build mobile-first with the existing Tailwind breakpoints.
- Preserve the existing desktop layout unless the request requires a redesign.
- Use `sm`, `md`, `lg`, and `xl` consistently with nearby code.
- Avoid accidental page-wide horizontal scrolling.
- Let headings and labels wrap instead of overflowing.
- Stack form fields and actions at narrow widths where appropriate.
- Preserve the existing mobile Sheet/sidebar behavior.
- Keep icon buttons stable and accessible.

## Data tables

For wide tables:
- use the existing table overflow pattern
- or use a deliberate responsive layout
- do not introduce uncontrolled page-wide horizontal overflow

## Validation

Check:
- narrow mobile width
- tablet width
- desktop width
- long labels/text
- empty/loading/error states
- dialogs/popovers/dropdowns near viewport edges
