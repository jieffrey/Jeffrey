"use client";
import { create } from "zustand";
import type { SectionId } from "@/lib/sections";

interface UiState {
  /** Section under the viewport midline; null when the page has no sections. */
  activeSection: SectionId | null;
  /** True once the loader finished or was skipped. Intro animations wait on it. */
  loaderDone: boolean;
  setActiveSection: (id: SectionId | null) => void;
  setLoaderDone: () => void;
}

export const useUi = create<UiState>()((set) => ({
  activeSection: null,
  loaderDone: false,
  setActiveSection: (activeSection) => set({ activeSection }),
  setLoaderDone: () => set({ loaderDone: true }),
}));
