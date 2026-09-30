# UI Component Rules

The project uses a shadcn-style component system built on Radix UI.

## Before creating UI

1. Check `src/components/ui/`.
2. Check `src/components/common/`.
3. Search for an existing implementation or similar usage.
4. Reuse or extend an existing component when possible.

## Preferred primitives

Use the existing implementations for:
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
- Sonner

## Rules

- Do not introduce another UI framework without explicit approval.
- Use Tailwind for layout and spacing.
- Use semantic theme tokens.
- Use `cn()` from `@/lib/utils` where appropriate.
- Use Lucide React for icons unless an existing icon should be reused.
- Keep interactive controls accessible.
- Preserve responsive behavior.
