import { Github } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { github } from "../../../data/github";

interface GithubWidgetProps {
  index?: number;
}

export default function GithubWidget({ index = 0 }: GithubWidgetProps) {
  const stats: { label: string; value: number }[] = [
    { label: "Repositories", value: github.repositories },
    { label: "Followers", value: github.followers },
    { label: "Following", value: github.following },
    { label: "Commits", value: github.commits },
  ];

  return (
    <DashboardCard
      title="GitHub"
      subtitle="Developer Profile"
      icon={<Github size={20} />}
      status="live"
      accent="purple"
      index={index}
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
