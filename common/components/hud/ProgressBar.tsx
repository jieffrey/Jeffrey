"use client";
import { useRef } from "react";
import { useScrollFrame } from "@/hooks/use-scroll-frame";

/** 3px lime line across the top; scaleX follows page scroll progress. */
export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    el.style.transform = `scaleX(${progress})`;
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-lime will-change-transform"
    />
  );
}
