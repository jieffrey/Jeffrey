import { Target, CheckCircle2, Circle, Calendar, Award, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";
import { mission } from "../../../data/mission";
import type { MissionPriority } from "../../../types";

interface MissionWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const priorityStyles: Record<MissionPriority, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function MissionSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="space-y-1">
        <div className="h-5 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-64 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-3 w-14 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-3 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="col-span-2 space-y-1">
          <div className="h-3 w-14 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-[18px] w-[18px] rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 flex-1 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MissionWidget({ index = 0, loading = false, error = false, onRetry }: MissionWidgetProps) {
  if (error) {
    return (
        <DashboardCard title="Widget Unavailable">
        <EmptyState
          icon={<WifiOff className="h-6 w-6" />}
          title="Connection Lost"
          description="Unable to load widget data. Please try again."
          action={
            <button
              onClick={onRetry ?? (() => {})}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Retry
            </button>
          }
        />
      </DashboardCard>
    );
  }

  if (loading) {
    return (
      <DashboardCard
        title="Mission"
        subtitle="Current Objective"
        icon={<Target size={20} />}
        status="live"
        accent="blue"
        index={index}
      >
        <MissionSkeleton />
      </DashboardCard>
    );
  }

  const completedCount = mission.checklist.filter((t) => t.completed).length;

  return (
    <DashboardCard
      title="Mission"
      subtitle="Current Objective"
      icon={<Target size={20} />}
      status="live"
      accent="blue"
      index={index}
    >
      <div className="space-y-5">
        <div>
          <h4 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {mission.title}
          </h4>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {mission.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">Progress</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {mission.progress}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${mission.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <Calendar size={12} />
              <span>Deadline</span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {formatDate(mission.deadline)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Priority</p>
            <span
              className={`mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[mission.priority]}`}
            >
              {mission.priority}
            </span>
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <Award size={12} />
              <span>Reward</span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {mission.reward}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Checklist
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {completedCount}/{mission.checklist.length}
            </p>
          </div>
          {mission.checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              {item.completed ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
              ) : (
                <Circle
                  size={18}
                  className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-600"
                />
              )}
              <span
                className={`text-sm leading-relaxed ${
                  item.completed
                    ? "text-zinc-400 line-through dark:text-zinc-500"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
