import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Spans on the 12-col / 88px modular grid; collapses below 961px. */
const SPANS = {
  "8x3": "col-span-4 min-h-60 min-[961px]:col-span-8 min-[961px]:row-span-3 min-[961px]:min-h-0",
  "4x3": "col-span-4 min-h-60 min-[961px]:row-span-3 min-[961px]:min-h-0",
  "4x2": "col-span-4 min-h-60 min-[721px]:col-span-2 min-[961px]:col-span-4 min-[961px]:row-span-2 min-[961px]:min-h-0",
} as const;

interface TileProps {
  span: keyof typeof SPANS;
  className?: string;
  children: ReactNode;
}

export default function Tile({ span, className, children }: TileProps) {
  return (
    <article
      data-tile
      className={cn(
        "relative flex min-w-0 flex-col gap-3 rounded-[20px] border border-edge bg-card p-5",
        SPANS[span],
        className,
      )}
    >
      {children}
    </article>
  );
}

export function TileLabel({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-normal text-dim">{children}</h3>;
}

export function TileBig({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <p className="text-4xl leading-none font-extrabold tracking-[-0.03em] tabular-nums">
      {children}
      {note && (
        <small className="ml-1.5 text-sm font-normal tracking-normal text-dim">
          {note}
        </small>
      )}
    </p>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg bg-heat-1/45 px-[9px] py-[5px] font-mono text-[11px] whitespace-nowrap text-violet-2">
      {children}
    </span>
  );
}
