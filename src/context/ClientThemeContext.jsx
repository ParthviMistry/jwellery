import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applyClientTheme } from "@/lib/theme";
import {
  clientThemes,
  defaultClientId,
  getClientTheme,
  getClientThemeOptions,
  resolveClientId,
} from "@/config/clientThemes";

const storageKey = "regnor-client-theme";
const ClientThemeContext = createContext(null);

export function ClientThemeProvider({ children }) {
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window === "undefined") {
      return defaultClientId;
    }

    const stored = localStorage.getItem(storageKey);
    return resolveClientId(stored || defaultClientId);
  });

  useEffect(() => {
    const activeId = resolveClientId(selectedId);
    setSelectedId(activeId);
    localStorage.setItem(storageKey, activeId);
    applyClientTheme(activeId);
  }, [selectedId]);

  const value = useMemo(
    () => ({
      selectedId,
      selectedTheme: getClientTheme(selectedId),
      setClientTheme: (nextId) => setSelectedId(resolveClientId(nextId)),
      themeOptions: getClientThemeOptions(),
      availableThemes: clientThemes,
    }),
    [selectedId],
  );

  return (
    <ClientThemeContext.Provider value={value}>
      {children}
    </ClientThemeContext.Provider>
  );
}

export function useClientTheme() {
  const context = useContext(ClientThemeContext);

  if (!context) {
    throw new Error("useClientTheme must be used within a ClientThemeProvider");
  }

  return context;
}
