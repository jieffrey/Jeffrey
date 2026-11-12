/** Design-token names usable as chip colors. */
export type ChipColor =
  | "violet"
  | "ink-static"
  | "paper-static"
  | "print"
  | "pink"
  | "orange"
  | "blue"
  | "lime"
  | "yellow"
  | "teal";

/** Logo keys resolved to Simple Icons in StackOrbit.tsx. */
export type StackIcon =
  | "typescript"
  | "react"
  | "nextjs"
  | "bun"
  | "hono"
  | "postgresql"
  | "expo"
  | "tailwind"
  | "neon"
  | "shadcn"
  | "git"
  | "figma"
  | "vercel";

export interface StackItem {
  name: string;
  /** Omitted when Simple Icons has no logo; the chip then shows a monogram. */
  icon?: StackIcon;
  bg: ChipColor;
  fg?: ChipColor;
}

export interface StackRing {
  id: "core" | "build" | "extras";
  /** Ring radius in % of the container width. */
  radius: number;
  items: StackItem[];
}

/**
 * The stack, by ring. Taken from the prototype.
 * TODO(kalsah): adjust to your real stack. Motion, Zustand, next-intl and
 * bklit have no logo in Simple Icons; add `icon` once you have SVGs for them.
 */
export const STACK_RINGS: StackRing[] = [
  {
    id: "core",
    radius: 22,
    items: [
      { name: "TypeScript", icon: "typescript", bg: "violet", fg: "print" },
      { name: "React", icon: "react", bg: "ink-static", fg: "paper-static" },
      { name: "Next.js", icon: "nextjs", bg: "print" },
      { name: "Bun", icon: "bun", bg: "pink" },
    ],
  },
  {
    id: "build",
    radius: 35,
    items: [
      { name: "Hono", icon: "hono", bg: "orange" },
      { name: "PostgreSQL", icon: "postgresql", bg: "blue", fg: "print" },
      { name: "React Native", icon: "react", bg: "lime" },
      { name: "Expo", icon: "expo", bg: "yellow" },
      { name: "Tailwind", icon: "tailwind", bg: "teal" },
      { name: "Neon", icon: "neon", bg: "print" },
    ],
  },
  {
    id: "extras",
    radius: 48,
    items: [
      { name: "Motion", bg: "pink" },
      { name: "Zustand", bg: "print" },
      { name: "shadcn/ui", icon: "shadcn", bg: "ink-static", fg: "paper-static" },
      { name: "next-intl", bg: "lime" },
      { name: "bklit", bg: "violet", fg: "print" },
      { name: "Git", icon: "git", bg: "orange" },
      { name: "Figma", icon: "figma", bg: "yellow" },
      { name: "Vercel", icon: "vercel", bg: "print" },
    ],
  },
];

/** Starting angle of chip `index` on ring `ringIndex`, in degrees. */
export function chipAngle(ringIndex: number, index: number, count: number) {
  return (index / count) * 360 + ringIndex * 20;
}
