"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  HeatmapCells,
  HeatmapChart,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  HeatmapLegend,
  HeatmapTooltip,
  HeatmapXAxis,
} from "@/components/charts/heatmap";
import type { GithubData } from "@/lib/data/github";
import CountUp from "./CountUp";
import Tile, { Badge, TileBig, TileLabel } from "./Tile";

interface HeatmapTileProps {
  contributions: GithubData["contributions"];
  active: boolean;
}

/** Contributions heatmap, last 52 weeks (bklit Heatmap). */
export default function HeatmapTile({ contributions, active }: HeatmapTileProps) {
  const t = useTranslations("now.heat");

  const columns = useMemo(
    () =>
      contributions.weeks.map((week, w) => ({
        bin: w,
        bins: week.map((day) => {
          const date = new Date(`${day.date}T00:00:00`);
          return { bin: date.getDay(), count: day.count, date };
        }),
      })),
    [contributions.weeks],
  );

  return (
    <Tile span="8x3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <TileLabel>{t("label")}</TileLabel>
          <TileBig note={t("period")}>
            <CountUp value={contributions.total} active={active} />
          </TileBig>
        </div>
        <Badge>{t("streak", { days: contributions.streak })}</Badge>
      </div>
      <div
        role="img"
        aria-label={t("aria", { count: contributions.total })}
        className="no-scrollbar mt-auto overflow-x-auto min-[961px]:overflow-visible"
      >
        <div className="min-w-[640px]">
          <HeatmapInteractionProvider>
            <HeatmapInteractionBoundary>
              <div className="flex w-full flex-col items-stretch gap-2">
                <HeatmapChart
                  className="w-full"
                  data={columns}
                  layout="fluid"
                  gap={3}
                  margin={{ top: 24, right: 0, bottom: 0, left: 0 }}
                  animate={active}
                >
                  <HeatmapCells cornerRadius={3} />
                  <HeatmapXAxis />
                  <HeatmapTooltip
                    formatLabel={(count) => t("tooltip", { count })}
                  />
                </HeatmapChart>
                <HeatmapLegend
                  align="end"
                  lessLabel={t("less")}
                  moreLabel={t("more")}
                />
              </div>
            </HeatmapInteractionBoundary>
          </HeatmapInteractionProvider>
        </div>
      </div>
    </Tile>
  );
}
