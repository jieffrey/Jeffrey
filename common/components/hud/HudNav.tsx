"use client";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUi } from "@/common/stores/ui";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

/**
 * Bottom-center pill nav. On the home page it scrolls with Lenis; on other
 * pages the links navigate to the home page section.
 */
export default function HudNav() {
  const t = useTranslations();
  const activeSection = useUi((s) => s.activeSection);
  const scrollToSection = useScrollToSection();

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToSection(id)) e.preventDefault();
  };

  return (
    <nav
      aria-label={t("hud.navLabel")}
      className="no-scrollbar pointer-events-auto max-w-full overflow-x-auto rounded-full border border-ink/15 bg-paper/85 p-1 backdrop-blur-md"
    >
      <ul className="flex items-center gap-0.5">
        {SECTIONS.map(({ id }) => {
          const active = id === activeSection;
          return (
            <li key={id}>
              <Link
                href={`/#${id}`}
                onClick={(e) => onClick(e, id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex h-8 items-center rounded-full px-3.5 font-mono text-[11px] leading-none font-medium tracking-hud whitespace-nowrap uppercase transition-colors duration-300",
                  active
                    ? "bg-ink text-paper"
                    : "text-muted hover:bg-ink/10 hover:text-ink",
                )}
              >
                {t(`${id}.nav`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
