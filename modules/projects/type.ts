export type Project = {
  title: string;
  description: string;
  category: string;
  status: "live" | "development" | "archived";
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
};
