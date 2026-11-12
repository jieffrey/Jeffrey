/**
 * True when entrance and scroll animations may run: JS is on and the visitor
 * did not ask for reduced motion (set by the boot script in lib/loader.ts).
 */
export const motionOn = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.motion === "on";
