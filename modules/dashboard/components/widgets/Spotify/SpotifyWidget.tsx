import { Music, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface SpotifyWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface CurrentTrack {
  title: string;
  artist: string;
  duration: number;
  progress: number;
}

// Mock data — swap for a real Spotify Web API call in
// modules/dashboard/services/spotify.ts once you wire it up.
const currentTrack: CurrentTrack = {
  title: "After Dark",
  artist: "Mr.Kitty",
  duration: 234,
  progress: 86,
};

function SpotifySkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export default function SpotifyWidget({
  index = 0,
  loading = false,
  error = false,
  onRetry,
}: SpotifyWidgetProps) {
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
      <DashboardCard status="live" index={index} title="">
        <SpotifySkeleton />
      </DashboardCard>
    );
  }

  const progressPercent = (currentTrack.progress / currentTrack.duration) * 100;

  return (
    <DashboardCard status="live" index={index} title="">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
          <Music size={22} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {currentTrack.title}
          </p>
          <p className="truncate text-sm text-zinc-400 dark:text-zinc-500">
            {currentTrack.artist}
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}