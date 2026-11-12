"use client";
import { useFormatter, useTranslations } from "next-intl";
import { useUi } from "@/common/stores/ui";
import { LINE_PRINTS } from "@/lib/data/line";
import { SECTIONS } from "@/lib/sections";

/**
 * Top-right chip: "02 — NOW", or "01 — LINE 03/08" while walking The Line.
 * Hidden on pages without sections.
 */
export default function SectionCounter() {
  const t = useTranslations();
  const format = useFormatter();
  const activeSection = useUi((s) => s.activeSection);
  const linePrint = useUi((s) => s.linePrint);
  const index = SECTIONS.findIndex((s) => s.id === activeSection);
  if (index < 0) return null;

  const twoDigits = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2 });
  const values = {
    number: twoDigits(index + 1),
    name: t(`${SECTIONS[index].id}.nav`),
  };

  return (
    <p className="hud-chip pointer-events-auto tabular-nums max-[719px]:h-9 max-[719px]:px-3 max-[719px]:text-[11px]" aria-live="polite">
      {activeSection === "line" && linePrint !== null
        ? t("hud.counter.line", {
            ...values,
            current: twoDigits(linePrint + 1),
            total: twoDigits(LINE_PRINTS.length),
          })
        : t("hud.counter.section", values)}
    </p>
  );
}
