"use client";
import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import { motionOn } from "@/lib/motion";

interface CountUpProps {
  value: number;
  /** Starts counting when this turns true (the dashboard entered the view). */
  active: boolean;
}

/**
 * Counts from 0 to `value` over 1.4s (cubic ease-out) once active. Renders
 * the final, locale-formatted number on the server and under reduced motion.
 */
export default function CountUp({ value, active }: CountUpProps) {
  const format = useFormatter();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!active || !motionOn()) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 1400);
      setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <span className="tabular-nums">{format.number(shown)}</span>;
}
