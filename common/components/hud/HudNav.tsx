"use client";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUi } from "@/common/stores/ui";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

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
      className="no-scrollbar pointer-events-auto max-w-full overflow-x-auto rounded-full border border-ink/8 bg-glass/78 p-[5px] backdrop-blur-[10px]"
    >
      <ul className="flex items-center gap-0.5">
        {SECTIONS.map(({ id }) => {
          const active = id === activeSection;
          return (
            <li key={id}>
              <Magnetic>
                <Link
                  href={`/#${id}`}
                  onClick={(e) => onClick(e, id)}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "flex h-9 items-center rounded-full px-[13px] font-mono text-xs leading-none tracking-chip whitespace-nowrap uppercase",
                    active ? "bg-ink text-paper" : "text-ink",
                  )}
                >
                  {t(`${id}.nav`)}
                </Link>
              </Magnetic>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
