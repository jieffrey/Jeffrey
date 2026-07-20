import { Activity, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface UmamiWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface TrafficSource {
  name: string;
  percentage: number;
}

interface TopPage {
  path: string;
  views: number;
  trend: number[];
}

const overview: { label: string; value: string }[] = [
  { label: "Visitors", value: "18.3K" },
  { label: "Page Views", value: "45.2K" },
  { label: "Bounce Rate", value: "32%" },
  { label: "Average Visit", value: "4m 32s" },
];

const realtime: number = 8;

const trafficSources: TrafficSource[] = [
  { name: "Google", percentage: 45 },
  { name: "Direct", percentage: 28 },
  { name: "GitHub", percentage: 15 },
  { name: "Twitter", percentage: 12 },
];

const topPages: TopPage[] = [
  { path: "/", views: 12450, trend: [35, 42, 50, 38, 55, 60, 52] },
  { path: "/projects", views: 8900, trend: [25, 32, 28, 35, 40, 38, 42] },
  { path: "/about", views: 5600, trend: [20, 25, 18, 30, 28, 32, 35] },
  { path: "/dashboard", views: 3200, trend: [15, 20, 18, 25, 22, 28, 35] },
];

function UmamiSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 gap-2 @sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="h-2.5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
        <div className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-6 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex h-4 flex-1 items-end gap-0.5">
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="flex-1 rounded-sm bg-zinc-200 dark:bg-zinc-700" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UmamiWidget({ index = 0, loading = false, error = false, onRetry }: UmamiWidgetProps) {
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
        title="Website Analytics"
        subtitle="Umami"
        icon={<Activity size={20} />}
        status="live"
        accent="blue"
        index={index}
        footer={
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Updated 2 minutes ago
          </p>
        }
      >
        <UmamiSkeleton />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Website Analytics"
      subtitle="Umami"
      icon={<Activity size={20} />}
      status="live"
      accent="blue"
      index={index}
      footer={
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Updated 2 minutes ago
        </p>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 @sm:grid-cols-4">
          {overview.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-3xl bg-zinc-50 p-3 dark:bg-zinc-900/40"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
                {label}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-zinc-50 p-3 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Live visitors
            </p>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {realtime}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Active users on site right now
            </span>
          </div>
        </div>

        <div className="grid gap-3 @sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Traffic sources
            </p>
            <div className="space-y-2">
              {trafficSources.map((source) => (
                <div key={source.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                    <span>{source.name}</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Top pages
            </p>
            <div className="space-y-2">
              {topPages.slice(0, 3).map((page) => (
                <div key={page.path} className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-950">
                  <div className="flex items-center justify-between gap-3 text-sm text-zinc-900 dark:text-zinc-100">
                    <span className="truncate">{page.path}</span>
                    <span className="font-semibold">
                      {(page.views / 1000).toFixed(1)}K
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                      style={{ width: `${Math.min(100, page.views / 150)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
