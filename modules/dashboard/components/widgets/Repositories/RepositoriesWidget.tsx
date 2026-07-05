import { GitFork } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { repositories } from "../../../data/repositories";

interface RepositoriesWidgetProps {
  index?: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  PHP: "bg-purple-500",
  Python: "bg-green-500",
  JavaScript: "bg-yellow-500",
};

export default function RepositoriesWidget({ index = 0 }: RepositoriesWidgetProps) {
  return (
    <DashboardCard
      title="Repositories"
      subtitle="Pinned Projects"
      icon={<GitFork size={20} />}
      status="mock"
      accent="yellow"
      index={index}
    >
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div
            key={repo.name}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/50 dark:bg-zinc-800/50"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {repo.name}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {repo.description}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-3 w-3 rounded-full ${
                    languageColors[repo.language] ?? "bg-zinc-400"
                  }`}
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {repo.language}
                </span>
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                ★ {repo.stars}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
