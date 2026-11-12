import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { miniHeatLevels, type PrintFaceId } from "@/lib/data/line";
import { cn } from "@/lib/utils";
import s from "../line.module.css";

interface PrintFaceProps {
  face: PrintFaceId;
  /** Big text on the artwork, already localized. */
  title?: string;
}

const token = (name: string) => `var(--color-${name})`;

const MAP_PINS = [
  { x: 60, y: 40, fill: "yellow" },
  { x: 170, y: 80, fill: "print" },
  { x: 250, y: 30, fill: "print" },
  { x: 110, y: 130, fill: "print" },
];

const STACK_PILLS = [
  { label: "Next.js", x: 18, y: 18, rotate: -6, bg: "ink-static", fg: "paper-static" },
  { label: "Bun", x: 150, y: 26, rotate: 8, bg: "pink", fg: "ink-static" },
  { label: "Hono", x: 230, y: 62, rotate: -4, bg: "print", fg: "ink-static" },
  { label: "PostgreSQL", x: 30, y: 74, rotate: 4, bg: "blue", fg: "print" },
  { label: "Expo", x: 170, y: 104, rotate: -8, bg: "yellow", fg: "ink-static" },
  { label: "Tailwind", x: 60, y: 128, rotate: -3, bg: "teal", fg: "ink-static" },
];

const TROPHY_X = [40, 130, 220];
const MINI_HEAT = miniHeatLevels();

function Art({ className, children }: { className: string; children: ReactNode }) {
  return <span className={cn(s.art, className)}>{children}</span>;
}

/** Illustrated artwork of a print. Purely decorative: the print labels it. */
export default function PrintFace({ face, title }: PrintFaceProps) {
  const t = useTranslations("line.faces");
  const heading = title ? <span className={s.title}>{title}</span> : null;

  switch (face) {
    case "about":
      return (
        <Art className={s.fAbout}>
          <span className={s.photo}>
            <Image src="/images/Profile.jpg" alt="" width={236} height={280} />
          </span>
          <span className={s.sticker}>{t("thatsMe")}</span>
          <span className={s.sticker2}>{t("hi")}</span>
          {heading}
        </Art>
      );
    case "lapor":
      return (
        <Art className={s.fLapor}>
          {MAP_PINS.map((pin) => (
            <svg
              key={`${pin.x}-${pin.y}`}
              style={{ left: pin.x, top: pin.y }}
              width="28"
              height="36"
              viewBox="0 0 24 30"
            >
              <path
                d="M12 0C5.4 0 0 5.2 0 11.6 0 20 12 30 12 30s12-10 12-18.4C24 5.2 18.6 0 12 0z"
                fill={token(pin.fill)}
              />
              <circle cx="12" cy="11.5" r="4.5" fill={token("blue")} />
            </svg>
          ))}
          {heading}
        </Art>
      );
    case "wavy":
      return (
        <Art className={s.fWavy}>
          <span className={s.ticket}>
            <span>{t("admit")}</span>
            <b>{title}</b>
            <span>{t("seat")}</span>
          </span>
          {heading}
        </Art>
      );
    case "mst":
      return (
        <Art className={s.fMst}>
          <span className={s.gps} />
          <span className={cn(s.title, "max-w-[9ch]")}>{title}</span>
        </Art>
      );
    case "now":
      return (
        <Art className={s.fNow}>
          <span className={s.nowLabel}>{t("nowLabel")}</span>
          <span className={s.miniHeat}>
            {MINI_HEAT.map((level, i) => (
              <i key={i} style={{ background: token(`heat-${level}`) }} />
            ))}
          </span>
          <span className={s.nowPlaying}>
            <span className={s.vinyl} />
            {t("track")}
          </span>
        </Art>
      );
    case "stack":
      return (
        <Art className={s.fStack}>
          {STACK_PILLS.map((pill) => {
            const style: CSSProperties = {
              left: pill.x,
              top: pill.y,
              transform: `rotate(${pill.rotate}deg)`,
              background: token(pill.bg),
              color: token(pill.fg),
            };
            return (
              <span key={pill.label} className={s.pill} style={style}>
                {pill.label}
              </span>
            );
          })}
          {heading}
        </Art>
      );
    case "cabinet":
      return (
        <Art className={s.fCabinet}>
          {TROPHY_X.map((x) => (
            <svg
              key={x}
              style={{ left: x }}
              width="64"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              stroke={token("ink-static")}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 21h8" />
              <path d="M12 17v4" />
              <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
              <path d="M17 5h3v2a3 3 0 0 1-3 3" />
              <path d="M7 5H4v2a3 3 0 0 0 3 3" />
            </svg>
          ))}
          {heading}
        </Art>
      );
    case "contact":
      return (
        <Art className={s.fContact}>
          <span className={s.contactBig}>
            {t("contactLead")}
            <em>{t("contactAccent")}</em>
          </span>
        </Art>
      );
  }
}
