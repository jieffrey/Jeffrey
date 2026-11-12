export interface SplitWord {
  chars: string[];
  /** True when the word sits inside <em>…</em> in the source string. */
  em: boolean;
}

/**
 * Splits a translated string into words and characters for per-letter
 * animation. Supports one kind of markup: <em>emphasis</em>. Words are kept
 * whole so a line can never break inside one.
 */
export function splitWords(markup: string): SplitWord[] {
  const words: SplitWord[] = [];
  for (const part of markup.split(/(<em>.*?<\/em>)/g)) {
    if (!part) continue;
    const match = /^<em>(.*)<\/em>$/.exec(part);
    const text = match ? match[1] : part;
    for (const word of text.split(/\s+/)) {
      if (word) words.push({ chars: Array.from(word), em: match !== null });
    }
  }
  return words;
}

/** The same string without markup, for accessible names. */
export const plainText = (markup: string) => markup.replace(/<\/?em>/g, "");
