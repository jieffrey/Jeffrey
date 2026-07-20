import { cn } from "@/lib/utils";
import type { WidgetHeaderProps } from "../../types";
import StatusPill from "./StatusPill";

export default function WidgetHeader({
  icon,
  title,
  subtitle,
  badge,
  status,
  action,
}: WidgetHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="min-w-0 truncate font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>

            {status && <StatusPill status={status} />}
          </div>

          {subtitle && (
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 truncate")}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badge}
        {action}
      </div>
    </div>
  );
}
