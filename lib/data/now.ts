import type { Localized } from "./localized";

export interface BuildingItem {
  name: string;
  status: Localized;
  /** "active" renders the lime pill, "other" the violet one. */
  tone: "active" | "other";
}

/** "Currently building" list on the Now dashboard. */
export const BUILDING: BuildingItem[] = [
  {
    name: "LaporAja",
    status: { en: "final project · active", id: "tugas akhir · aktif" },
    tone: "active",
  },
  {
    name: "jeffreystudios v3",
    status: { en: "this site · design", id: "situs ini · desain" },
    tone: "other",
  },
  {
    name: "Mountain Safety Tracker",
    status: { en: "client · shipped", id: "klien · rilis" },
    tone: "other",
  },
];
