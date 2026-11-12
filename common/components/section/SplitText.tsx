import { Fragment } from "react";
import { splitWords } from "@/lib/split-text";

/**
 * Renders a string as words > characters for per-letter animation.
 * `data-char` marks each letter. Words in <em> get the serif accent. The
 * parent must carry the accessible name (aria-label); this output is hidden
 * from assistive tech.
 */
export default function SplitText({ text }: { text: string }) {
  return (
    <span aria-hidden>
      {splitWords(text).map((word, i) => {
        const chars = word.chars.map((char, j) => (
          <span key={j} data-char className="inline-block will-change-transform">
            {char}
          </span>
        ));
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            {word.em ? (
              <em className="inline-block font-serif font-normal tracking-[-0.02em] whitespace-nowrap">
                {chars}
              </em>
            ) : (
              <span className="inline-block whitespace-nowrap">{chars}</span>
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
