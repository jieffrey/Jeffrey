import type { GithubStats } from "../types";

export const github: GithubStats = {
  followers: 103,
  following: 74,
  repositories: 28,
  commits: 3482,
};

export interface Contribution {
  id: number;
  level: number;
}

export const contributions: Contribution[] = Array.from(
  { length: 210 },
  (_, index) => ({
    id: index,
    level: Math.floor(Math.random() * 4),
  })
);
