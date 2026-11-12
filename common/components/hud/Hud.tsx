"use client";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import HudNav from "./HudNav";
import LanguageSwitch from "./LanguageSwitch";
import Magnetic from "./Magnetic";
import ProgressBar from "./ProgressBar";
import SectionCounter from "./SectionCounter";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed heads-up display present on every page. The wrapper ignores pointer
 * events so only the chips themselves are interactive.
 */
export default function Hud() {
  const t = useTranslations("hud");
  const scrollToSection = useScrollToSection();
  useActiveSection();

  const onHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToSection("line")) e.preventDefault();
  };

  return (
    <>
      <ProgressBar />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 p-4 sm:p-5">
        <Magnetic>
          <Link
            href="/"
            onClick={onHome}
            aria-label={t("homeLabel")}
            className="hud-chip pointer-events-auto"
          >
            <span aria-hidden className="size-2 rounded-full bg-lime" />
            {t("brand")}
          </Link>
        </Magnetic>
        <Magnetic>
          <SectionCounter />
        </Magnetic>
      </header>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col-reverse items-center gap-2 p-4 sm:p-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        {/* Bottom-left slot: the CAMERA chip arrives with The Line (phase 2). */}
        <div className="hidden lg:block" />
        <HudNav />
        <div className="flex items-center gap-2 lg:justify-self-end">
          <Magnetic>
            <LanguageSwitch />
          </Magnetic>
          <Magnetic>
            <ThemeToggle />
          </Magnetic>
        </div>
      </div>
    </>
  );
}
