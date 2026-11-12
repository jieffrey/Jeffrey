"use client";
import {
  useRef,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { LINE_PRINTS } from "@/lib/data/line";
import { localize } from "@/lib/data/localized";
import { MARQUEE_REPEAT, useLineScene } from "@/hooks/use-line-scene";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import PrintFace from "./PrintFace";
import s from "../line.module.css";

const COUNT = LINE_PRINTS.length;
const NEXT_KEYS = ["ArrowRight", "ArrowDown"];
const PREV_KEYS = ["ArrowLeft", "ArrowUp"];

/**
 * 01 — The Line. Eight prints on a clothesline running away from the viewer.
 * Scrolling walks the camera along it. See hooks/use-line-scene.ts for the
 * motion and line.module.css for the scene / stack layouts.
 */
export default function TheLine() {
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();
  const scrollToSection = useScrollToSection();

  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLElement>(null);
  const marqueeEl = useRef<HTMLDivElement>(null);
  const endHint = useRef<HTMLDivElement>(null);
  const ropes = useRef<(HTMLElement | null)[]>([]);
  const hangers = useRef<(HTMLElement | null)[]>([]);
  const swings = useRef<(HTMLElement | null)[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const { goToPrint, isFront, isScene } = useLineScene(
    {
      section,
      scene,
      world,
      head,
      marquee: marqueeEl,
      endHint,
      ropes,
      hangers,
      swings,
    },
    COUNT,
  );

  const twoDigits = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2 });

  const focusPrint = (index: number) => {
    if (isScene()) goToPrint(index);
    buttons.current[index]?.focus({ preventScroll: isScene() });
  };

  const onPrintClick = (index: number) => {
    if (isScene() && !isFront(index)) goToPrint(index);
    else scrollToSection(LINE_PRINTS[index].target);
  };

  // Keyboard focus on a far print brings the camera to it.
  const onPrintFocus = (e: FocusEvent<HTMLButtonElement>, index: number) => {
    if (isScene() && !isFront(index) && e.target.matches(":focus-visible")) {
      goToPrint(index);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const current = buttons.current.findIndex((b) => b === document.activeElement);
    if (current < 0) return;
    let next = current;
    if (NEXT_KEYS.includes(e.key)) next = current + 1;
    else if (PREV_KEYS.includes(e.key)) next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = COUNT - 1;
    else return;
    e.preventDefault();
    focusPrint(Math.min(COUNT - 1, Math.max(0, next)));
  };

  const marquee = t("line.marquee").repeat(MARQUEE_REPEAT);

  return (
    <section
      id="line"
      ref={section}
      data-section="line"
      aria-label={t("line.label")}
      aria-describedby="line-keys"
      className={s.line}
      style={{ "--prints": COUNT } as CSSProperties}
      onKeyDown={onKeyDown}
    >
      <p id="line-keys" className="sr-only">
        {t("line.keyboardHint")}
      </p>
      <div className={s.stage}>
        <header ref={head} className={s.head}>
          <p className={`eyebrow ${s.eyebrow}`}>
            <b>
              {twoDigits(1)} — {t("line.nav")}
            </b>
            <span>{t("line.grid")}</span>
          </p>
          <h1 className={s.name}>
            <span className={s.nameClip}>
              <span>{t("line.name")}</span>
            </span>
          </h1>
          <p className={s.sub}>{t("line.tagline")}</p>
          <hr className={s.rule} />
          <p className={s.intro}>{t("line.intro")}</p>
        </header>

        <div ref={scene} className={s.scene}>
          <div ref={world} className={s.world}>
            {Array.from({ length: COUNT + 1 }, (_, k) => (
              <div
                key={k}
                ref={(el) => {
                  ropes.current[k] = el;
                }}
                className={s.rope}
                aria-hidden
              />
            ))}
            {LINE_PRINTS.map((print, i) => {
              const title = localize(print.title, locale);
              return (
                <div
                  key={print.id}
                  ref={(el) => {
                    hangers.current[i] = el;
                  }}
                  className={s.hanger}
                >
                  <span className={s.pin} aria-hidden />
                  <div
                    ref={(el) => {
                      swings.current[i] = el;
                    }}
                    className={s.swing}
                  >
                    <div className={s.drop} style={{ "--i": i } as CSSProperties}>
                      <button
                        ref={(el) => {
                          buttons.current[i] = el;
                        }}
                        type="button"
                        className={s.print}
                        data-line-index={i}
                        data-cursor="open"
                        aria-label={t("line.print.goTo", {
                          title,
                          current: i + 1,
                          total: COUNT,
                        })}
                        onClick={() => onPrintClick(i)}
                        onFocus={(e) => onPrintFocus(e, i)}
                      >
                        <PrintFace
                          face={print.face}
                          title={
                            print.faceTitle && localize(print.faceTitle, locale)
                          }
                        />
                        <span className={s.cap} aria-hidden>
                          <span>
                            {twoDigits(i + 1)} · {localize(print.caption, locale)}
                          </span>
                          <span>↗</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={marqueeEl} className={s.marquee} aria-hidden>
          {marquee}
        </div>
        <div ref={endHint} className={s.endhint} data-on="false" aria-hidden>
          {t("line.keepScrolling")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14" />
            <path d="m6 13 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
