# Client Onboarding

## Current scope

Client onboarding currently means adding presentation/theme configuration to the shared frontend.

The current navigation and application metadata are shared/global. They are not a complete per-client configuration system.

## Add a new client theme

1. Add a theme profile to `src/config/clientThemes.js`.
2. Follow the existing theme object shape.
3. Use semantic CSS variables.
4. Add the approved logo/brand assets under `public/` when required.
5. Verify the theme through the existing theme context/application behavior.
6. Search for hardcoded client names and replace them with configuration where appropriate.

## Important boundary

Do not assume that adding a theme creates:
- a separate tenant
- separate data access
- authentication
- authorization
- client-specific navigation
- a separate backend

Those require separate implementation.

## Future enhancements

If true multi-client deployment is required later, define a dedicated client registry and resolution strategy such as:
- hostname/subdomain
- environment configuration
- server-provided client metadata

Do not implement these assumptions until the product requirement is confirmed.
