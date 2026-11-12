"use client";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/** Wraps one interactive element and makes it magnetic to the cursor. */
export default function Magnetic({ children, className }: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>();
  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
