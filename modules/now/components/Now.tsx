"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "motion/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { GithubData } from "@/lib/data/github";
import type { SpotifyNowPlaying } from "@/lib/data/spotify";
import { motionOn } from "@/lib/motion";
import ColumnsOverlay from "@/common/components/section/ColumnsOverlay";
import SectionHeader from "@/common/components/section/SectionHeader";
import { BuildingTile, ProfileTile } from "./SmallTiles";
import SpotifyTile from "./SpotifyTile";
import Tile from "./Tile";

// Chart tiles pull in d3 and Motion; they load only on the client, on demand.
const HeatmapTile = dynamic(() => import("./HeatmapTile"), {
  ssr: false,
  loading: () => <Tile span="8x3">{null}</Tile>,
});
const AreaTile = dynamic(() => import("./AreaTile"), {
  ssr: false,
  loading: () => <Tile span="8x3">{null}</Tile>,
});
const LanguagesTile = dynamic(() => import("./LanguagesTile"), {
  ssr: false,
  loading: () => <Tile span="4x3">{null}</Tile>,
});
const WeekdayTile = dynamic(() => import("./WeekdayTile"), {
  ssr: false,
  loading: () => <Tile span="4x2">{null}</Tile>,
});

interface NowProps {
  github: GithubData;
  spotify: SpotifyNowPlaying;
}

/**
 * 02 — Now. Dashboard on a modular grid: 12 columns × 88px modules, gap 16.
 * Always dark. The section opens from a rounded inset card to full bleed,
 * then the tiles fly in.
 */
export default function Now({ github, spotify }: NowProps) {
  const t = useTranslations("now");
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // True once the section is within two viewports; chart code loads then.
  const [near, setNear] = useState(false);

  useGSAP(
    () => {
      if (!section.current || !grid.current) return;
      const approach = ScrollTrigger.create({
        trigger: section.current,
        start: "top 300%",
        once: true,
        onEnter: () => setNear(true),
      });
      const enter = ScrollTrigger.create({
        trigger: grid.current,
        start: "top 85%",
        once: true,
        onEnter: () => setActive(true),
      });
      if (!motionOn()) {
        return () => {
          approach.kill();
          enter.kill();
        };
      }

      gsap.fromTo(
        section.current,
        { clipPath: "inset(10% 6% 0% 6% round 56px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "top 10%",
            scrub: true,
          },
        },
      );
      gsap.from(grid.current.querySelectorAll("[data-tile]"), {
        y: 160,
        rotateX: 30,
        opacity: 0,
        scale: 0.9,
        transformOrigin: "50% 100%",
        stagger: 0.08,
        duration: 1.3,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: { trigger: grid.current, start: "top 82%" },
      });
    },
    { scope: section },
  );

  return (
    <section
      id="now"
      ref={section}
      data-section="now"
      aria-labelledby="now-title"
      className="relative bg-night py-[104px] text-snow [--gridline:color-mix(in_srgb,var(--color-violet)_22%,transparent)] min-[721px]:py-[136px]"
    >
      <div className="relative mx-auto max-w-[1320px] px-pad">
        <ColumnsOverlay />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            id="now"
            title={t.raw("title")}
            eyebrowClassName="text-dim [&_b]:text-lime"
          />
          {!(github.live && spotify.live) && (
            <span className="rounded-full border border-edge px-3 py-[7px] font-mono text-[11px] text-dim">
              {t("mock")}
            </span>
          )}
        </div>
        <div
          ref={grid}
          className="relative mt-12 grid grid-cols-4 gap-4 [perspective:1400px] min-[961px]:auto-rows-[88px] min-[961px]:grid-cols-12"
        >
          {/* Module rows: 88px modules separated by the 16px gap. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3] hidden bg-[repeating-linear-gradient(to_bottom,transparent_0_88px,var(--gridline)_88px_104px)] opacity-0 transition-opacity duration-300 grid-on:opacity-100 min-[961px]:block"
          />
          {/* Charts animate with Motion; this makes them respect reduced motion. */}
          <MotionConfig reducedMotion="user">
          {near ? (
            <HeatmapTile contributions={github.contributions} active={active} />
          ) : (
            <Tile span="8x3">{null}</Tile>
          )}
          <SpotifyTile spotify={spotify} />
          {near ? (
            <AreaTile
              weekly={github.weeklyCommits}
              delta={github.weeklyDelta}
              active={active}
            />
          ) : (
            <Tile span="8x3">{null}</Tile>
          )}
          {near ? (
            <LanguagesTile languages={github.languages} />
          ) : (
            <Tile span="4x3">{null}</Tile>
          )}
          <ProfileTile profile={github.profile} active={active} />
          {near ? (
            <WeekdayTile commits={github.weekdayCommits} active={active} />
          ) : (
            <Tile span="4x2">{null}</Tile>
          )}
          <BuildingTile />
          </MotionConfig>
        </div>
      </div>
    </section>
  );
}
