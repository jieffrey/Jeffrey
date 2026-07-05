import { GitFork, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";
import { repositories } from "../../../data/repositories";
import type { Repository } from "../../../types";

interface RepositoriesWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500 dark:bg-blue-400",
  PHP: "bg-purple-500 dark:bg-purple-400",
  Python: "bg-green-500 dark:bg-green-400",
  JavaScript: "bg-yellow-500 dark:bg-yellow-400",
  Rust: "bg-orange-600 dark:bg-orange-500",
  Go: "bg-cyan-500 dark:bg-cyan-400",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const latest = repositories.slice(0, 3);

function RepositoriesSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 gap-4 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/50 dark:bg-zinc-800/50"
        >
          <div className="h-5 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-2 space-y-1.5">
            <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="mt-3 h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

export default function RepositoriesWidget({
  index = 0,
  loading = false,
  error = false,
  onRetry,
}: RepositoriesWidgetProps) {
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
        title="Repositories"
        subtitle="Latest Projects"
        icon={<GitFork size={20} />}
        status="mock"
        accent="yellow"
        index={index}
      >
        <RepositoriesSkeleton />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Repositories"
      subtitle="Latest Projects"
      icon={<GitFork size={20} />}
      status="mock"
      accent="yellow"
      index={index}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {latest.map((repo: Repository) => (
          <div
            key={repo.name}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:border-zinc-500"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {repo.name}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
              {repo.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    languageColors[repo.language] ?? "bg-zinc-400 dark:bg-zinc-500"
                  }`}
                />
                <span>{repo.language}</span>
              </div>
              <span className="flex items-center gap-1">
                ★ {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} /> {repo.forks}
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              Updated {formatDate(repo.updated)}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
