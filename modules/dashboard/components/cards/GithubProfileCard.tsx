import { Github } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { github } from "../../data/mock";

const stats = [
  { label: "Repositories", value: github.repositories, size: "text-3xl font-bold" },
  { label: "Followers", value: github.followers, size: "text-3xl font-bold" },
  { label: "Following", value: github.following, size: "text-2xl font-semibold" },
  { label: "Commits", value: github.commits, size: "text-2xl font-semibold" },
] as const;

export default function GithubProfileCard() {
  return (
    <DashboardCard
      title="GitHub"
      subtitle="Developer Profile"
      icon={<Github size={20} />}
    >
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value, size }) => (
          <div key={label}>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            <h2 className={`tracking-tight text-zinc-900 dark:text-zinc-100 ${size}`}>
              {value}
            </h2>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
