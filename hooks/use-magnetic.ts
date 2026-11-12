"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFinePointer, usePrefersReducedMotion } from "./use-media-query";

/**
 * Pulls the element toward the cursor while hovered and springs it back with
 * an elastic ease on leave. No-op on touch devices and under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion || !finePointer) return;

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (rect.left + rect.width / 2)) * strength,
          y: (e.clientY - (rect.top + rect.height / 2)) * strength,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.35)",
          overwrite: true,
        });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    {
      dependencies: [reducedMotion, finePointer, strength],
      revertOnUpdate: true,
    },
  );

  return ref;
}
