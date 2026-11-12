"use client";
import { useCallback } from "react";
import { useLenis } from "lenis/react";
import type { SectionId } from "@/lib/sections";

/**
 * Element to measure / scroll to for a section. ScrollTrigger wraps a pinned
 * section in a `.pin-spacer`; its top is the real scroll position.
 */
export function getSectionAnchor(id: SectionId): HTMLElement | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.closest<HTMLElement>(".pin-spacer") ?? el;
}

/**
 * Scrolls to a home section with Lenis, or natively when Lenis is off
 * (reduced motion). Returns false when the section is not on this page.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: SectionId, options?: { immediate?: boolean }) => {
      const anchor = getSectionAnchor(id);
      if (!anchor) return false;
      if (lenis) {
        lenis.scrollTo(anchor, { immediate: options?.immediate });
      } else {
        anchor.scrollIntoView({ block: "start" });
      }
      history.replaceState(null, "", `#${id}`);
      return true;
    },
    [lenis],
  );
}
