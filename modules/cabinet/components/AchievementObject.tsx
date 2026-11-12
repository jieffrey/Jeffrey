import type { ReactNode } from "react";
import type { AchievementKind } from "@/lib/data/achievements";
import { cn } from "@/lib/utils";

/** Surface color per kind of object (design tokens). */
const SURFACE: Record<AchievementKind, string> = {
  award: "bg-yellow",
  certificate: "bg-print",
  hackathon: "bg-violet-2",
  medal: "bg-teal",
  milestone: "bg-pink",
};

const ICON: Record<AchievementKind, ReactNode> = {
  award: (
    <>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3" />
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M7 9h10M7 12h6" />
      <circle cx="16" cy="19" r="2.5" />
    </>
  ),
  hackathon: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  milestone: (
    <>
      <path d="M4 21V4" />
      <path d="M4 4h12l-2 4 2 4H4" />
    </>
  ),
};

interface AchievementObjectProps {
  kind: AchievementKind;
  /** Icon size in px. */
  size?: number;
  className?: string;
}

/** The colored "object" that stands for an achievement. Decorative. */
export default function AchievementObject({
  kind,
  size = 72,
  className,
}: AchievementObjectProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center text-ink-static inset-ring-[1.5px] inset-ring-ink-static/12",
        SURFACE[kind],
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICON[kind]}
      </svg>
    </div>
  );
}
