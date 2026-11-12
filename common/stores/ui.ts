"use client";
import { create } from "zustand";
import type { SectionId } from "@/lib/sections";

interface UiState {
  /** Section under the viewport; null when the page has no sections. */
  activeSection: SectionId | null;
  /** True once the loader count finished or was skipped. Intros wait on it. */
  loaderDone: boolean;
  /** How The Line is rendered on this page; null when it is not mounted. */
  lineMode: "scene" | "stack" | null;
  /** 0-based index of the print in front of the camera; null in stack mode. */
  linePrint: number | null;
  setActiveSection: (id: SectionId | null) => void;
  setLoaderDone: () => void;
  setLinePrint: (index: number | null) => void;
  setLineMode: (mode: "scene" | "stack" | null) => void;
}

export const useUi = create<UiState>()((set) => ({
  activeSection: null,
  loaderDone: false,
  lineMode: null,
  linePrint: null,
  setActiveSection: (activeSection) => set({ activeSection }),
  setLoaderDone: () => set({ loaderDone: true }),
  setLinePrint: (linePrint) => set({ linePrint }),
  setLineMode: (lineMode) => set({ lineMode }),
}));
