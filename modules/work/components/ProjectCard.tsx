"use client";
import { useRef } from "react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { localize } from "@/lib/data/localized";
import type { Project } from "@/lib/data/projects";
import { motionOn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import CoverFace from "@/modules/line/components/CoverFace";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Primary card: 7 columns × 2 rows with 560px art. */
  primary?: boolean;
}

/**
 * One project in the hierarchical grid. The art reveals with a clip-path
 * curtain from the bottom, has inner parallax, and tilts in 3D toward the
 * cursor (±14°, elastic return).
 */
export default function ProjectCard({ project, index, primary }: ProjectCardProps) {
  const t = useTranslations("work");
  const locale = useLocale();
  const format = useFormatter();
  const root = useRef<HTMLAnchorElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = root.current;
      const frame = art.current;
      if (!card || !frame || !inner.current || !motionOn()) return;

      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.5,
          ease: "expo.inOut",
          delay: index * 0.14,
          scrollTrigger: { trigger: card, start: "top 85%" },
        },
      );
      gsap.fromTo(
        inner.current,
        { yPercent: -10, scale: 1.3 },
        {
          yPercent: 10,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.from(card.querySelectorAll("[data-text]"), {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.35 + index * 0.14,
        scrollTrigger: { trigger: card, start: "top 85%" },
      });

      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const onMove = (e: PointerEvent) => {
        const box = frame.getBoundingClientRect();
        gsap.to(frame, {
          rotateY: ((e.clientX - box.left) / box.width - 0.5) * 14,
          rotateX: -((e.clientY - box.top) / box.height - 0.5) * 14,
          transformPerspective: 900,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        gsap.to(frame, {
          rotateY: 0,
          rotateX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [index] },
  );

  const rank = [
    format.number(index + 1, { minimumIntegerDigits: 2 }),
    primary ? t("rank.featured") : null,
    t(`rank.${project.type}`),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      ref={root}
      href={`/work/${project.slug}`}
      data-cursor="open"
      aria-label={t("open", { title: project.title })}
      className={cn(
        "group relative col-span-12 flex flex-col gap-3.5 grid-on:outline-[1.5px] grid-on:outline-offset-[6px] grid-on:outline-blue grid-on:outline-dashed",
        primary
          ? "min-[961px]:col-span-7 min-[961px]:row-span-2"
          : "min-[961px]:col-span-5 min-[961px]:col-start-8",
      )}
    >
      <span
        aria-hidden
        className="absolute top-3 left-3 z-10 hidden rounded bg-blue px-2 py-1 font-mono text-[11px] text-print uppercase grid-on:block"
      >
        {primary ? t("overlay.primary") : t("overlay.secondary")}
      </span>
      <div
        ref={art}
        className={cn(
          "relative overflow-hidden rounded-3xl transition-shadow duration-300 will-change-transform [transform-style:preserve-3d] group-hover:shadow-[0_30px_60px_-30px] group-hover:shadow-ink-static/50",
          primary ? "h-[380px] min-[961px]:h-[560px]" : "h-[220px]",
        )}
      >
        <div ref={inner} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
          <CoverFace face={project.face} title={project.shortTitle} />
        </div>
      </div>
      <span data-text className="font-mono text-xs tracking-chip text-muted uppercase">
        {rank}
      </span>
      <h3
        data-text
        className={cn(
          "font-extrabold tracking-[-0.03em]",
          primary ? "text-[44px] leading-none" : "text-[28px] leading-tight",
        )}
      >
        {project.title}
      </h3>
      <p data-text className="max-w-[46ch] text-base leading-normal text-muted">
        {localize(project.summary, locale)}
      </p>
      <ul data-text className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-hair px-2.5 py-1.5 font-mono text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
