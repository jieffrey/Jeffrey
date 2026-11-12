"use client";
import { useUi } from "@/common/stores/ui";
import { SECTION_IDS, type SectionId } from "@/lib/sections";
import { useScrollFrame } from "./use-scroll-frame";
import { getSectionAnchor } from "./use-scroll-to-section";

/**
 * Tracks which home section sits under the viewport midline and writes it to
 * the UI store. Pinned sections are measured by their pin-spacer, so they
 * stay active for the whole pin distance.
 */
export function useActiveSection() {
  useScrollFrame(() => {
    const midline = window.innerHeight / 2;
    let active: SectionId | null = null;
    for (const id of SECTION_IDS) {
      const anchor = getSectionAnchor(id);
      if (!anchor) continue;
      if (active === null || anchor.getBoundingClientRect().top <= midline) {
        active = id;
      }
    }
    const { activeSection, setActiveSection } = useUi.getState();
    if (activeSection !== active) setActiveSection(active);
  });
}
