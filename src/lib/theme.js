import { getClientTheme } from "@/config/clientThemes";

const semanticTokenMap = {
  "--background": "--brand-background",
  "--foreground": "--brand-foreground",
  "--card": "--brand-card",
  "--card-foreground": "--brand-card-foreground",
  "--popover": "--brand-card",
  "--popover-foreground": "--brand-card-foreground",
  "--primary": "--brand-primary",
  "--primary-foreground": "--brand-primary-foreground",
  "--secondary": "--brand-muted",
  "--secondary-foreground": "--brand-foreground",
  "--muted": "--brand-muted",
  "--muted-foreground": "--brand-muted-foreground",
  "--accent": "--brand-accent",
  "--accent-foreground": "--brand-accent-foreground",
  "--destructive": "--brand-destructive",
  "--destructive-foreground": "--brand-destructive-foreground",
  "--success": "--brand-success",
  "--success-foreground": "--brand-success-foreground",
  "--border": "--brand-border",
  "--input": "--brand-input",
  "--ring": "--brand-ring",
  "--sidebar": "--brand-sidebar",
  "--sidebar-foreground": "--brand-sidebar-foreground",
  "--sidebar-primary": "--brand-primary",
  "--sidebar-primary-foreground": "--brand-primary-foreground",
  "--sidebar-accent": "--brand-sidebar-accent",
  "--sidebar-accent-foreground": "--brand-sidebar-accent-foreground",
  "--sidebar-border": "--brand-border",
  "--sidebar-ring": "--brand-ring",
  "--ink": "--brand-sidebar",
  "--ink-light": "--brand-sidebar-accent",
  "--gold": "--brand-primary",
  "--gold-soft": "--brand-muted",
  "--gold-deep": "--brand-primary",
  "--radius": "--brand-radius",
  "--shadow": "--brand-shadow",
};

export function applyClientTheme(clientId) {
  const theme = getClientTheme(clientId);
  const root = document.documentElement;

  Object.entries(theme.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  Object.entries(semanticTokenMap).forEach(([semanticToken, brandToken]) => {
    const brandValue = root.style.getPropertyValue(brandToken) || getComputedStyle(root).getPropertyValue(brandToken);
    if (brandValue) {
      root.style.setProperty(semanticToken, brandValue);
    }
  });

  root.setAttribute("data-client", clientId);
  root.style.setProperty("--font-sans", theme.fonts.sans);
  root.style.setProperty("--font-display", theme.fonts.display);

  return theme;
}

export function buildClientThemeTokens(theme) {
  return {
    primary: `hsl(var(--brand-primary))`,
    primaryForeground: `hsl(var(--brand-primary-foreground))`,
    background: `hsl(var(--brand-background))`,
    foreground: `hsl(var(--brand-foreground))`,
    card: `hsl(var(--brand-card))`,
    cardForeground: `hsl(var(--brand-card-foreground))`,
    muted: `hsl(var(--brand-muted))`,
    mutedForeground: `hsl(var(--brand-muted-foreground))`,
    accent: `hsl(var(--brand-accent))`,
    accentForeground: `hsl(var(--brand-accent-foreground))`,
    border: `hsl(var(--brand-border))`,
    input: `hsl(var(--brand-input))`,
    ring: `hsl(var(--brand-ring))`,
    sidebar: `hsl(var(--brand-sidebar))`,
    sidebarForeground: `hsl(var(--brand-sidebar-foreground))`,
    sidebarAccent: `hsl(var(--brand-sidebar-accent))`,
    sidebarAccentForeground: `hsl(var(--brand-sidebar-accent-foreground))`,
    success: `hsl(var(--brand-success))`,
    successForeground: `hsl(var(--brand-success-foreground))`,
    destructive: `hsl(var(--brand-destructive))`,
    destructiveForeground: `hsl(var(--brand-destructive-foreground))`,
    radius: `var(--brand-radius)`,
    shadow: `var(--brand-shadow)`,
    fontSans: `var(--font-sans)`,
    fontDisplay: `var(--font-display)`,
  };
}
