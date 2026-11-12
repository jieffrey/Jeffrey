import localFont from "next/font/local";

/*
 * All three families are self-hosted (app/fonts, SIL OFL 1.1, see the OFL-*
 * files there). next/font/google fails intermittently under Turbopack,
 * depending on the URL shape Google returns at build time. The files are the
 * Google Fonts latin and latin-ext subsets; unicode-range values are the ones
 * Google serves, so a latin-ext file is only downloaded when a page uses
 * those characters. next/font needs literal arguments, hence the repetition.
 */
export const bricolage = localFont({
  src: "../app/fonts/BricolageGrotesque-latin.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-bricolage",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

export const bricolageExt = localFont({
  src: "../app/fonts/BricolageGrotesque-latin-ext.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-bricolage-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

export const instrumentSerif = localFont({
  src: "../app/fonts/InstrumentSerif-Italic-latin.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

export const instrumentSerifExt = localFont({
  src: "../app/fonts/InstrumentSerif-Italic-latin-ext.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

export const jetbrainsMono = localFont({
  src: "../app/fonts/JetBrainsMono-latin.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

export const jetbrainsMonoExt = localFont({
  src: "../app/fonts/JetBrainsMono-latin-ext.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-jetbrains-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
});

export const fontVariables = [
  bricolage.variable,
  bricolageExt.variable,
  instrumentSerif.variable,
  instrumentSerifExt.variable,
  jetbrainsMono.variable,
  jetbrainsMonoExt.variable,
].join(" ");
