"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useGrid } from "@/common/stores/grid";
import { cn } from "@/lib/utils";

/**
 * GRID chip. Sets data-grid="on" on <html>; each section styles its own
 * overlay from that (the `grid-on:` Tailwind variant).
 */
export default function GridToggle() {
  const t = useTranslations("hud.grid");
  const on = useGrid((s) => s.on);
  const toggle = useGrid((s) => s.toggle);

  useEffect(() => {
    const html = document.documentElement;
    if (on) html.dataset.grid = "on";
    else delete html.dataset.grid;
  }, [on]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={`${t("chip")} — ${t("label")}`}
      className={cn("hud-chip pointer-events-auto", on && "bg-ink text-paper")}
    >
      {t("chip")}
    </button>
  );
}
