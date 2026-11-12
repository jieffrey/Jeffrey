"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GridState {
  /** Whether every section shows its grid overlay. */
  on: boolean;
  toggle: () => void;
}

/** GRID toggle, remembered in localStorage. */
export const useGrid = create<GridState>()(
  persist(
    (set) => ({
      on: false,
      toggle: () => set((state) => ({ on: !state.on })),
    }),
    { name: "js:grid" },
  ),
);
