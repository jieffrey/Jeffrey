"use client";
import { useRef } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn } from "@/lib/motion";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { plainText } from "@/lib/split-text";
import { cn } from "@/lib/utils";
import SplitText from "./SplitText";

interface SectionHeaderProps {
  id: Exclude<SectionId, "line">;
  /** Heading markup; may contain one <em>word</em>. */
  title: string;
  /** Hide the heading visually (About shows only the eyebrow). */
  srOnlyTitle?: boolean;
  /** Skip the built-in letter flip; the section animates [data-char] itself. */
  customHeadingMotion?: boolean;
  className?: string;
  eyebrowClassName?: string;
  headingClassName?: string;
}

/**
 * Eyebrow ("02 — NOW · MODULAR GRID …") plus the section heading.
 * The eyebrow wipes in with clip-path; the heading letters rise with a 3D
 * flip. Both re-run when the text changes (locale switch).
 */
export default function SectionHeader({
  id,
  title,
  srOnlyTitle,
  customHeadingMotion,
  className,
  eyebrowClassName,
  headingClassName,
}: SectionHeaderProps) {
  const t = useTranslations();
  const format = useFormatter();
  const root = useRef<HTMLDivElement>(null);
  const index = SECTIONS.findIndex((s) => s.id === id);

  useGSAP(
    () => {
      if (!motionOn() || !root.current) return;
      const eyebrow = root.current.querySelector("[data-eyebrow]");
      const heading = root.current.querySelector("[data-heading]");
      if (eyebrow) {
        gsap.from(eyebrow, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: eyebrow, start: "top 92%" },
        });
      }
      if (heading && !srOnlyTitle && !customHeadingMotion) {
        gsap.from(heading.querySelectorAll("[data-char]"), {
          yPercent: 110,
          rotateX: -90,
          opacity: 0,
          transformOrigin: "50% 100%",
          stagger: 0.018,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: heading, start: "top 88%" },
        });
      }
    },
    {
      scope: root,
      dependencies: [title, srOnlyTitle, customHeadingMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={root} className={className}>
      <p data-eyebrow className={cn("eyebrow", eyebrowClassName)}>
        <b>
          {format.number(index + 1, { minimumIntegerDigits: 2 })} —{" "}
          {t(`${id}.nav`)}
        </b>
        <span>{t(`${id}.grid`)}</span>
      </p>
      <h2
        id={`${id}-title`}
        data-heading
        data-skew
        aria-label={plainText(title)}
        className={cn(
          srOnlyTitle
            ? "sr-only"
            : "mt-3 text-[clamp(44px,6vw,88px)] leading-[0.95] font-extrabold tracking-display text-balance [perspective:800px]",
          headingClassName,
        )}
      >
        <SplitText text={title} />
      </h2>
    </div>
  );
}
