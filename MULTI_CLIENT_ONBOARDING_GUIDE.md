# Multi-client onboarding and deployment guide

This document explains how to manage multiple clients using the same codebase, what to change when a new client is added, and whether a new URL is required for each client.

## 1) Core idea

This project is built as a white-label/admin template.

The same frontend codebase can be reused for multiple clients as long as the differences are mostly:

- branding and theme
- display name and metadata
- navigation labels
- page copy
- business rules or data source

The important principle is:

- shared UI shell and shared logic stay in the main app
- client-specific values stay in config files
- runtime selection chooses which client config is active

This avoids creating a separate frontend app for every brand unless the business needs are truly different.

---

## 2) Do you need a new URL for client B?

### Short answer

Not necessarily.

### Recommended approach

Use one codebase and either:

- one domain with multiple client paths, or
- multiple subdomains, or
- one shared app with a client selector in admin mode

### When a new URL is useful

A new URL is useful when:

- each client needs a separate public brand site
- different clients need isolated login/session domains
- each client has different legal or security boundaries
- each client has a separate hosted environment or deployment pipeline

### Examples

#### Same app, different route

- app.example.com/client-a
- app.example.com/client-b

#### Same app, different subdomain

- client-a.example.com
- client-b.example.com

#### Separate deployments

- clienta-admin.example.com
- clientb-admin.example.com

In most white-label admin setups, a shared frontend codebase with different domains or subdomains is enough.

---

## 3) The architecture used in this project

This project already follows the right structure for multi-client support.

### Main files involved

- src/config/clientThemes.js
  - all theme definitions for each client
- src/context/ClientThemeContext.jsx
  - current active client state
- src/lib/theme.js
  - applies CSS variables for the chosen client
- src/config/app.js
  - app identity and metadata
- src/config/navigation.js
  - menu labels and page titles
- src/config/clientOnboarding.js
  - onboarding checklist for new clients

### Pattern

Shared code stays here:

- reusable components
- layout system
- page UI
- data hooks and services
- route structure

Client-specific values stay here:

- theme palette
- logo text
- app name
- navigation labels
- brand copy

---

## 4) What to change when a new client comes in

### A. Add the client theme

File:

- src/config/clientThemes.js

What to add:

- client id
- display label
- brand colors
- sidebar color
- accent color
- typography settings
- border radius
- shadow values
- logo text/subtitle

Example structure:

```js
export const clientThemes = {
  default: {
    id: "default",
    name: "Lumière",
    label: "Default client",
    logoText: "Lumière",
    logoSubtitle: "Admin Studio",
    cssVars: {
      "--brand-primary": "36 55% 34%",
      "--brand-background": "0 0% 100%",
      // more tokens...
    },
    fonts: {
      sans: "'Inter', sans-serif",
      display: "'Playfair Display', serif",
    },
  },
};
```

Add your new client in the same structure.

---

### B. Update app metadata

File:

- src/config/app.js

This file controls app identity such as:

- application name
- short name
- subtitle
- default title

If client B is a different jewellery brand, update:

- app name
- short name
- subtitle

---

### C. Update navigation labels and titles

File:

- src/config/navigation.js

This file controls:

- sidebar menu labels
- title text on pages
- route names used across the app

Use this when client B wants different wording.

Examples:

- Orders -> Sales
- Inventory -> Stock Control
- Customers -> Members

---

### D. Update copy and settings pages

Files to review:

- src/pages/settings/Settings.jsx
- other page files for store copy and labels

This is where you adjust:

- support emails
- business address
- store name
- product descriptions or admin phrasing

---

### E. Handle runtime client switching

File:

- src/context/ClientThemeContext.jsx

This file is the state layer for the selected client.

It is responsible for:

- reading the current client from storage
- setting the client
- persisting it
- passing it to theme application

This is what lets the same app instantly switch branding for different clients.

---

### F. Theme application layer

File:

- src/lib/theme.js

This file applies the selected client colors to CSS variables across the app.

You usually do not need to edit this file for a new client unless:

- the new client needs custom semantic tokens
- the brand requires additional color scales
- you want new variables such as loyalty, luxury, etc.

---

## 5) Hosting strategy: one app, many clients

### Best option for most teams

Use one frontend app and route or host by client.

#### Example 1: same frontend app, different path

- app.example.com/client-a
- app.example.com/client-b

#### Example 2: same frontend app, different subdomain

- client-a.example.com
- client-b.example.com

In both cases, the UI is the same, and the client config determines the brand theme.

---

## 6) When to use separate deployments

A separate frontend deployment is justified if:

- each client has a completely different business workflow
- the client has different data security requirements
- there are separate backend services or separate DBs
- release cycles need to be independent

If the clients are all using the same admin features, a shared codebase is better and cheaper to maintain.

---

## 7) Recommended future workflow for new clients

When a new client begins onboarding, the process should be:

1. Add a new config block in src/config/clientThemes.js
2. Update app metadata in src/config/app.js
3. Update navigation labels in src/config/navigation.js
4. Adjust brand-related copy in relevant pages
5. Validate the theme using runtime selector or hostname detection
6. Confirm whether the client should share the same app URL or use a separate domain
7. If needed, connect to the correct API/config for the client

---

## 8) Suggested long-term model

For a real multi-brand admin service, this is the recommended structure:

- one shared React app
- one shared component library
- one config registry for all clients
- one client resolution layer
- one API base URL or environment per client if needed
- optional feature flags for client-specific modules

This keeps the codebase clean and lets you add more clients without copying the project.

---

## 9) Practical answer for this project

For this admin template, the simplest usage model is:

- one codebase
- multiple client theme definitions
- same app shell reused across clients
- different domain or route layer if you want separate front-end access
- no need to create a second app just because another brand is added

If Client A is already live on one URL and Client B arrives later, you should first ask:

- Do they use the same backend and same business rules?
- Do they need separate branding only?
- Do they need a different domain or just a different client record?

If the answer is mostly yes, then the correct move is to keep one codebase and add another client config entry.

---

## 10) Summary

This project is already set up to support multiple clients in one codebase.

The main files to touch for a new client are:

- src/config/clientThemes.js
- src/config/app.js
- src/config/navigation.js
- src/context/ClientThemeContext.jsx
- src/lib/theme.js

You only create a new URL strategy when the business model requires separate hosting, not just a different client brand.

---

## 11) Recommended next step

If you want to take this one step further, the next ideal addition is:

- a new client switcher page in settings
- automatic client resolution based on hostname
- environment-based client loading for staging/production

This will make the onboarding flow even cleaner for future brands.
