import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionId;
  className?: string;
  children?: ReactNode;
}

/**
 * Shell shared by every home section: the anchor id used by the HUD, and the
 * mono eyebrow with the section number and its named grid.
 */
export default function Section({ id, className, children }: SectionProps) {
  const t = useTranslations();
  const number = SECTIONS.find((s) => s.id === id)?.number;

  return (
    <section
      id={id}
      data-section={id}
      aria-labelledby={`${id}-eyebrow`}
      className={cn(
        "relative flex min-h-svh flex-col px-4 pt-24 pb-32 sm:px-8 lg:px-12",
        className,
      )}
    >
      <p id={`${id}-eyebrow`} className="eyebrow opacity-70">
        {number} — {t(`${id}.nav`)} · {t(`${id}.grid`)}
      </p>
      {children}
    </section>
  );
}
