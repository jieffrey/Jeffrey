import { cn } from "@/lib/utils";
import type { DashboardCardProps } from "../../types";
import WidgetHeader from "./WidgetHeader";
import StatusPill from "./StatusPill";

const accentBorder: Record<NonNullable<DashboardCardProps["accent"]>, string> = {
  blue: "border-t-blue-500/20 dark:border-t-blue-400/20",
  green: "border-t-emerald-500/20 dark:border-t-emerald-400/20",
  purple: "border-t-purple-500/20 dark:border-t-purple-400/20",
  yellow: "border-t-amber-500/20 dark:border-t-amber-400/20",
  red: "border-t-red-500/20 dark:border-t-red-400/20",
};

const variantStyles: Record<NonNullable<DashboardCardProps["variant"]>, string> = {
  default:
    "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-700/50",
  ghost:
    "bg-zinc-50/50 dark:bg-zinc-800/30 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/50",
  bordered:
    "bg-transparent border-zinc-300 dark:border-zinc-600",
};

export default function DashboardCard({
  title,
  subtitle,
  description,
  icon,
  badge,
  children,
  footer,
  className,
  index = 0,
  status,
  accent,
  variant = "default",
}: DashboardCardProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      data-aos-easing="ease-out-cubic"
      className={cn(
        "group flex h-full flex-col rounded-3xl border p-5 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-zinc-900/10 dark:hover:shadow-black/30",
        "hover:border-zinc-300 dark:hover:border-zinc-500/50",
        variantStyles[variant],
        accent && accentBorder[accent],
        className
      )}
    >
      <WidgetHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
        badge={badge ?? (status ? <StatusPill status={status} /> : undefined)}
      />

      {description && (
        <p className="-mt-2 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      <div className="flex-1">{children}</div>

      {footer && (
        <div className="mt-4 border-t border-zinc-200 pt-3 dark:border-zinc-700/50">
          {footer}
        </div>
      )}
    </div>
  );
}
