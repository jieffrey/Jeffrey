import { Music, SkipBack, Play, SkipForward, WifiOff } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import EmptyState from "../../common/EmptyState";

interface SpotifyWidgetProps {
  index?: number;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

interface Track {
  title: string;
  artist: string;
  album: string;
}

interface CurrentTrack extends Track {
  duration: number;
  progress: number;
}

const currentTrack: CurrentTrack = {
  title: "After Dark",
  artist: "Mr.Kitty",
  album: "After Dark",
  duration: 234,
  progress: 86,
};

const recentlyPlayed: Track[] = [
  { title: "Glimpse of Us", artist: "Joji", album: "Glimpse of Us" },
  { title: "Drunk", artist: "Keshi", album: "Drunk" },
  { title: "Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM" },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SpotifySkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="aspect-square w-full rounded-xl bg-zinc-200 dark:bg-zinc-700" />
      <div className="space-y-1.5">
        <div className="h-5 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex justify-between">
          <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-3 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div>
        <div className="mb-3 h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="space-y-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg p-2">
              <div className="h-9 w-9 rounded-md bg-zinc-200 dark:bg-zinc-700" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SpotifyWidget({ index = 0, loading = false, error = false, onRetry }: SpotifyWidgetProps) {
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
        title="Spotify"
        subtitle="Currently Listening"
        icon={<Music size={20} />}
        status="live"
        accent="green"
        index={index}
        footer={
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Connected with Spotify
          </p>
        }
      >
        <SpotifySkeleton />
      </DashboardCard>
    );
  }

  const progressPercent = (currentTrack.progress / currentTrack.duration) * 100;

  return (
    <DashboardCard
      title="Spotify"
      subtitle="Currently Listening"
      icon={<Music size={20} />}
      status="live"
      accent="green"
      index={index}
      footer={
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Connected with Spotify
        </p>
      }
    >
      <div className="space-y-5">
        <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-zinc-100 backdrop-blur-sm dark:bg-zinc-800">
          <Music size={48} className="text-zinc-400 dark:text-zinc-600" />
        </div>

        <div>
          <p className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {currentTrack.title}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {currentTrack.artist}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
            <span>{formatTime(currentTrack.progress)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <SkipBack
            size={20}
            className="cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300">
            <Play
              size={20}
              className="ml-0.5 text-white dark:text-zinc-900"
            />
          </div>
          <SkipForward
            size={20}
            className="cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Recently Played
          </p>
          <div className="space-y-1">
            {recentlyPlayed.map((track) => (
              <div
                key={`${track.title}-${track.artist}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-700">
                  <Music size={14} className="text-zinc-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
