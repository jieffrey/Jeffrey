/** sessionStorage key: set once the loader has played in this tab session. */
export const LOADER_SESSION_KEY = "js:loader-seen";

/** sessionStorage key: set when The Line fell back to the flat stack. */
export const LINE_STACK_SESSION_KEY = "js:line-stack";

/**
 * Runs before first paint (inlined in <head>). Skipped entirely under
 * prefers-reduced-motion. Otherwise it sets on <html>:
 *
 * - data-motion="on": entrance animations may hide content until data-ready.
 * - data-line="scene": The Line renders as the 3D clothesline. Without it
 *   (no JS, reduced motion, low-performance fallback) it is a flat stack.
 * - data-loader="on": first visit of the session, show the loader.
 * - data-ready (after 6s, failsafe): reveal everything even if the app bundle
 *   never hydrates (then The Line also drops to the stack). Normally the
 *   Loader component sets data-hydrated and data-ready much earlier.
 */
export const LOADER_BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.dataset.motion="on";d.dataset.line="scene";setTimeout(function(){d.dataset.ready="1";if(!d.dataset.hydrated)d.dataset.line="stack"},6000);if(sessionStorage.getItem("${LINE_STACK_SESSION_KEY}"))d.dataset.line="stack";if(!sessionStorage.getItem("${LOADER_SESSION_KEY}"))d.dataset.loader="on"}catch(e){}})()`;
