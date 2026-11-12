import type { Localized } from "./localized";

/** Illustrated face used for a project on The Line and in Work. */
export type ProjectFace = "lapor" | "wavy" | "mst";

export type ProjectStatus = "active" | "shipped" | "archived";

export interface Project {
  slug: string;
  /** Product name. Not translated. */
  title: string;
  /** Short name for tight spaces (print captions). */
  shortTitle: string;
  face: ProjectFace;
  /** One-line category, e.g. "Smart geo complaint system". */
  kind: Localized;
  summary: Localized;
  status: ProjectStatus;
  tags: string[];
  /* Case-study fields for /work/[slug] (phase 4). */
  role: Localized;
  year: string;
  problem: Localized;
  built: Localized;
  screenshots: string[];
  links: { live?: string; github?: string };
}

// TODO(kalsah): every value in [brackets] below is a placeholder for you.
const TODO: Localized = { en: "[To be written]", id: "[Belum ditulis]" };

/**
 * Featured projects, in display order. The older practice projects are kept
 * untouched in ./projects-archive.ts until phase 4 decides where they go.
 */
export const PROJECTS: Project[] = [
  {
    slug: "laporaja",
    title: "LaporAja",
    shortTitle: "LaporAja",
    face: "lapor",
    kind: {
      en: "Smart geo complaint system",
      id: "Sistem pengaduan berbasis lokasi",
    },
    summary: {
      en: "Residents drop a pin on the map, report a problem, and follow it until it is fixed. One API serving a web dashboard and a mobile app.",
      id: "Warga menandai lokasi di peta, melaporkan masalah, lalu memantaunya sampai beres. Satu API untuk dashboard web dan aplikasi mobile.",
    },
    status: "active",
    tags: ["Hono", "Bun", "PostgreSQL", "Next.js", "Expo"],
    role: TODO,
    year: "[Year]",
    problem: TODO,
    built: TODO,
    screenshots: [],
    links: {},
  },
  {
    slug: "wavy",
    title: "Wavy",
    shortTitle: "Wavy",
    face: "wavy",
    kind: {
      en: "Concert ticket marketplace",
      id: "Marketplace tiket konser",
    },
    summary: {
      en: "A concert ticket marketplace built with a teammate. The backend runs on Bun and Hono with raw SQL on Neon.",
      id: "Marketplace tiket konser yang saya bangun bersama satu rekan tim. Backend-nya berjalan di Bun dan Hono dengan raw SQL di Neon.",
    },
    status: "shipped",
    tags: ["Bun", "Hono", "Neon", "SQL"],
    role: TODO,
    year: "[Year]",
    problem: TODO,
    built: TODO,
    screenshots: [],
    links: {},
  },
  {
    slug: "mountain-safety-tracker",
    title: "Mountain Safety Tracker",
    shortTitle: "Mountain Safety",
    face: "mst",
    kind: {
      en: "Client project · Hiking safety",
      id: "Proyek klien · Keselamatan pendakian",
    },
    summary: {
      en: "A mobile app for hikers and a basecamp dashboard for rangers: live GPS tracking, offline sync when the signal drops, and geofencing alerts.",
      id: "Aplikasi mobile untuk pendaki dan dashboard basecamp untuk ranger: pelacakan GPS langsung, sinkronisasi offline saat sinyal hilang, dan peringatan geofencing.",
    },
    status: "shipped",
    tags: ["GPS", "Offline sync", "Geofencing", "Dashboard"],
    role: TODO,
    year: "[Year]",
    problem: TODO,
    built: TODO,
    screenshots: [],
    links: {},
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
