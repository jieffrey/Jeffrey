"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MENU_ITEMS } from "@/common/constants/menu";
import { useLayout } from "@/common/stores/layout";
import { useTranslations } from "next-intl";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import IntlToggle from "../sidebar/IntToogle";
import ThemeToggle from "../sidebar/ThemeToogle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { toggleMode } = useLayout();
  const t = useTranslations("Navigation");
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";

  const filteredMenu = MENU_ITEMS.filter((item) => item.isShow);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">

        {/* Profile */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/profile.jpg"
            width={32}
            height={32}
            alt="Jeffrey Studios"
            className="border border-neutral-400 dark:border-neutral-600"
            rounded="rounded-full"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Jeffrey Studios
            </span>
            <VerifiedIcon size={14} className="text-blue-400" />
          </div>
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-neutral-300 dark:bg-neutral-700" />

        {/* Menu items */}
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-hide">
          {filteredMenu.map((item, index) => {
            const isActive = pathname === item.href;
            const isExternal = item.href?.includes("http");

            return (
              <Link
                key={index}
                href={item.href}
                target={isExternal ? "_blank" : ""}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all duration-200",
                  isActive
                    ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                )}
              >
                <span className={cn("transition-all duration-300", isActive && "animate-pulse")}>
                  {item.icon}
                </span>
                <span>{t(item.title)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: toggles + layout switcher */}
        <div className="flex shrink-0 items-center gap-3">
          <IntlToggle />
          <ThemeToggle />
          <div className="h-5 w-px bg-neutral-300 dark:bg-neutral-700" />
          <Tooltip title="Switch to sidebar">
            <button
              onClick={toggleMode}
              className="flex items-center justify-center rounded-lg p-2 text-neutral-500 transition-all hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              aria-label="Switch to sidebar layout"
            >
              <SidebarIcon size={18} />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Topbar;