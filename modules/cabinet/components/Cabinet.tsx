"use client";
import { useRef, type CSSProperties } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { ACHIEVEMENTS } from "@/lib/data/achievements";
import { localize } from "@/lib/data/localized";
import { motionOn } from "@/lib/motion";
import GhostText from "@/common/components/section/GhostText";
import SectionHeader from "@/common/components/section/SectionHeader";
import AchievementObject from "./AchievementObject";

/** Vertical rise per horizontal step: tan(30°) × 0.55, as in the prototype. */
const SLOPE = Math.tan((30 * Math.PI) / 180) * 0.55;
const ITEM_WIDTH = 240;

/**
 * 06 — The Cabinet. Diagonal grid: achievements sit along a 30° axis over a
 * diagonal hairline pattern.
 *
 * From 961px up the section pins for 170% and the track travels along the
 * diagonal with scroll. Below that the layout turns more vertical: a
 * staggered column in normal flow, without a pin. Objects pop in with
 * rotation on enter and tilt on hover.
 */
export default function Cabinet() {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const format = useFormatter();
  const pin = useRef<HTMLDivElement>(null);
  const diag = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count = ACHIEVEMENTS.length;

  useGSAP(
    () => {
      const el = pin.current;
      const box = diag.current;
      const rail = track.current;
      if (!el || !box || !rail || !motionOn()) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 961px)", () => {
        const step = () =>
          Math.min(300, (box.clientWidth - ITEM_WIDTH) / (count - 1));
        const start = () => box.clientWidth * 0.6;
        const end = () => -(count - 1) * step() + box.clientWidth * 0.1;
        // The rise is centered on the travel, so the objects in view stay
        // inside the frame instead of climbing over the heading.
        const rise = (x: number) => (x - (start() + end()) / 2) * SLOPE;
        gsap.fromTo(
          rail,
          { x: start, y: () => rise(start()) },
          {
            x: end,
            y: () => rise(end()),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.from("[data-object]", {
        rotate: (i) => (i % 2 ? 20 : -20),
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: "back.out(2)",
        scrollTrigger: { trigger: el, start: "top 60%" },
      });
      return () => media.revert();
    },
    { scope: pin },
  );

  return (
    <section id="cabinet" data-section="cabinet" aria-labelledby="cabinet-title">
      <div
        ref={pin}
        className="relative flex flex-col justify-center overflow-hidden bg-paper bg-[repeating-linear-gradient(-30deg,var(--diagonal)_0_1px,transparent_1px_64px)] [--diagonal:color-mix(in_srgb,var(--color-ink)_6%,transparent)] grid-on:[--diagonal:color-mix(in_srgb,var(--color-blue)_25%,transparent)] py-[88px] text-ink min-[961px]:min-h-svh"
      >
        <GhostText text={t("ghost")} className="top-[60px]" />
        <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-pad">
          <SectionHeader id="cabinet" title={t.raw("title")} />
          <div
            ref={diag}
            className="@container relative mt-6 min-[961px]:h-[min(620px,50vh)] min-[961px]:min-h-[360px]"
            style={
              {
                "--count": count,
                "--slope": SLOPE.toFixed(4),
              } as CSSProperties
            }
          >
            <div
              ref={track}
              className="relative flex flex-col gap-10 will-change-transform [--step:calc((100cqw-240px)/(var(--count)-1))] min-[961px]:absolute min-[961px]:top-0 min-[961px]:left-0 min-[961px]:block min-[961px]:[--step:min(300px,calc((100cqw-240px)/(var(--count)-1)))]"
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 hidden h-[1.5px] w-[2000px] origin-top-left rotate-[30deg] bg-ink opacity-25 grid-on:bg-blue grid-on:opacity-100 min-[961px]:block"
              />
              {ACHIEVEMENTS.map((achievement, i) => {
                const title = localize(achievement.title, locale);
                return (
                  <Link
                    key={achievement.slug}
                    href={`/achievements/${achievement.slug}`}
                    data-cursor="open"
                    className="group relative ml-[calc(var(--i)*var(--step))] flex w-60 flex-col gap-2.5 min-[961px]:absolute min-[961px]:top-[calc(var(--i)*var(--step)*var(--slope))] min-[961px]:left-[calc(var(--i)*var(--step))] min-[961px]:ml-0"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <div data-object>
                      <AchievementObject
                        kind={achievement.kind}
                        className="h-[200px] rounded-3xl transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1.3)] group-hover:scale-[1.04] group-hover:-rotate-[4deg]"
                      />
                    </div>
                    <span className="font-mono text-[11px] tracking-chip text-muted uppercase">
                      {format.number(i + 1, { minimumIntegerDigits: 2 })} ·{" "}
                      {t(`kinds.${achievement.kind}`)}
                    </span>
                    <b className="text-xl tracking-[-0.02em]">{title}</b>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
