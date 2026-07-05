import { ExternalLink, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";
import { github } from "../../../data/github";

interface GithubWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
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

function GithubSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="-mt-2 mb-6 flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-1 h-6 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700/50">
        <div className="h-5 w-24 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-9 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export default function GithubWidget({ index = 0, loading = false, error = false, onRetry }: GithubWidgetProps) {
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
        title={profile.name}
        subtitle={`@${profile.username}`}
        icon={
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
        }
        status="live"
        accent="purple"
        index={index}
      >
        <GithubSkeleton />
      </DashboardCard>
    );
  }

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
