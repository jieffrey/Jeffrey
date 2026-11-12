"use client";
import { create } from "zustand";

/** Tunable values of The Line's camera, edited from the camera panel. */
export interface CameraConfig {
  /** Lens: CSS perspective in px. */
  persp: number;
  /** World tilt (rotateX) in degrees. */
  tilt: number;
  /** Print turn (rotateY of each print) in degrees. */
  angle: number;
  /** Wind strength multiplier. */
  sway: number;
  /** Spacing between prints along the line in px. */
  gap: number;
}

export type CameraKey = keyof CameraConfig;

export const CAMERA_DEFAULTS: CameraConfig = {
  persp: 1100,
  tilt: 6,
  angle: -22,
  sway: 1,
  gap: 560,
};

export const CAMERA_RANGES: Record<
  CameraKey,
  { min: number; max: number; step: number }
> = {
  persp: { min: 600, max: 2200, step: 10 },
  tilt: { min: -10, max: 25, step: 1 },
  angle: { min: -50, max: 20, step: 1 },
  sway: { min: 0, max: 2.5, step: 0.1 },
  gap: { min: 380, max: 900, step: 10 },
};

export const CAMERA_KEYS = Object.keys(CAMERA_DEFAULTS) as CameraKey[];

interface CameraState {
  config: CameraConfig;
  panelOpen: boolean;
  /** Frames rendered in the last second; null until measured. */
  fps: number | null;
  setValue: (key: CameraKey, value: number) => void;
  reset: () => void;
  setPanelOpen: (open: boolean) => void;
  setFps: (fps: number) => void;
}

export const useCamera = create<CameraState>()((set) => ({
  config: CAMERA_DEFAULTS,
  panelOpen: false,
  fps: null,
  setValue: (key, value) =>
    set((state) => ({ config: { ...state.config, [key]: value } })),
  reset: () => set({ config: CAMERA_DEFAULTS }),
  setPanelOpen: (panelOpen) => set({ panelOpen }),
  setFps: (fps) => set({ fps }),
}));
