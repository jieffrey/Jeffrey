"use client";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUi } from "@/common/stores/ui";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import CameraPanel from "./CameraPanel";
import HudNav from "./HudNav";
import LanguageSwitch from "./LanguageSwitch";
import Magnetic from "./Magnetic";
import ProgressBar from "./ProgressBar";
import SectionCounter from "./SectionCounter";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed heads-up display present on every page, laid out as in the
 * prototype: logo top-left, counter top-right, nav bottom-center, CAMERA
 * bottom-left, toggles bottom-right. Below 720px the corner chips sit above
 * the nav.
 */
export default function Hud() {
  const t = useTranslations("hud");
  const scrollToSection = useScrollToSection();
  const lineMode = useUi((s) => s.lineMode);
  useActiveSection();

  const onHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToSection("line")) e.preventDefault();
  };

  return (
    <>
      <ProgressBar />
      <header className="pointer-events-none fixed inset-x-5 top-5 z-50 flex items-start justify-between gap-3">
        <Link
          href="/"
          onClick={onHome}
          aria-label={t("homeLabel")}
          className="hud-chip pointer-events-auto font-medium"
        >
          {t("brand")}
        </Link>
        <SectionCounter />
      </header>

      <div className="pointer-events-none fixed inset-x-5 bottom-[72px] z-50 flex items-center justify-between gap-2 min-[720px]:bottom-5">
        <div className="flex items-center gap-2">
          {lineMode === "scene" && <CameraPanel />}
        </div>
        <div className="flex items-center gap-2">
          <Magnetic>
            <LanguageSwitch />
          </Magnetic>
          <Magnetic>
            <ThemeToggle />
          </Magnetic>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-4 bottom-5 z-50 flex justify-center">
        <HudNav />
      </div>
    </>
  );
}
