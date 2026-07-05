"use client";

import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  loading: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
}

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function RefreshButton({
  loading,
  lastUpdated,
  onRefresh,
}: RefreshButtonProps) {
  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/50 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <RefreshCw
          className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
        />
        Refresh
      </button>
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        Last updated {formatRelativeTime(lastUpdated)}
      </span>
    </div>
  );
}
