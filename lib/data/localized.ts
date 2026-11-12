import type { Locale } from "next-intl";

/**
 * Structured content (projects, line prints, achievements) keeps its copy in
 * typed data files as one value per locale. UI chrome lives in messages/*.json.
 */
export type Localized<T = string> = Record<Locale, T>;

export const localize = <T>(value: Localized<T>, locale: Locale): T =>
  value[locale];
