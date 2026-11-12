export type ProjectStatus = "live" | "development" | "archived";

export interface TechDecision {
  title: string;
  description: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface TimelinePhase {
  phase: string;
  description: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface ProjectDetail {
  problem: string;
  solution: string;
  gallery: string[];
  keyFeatures: KeyFeature[];
  techDecisions: TechDecision[];
  timeline: TimelinePhase[];
  challenges: Challenge[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
  thumbnail: string;
  detail: ProjectDetail;
}
