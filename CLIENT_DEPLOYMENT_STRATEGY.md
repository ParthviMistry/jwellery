# Client deployment strategy guide

This document explains how to decide whether multiple clients can share the same frontend app, how to host them, and what to change when a new client is added.

---

## 1) Decision rule

Use the same frontend codebase when the clients mainly differ by:

- branding
- app name and text
- theme colors
- navigation labels
- copy and business rules

Use separate deployments only when the clients differ by:

- separate database
- separate API/backend
- separate authentication system
- different legal compliance boundaries
- different release cycles
- independent business logic

---

## 2) Recommended default model

For this project, the recommended default is:

- one shared frontend codebase
- one shared UI system
- one client config registry
- multiple client themes
- optional different subdomains or paths per client

This is the simplest and most scalable model for a white-label admin platform.

---

## 3) URL strategy options

### Option A: One app, multiple routes

Example:

- app.example.com/client-a
- app.example.com/client-b

Best when:

- same deployment
- same frontend build
- different brands share the same product
- you want easier maintenance

### Option B: One app, multiple subdomains

Example:

- client-a.example.com
- client-b.example.com

Best when:

- clients should feel like independent brands
- you want cleaner domain separation
- each client may later get unique public marketing pages

### Option C: Separate frontend builds

Example:

- admin-client-a.example.com
- admin-client-b.example.com

Best when:

- each client has isolated deployment
- different rules or modules are required
- you need strict release independence

---

## 4) Which option should you choose?

Choose Option A or B for most cases.

Choose Option C only if there is a strong technical or operational reason.

For a jewellery white-label admin product, Option A or B is usually the best default because the business logic is shared and branding is the main difference.

---

## 5) How to detect which client is active

The app should resolve a client from one of these sources:

- URL host name
- URL path segment
- local storage / session value
- environment variable during deployment
- a backend response after login

For a simple implementation, the project currently uses runtime client config switching in:

- src/context/ClientThemeContext.jsx

This is the right place to determine the active client.

---

## 6) Where the client identity is defined

This project is already organized for this model:

### Branding and theme config

- src/config/clientThemes.js

This is the main place to define a new client theme.

### App metadata

- src/config/app.js

This gives the app its brand identity.

### Navigation and labels

- src/config/navigation.js

This is where to adjust per-client labels and titles.

### Theme application

- src/lib/theme.js

This applies the selected client values to CSS variables globally.

---

## 7) Best practice for new clients

When client B is added:

1. Create a new theme in src/config/clientThemes.js
2. Add the required metadata in src/config/app.js
3. Update navigation names and page titles in src/config/navigation.js
4. Validate the visual result using the runtime selector or domain-based resolution
5. Decide whether it should use a shared domain, a subdomain, or a separate deployment
6. Only create a separate deployment if business or compliance needs require it

---

## 8) Typical multi-client deployment map

### Shared frontend architecture

- Same React app
- Same UI library
- Same shared pages and components
- Different client themes
- Different config values for each brand

### Separate backend architecture

If each client eventually needs a different backend or database:

- frontend stays shared
- backend can still be separate per client
- frontend reads the client config or API base URL based on domain or env

This is often a good hybrid approach.

---

## 9) When not to create a new app

Do not create a new frontend project just because:

- a second client has a different logo
- a second client has a different accent color
- a second client wants different menu labels
- a second client has another store name

These should all be handled with configuration and branding tokens.

---

## 10) When a new app is justified

Create a separate frontend app only if:

- the clients have different core product scopes
- they need different page structures and modules
- they have completely separate workflows
- they are effectively different products

If they are still the same admin product, the shared codebase is the right decision.

---

## 11) Recommended deployment pattern

For this jewellery admin product, the best deployment pattern is:

- one frontend app
- multiple client configs
- optional customer-specific domains (subdomains preferred)
- separate APIs only if necessary

This keeps the project maintainable and scalable.

---

## 12) Summary

### Best default

Use one codebase for all clients.

### Best URL strategy

- shared domain + path routing, or
- client-specific subdomains

### When to split deployments

Only when business or technical isolation requires it.

### Files to modify for a new client

- src/config/clientThemes.js
- src/config/app.js
- src/config/navigation.js
- src/context/ClientThemeContext.jsx
- src/lib/theme.js

---

## 13) Final recommendation

For this project, do not build a new frontend for Client B unless there is a real product difference.

The correct long-term path is:

- one reusable base app
- multiple client configs and brand themes
- different URLs only if needed for branding or deployment separation
- shared deployment when clients are conceptually the same admin system

This is the cleanest and most cost-effective path for a multi-client admin platform.
