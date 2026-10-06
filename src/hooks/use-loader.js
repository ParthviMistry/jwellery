import {
  LoaderArea,
  LoaderSurface,
  useLoaderContext,
} from "@/context/LoaderContext";

export function useLoader() {
  return useLoaderContext();
}

export { LoaderArea, LoaderSurface };
