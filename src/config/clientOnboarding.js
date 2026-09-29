export const clientOnboardingChecklist = [
  {
    id: "theme",
    title: "Brand theme",
    description: "Define brand colors, accent tokens, typography, and radius values.",
    complete: true,
  },
  {
    id: "identity",
    title: "Identity assets",
    description: "Add logo, favicon, store tagline, and legal naming to the app shell.",
    complete: false,
  },
  {
    id: "navigation",
    title: "Navigation labels",
    description: "Map menu names, page titles, and role-specific access for the client.",
    complete: true,
  },
  {
    id: "content",
    title: "Client copy",
    description: "Update support text, dashboard labels, and onboarding copy for the brand.",
    complete: false,
  },
  {
    id: "data",
    title: "Data source",
    description: "Connect the admin dashboard to the correct product, order, and inventory feeds.",
    complete: false,
  },
];

export function createClientThemeProfile({
  id,
  name,
  label,
  logoText,
  logoSubtitle,
  themeVars,
}) {
  return {
    id,
    name,
    label,
    logoText,
    logoSubtitle,
    cssVars: themeVars,
    fonts: {
      sans: "'Inter', sans-serif",
      display: "'Playfair Display', serif",
    },
  };
}

export function getClientOnboardingStatus(themeId) {
  if (!themeId) return { total: clientOnboardingChecklist.length, complete: 0 };

  const completeCount = clientOnboardingChecklist.filter((step) => step.complete).length;

  return {
    total: clientOnboardingChecklist.length,
    complete: completeCount,
    themeId,
  };
}
