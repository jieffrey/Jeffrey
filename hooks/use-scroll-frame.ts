"use client";
import { useEffect, useRef } from "react";

/**
 * Calls `callback` at most once per animation frame while the page scrolls or
 * resizes, plus once on mount. Works with or without Lenis.
 */
export function useScrollFrame(callback: () => void) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  });

  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      saved.current();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);
}
