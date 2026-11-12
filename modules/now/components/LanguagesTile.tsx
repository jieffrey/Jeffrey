"use client";
import { useFormatter, useTranslations } from "next-intl";
import { PieCenter } from "@/components/charts/pie-center";
import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import type { LanguageShare } from "@/lib/data/github";
import Tile, { TileLabel } from "./Tile";

/** Segment colors, in order. Chart tokens only. */
const COLORS = [
  "var(--color-violet)",
  "var(--color-orange)",
  "var(--color-teal)",
  "var(--color-yellow)",
  "var(--color-pink)",
];

/** Top languages (bklit Pie as a donut). Hover updates the center label. */
export default function LanguagesTile({ languages }: { languages: LanguageShare[] }) {
  const t = useTranslations("now.languages");
  const format = useFormatter();
  const data = languages.map((language, i) => ({
    label: language.name,
    value: language.percent,
    color: COLORS[i % COLORS.length],
  }));
  const top = data[0];
  const percent = (value: number) =>
    format.number(value / 100, { style: "percent" });

  return (
    <Tile span="4x3">
      <TileLabel>{t("label")}</TileLabel>
      <div
        role="img"
        aria-label={t("aria", {
          list: languages
            .map((language) => `${language.name} ${percent(language.percent)}`)
            .join(", "),
        })}
        className="flex min-h-0 flex-1 items-center justify-center"
      >
        <PieChart data={data} size={168} innerRadius={56} padAngle={0.03} cornerRadius={3}>
          {data.map((item, i) => (
            <PieSlice key={item.label} index={i} />
          ))}
          <PieCenter>
            {({ isHovered, data: hovered }) => {
              const shown = isHovered ? hovered : top;
              return (
                <div className="text-center">
                  <b className="block text-3xl tracking-[-0.03em]">
                    {percent(shown.value)}
                  </b>
                  <span className="text-xs text-dim">{shown.label}</span>
                </div>
              );
            }}
          </PieCenter>
        </PieChart>
      </div>
      <ul className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 text-xs">
        {data.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <i className="block size-2 rounded-xs" style={{ background: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
    </Tile>
  );
}
