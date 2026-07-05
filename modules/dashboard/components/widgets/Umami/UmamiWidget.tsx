import { Activity } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface UmamiWidgetProps {
  index?: number;
  loading?: boolean;
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
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
          >
            <div className="h-3 w-14 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div>
        <div className="mb-3 h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex h-6 flex-1 items-end gap-[2px]">
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <div
                    key={j}
                    className="flex-1 rounded-sm bg-zinc-200 dark:bg-zinc-700"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UmamiWidget({ index = 0, loading = false }: UmamiWidgetProps) {
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
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {overview.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {realtime} Online
          </span>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Traffic Sources
          </p>
          <div className="space-y-2.5">
            {trafficSources.map((source) => (
              <div key={source.name} className="flex items-center gap-3">
                <span className="w-16 text-sm text-zinc-700 dark:text-zinc-300">
                  {source.name}
                </span>
                <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Top Pages
          </p>
          <div className="space-y-2.5">
            {topPages.map((page) => (
              <div key={page.path} className="flex items-center gap-3">
                <span className="w-24 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {page.path}
                </span>
                <span className="w-12 shrink-0 text-right text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                  {(page.views / 1000).toFixed(1)}K
                </span>
                <div className="flex h-6 flex-1 items-end gap-[2px]">
                  {page.trend.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-emerald-400/60 transition-opacity duration-200 hover:opacity-100"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
