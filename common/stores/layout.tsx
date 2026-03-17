"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LayoutMode = "sidebar" | "topbar";

type LayoutState = {
  mode: LayoutMode;
  toggleMode: () => void;
  setMode: (mode: LayoutMode) => void;
};

export const useLayout = create<LayoutState>()(
  persist(
    (set) => ({
      mode: "sidebar",
      toggleMode: () =>
        set((prev) => ({ mode: prev.mode === "sidebar" ? "topbar" : "sidebar" })),
      setMode: (mode) => set({ mode }),
    }),
    { name: "layout-mode" }
  )
);