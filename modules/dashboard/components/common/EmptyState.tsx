import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "../../types";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center dark:border-zinc-700/50 dark:bg-zinc-900/30">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
