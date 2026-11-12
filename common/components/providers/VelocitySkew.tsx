"use client";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";

const MAX_SKEW = 7;

/**
 * Skews ghost texts and section headings ([data-skew]) with the scroll
 * velocity, clamped to ±7°. Runs only while Lenis is mounted, so it is off
 * under reduced motion.
 */
export default function VelocitySkew() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    let targets: Element[] = [];
    let collectedAt = -Infinity;
    let last = 0;

    const tick = (time: number) => {
      // Sections mount, unmount and re-render; re-collect once a second.
      if (time - collectedAt > 1) {
        targets = Array.from(document.querySelectorAll("[data-skew]"));
        collectedAt = time;
      }
      const skew = gsap.utils.clamp(-MAX_SKEW, MAX_SKEW, lenis.velocity * 0.35);
      const rounded = Math.round(skew * 100) / 100;
      if (rounded === last) return;
      last = rounded;
      gsap.set(targets, { skewY: rounded });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.set(targets, { skewY: 0 });
    };
  }, [lenis]);

  return null;
}
