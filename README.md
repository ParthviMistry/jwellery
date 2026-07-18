# Lumière — Jewellery Admin Portal

A responsive admin dashboard for a jewellery e-commerce store, built with **React + Vite**, **Tailwind CSS**, and **shadcn/ui** (Radix primitives). Fully responsive — works as a dashboard on desktop and adapts to a mobile-friendly layout with a slide-out nav on phones/tablets.

## Stack

- **React 18 + Vite** — fast dev server and build
- **Tailwind CSS** — utility styling, with a custom "ink + antique gold" design token system
- **shadcn/ui pattern** (Radix UI primitives + `class-variance-authority`) — accessible, unstyled components you fully own and can restyle
- **React Router v6** — client-side routing
- **Recharts** — dashboard charts
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## What's included

- **Login** — placeholder auth screen (`/login`)
- **Dashboard** (`/`) — revenue trend chart, category split, recent orders, stock alerts
- **Products** (`/products`) — searchable/filterable catalog table, add/edit form, detail view
- **Orders** (`/orders`) — order list with filters, order detail with status + payment badges
- **Customers** (`/customers`) — customer list, profile + order history
- **Inventory** (`/inventory`) — stock levels with a quick-adjust dialog
- **Coupons** (`/coupons`) — discount code list + create-coupon dialog
- **Settings** (`/settings`) — profile, store details, admin users, notification preferences

All data currently comes from `src/data/mockData.js`. Swap the functions in that file for real API calls (`fetch`, your backend SDK, etc.) when you connect a backend — the rest of the app already reads from those exports, so most pages won't need structural changes.

## Project structure

```
src/
  components/
    ui/          # shadcn-style primitives (button, card, dialog, table, ...)
    layout/      # Sidebar, Topbar, AdminLayout (responsive shell)
    StatCard.jsx
  data/
    mockData.js  # swap with real API calls
  lib/
    utils.js     # cn() class merger, currency/date formatters
  pages/
    Dashboard.jsx
    Login.jsx
    products/, orders/, customers/, inventory/, coupons/, settings/
  App.jsx         # route table
  main.jsx        # entry point
```

## Design system

Colors, radius, and fonts are defined as CSS variables in `src/index.css` and mapped in `tailwind.config.js`:

- `ink` — near-black, used for the sidebar and primary buttons
- `gold` / `gold-soft` / `gold-deep` — antique-gold accent for highlights, active states, and primary CTAs
- Typography: **Playfair Display** for headings (`font-display`), **Inter** for body/UI text, **IBM Plex Mono** available for SKUs/order numbers

Adjust the HSL values in `:root` inside `src/index.css` to reskin the whole app.

## Adding a new page

1. Create a page component in `src/pages/`.
2. Add a `<Route>` for it inside the `<AdminLayout>` block in `src/App.jsx`.
3. Add a nav entry to the `navItems` array in `src/components/layout/Sidebar.jsx`.

## Notes

- This is a frontend-only scaffold with mock data and no real authentication — wire up your API and an auth provider before using it in production.
- Responsive breakpoints follow Tailwind defaults; the sidebar collapses into a slide-out drawer below the `md` breakpoint (768px).
