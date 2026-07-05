import { Github, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface GithubContributionWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface CellData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3;
}

const levelColors: Record<0 | 1 | 2 | 3, string> = {
  0: "bg-zinc-100 dark:bg-zinc-800",
  1: "bg-emerald-200 dark:bg-emerald-900/40",
  2: "bg-emerald-400 dark:bg-emerald-700",
  3: "bg-emerald-600 dark:bg-emerald-500",
};

function generateCells(): CellData[] {
  const now = new Date();
  const cells: CellData[] = [];
  const start = new Date(now);
  start.setDate(start.getDate() - 370);
  start.setDate(start.getDate() - start.getDay());

  for (let i = 0; i < 371; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const week = Math.floor(i / 7);
    const day = i % 7;
    const weekendPenalty = day === 0 || day === 6 ? 0.3 : 1;
    const weekFactor = 0.3 + Math.sin(week * 0.5) * 0.3 + 0.4;
    const raw = (Math.sin(i * 0.7) * 0.5 + 0.5) * weekendPenalty * weekFactor;
    const level: 0 | 1 | 2 | 3 = raw < 0.3 ? 0 : raw < 0.5 ? 1 : raw < 0.75 ? 2 : 3;
    const count = level === 0 ? 0 : Math.floor(raw * 15);

    cells.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return cells;
}

function calculateStreak(cells: CellData[]): number {
  let streak = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].level > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateTotal(cells: CellData[]): number {
  return cells.reduce((sum, cell) => sum + cell.count, 0);
}

const cells = generateCells();
const total = calculateTotal(cells);
const streak = calculateStreak(cells);

function ContributionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center gap-8">
        <div className="space-y-1">
          <div className="h-8 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
        <div className="space-y-1">
          <div className="h-8 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(53, 1fr)",
          gridTemplateRows: "repeat(7, auto)",
          gridAutoFlow: "column",
        }}
      >
        {Array.from({ length: 371 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px] bg-zinc-200 dark:bg-zinc-700"
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export default function GithubContributionWidget({
  index = 0,
  loading = false,
  error = false,
  onRetry,
}: GithubContributionWidgetProps) {
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
        title="Contributions"
        subtitle="Realtime Activity"
        icon={<Github size={20} />}
        status="live"
        accent="green"
        index={index}
      >
        <ContributionSkeleton />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Contributions"
      subtitle="Realtime Activity"
      icon={<Github size={20} />}
      status="live"
      accent="green"
      index={index}
      footer={
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Less</span>
          {([0, 1, 2, 3] as const).map((level) => (
            <div
              key={level}
              className={`h-3 w-3 rounded-[2px] ${levelColors[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      }
    >
      <div className="mb-3 flex items-center gap-6">
        <div>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {total.toLocaleString()}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            contributions
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {streak}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            day streak
          </p>
        </div>
      </div>

      <div
        className="grid gap-[3px] overflow-x-auto"
        style={{
          gridTemplateColumns: "repeat(53, 1fr)",
          gridTemplateRows: "repeat(7, auto)",
          gridAutoFlow: "column",
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell.date}
            title={`${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${cell.date}`}
            className={`aspect-square rounded-[3px] transition duration-200 ease-in-out hover:scale-[1.15] ${levelColors[cell.level]}`}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
