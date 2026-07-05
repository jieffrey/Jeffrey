import { GitFork } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { repositories } from "../../../data/repositories";
import type { Repository } from "../../../types";

interface RepositoriesWidgetProps {
  index?: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  PHP: "bg-purple-500",
  Python: "bg-green-500",
  JavaScript: "bg-yellow-500",
  Rust: "bg-orange-600",
  Go: "bg-cyan-500",
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

export default function RepositoriesWidget({
  index = 0,
}: RepositoriesWidgetProps) {
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
                    languageColors[repo.language] ?? "bg-zinc-400"
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
