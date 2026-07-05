import { Keyboard } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface MonkeytypeWidgetProps {
  index?: number;
  loading?: boolean;
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
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
          >
            <div className="h-3 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div>
        <div className="mb-3 h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="flex h-24 items-end gap-[3px]">
          {sparklineData.map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-zinc-200 dark:bg-zinc-700"
              style={{ height: `${sparklineData[i]}%` }}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg p-2.5"
            >
              <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-14 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
            >
              <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="mt-1 h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
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
}: MonkeytypeWidgetProps) {
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
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {topStats.map(({ label, value }) => (
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

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Performance
          </p>
          <div className="flex h-24 items-end gap-[3px]">
            {sparklineData.map((value, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-emerald-500/60 opacity-80 transition-all duration-200 hover:opacity-100"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Recent Tests
          </p>
          <div className="space-y-1">
            {recentTests.map((test, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {test.wpm} WPM
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {test.accuracy}% acc
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Achievements
          </p>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.label}
                className="rounded-xl bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {ach.label}
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {ach.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
