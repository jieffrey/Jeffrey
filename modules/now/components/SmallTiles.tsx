"use client";
import { useLocale, useTranslations } from "next-intl";
import type { GithubProfile } from "@/lib/data/github";
import { localize } from "@/lib/data/localized";
import { BUILDING } from "@/lib/data/now";
import { cn } from "@/lib/utils";
import CountUp from "./CountUp";
import Tile, { TileLabel } from "./Tile";

/** GitHub profile: avatar, handle and three counters. */
export function ProfileTile({ profile, active }: { profile: GithubProfile; active: boolean }) {
  const t = useTranslations("now.profile");
  const stats = [
    { key: "repos", value: profile.repos },
    { key: "stars", value: profile.stars },
    { key: "followers", value: profile.followers },
  ] as const;

  return (
    <Tile span="4x2">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="flex size-11 items-center justify-center rounded-full bg-lime bg-cover bg-center font-extrabold text-ink-static"
          style={
            profile.avatarUrl
              ? { backgroundImage: `url(${profile.avatarUrl})` }
              : undefined
          }
        >
          {!profile.avatarUrl && profile.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-extrabold">{profile.name}</h3>
          <p className="font-mono text-xs text-dim">
            {t("handle", { login: profile.login })}
          </p>
        </div>
      </div>
      <dl className="mt-auto grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.key} className="flex flex-col-reverse">
            <dt className="text-xs text-dim">{t(stat.key)}</dt>
            <dd className="text-[28px] leading-tight font-bold tracking-[-0.03em]">
              <CountUp value={stat.value} active={active} />
            </dd>
          </div>
        ))}
      </dl>
    </Tile>
  );
}

/** Currently building: list with status pills. */
export function BuildingTile() {
  const t = useTranslations("now.building");
  const locale = useLocale();

  return (
    <Tile span="4x2">
      <TileLabel>{t("label")}</TileLabel>
      <ul className="mt-auto flex flex-col gap-2.5">
        {BUILDING.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span>{item.name}</span>
            <span
              className={cn(
                "rounded-full px-2 py-1 font-mono text-[11px] whitespace-nowrap",
                item.tone === "active"
                  ? "bg-lime/15 text-lime"
                  : "bg-heat-1/45 text-violet-2",
              )}
            >
              {localize(item.status, locale)}
            </span>
          </li>
        ))}
      </ul>
    </Tile>
  );
}
