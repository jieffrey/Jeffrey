"use client";
import { Fragment, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn } from "@/lib/motion";
import { splitWords } from "@/lib/split-text";
import ColumnsOverlay from "@/common/components/section/ColumnsOverlay";
import SectionHeader from "@/common/components/section/SectionHeader";

const NOTES = ["now", "back", "front"] as const;

/**
 * 04 — About. Baseline + column grid: every line-height is a multiple of the
 * 8px baseline, drawn as faint lines behind the section. Statement on
 * columns 1–9, notes on columns 10–12.
 *
 * The section pins for 130% of the viewport while the words light up from
 * 18% opacity and the notes slide in from the right. ScrollTrigger pins the
 * inner element, so React keeps owning the <section> itself.
 */
export default function About() {
  const t = useTranslations("about");
  const pin = useRef<HTMLDivElement>(null);
  const statement = t.raw("statement") as string;

  useGSAP(
    () => {
      const el = pin.current;
      if (!el || !motionOn()) return;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.6,
          },
        })
        .fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.08, ease: "none" },
          0,
        )
        .from(
          el.querySelectorAll("[data-note]"),
          { x: 90, opacity: 0, stagger: 0.35, ease: "power2.out" },
          0.2,
        );
    },
    { scope: pin, dependencies: [statement], revertOnUpdate: true },
  );

  return (
    <section id="about" data-section="about" aria-labelledby="about-title">
      <div
        ref={pin}
        className="relative flex min-h-svh flex-col justify-center bg-paper bg-[repeating-linear-gradient(to_bottom,var(--baseline)_0_1px,transparent_1px_8px)] pt-[104px] pb-[176px] text-ink [--baseline:color-mix(in_srgb,var(--color-ink)_5%,transparent)] grid-on:[--baseline:color-mix(in_srgb,var(--color-pink)_75%,transparent)] min-[721px]:py-[136px]"
      >
        <div className="relative mx-auto w-full max-w-[1320px] px-pad">
          <ColumnsOverlay />
          <SectionHeader id="about" title={t("title")} srOnlyTitle />
          <div className="mt-12 grid grid-cols-12 gap-4">
            <p className="col-span-12 text-[clamp(28px,3.6vw,48px)] leading-[1.1667] font-semibold tracking-[-0.02em] min-[961px]:col-span-9">
              {splitWords(statement).map((word, i) => {
                const text = word.chars.join("");
                return (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    {word.em ? (
                      <em data-word className="font-serif font-normal">
                        {text}
                      </em>
                    ) : (
                      <span data-word>{text}</span>
                    )}
                  </Fragment>
                );
              })}
            </p>
            <div className="col-span-12 flex flex-row flex-wrap gap-6 text-sm leading-6 min-[961px]:col-span-3 min-[961px]:flex-col">
              {NOTES.map((note) => (
                <div
                  key={note}
                  data-note
                  className="flex-[1_1_200px] border-t border-ink pt-2 min-[961px]:flex-none"
                >
                  <b className="mb-2 block font-mono text-[11px] leading-4 font-medium tracking-hud text-muted uppercase">
                    {t(`notes.${note}.label`)}
                  </b>
                  {t(`notes.${note}.text`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
