import { ExternalLink } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { github } from "../../../data/github";

interface GithubWidgetProps {
  index?: number;
}

interface GithubProfile {
  name: string;
  username: string;
  bio: string;
  initials: string;
  stars: number;
  primaryLanguage: string;
}

const profile: GithubProfile = {
  name: "Jeffrey",
  username: "jeffreystudios",
  bio: "Full-stack developer passionate about building elegant, performant web experiences with modern technologies.",
  initials: "J",
  stars: 45,
  primaryLanguage: "TypeScript",
};

export default function GithubWidget({ index = 0 }: GithubWidgetProps) {
  const stats: { label: string; value: number }[] = [
    { label: "Followers", value: github.followers },
    { label: "Following", value: github.following },
    { label: "Repositories", value: github.repositories },
    { label: "Stars", value: profile.stars },
  ];

  return (
    <DashboardCard
      icon={
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-purple-500 text-sm font-bold text-white">
          {profile.initials}
        </div>
      }
      title={profile.name}
      subtitle={`@${profile.username}`}
      status="live"
      accent="purple"
      index={index}
      footer={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              Language:
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {profile.primaryLanguage}
            </span>
          </div>
          <a
            href={`https://github.com/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <ExternalLink size={16} />
            View GitHub
          </a>
        </div>
      }
    >
      <p className="-mt-2 mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.bio}
      </p>

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
