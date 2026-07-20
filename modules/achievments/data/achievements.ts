import type { Certificate } from "../type";

export const CERTIFICATES: Certificate[] = [
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    category: "Frontend",
    date: "Jan 2025",
    credentialUrl: "#",
    skills: ["React", "Hooks", "Redux", "Next.js"],
  },
  {
    title: "Node.js, Express, MongoDB & More",
    issuer: "Udemy",
    category: "Backend",
    date: "Mar 2025",
    credentialUrl: "#",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    title: "TypeScript Masterclass",
    issuer: "Zero To Mastery",
    category: "Frontend",
    date: "Feb 2025",
    credentialUrl: "#",
    skills: ["TypeScript", "Generics", "OOP"],
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    issuer: "Udemy",
    category: "Mobile",
    date: "Apr 2025",
    credentialUrl: "#",
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "SQL & PostgreSQL for Beginners",
    issuer: "Udemy",
    category: "Database",
    date: "Dec 2024",
    credentialUrl: "#",
    skills: ["PostgreSQL", "SQL", "Database Design"],
  },
  {
    title: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy",
    category: "Tools",
    date: "May 2025",
    credentialUrl: "#",
    skills: ["Docker", "Kubernetes", "DevOps"],
  },
];

export const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "Database", "Tools"];

export const ISSUER_COLORS: Record<string, string> = {
  "Udemy": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  "Zero To Mastery": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  "Coursera": "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400",
  "default": "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};