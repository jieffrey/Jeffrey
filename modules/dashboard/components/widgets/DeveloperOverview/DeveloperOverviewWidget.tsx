import { Command, Sun, Flame, Coffee, Gauge, CheckSquare } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

interface DeveloperOverviewWidgetProps {
  index?: number;
  loading?: boolean;
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
}: DeveloperOverviewWidgetProps) {
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
            <Sun size={20} className="text-amber-500" />
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
              <Icon size={16} className="text-zinc-400 dark:text-zinc-500" />
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
