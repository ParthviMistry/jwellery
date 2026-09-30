---
name: shadcn-ui
description: Use when creating, modifying, or composing UI with the project's shadcn-style Radix components, including buttons, dialogs, dropdowns, forms, inputs, tables, tooltips, popovers, menus, and other reusable UI primitives.
---

# shadcn-style UI Workflow

## Rules

1. Inspect `src/components/ui/` before creating a new primitive.
2. Inspect `src/components/common/` before creating an application-specific composition.
3. Reuse existing components whenever possible.
4. Use the project's existing Radix/shadcn-style implementation.
5. Use `cn()` from `@/lib/utils` where appropriate.
6. Use semantic theme tokens instead of hardcoded client colors.
7. Use Lucide React for icons unless an existing icon pattern should be reused.
8. Do not introduce Material UI, Ant Design, Bootstrap, or another UI framework without explicit approval.

## Component selection

Prefer existing primitives for:
- Button
- Input
- Label
- Select
- Checkbox
- Switch
- Dialog
- Alert Dialog
- Dropdown Menu
- Tooltip
- Popover
- Calendar
- Table
- Tabs
- Card
- Badge
- Sheet
- Command
- Toast/Sonner

Before adding a new primitive, confirm that an equivalent does not already exist.

## Composition

Low-level reusable behavior belongs in `src/components/ui/`.

Business-specific combinations belong in `src/components/common/`.

Page-specific combinations may remain in the owning page when they are not reused elsewhere.

## Validation

For interactive components check:
- keyboard operation
- focus behavior
- disabled behavior
- loading behavior
- empty/error states where relevant
- responsive behavior
- accessible labels

Run `npm run build` when feasible.
