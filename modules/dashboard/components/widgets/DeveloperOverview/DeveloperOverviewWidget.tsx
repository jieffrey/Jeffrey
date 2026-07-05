import { Command, Sun, Flame, Coffee, Gauge, CheckSquare, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface DeveloperOverviewWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface DeveloperData {
  developer: { name: string };
  currentFocus: string;
  todayGoal: string;
  currentProject: string;
  codingStreak: number;
  coffeeCount: number;
  productivityScore: number;
  tasksCompleted: number;
  tasksTotal: number;
}

const mockData: DeveloperData = {
  developer: { name: "Jeffrey" },
  currentFocus: "Platform Dashboard Module",
  todayGoal: "Complete widget foundation build",
  currentProject: "Portfolio Dashboard",
  codingStreak: 12,
  coffeeCount: 8,
  productivityScore: 92,
  tasksCompleted: 3,
  tasksTotal: 5,
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 22) return "Good evening";
  return "Good night";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OverviewSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-6 w-72 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <div className="h-4 w-56 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-1.5 h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-1 h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DeveloperOverviewWidget({
  index = 0,
  loading = false,
  error = false,
  onRetry,
}: DeveloperOverviewWidgetProps) {
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
        title="Overview"
        subtitle="Command Center"
        icon={<Command size={20} />}
        status="live"
        accent="blue"
        index={index}
      >
        <OverviewSkeleton />
      </DashboardCard>
    );
  }

  const greeting = getGreeting();
  const dateStr = formatDate();
  const timeStr = formatTime();

  const stats: {
    icon: typeof Flame;
    label: string;
    value: string;
  }[] = [
    {
      icon: Flame,
      label: "Streak",
      value: `${mockData.codingStreak} days`,
    },
    {
      icon: Coffee,
      label: "Coffee",
      value: `${mockData.coffeeCount} cups`,
    },
    {
      icon: Gauge,
      label: "Focus",
      value: `${mockData.productivityScore}%`,
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      value: `${mockData.tasksCompleted}/${mockData.tasksTotal}`,
    },
  ];

  return (
    <DashboardCard
      title="Overview"
      subtitle="Command Center"
      icon={<Command size={20} />}
      status="live"
      accent="blue"
      index={index}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Sun size={20} className="text-amber-500 dark:text-amber-400" aria-hidden="true" />
            <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {greeting}, {mockData.developer.name}
            </p>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {dateStr} · {timeStr}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Current Focus
            </p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {mockData.currentFocus}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Today&apos;s Goal
            </p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {mockData.todayGoal}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Current Project
            </p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {mockData.currentProject}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
            >
              <Icon size={16} className="text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
              <p className="mt-1.5 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
