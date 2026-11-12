export const SECTION_IDS = [
  "line",
  "now",
  "work",
  "about",
  "stack",
  "cabinet",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface SectionMeta {
  id: SectionId;
  /** Two-digit display number, e.g. "02". */
  number: string;
}

export const SECTIONS: readonly SectionMeta[] = SECTION_IDS.map((id, i) => ({
  id,
  number: String(i + 1).padStart(2, "0"),
}));

export function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}
