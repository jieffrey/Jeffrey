/**
 * GitHub data for the Now dashboard.
 *
 * Components only depend on the types in this file. To go live, implement
 * getLiveGithub() and switch getGithub() to call it; no UI code changes.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** ISO date, yyyy-mm-dd. */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface GithubProfile {
  name: string;
  /** GitHub handle without the @. */
  login: string;
  avatarUrl: string | null;
  repos: number;
  stars: number;
  followers: number;
}

export interface WeeklyCommits {
  /** ISO date of the first day of the week. */
  weekStart: string;
  commits: number;
}

export interface LanguageShare {
  name: string;
  /** Share of code, 0–100. */
  percent: number;
}

export interface GithubData {
  /** False while the numbers are mock data. Drives the MOCK DATA chip. */
  live: boolean;
  profile: GithubProfile;
  contributions: {
    /** Total in the last 52 weeks. */
    total: number;
    /** Current streak in days. */
    streak: number;
    /** Oldest week first; each week runs Sunday to Saturday. */
    weeks: ContributionDay[][];
  };
  /** Last 26 weeks, oldest first. */
  weeklyCommits: WeeklyCommits[];
  /** Change of the weekly average versus the previous period, in percent. */
  weeklyDelta: number;
  languages: LanguageShare[];
  /** Commits per weekday, Monday first (7 values). */
  weekdayCommits: number[];
}

const DAY_MS = 86_400_000;
const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Same linear congruential generator as the prototype, so mocks are stable. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

const MOCK_WEEKLY = [
  22, 28, 25, 31, 27, 34, 30, 26, 33, 39, 35, 41, 37, 33, 42, 46, 40, 44, 49,
  52, 47, 51, 48, 55, 53, 58,
];

/** Deterministic mock data shaped like the real thing. */
export function getMockGithub(now: Date = new Date()): GithubData {
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const start = new Date(today.getTime() - (52 * 7 + today.getUTCDay()) * DAY_MS);
  const random = createRandom(7);

  const weeks: ContributionDay[][] = [];
  for (let w = 0; w < 53; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY_MS);
      if (date > today) continue;
      const r = random() + (w / 53) * 0.35 - (d === 0 || d === 6 ? 0.22 : 0);
      const level: ContributionLevel =
        r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.95 ? 3 : 4;
      const count = [
        0,
        1 + Math.floor(random() * 3),
        4 + Math.floor(random() * 4),
        8 + Math.floor(random() * 5),
        13 + Math.floor(random() * 8),
      ][level];
      week.push({ date: isoDate(date), count, level });
    }
    if (week.length) weeks.push(week);
  }

  const weekStart = new Date(today.getTime() - today.getUTCDay() * DAY_MS);
  const weeklyCommits = MOCK_WEEKLY.map((commits, i) => ({
    weekStart: isoDate(
      new Date(weekStart.getTime() - (MOCK_WEEKLY.length - 1 - i) * 7 * DAY_MS),
    ),
    commits,
  }));

  return {
    live: false,
    profile: {
      name: "Kalsah",
      login: "jieffrey",
      avatarUrl: null,
      repos: 32,
      stars: 87,
      followers: 54,
    },
    contributions: {
      total: weeks.flat().reduce((sum, day) => sum + day.count, 0),
      streak: 23,
      weeks,
    },
    weeklyCommits,
    weeklyDelta: 22,
    languages: [
      { name: "TypeScript", percent: 58 },
      { name: "SQL", percent: 14 },
      { name: "CSS", percent: 12 },
      { name: "JavaScript", percent: 9 },
      { name: "Other", percent: 7 },
    ],
    weekdayCommits: [42, 55, 61, 48, 37, 19, 24],
  };
}

export async function getLiveGithub(): Promise<GithubData> {
  // TODO(kalsah): wire API. Suggested sources: GraphQL `contributionsCollection`
  // for the calendar and streak, REST /users/:login for the profile, and
  // /repos/:owner/:repo/languages aggregated for the language shares.
  throw new Error("getLiveGithub() is not implemented yet");
}

/** The single entry point the page uses. */
export async function getGithub(): Promise<GithubData> {
  // TODO(kalsah): switch to `return getLiveGithub()` once it is implemented.
  return getMockGithub();
}
