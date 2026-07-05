import { cn } from "@/lib/utils";
import DashboardCard from "./DashboardCard";
import type { WidgetStatus, WidgetAccent, CardVariant } from "../../types";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  index?: number;
  icon?: React.ReactNode;
  status?: WidgetStatus;
  accent?: WidgetAccent;
  variant?: CardVariant;
  className?: string;
  changeClassName?: string;
}

export default function StatCard({
  title,
  value,
  change,
  index = 0,
  icon,
  status,
  accent,
  variant,
  className,
  changeClassName,
}: StatCardProps) {
  return (
    <DashboardCard
      title={title}
      subtitle="Overview"
      icon={icon}
      status={status}
      accent={accent}
      variant={variant}
      index={index}
      className={className}
    >
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {value}
        </h2>

        {change && (
          <p
            className={cn(
              "text-sm font-medium text-emerald-500",
              changeClassName
            )}
          >
            {change}
          </p>
        )}
      </div>
    </DashboardCard>
  );
}
