import { GitFork, WifiOff, ExternalLink } from "lucide-react";
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
    <div className="animate-pulse space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-start gap-3 p-2">
          <div className="h-5 w-5 mt-0.5 rounded bg-zinc-200 dark:bg-zinc-700 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex gap-3">
              <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
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
          icon={<WifiOff className="h-6 w-6" aria-hidden="true" />}
          title="Connection Lost"
          description="Unable to load widget data. Please try again."
          action={
            <button
              onClick={onRetry ?? (() => { })}
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
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {repositories.length} repositories
          </span>
          <a
            href="https://github.com/jeffreystudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            View all repositories
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      }
    >
      <div className="space-y-1">
        {latest.map((repo: Repository) => (
          <div
            key={repo.name}
            className="flex items-start gap-3 rounded-xl px-2 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"          >
            <GitFork size={16} className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {repo.name}
              </p>
              <p className="mt-0.5 line-clamp-2 leading-5 text-xs text-zinc-500 dark:text-zinc-400">
                {repo.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${languageColors[repo.language] ?? "bg-zinc-400 dark:bg-zinc-500"
                      }`}
                  />
                  {repo.language}
                </span>
                <span>★ {repo.stars}</span>
                <span className="flex items-center gap-0.5">
                  <GitFork size={10} aria-hidden="true" /> {repo.forks}
                </span>
                <span>Updated {formatDate(repo.updated)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
