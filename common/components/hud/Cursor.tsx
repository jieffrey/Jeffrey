"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFinePointer } from "@/hooks/use-media-query";

/**
 * Custom cursor, as in the prototype: an ink dot glued to the pointer and a
 * ring that lags behind (lerp 0.15). Over elements marked
 * `data-cursor="open"` the dot becomes a lime disc with a label and the ring
 * grows. The native cursor stays visible. Mouse devices only.
 */
export default function Cursor() {
  const t = useTranslations("hud.cursor");
  const finePointer = useFinePointer();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!finePointer || !root || !dot || !ring) return;

      let x = 0;
      let y = 0;
      let ringX = 0;
      let ringY = 0;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        if (root.dataset.visible !== "true") {
          root.dataset.visible = "true";
          ringX = e.clientX;
          ringY = e.clientY;
        }
        x = e.clientX;
        y = e.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
      };
      const onOver = (e: PointerEvent) => {
        const open =
          e.target instanceof Element &&
          e.target.closest("[data-cursor='open']") !== null;
        root.dataset.state = open ? "open" : "idle";
      };
      const onLeave = () => {
        root.dataset.visible = "false";
      };
      const onTick = () => {
        ringX += (x - ringX) * 0.15;
        ringY += (y - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      gsap.ticker.add(onTick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        gsap.ticker.remove(onTick);
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
      className="group pointer-events-none fixed top-0 left-0 z-[70] opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
    >
      <div ref={ringRef} className="absolute top-0 left-0 will-change-transform">
        <div className="size-10 -translate-1/2 rounded-full border-[1.5px] border-ink opacity-50 transition-[width,height,opacity] duration-300 group-data-[state=open]:size-24 group-data-[state=open]:opacity-25" />
      </div>
      <div ref={dotRef} className="absolute top-0 left-0 will-change-transform">
        <div className="flex size-3 -translate-1/2 items-center justify-center rounded-full bg-ink transition-[width,height,background-color] duration-[250ms] group-data-[state=open]:size-16 group-data-[state=open]:bg-lime">
          <span className="font-mono text-[10px] tracking-chip text-ink-static uppercase opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100">
            {t("open")}
          </span>
        </div>
      </div>
    </div>
  );
}
