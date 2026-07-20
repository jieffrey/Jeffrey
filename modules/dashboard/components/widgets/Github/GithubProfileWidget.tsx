import { User, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface GithubProfileWidgetProps {
    index?: number;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
}

// Mock data — swap for a real GitHub API call in
// modules/dashboard/services/github.ts once you wire it up.
const profile = {
    name: "Jeffrey Studios",
    handle: "jeffreystudios",
    followers: 103,
    repositories: 28,
};

function GithubProfileSkeleton() {
    return (
        <div className="animate-pulse space-y-5">
            <div className="h-16 w-16 rounded-[20px] bg-zinc-200 dark:bg-zinc-700" />
            <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                {[0, 1].map((i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="h-6 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
                        <div className="h-2.5 w-14 rounded bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function GithubProfileWidget({
    index = 0,
    loading = false,
    error = false,
    onRetry,
}: GithubProfileWidgetProps) {
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
            <DashboardCard status="live" index={index} title="">
                <GithubProfileSkeleton />
            </DashboardCard>
        );
    }

    return (
        <DashboardCard status="live" index={index} title="">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-emerald-50 dark:bg-emerald-950/40">
                <User size={28} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            </div>

            <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {profile.name}
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">@{profile.handle}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                    <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {profile.followers}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">followers</p>
                </div>
                <div>
                    <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {profile.repositories}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">repos</p>
                </div>
            </div>
        </DashboardCard>
    );
}