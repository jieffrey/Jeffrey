import { Globe, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface VisitorsWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface CountryData {
  flag: string;
  name: string;
  percentage: number;
}

const visitorsData: {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
  topCountries: CountryData[];
} = {
  today: 142,
  weekly: 1056,
  monthly: 4200,
  total: 18300,
  topCountries: [
    { flag: "🇮🇩", name: "Indonesia", percentage: 42 },
    { flag: "🇯🇵", name: "Japan", percentage: 18 },
    { flag: "🇸🇬", name: "Singapore", percentage: 12 },
    { flag: "🇺🇸", name: "United States", percentage: 9 },
    { flag: "🇩🇪", name: "Germany", percentage: 6 },
  ],
};

function VisitorsSkeleton() {
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
        <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-5 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 flex-1 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-2 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-6 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisitorsWidget({ index = 0, loading = false, error = false, onRetry }: VisitorsWidgetProps) {
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
        title="Visitors"
        subtitle="Analytics Overview"
        icon={<Globe size={20} />}
        status="mock"
        accent="blue"
        index={index}
        footer={
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Updated 5 minutes ago
          </p>
        }
      >
        <VisitorsSkeleton />
      </DashboardCard>
    );
  }

  const metrics: { label: string; value: string }[] = [
    { label: "Today", value: visitorsData.today.toLocaleString() },
    { label: "This Week", value: visitorsData.weekly.toLocaleString() },
    { label: "This Month", value: visitorsData.monthly.toLocaleString() },
    { label: "Total", value: visitorsData.total.toLocaleString() },
  ];

  return (
    <DashboardCard
      title="Visitors"
      subtitle="Analytics Overview"
      icon={<Globe size={20} />}
      status="mock"
      accent="blue"
      index={index}
      footer={
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Updated 5 minutes ago
        </p>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 @sm:grid-cols-4">
          {metrics.map(({ label, value }) => (
            <div key={label} className="rounded-3xl bg-zinc-50 p-3 dark:bg-zinc-900/40">
              <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
                {label}
              </p>
              <p className="mt-2 text-lg font-semibold leading-none text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Top regions
            </p>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              Total {visitorsData.total.toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            {visitorsData.topCountries.slice(0, 4).map((country) => (
              <div key={country.name} className="flex items-center gap-3">
                <span className="text-base leading-none">{country.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {country.name}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {country.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
