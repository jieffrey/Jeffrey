import { Clock, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";
import { wakatime } from "../../../data/wakatime";

interface WakatimeWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

function WakatimeSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="h-2.5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WakatimeWidget({ index = 0, loading = false, error = false, onRetry }: WakatimeWidgetProps) {
  if (error) {
    return (
        <DashboardCard title="Widget Unavailable">
        <EmptyState
          icon={<WifiOff className="h-6 w-6" aria-hidden="true" />}
          title="Connection Lost"
          description="Unable to load widget data. Please try again."
          action={
            <button
              onClick={onRetry ?? (() => {})}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
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
        title="WakaTime"
        subtitle="Coding Activity"
        icon={<Clock size={20} />}
        status="live"
        accent="green"
        index={index}
      >
        <WakatimeSkeleton />
      </DashboardCard>
    );
  }

  const stats: { label: string; value: string }[] = [
    { label: "Today", value: wakatime.todayTime },
    { label: "Weekly", value: wakatime.weeklyTime },
    { label: "Average / Day", value: wakatime.dailyAverage },
    { label: "Current Streak", value: `${wakatime.currentStreak} days` },
  ];

  return (
    <DashboardCard
      title="WakaTime"
      subtitle="Coding Activity"
      icon={<Clock size={20} />}
      status="live"
      accent="green"
      index={index}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg bg-zinc-50 p-2 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Language Breakdown
          </p>
          <div className="space-y-1.5">
            {wakatime.languageBreakdown.slice(0, 4).map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span className="w-20 truncate text-xs text-zinc-700 dark:text-zinc-300">
                  {lang.name}
                </span>
                <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-xs font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
