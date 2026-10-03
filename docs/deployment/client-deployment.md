# Client Deployment

## Current frontend

This repository builds a single Vite frontend.

Available commands:

```bash
npm install
npm run build
npm run preview
```

## Environment configuration

Use Vite environment variables for environment-specific frontend configuration.

Example:

```env
VITE_API_BASE_URL=http://localhost:7242/api
```

Access them with:

```js
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

Do not commit secrets.

## Multi-client deployment

The current codebase has presentation/theme configuration, but it does not yet implement a complete hostname-based client resolution system.

Possible future deployment models:

- one application with a client path
- one application with subdomain/hostname resolution
- separate deployments using client-specific environment configuration

Choose the model based on the actual backend/data/security requirements.

## Important

A different frontend theme or deployment does not by itself provide tenant isolation or data security.
