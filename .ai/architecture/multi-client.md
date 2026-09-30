# Multi-Client Frontend

## Current implementation

The current multi-client model is presentation-focused.

- `src/config/clientThemes.js` defines client/theme profiles.
- `src/context/ClientThemeContext.jsx` stores the selected theme in application state and local storage.
- `src/lib/theme.js` applies theme values to CSS variables.
- `src/config/app.js` contains global application metadata, not a client registry.
- `src/config/navigation.js` is shared across clients.
- Client-specific navigation and permissions are not implemented.
- Theme selection does not provide tenant data isolation, authentication, or authorization.

The theme selector state exists in the context, but the selector UI in the application shell is not currently an exposed production client-resolution mechanism.

## Adding a client theme

For a presentation-only client:

1. Add a theme definition to `src/config/clientThemes.js`.
2. Follow the existing theme shape.
3. Keep client colors, typography, logo text, and presentation values in configuration.
4. Verify semantic tokens are consumed by shared UI.
5. Do not duplicate pages just to change branding.

## Global application metadata

`src/config/app.js` contains the default application identity.

It should not be treated as a multi-client database.

If true client-specific metadata is required in the future, create a dedicated client registry/configuration instead of overloading `app.js`.

## Navigation

`src/config/navigation.js` is currently shared.

Do not document or implement per-client navigation unless the product explicitly requires it and the architecture is extended to support it.

## Future client resolution

Possible future approaches:
- explicit client selector
- hostname/subdomain resolution
- environment-specific client configuration
- server-provided client configuration

These are future capabilities. Do not assume one is already implemented.

## Security boundary

Theme selection is not security.

Tenant isolation, authentication, authorization, API access control, and client-specific data security must be implemented and validated separately when the real backend exists.
