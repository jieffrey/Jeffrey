import { cn } from "@/lib/utils";
import type { DashboardCardProps } from "../../types";
import WidgetHeader from "./WidgetHeader";
import StatusPill from "./StatusPill";

const variantStyles: Record<
  NonNullable<DashboardCardProps["variant"]>,
  string
> = {
  default: "bg-zinc-50 dark:bg-zinc-900/60",
  ghost: "bg-zinc-50/50 dark:bg-zinc-800/30",
  bordered: "bg-transparent border border-zinc-200 dark:border-zinc-700/50",
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
  variant = "default",
}: DashboardCardProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      data-aos-easing="ease-out-cubic"
      className={cn(
        "group @container relative flex h-full flex-col rounded-[28px] p-6",
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5",
        variantStyles[variant],
        className
      )}
    >
      {/* status reads as a sticker peeking off the top edge instead of a
          border tint — the accent color now lives entirely in this pill
          rather than being smeared across the card border */}
      {status && (
        <div className="absolute -top-2.5 left-6">
          <StatusPill status={status} />
        </div>
      )}

      <WidgetHeader
        icon={icon}
        title={title}
        subtitle={subtitle}
        badge={badge}
      />

      {description && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      {/* flex-1 so this area actually absorbs the extra height when the
          grid row stretches this card to match a taller sibling —
          without it, h-full on the root just adds dead space below */}
      <div className="mt-1 flex-1">{children}</div>

      {footer && (
        <div className="mt-6 border-t border-zinc-200/70 pt-4 dark:border-zinc-700/40">
          {footer}
        </div>
      )}
    </div>
  );
}