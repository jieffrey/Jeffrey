import { cn } from "@/lib/utils";
import type { StatusPillProps } from "../../types";

const statusConfig = {
  live: { dot: "bg-emerald-500 dark:bg-emerald-400", label: "Live", ring: "ring-emerald-500/20 dark:ring-emerald-400/20" },
  mock: { dot: "bg-amber-500 dark:bg-amber-400", label: "Mock", ring: "ring-amber-500/20 dark:ring-amber-400/20" },
  offline: { dot: "bg-red-500 dark:bg-red-400", label: "Offline", ring: "ring-red-500/20 dark:ring-red-400/20" },
} as const;

export default function StatusPill({ status, size = "sm" }: StatusPillProps) {
  const config = statusConfig[status];
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1 ring-inset",
        config.ring,
        textSize,
        "font-medium text-zinc-600 dark:text-zinc-400"
      )}
    >
      <span className={cn("rounded-full", dotSize, config.dot)} />
      {config.label}
    </span>
  );
}
