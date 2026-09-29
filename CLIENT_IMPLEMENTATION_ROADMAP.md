# Client implementation roadmap

This roadmap is the first-priority execution plan for moving the current admin template to the Regnor brand and then building the required jewelry/B2B platform functionality.

## Phase 1 — Brand and visual identity alignment

Goal: make the admin consistent with the Regnor brand and the provided wordmark.

Files to update:
- src/config/app.js
- src/config/clientThemes.js
- src/index.css
- src/pages/Login.jsx
- src/components/layout/Sidebar.jsx
- src/components/layout/Topbar.jsx

Tasks:
- Replace Lumière branding with Regnor
- Set a premium dark-navy palette based on the logo
- Update login and app shell branding
- Use the official Regnor logo in the admin shell
- Keep the multi-client theme system intact

---

## Phase 2 — Product and catalog foundation

Goal: move from a generic dashboard template to a jewelry catalog admin.

Files to focus on:
- src/pages/products/Products.jsx
- src/pages/products/ProductForm.jsx
- src/pages/products/ProductDetail.jsx
- src/data/mockData.js
- src/services/products.js

Tasks:
- Add product attributes for jewelry, diamond, and gemstone data
- Support category and sub-category structure
- Add product code / SKU management
- Add product variants and media support
- Improve catalog management for inventory-linked products

---

## Phase 3 — Inventory and stock workflow

Goal: support real stock movement and fulfillment rules.

Files to focus on:
- src/pages/inventory/Inventory.jsx
- src/services/dashboard.js
- src/services/products.js

Tasks:
- Add stock movement tracking
- Add low-stock visibility
- Add inventory adjustment workflow
- Link stock changes to purchase and sales flows

---

## Phase 4 — Purchase and supplier management

Goal: introduce the buyer-side operational flow.

New modules likely needed:
- Suppliers page
- Purchase page
- Purchase return page
- Supplier reports

Tasks:
- Create vendor management module
- Add purchase entry workflow
- Add purchase return flow
- Track outstanding balances and stock impact

---

## Phase 5 — Orders and customer workflow

Goal: bring the admin closer to a real jewelry B2B platform.

Files to focus on:
- src/pages/orders/Orders.jsx
- src/pages/orders/OrderDetail.jsx
- src/pages/customers/Customers.jsx
- src/pages/customers/CustomerDetail.jsx

Tasks:
- Add order status lifecycle
- Add customer approval and account workflows
- Add role-based/B2B pricing support
- Add order history and notes

---

## Phase 6 — Pricing, reports, and notifications

Goal: support the operational reporting and decision-making requirements of the scope.

Tasks:
- add pricing rules and customer pricing
- add sales and stock reports
- add purchase supplier reports
- add notification templates and triggers
- prepare reporting filters by date, category, and customer

---

## Phase 7 — Security, auth, and production readiness

Goal: move from a demo admin into a production-capable system.

Tasks:
- real auth flows and protected routes
- role-based access control
- payment integration layer
- order/payment status sync
- deployment, env config, and hosting strategy

---

## Recommended execution order

For this project, the immediate first move is:

1. Regnor brand update
2. Logo integration
3. Theme alignment
4. Login and sidebar branding
5. Then product catalog and inventory modules

This sequence ensures the app looks and feels like the client before deeper business workflows are added.
