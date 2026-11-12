"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";
import { isSectionId } from "@/lib/sections";
import { absoluteTop, getSectionAnchor } from "./use-scroll-to-section";

/**
 * Puts the page back on the section named in the URL hash after the layout
 * has settled. Needed in two cases where the browser's own hash scroll runs
 * before the pinned sections exist (their pin-spacers change every offset):
 * arriving at /#section from another page, and switching language, which
 * rebuilds the sections in place.
 */
export function useHashRestore() {
  const locale = useLocale();
  const lenis = useLenis();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!isSectionId(id)) return;
    // On a first visit the loader owns the scroll position.
    if (document.documentElement.dataset.loader === "on") return;

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const anchor = getSectionAnchor(id);
      if (!anchor) return;
      const y = id === "line" ? 0 : absoluteTop(anchor);
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    }, 300);
    return () => window.clearTimeout(timer);
    // Lenis appears a moment after mount; re-running then is harmless.
  }, [locale, lenis]);
}
