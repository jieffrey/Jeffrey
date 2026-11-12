import type { SectionId } from "@/lib/sections";
import type { Localized } from "./localized";
import { PROJECTS, type ProjectFace } from "./projects";

export type PrintFaceId =
  | "about"
  | ProjectFace
  | "now"
  | "stack"
  | "cabinet"
  | "contact";

/** One print hanging on The Line. */
export interface LinePrint {
  id: string;
  face: PrintFaceId;
  /** Full name, used for the accessible label. */
  title: Localized;
  /** Big text on the artwork. Omitted for faces that draw their own text. */
  faceTitle?: Localized;
  /** Mono caption under the artwork. */
  caption: Localized;
  /** Section the front print scrolls to when clicked. */
  target: SectionId;
}

const same = (value: string): Localized => ({ en: value, id: value });

const projectPrints: LinePrint[] = PROJECTS.map((project) => ({
  id: project.slug,
  face: project.face,
  title: same(project.title),
  faceTitle: same(project.shortTitle),
  caption: same(project.shortTitle),
  target: "work",
}));

/** The eight prints, in hanging order. */
export const LINE_PRINTS: LinePrint[] = [
  {
    id: "about",
    face: "about",
    title: same("Kalsah"),
    faceTitle: same("Kalsah"),
    caption: { en: "About", id: "Tentang" },
    target: "about",
  },
  ...projectPrints,
  {
    id: "now",
    face: "now",
    title: { en: "Now", id: "Kini" },
    caption: { en: "Now", id: "Kini" },
    target: "now",
  },
  {
    id: "stack",
    face: "stack",
    title: same("Stack"),
    faceTitle: same("Stack"),
    caption: same("Stack"),
    target: "stack",
  },
  {
    id: "cabinet",
    face: "cabinet",
    title: { en: "The Cabinet", id: "Lemari" },
    faceTitle: { en: "The Cabinet", id: "Lemari" },
    caption: { en: "Cabinet", id: "Lemari" },
    target: "cabinet",
  },
  {
    id: "contact",
    face: "contact",
    title: { en: "Say hi", id: "Sapa saya" },
    caption: { en: "Contact", id: "Kontak" },
    target: "contact",
  },
];

/** Step between two prints along the line, for a given spacing. */
export function lineStep(gap: number) {
  return { x: gap * 0.64, y: -gap * 0.065, z: -gap };
}

const HEAT_LEVELS = 5;

/**
 * Deterministic pseudo-random heat levels (0–4) for the mini heatmap on the
 * Now print. Same generator and seed as the prototype.
 */
export function miniHeatLevels(weeks = 22): number[] {
  const total = weeks * 7;
  const levels: number[] = [];
  let seed = 11;
  for (let i = 0; i < total; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280 + (i / total) * 0.35;
    const level = r < 0.4 ? 0 : r < 0.65 ? 1 : r < 0.85 ? 2 : r < 1 ? 3 : 4;
    levels.push(Math.min(HEAT_LEVELS - 1, level));
  }
  return levels;
}
