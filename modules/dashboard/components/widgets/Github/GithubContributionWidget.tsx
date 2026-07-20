import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";
import { WifiOff } from "lucide-react";

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

// A single accent (emerald) at four opacities instead of four distinct
// colors — matches the "one accent, used consistently" direction.
const levelOpacity: Record<0 | 1 | 2 | 3, string> = {
  0: "bg-zinc-100 dark:bg-zinc-800",
  1: "bg-emerald-500/25 dark:bg-emerald-400/25",
  2: "bg-emerald-500/55 dark:bg-emerald-400/55",
  3: "bg-emerald-500 dark:bg-emerald-400",
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

    cells.push({ date: date.toISOString().split("T")[0], count, level });
  }

  return cells;
}

function calculateTotal(cells: CellData[]): number {
  return cells.reduce((sum, cell) => sum + cell.count, 0);
}

const cells = generateCells();
const total = calculateTotal(cells);

function ContributionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(53, 1fr)",
          gridTemplateRows: "repeat(7, auto)",
          gridAutoFlow: "column",
        }}
      >
        {Array.from({ length: 371 }, (_, i) => (
          <div key={i} className="aspect-square rounded-[3px] bg-zinc-200 dark:bg-zinc-700" />
        ))}
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
      <DashboardCard status="live" index={index}>
        <ContributionSkeleton />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard status="live" index={index}>
      {/* h-full + justify-center: this card gets stretched to match the
          profile card's height, so center the (shorter) content in that
          space instead of leaving it pinned to the top with a gap below */}
      <div className="flex h-full flex-col justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">contributions this year</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
          {total.toLocaleString()}
        </p>

        <div
          className="mt-5 grid gap-[3px] @container"
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
              className={`aspect-square rounded-[3px] transition duration-200 ease-in-out hover:scale-[1.15] ${levelOpacity[cell.level]}`}
            />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}