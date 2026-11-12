"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFinePointer } from "@/hooks/use-media-query";

type CursorState = "idle" | "hover" | "open";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

function stateFor(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return "idle";
  if (target.closest("[data-cursor='open']")) return "open";
  if (target.closest(INTERACTIVE)) return "hover";
  return "idle";
}

/**
 * Custom cursor: a dot that tracks the pointer and a ring that lags behind.
 * Over elements marked `data-cursor="open"` both grow and show a label.
 * Mouse devices only; touch devices keep native behaviour.
 */
export default function Cursor() {
  const t = useTranslations("hud.cursor");
  const finePointer = useFinePointer();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!finePointer) return;
    document.documentElement.dataset.cursor = "on";
    return () => {
      delete document.documentElement.dataset.cursor;
    };
  }, [finePointer]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!finePointer || !root || !dot || !ring) return;

      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        root.dataset.visible = "true";
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        root.dataset.state = stateFor(e.target);
      };
      const onLeave = () => {
        root.dataset.visible = "false";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [finePointer], revertOnUpdate: true },
  );

  if (!finePointer) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-state="idle"
      data-visible="false"
      className="group pointer-events-none fixed top-0 left-0 z-[90] opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
    >
      <div ref={ringRef} className="absolute top-0 left-0 will-change-transform">
        <div className="flex size-9 -translate-1/2 items-center justify-center rounded-full border border-paper-static mix-blend-difference transition-[width,height,background-color,border-color] duration-300 ease-expo-out group-data-[state=hover]:size-14 group-data-[state=open]:size-20 group-data-[state=open]:border-lime group-data-[state=open]:bg-lime group-data-[state=open]:mix-blend-normal">
          <span className="font-mono text-[10px] font-medium tracking-hud text-ink-static uppercase opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100">
            {t("open")}
          </span>
        </div>
      </div>
      <div ref={dotRef} className="absolute top-0 left-0 will-change-transform">
        <div className="size-1.5 -translate-1/2 rounded-full bg-paper-static mix-blend-difference transition-transform duration-300 ease-expo-out group-data-[state=hover]:scale-150 group-data-[state=open]:scale-0" />
      </div>
    </div>
  );
}
