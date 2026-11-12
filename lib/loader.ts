/** sessionStorage key: set once the loader has played in this tab session. */
export const LOADER_SESSION_KEY = "js:loader-seen";

/**
 * Runs before first paint (inlined in <head>). Turns the loader on only for
 * the first visit of a session and never under prefers-reduced-motion, so the
 * overlay is never rendered when it should not play.
 */
export const LOADER_BOOT_SCRIPT = `try{if(!sessionStorage.getItem("${LOADER_SESSION_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.loader="on"}}catch(e){}`;
