"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface GhostTextProps {
  text: string;
  /** Position within the section, e.g. "top-10". */
  className?: string;
  /** Slide right-to-left (default) or left-to-right. */
  reverse?: boolean;
}

/**
 * Huge outline text sliding horizontally behind a section as it scrolls
 * through the viewport (xPercent 0 ↔ -45, scrubbed). Decorative.
 */
export default function GhostText({ text, className, reverse }: GhostTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionOn()) return;
      gsap.fromTo(
        el,
        { xPercent: reverse ? -45 : 0 },
        {
          xPercent: reverse ? 0 : -45,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { dependencies: [reverse] },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      data-skew
      className={cn(
        "pointer-events-none absolute left-0 z-0 text-[clamp(140px,22vw,340px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent uppercase will-change-transform [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-ink)_9%,transparent)]",
        className,
      )}
    >
      {text}
    </div>
  );
}
