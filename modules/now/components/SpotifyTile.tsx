"use client";
import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import type { SpotifyNowPlaying } from "@/lib/data/spotify";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import Magnetic from "@/common/components/hud/Magnetic";
import s from "../now.module.css";
import Tile, { TileLabel } from "./Tile";

/**
 * Spotify now playing: spinning vinyl, equalizer, title / artist and a
 * progress bar with a live timer. The button pauses the local animation and
 * timer only; it does not control Spotify.
 */
export default function SpotifyTile({ spotify }: { spotify: SpotifyNowPlaying }) {
  const t = useTranslations("now.spotify");
  const format = useFormatter();
  const { track } = spotify;
  const duration = Math.max(1, Math.round((track?.durationMs ?? 0) / 1000));
  const reducedMotion = usePrefersReducedMotion();
  // null until the visitor presses the button. Under reduced motion nothing
  // ticks before that.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? (spotify.isPlaying && !reducedMotion);
  const [position, setPosition] = useState(Math.round(spotify.progressMs / 1000));

  useEffect(() => {
    if (!playing || !track) return;
    const timer = setInterval(
      () => setPosition((current) => (current + 1) % duration),
      1000,
    );
    return () => clearInterval(timer);
  }, [playing, track, duration]);

  const clock = (seconds: number) =>
    `${format.number(Math.floor(seconds / 60))}:${format.number(seconds % 60, {
      minimumIntegerDigits: 2,
    })}`;

  if (!track) {
    return (
      <Tile span="4x3">
        <TileLabel>{t("label")}</TileLabel>
        <p className="my-auto text-center text-sm text-dim">{t("nothing")}</p>
      </Tile>
    );
  }

  return (
    <Tile span="4x3" className="overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={s.eq} data-playing={playing} aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
          <TileLabel>{playing ? t("label") : t("paused")}</TileLabel>
        </div>
        <Magnetic>
          <button
            type="button"
            onClick={() => setChoice(!playing)}
            aria-label={playing ? t("pause") : t("play")}
            className="flex size-11 items-center justify-center rounded-full bg-snow text-night"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              {playing ? (
                <>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </>
              ) : (
                <path d="M7 5v14l12-7z" />
              )}
            </svg>
          </button>
        </Magnetic>
      </div>
      <div className={s.vinyl} data-playing={playing} aria-hidden />
      <div>
        <p className="text-xl leading-tight font-extrabold tracking-[-0.02em]">{track.title}</p>
        <p className="text-sm text-dim">{track.artist}</p>
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <div
          role="progressbar"
          aria-label={t("progress")}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={position}
          aria-valuetext={`${clock(position)} / ${clock(duration)}`}
          className="h-1 overflow-hidden rounded-full bg-edge"
        >
          <span
            className="block h-full origin-left rounded-full bg-orange"
            style={{ transform: `scaleX(${position / duration})` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[11px] text-dim tabular-nums">
          <span>{clock(position)}</span>
          <span>{clock(duration)}</span>
        </div>
      </div>
    </Tile>
  );
}
