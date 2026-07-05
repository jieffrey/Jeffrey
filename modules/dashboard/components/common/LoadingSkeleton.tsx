import { cn } from "@/lib/utils";
import type { LoadingSkeletonProps } from "../../types";

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-700/50 dark:bg-zinc-900/80">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-8 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-1/4 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-700/50 dark:bg-zinc-900/80">
      <div className="space-y-3">
        <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

function TextSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-4 w-4/6 rounded bg-zinc-100 dark:bg-zinc-800" />
    </div>
  );
}

const variants = {
  card: CardSkeleton,
  stat: StatSkeleton,
  text: TextSkeleton,
};

export default function LoadingSkeleton({
  variant = "card",
  count = 1,
}: LoadingSkeletonProps) {
  const Component = variants[variant];

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}
