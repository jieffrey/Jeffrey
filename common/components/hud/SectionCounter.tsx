"use client";
import { useTranslations } from "next-intl";
import { useUi } from "@/common/stores/ui";
import { SECTIONS } from "@/lib/sections";

/** Top-right chip, e.g. "02 — NOW". Hidden on pages without sections. */
export default function SectionCounter() {
  const t = useTranslations();
  const activeSection = useUi((s) => s.activeSection);
  const section = SECTIONS.find((s) => s.id === activeSection);
  if (!section) return null;

  return (
    <p className="hud-chip pointer-events-auto tabular-nums" aria-live="off">
      <span>{section.number}</span>
      <span aria-hidden>—</span>
      <span>{t(`${section.id}.nav`)}</span>
    </p>
  );
}
