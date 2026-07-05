import type { ReactNode } from "react";

export type WidgetStatus = "live" | "mock" | "offline";
export type WidgetAccent = "blue" | "green" | "purple" | "yellow" | "red";
export type CardVariant = "default" | "ghost" | "bordered";

export interface WidgetConfig {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export interface StatItem {
  title: string;
  value: string | number;
  change?: string;
}

export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
}

export interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  playing: boolean;
}

export interface GithubStats {
  followers: number;
  following: number;
  repositories: number;
  commits: number;
}

export interface DashboardCardProps {
  title: string;
  subtitle?: ReactNode;
  description?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  index?: number;
  status?: WidgetStatus;
  accent?: WidgetAccent;
  variant?: CardVariant;
}

export interface WidgetHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  badge?: ReactNode;
  status?: WidgetStatus;
  action?: ReactNode;
}

export interface StatusPillProps {
  status: WidgetStatus;
  size?: "sm" | "md";
}

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export interface LoadingSkeletonProps {
  variant?: "card" | "stat" | "text";
  count?: number;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export type MissionPriority = "High" | "Medium" | "Low";

export interface MissionChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Mission {
  title: string;
  description: string;
  status: string;
  currentFocus: string;
  progress: number;
  deadline: string;
  priority: MissionPriority;
  reward: string;
  checklist: MissionChecklistItem[];
}

export interface Visitors {
  total: number;
  today: number;
  weekly: number;
  monthly: number;
  change: string;
}

export interface LanguageBreakdown {
  name: string;
  percentage: number;
  color: string;
}

export interface WakatimeStats {
  totalHours: number;
  dailyAverage: string;
  languages: string[];
  currentStreak: number;
  bestDay: string;
  todayTime: string;
  weeklyTime: string;
  languageBreakdown: LanguageBreakdown[];
}

export interface MonkeytypeStats {
  wpm: number;
  accuracy: number;
  testsCompleted: number;
  highestWpm: number;
  rank: string;
}

export interface UmamiStats {
  pageViews: number;
  visitors: number;
  bounceRate: string;
  avgDuration: string;
}
