import { ReactNode } from "react";

export interface DashboardWidget {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: string;
}

export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
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

