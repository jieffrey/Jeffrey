"use client";
import { useMemo } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Bar } from "@/components/charts/bar";
import { BarChart } from "@/components/charts/bar-chart";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { ChartTooltip } from "@/components/charts/tooltip";
import Tile, { TileLabel } from "./Tile";

/** 2024-01-01 was a Monday; used only to get localized weekday names. */
const MONDAY = Date.UTC(2024, 0, 1);

interface WeekdayTileProps {
  /** Commits per weekday, Monday first. */
  commits: number[];
  active: boolean;
}

/** Commits by weekday (bklit Bar chart). */
export default function WeekdayTile({ commits, active }: WeekdayTileProps) {
  const t = useTranslations("now.weekday");
  const format = useFormatter();

  const data = useMemo(
    () =>
      commits.map((count, i) => ({
        day: format.dateTime(new Date(MONDAY + i * 86_400_000), {
          weekday: "short",
          timeZone: "UTC",
        }),
        commits: count,
      })),
    [commits, format],
  );

  return (
    <Tile span="4x2">
      <TileLabel>{t("label")}</TileLabel>
      <div
        role="img"
        aria-label={t("aria", {
          list: data.map((d) => `${d.day} ${format.number(d.commits)}`).join(", "),
        })}
        className="relative min-h-0 flex-1"
      >
        <BarChart
          key={String(active)}
          data={data}
          xDataKey="day"
          aspectRatio="auto"
          className="h-full"
          barGap={0.25}
          margin={{ top: 4, right: 0, bottom: 30, left: 0 }}
          animationDuration={active ? 900 : 0}
        >
          <Bar dataKey="commits" fill="var(--color-heat-1)" lineCap={6} />
          <BarXAxis showAllLabels />
          <ChartTooltip
            showCrosshair={false}
            showDatePill={false}
            showDots={false}
            rows={(point) => [
              {
                color: "var(--color-violet-2)",
                label: String(point.day),
                value: t("commits", { count: Number(point.commits) }),
              },
            ]}
          />
        </BarChart>
      </div>
    </Tile>
  );
}
