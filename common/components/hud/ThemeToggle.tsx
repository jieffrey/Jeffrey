"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const subscribe = () => () => {};

/** Lights on / lights off. Renders a neutral label until mounted. */
export default function ThemeToggle() {
  const t = useTranslations("hud.theme");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`${isDark ? t("dark") : t("light")} — ${isDark ? t("toLight") : t("toDark")}`}
      className="hud-chip pointer-events-auto"
    >
      <span
        aria-hidden
        className="size-2 rounded-full border border-ink bg-lime dark:bg-transparent"
      />
      <span>{isDark ? t("dark") : t("light")}</span>
    </button>
  );
}
