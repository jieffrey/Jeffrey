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
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50"
          >
            <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-7 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div>
        <div className="mb-3 h-3 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-2.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WakatimeWidget({ index = 0, loading = false, error = false, onRetry }: WakatimeWidgetProps) {
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
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-zinc-50 p-4 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Language Breakdown
          </p>
          <div className="space-y-3">
            {wakatime.languageBreakdown.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span className="w-24 truncate text-sm text-zinc-700 dark:text-zinc-300">
                  {lang.name}
                </span>
                <div className="h-2.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
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
