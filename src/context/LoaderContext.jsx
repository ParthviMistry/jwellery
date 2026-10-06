import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Spinner } from "@/components/ui/spinner";

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [loader, setLoader] = useState(null);

  const showLoader = useCallback(
    (title, subheader, logo, options = {}) => {
      const { scope = "screen", blocking = true } = options;
      if (!["screen", "outlet", "dialog"].includes(scope)) {
        throw new Error(`Unsupported loader scope: ${scope}`);
      }
      setLoader({ title, subheader, logo, scope, blocking });
    },
    [],
  );

  const hideLoader = useCallback(() => {
    setLoader(null);
  }, []);

  const value = useMemo(
    () => ({ loader, showLoader, hideLoader }),
    [loader, showLoader, hideLoader],
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
      <LoaderSurface scope="screen" />
    </LoaderContext.Provider>
  );
}

export function LoaderArea({
  children,
  className = "",
  loading = false,
  title = "Loading",
  subheader,
  logo,
  blocking = true,
}) {
  const [localLoader, setLocalLoader] = useState(null);
  const loader = loading
    ? { title, subheader, logo, scope: "area", blocking }
    : localLoader;

  const showLoader = useCallback((title, subheader, logo, options = {}) => {
    setLocalLoader({
      title,
      subheader,
      logo,
      scope: "area",
      blocking: options.blocking ?? true,
    });
  }, []);

  const hideLoader = useCallback(() => {
    setLocalLoader(null);
  }, []);

  const value = useMemo(
    () => ({ loader, showLoader, hideLoader }),
    [loader, showLoader, hideLoader],
  );

  return (
    <div className={`relative ${className}`}>
      <LoaderContext.Provider value={value}>
        {children}
        <LoaderSurface scope="area" />
      </LoaderContext.Provider>
    </div>
  );
}

export function LoaderSurface({ scope }) {
  const { loader } = useLoaderContext();
  if (!loader || loader.scope !== scope) return null;

  const blocking = loader.blocking;
  const placement =
    scope === "screen"
      ? "fixed inset-0 z-[100]"
      : scope === "outlet"
        ? "absolute inset-0 z-40"
        : scope === "area"
          ? "absolute inset-0 z-40"
        : "absolute inset-0 z-[60] rounded-lg";

  return (
    <div
      className={`flex items-center justify-center p-4 ${placement} ${
        blocking
          ? "bg-background/75 backdrop-blur-sm"
          : "pointer-events-none"
      }`}
      aria-busy={blocking}
    >
      <div
        role="status"
        aria-live="polite"
        className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-border/80 bg-card/95 p-5 text-card-foreground shadow-xl backdrop-blur"
      >
        {loader.logo ? (
          <img
            src={loader.logo}
            alt=""
            className="h-12 w-12 shrink-0 rounded-xl object-contain"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Spinner className="size-6 text-primary" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {loader.title || "Loading"}
          </p>
          {loader.subheader && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {loader.subheader}
            </p>
          )}
        </div>
        {loader.logo && <Spinner className="size-5 shrink-0 text-primary" />}
      </div>
    </div>
  );
}

export function useLoaderContext() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
