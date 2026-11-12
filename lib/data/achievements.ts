import type { Localized } from "./localized";

export type AchievementKind =
  | "award"
  | "certificate"
  | "hackathon"
  | "medal"
  | "milestone";

export interface Achievement {
  slug: string;
  kind: AchievementKind;
  title: Localized;
  /** Who gave it, or where it happened. */
  issuer: Localized;
  /** Free text, e.g. "Mar 2025". */
  date: string;
  /** What it was. */
  about: Localized;
  /** What I built or did to earn it. */
  built: Localized;
  /** Photo or certificate under public/, e.g. "/images/achievements/x.jpg". */
  image: string | null;
  credentialUrl: string | null;
}

/*
 * TODO(kalsah): every entry below is a placeholder, one per kind of object in
 * the cabinet. Replace titles, issuers, dates and texts with real ones, and
 * rename the slugs (they become the URLs). The six sample certificates from
 * the old site are kept untouched in ./certificates-archive.ts.
 */
const TODO: Localized = { en: "[To be written]", id: "[Belum ditulis]" };

const placeholder = (
  slug: string,
  kind: AchievementKind,
  en: string,
  id: string,
): Achievement => ({
  slug,
  kind,
  title: { en: `[${en}]`, id: `[${id}]` },
  issuer: TODO,
  date: "[Date]",
  about: TODO,
  built: TODO,
  image: null,
  credentialUrl: null,
});

export const ACHIEVEMENTS: Achievement[] = [
  placeholder("achievement", "award", "Achievement", "Pencapaian"),
  placeholder("certificate", "certificate", "Certificate", "Sertifikat"),
  placeholder("hackathon", "hackathon", "Hackathon", "Hackathon"),
  placeholder("competition", "medal", "Competition", "Kompetisi"),
  placeholder("milestone", "milestone", "Milestone", "Tonggak"),
];

export function getAchievement(slug: string): Achievement | undefined {
  return ACHIEVEMENTS.find((achievement) => achievement.slug === slug);
}
