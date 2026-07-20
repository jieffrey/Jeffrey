import { Keyboard, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface MonkeytypeWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface TestResult {
  wpm: number;
  accuracy: number;
}

const stats: {
  wpm: number;
  accuracy: number;
  duration: string;
  consistency: number;
} = {
  wpm: 149,
  accuracy: 97.5,
  duration: "2m 34s",
  consistency: 92.3,
};

const sparklineData: number[] = [
  20, 35, 55, 45, 60, 75, 65, 50, 70, 85,
  78, 90, 82, 72, 88, 95, 80, 68, 85, 92,
];

const recentTests: TestResult[] = [
  { wpm: 150, accuracy: 97.8 },
  { wpm: 148, accuracy: 96.2 },
  { wpm: 152, accuracy: 98.1 },
  { wpm: 145, accuracy: 95.5 },
  { wpm: 149, accuracy: 97.0 },
];

const achievements: { label: string; value: string }[] = [
  { label: "Fastest", value: "162 WPM" },
  { label: "Best Accuracy", value: "99%" },
  { label: "Best Consistency", value: "94%" },
];

function MonkeytypeSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 gap-3 @sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="h-2.5 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div>
        <div className="mb-1.5 h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="flex h-[70px] items-end gap-[3px]">
          {sparklineData.map((_, i) => (
            <div key={i} className="flex-1 rounded-sm bg-zinc-200 dark:bg-zinc-700" />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between rounded p-1.5 bg-zinc-50 dark:bg-zinc-800/30">
              <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-2.5 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1.5 h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
              <div className="h-2.5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="mt-0.5 h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MonkeytypeWidget({
  index = 0,
  loading = false,
  error = false,
  onRetry,
}: MonkeytypeWidgetProps) {
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
        title="Monkeytype"
        subtitle="Typing Statistics"
        icon={<Keyboard size={20} />}
        status="mock"
        accent="purple"
        index={index}
        footer={
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Last synced today
          </p>
        }
      >
        <MonkeytypeSkeleton />
      </DashboardCard>
    );
  }

  const topStats: { label: string; value: string }[] = [
    { label: "WPM", value: stats.wpm.toString() },
    { label: "Accuracy", value: `${stats.accuracy}%` },
    { label: "Duration", value: stats.duration },
    { label: "Consistency", value: `${stats.consistency}%` },
  ];

  return (
    <DashboardCard
      title="Monkeytype"
      subtitle="Typing Performance"
      icon={<Keyboard size={20} />}
      status="mock"
      accent="purple"
      index={index}
      footer={
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Last synced today
        </p>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 @sm:grid-cols-4">
          {topStats.map(({ label, value }) => (
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

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Recent sessions
            </p>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              Best: {achievements[0].value}
            </span>
          </div>
          <div className="space-y-2">
            {recentTests.map((test, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {test.wpm} WPM
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {test.accuracy}% acc
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
