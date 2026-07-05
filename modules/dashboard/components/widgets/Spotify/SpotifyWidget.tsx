import { Music } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";
import { spotify } from "../../../data/spotify";

interface SpotifyWidgetProps {
  index?: number;
}

export default function SpotifyWidget({ index = 0 }: SpotifyWidgetProps) {
  return (
    <DashboardCard
      title="Spotify"
      subtitle="Now Playing"
      icon={<Music size={20} />}
      status={spotify.playing ? "live" : "offline"}
      accent="green"
      index={index}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
          <Music size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {spotify.title}
          </p>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {spotify.artist}
          </p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
            {spotify.album}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
