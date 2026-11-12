"use client";
import { useCallback } from "react";
import { useLenis } from "lenis/react";
import type { SectionId } from "@/lib/sections";

const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

/**
 * Element to measure / scroll to for a section. ScrollTrigger wraps a pinned
 * section in a `.pin-spacer`; its top is the real scroll position.
 */
export function getSectionAnchor(id: SectionId): HTMLElement | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.closest<HTMLElement>(".pin-spacer") ?? el;
}

export const absoluteTop = (el: Element) =>
  el.getBoundingClientRect().top + window.scrollY;

/** Scrolls to a page offset with Lenis, or natively when Lenis is off. */
export function useScrollToY() {
  const lenis = useLenis();

  return useCallback(
    (y: number) => {
      if (lenis) lenis.scrollTo(y, { duration: 1.6, easing: easeOutQuart });
      else window.scrollTo({ top: y, behavior: "auto" });
    },
    [lenis],
  );
}

/**
 * Scrolls to a home section and records it in the URL hash. Returns false
 * when the section is not on this page.
 */
export function useScrollToSection() {
  const scrollToY = useScrollToY();

  return useCallback(
    (id: SectionId) => {
      const anchor = getSectionAnchor(id);
      if (!anchor) return false;
      scrollToY(id === "line" ? 0 : absoluteTop(anchor));
      history.replaceState(null, "", `#${id}`);
      return true;
    },
    [scrollToY],
  );
}
