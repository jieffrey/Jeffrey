"use client";
import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query subscription. Returns false on the server. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True for mouse / trackpad devices, false on touch. */
export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
