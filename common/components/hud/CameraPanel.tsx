"use client";
import { useEffect, useRef } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  CAMERA_KEYS,
  CAMERA_RANGES,
  useCamera,
} from "@/common/stores/camera";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

const PANEL_ID = "camera-panel";

/**
 * CAMERA chip plus the camera settings panel for The Line: Lens, Tilt,
 * Print turn, Wind, Spacing, Reset and an FPS readout. Non-modal; Escape
 * closes it and returns focus to the chip.
 */
export default function CameraPanel() {
  const t = useTranslations("hud.camera");
  const format = useFormatter();
  const { config, panelOpen, fps, setValue, reset, setPanelOpen } = useCamera();
  const chipRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPanelOpen(false);
      chipRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || chipRef.current?.contains(target)) {
        return;
      }
      setPanelOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [panelOpen, setPanelOpen]);

  return (
    <>
      <Magnetic>
        <button
          ref={chipRef}
          type="button"
          aria-expanded={panelOpen}
          aria-controls={PANEL_ID}
          onClick={() => setPanelOpen(!panelOpen)}
          className="hud-chip pointer-events-auto pl-2.5"
        >
          <span className="flex size-[22px] items-center justify-center rounded-full bg-ink text-paper">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
          </span>
          {t("open")}
        </button>
      </Magnetic>

      <div
        id={PANEL_ID}
        ref={panelRef}
        role="group"
        aria-label={t("title")}
        className={cn(
          "pointer-events-auto fixed bottom-[124px] left-5 z-[60] w-[280px] flex-col gap-3 rounded-[18px] border border-ink/10 bg-glass/88 p-4 font-mono text-[11px] text-ink shadow-[0_20px_40px_-20px] shadow-ink-static/30 backdrop-blur-[14px] min-[720px]:bottom-[72px]",
          panelOpen ? "flex" : "hidden",
        )}
      >
        <div className="flex items-center justify-between text-xs tracking-chip">
          <span>{t("title")}</span>
          <span className="tabular-nums">
            {fps === null ? "—" : t("fps", { value: fps })}
          </span>
        </div>
        {CAMERA_KEYS.map((key) => {
          const range = CAMERA_RANGES[key];
          const id = `camera-${key}`;
          return (
            <div
              key={key}
              className="grid grid-cols-[80px_1fr_40px] items-center gap-2"
            >
              <label htmlFor={id}>{t(key)}</label>
              <input
                id={id}
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={config[key]}
                onChange={(e) => setValue(key, Number(e.target.value))}
                className="w-full accent-ink"
              />
              <output htmlFor={id} className="text-right tabular-nums">
                {format.number(config[key], { maximumFractionDigits: 1 })}
              </output>
            </div>
          );
        })}
        <button
          type="button"
          onClick={reset}
          className="h-[34px] rounded-full border border-ink/20 tracking-chip uppercase transition-colors hover:bg-ink hover:text-paper"
        >
          {t("reset")}
        </button>
      </div>
    </>
  );
}
