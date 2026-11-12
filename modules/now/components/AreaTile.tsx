"use client";
import { useMemo } from "react";
import { curveNatural } from "d3-shape";
import { useFormatter, useTranslations } from "next-intl";
import { Area } from "@/components/charts/area";
import { AreaChart } from "@/components/charts/area-chart";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip";
import type { GithubData } from "@/lib/data/github";
import CountUp from "./CountUp";
import Tile, { Badge, TileBig, TileLabel } from "./Tile";

interface AreaTileProps {
  weekly: GithubData["weeklyCommits"];
  delta: number;
  active: boolean;
}

/** Commits per week (bklit Area chart with crosshair, dot and tooltip). */
export default function AreaTile({ weekly, delta, active }: AreaTileProps) {
  const t = useTranslations("now.area");
  const format = useFormatter();

  const data = useMemo(
    () =>
      weekly.map((week) => ({
        date: new Date(`${week.weekStart}T00:00:00`),
        commits: week.commits,
      })),
    [weekly],
  );
  const average = Math.round(
    weekly.reduce((sum, week) => sum + week.commits, 0) / Math.max(1, weekly.length),
  );

  return (
    <Tile span="8x3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <TileLabel>{t("label")}</TileLabel>
          <TileBig note={t("period", { weeks: weekly.length })}>
            <CountUp value={average} active={active} />
          </TileBig>
        </div>
        <Badge>
          {t("delta", {
            value: format.number(delta / 100, {
              style: "percent",
              signDisplay: "always",
            }),
          })}
        </Badge>
      </div>
      <div
        role="img"
        aria-label={t("aria", { average, weeks: weekly.length })}
        className="relative min-h-0 flex-1"
      >
        <AreaChart
          key={String(active)}
          data={data}
          aspectRatio="auto"
          className="h-full"
          margin={{ top: 12, right: 0, bottom: 4, left: 0 }}
          animationDuration={active ? 1600 : 0}
        >
          <Grid horizontal numTicksRows={4} strokeDasharray="2 6" />
          <Area
            dataKey="commits"
            curve={curveNatural}
            stroke="var(--color-violet)"
            fill="var(--color-violet)"
            strokeWidth={2.5}
            fillOpacity={0.5}
          />
          <ChartTooltip
            showDatePill={false}
            dotColor="var(--color-violet-2)"
            content={({ index, point }) => (
              <div className="px-2.5 py-2 text-xs whitespace-nowrap">
                <span className="mb-0.5 block font-mono text-[11px] text-dim">
                  {t("week", { current: index + 1, total: weekly.length })}
                </span>
                {t.rich("commits", {
                  count: Number(point.commits),
                  b: (chunks) => <b>{chunks}</b>,
                })}
              </div>
            )}
          />
        </AreaChart>
      </div>
    </Tile>
  );
}
