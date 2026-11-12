"use client";
import { useRef, type ComponentType, type CSSProperties } from "react";
import {
  SiBun,
  SiExpo,
  SiFigma,
  SiGit,
  SiHono,
  SiNeon,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "@icons-pack/react-simple-icons";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { STACK_RINGS, chipAngle, type StackIcon } from "@/lib/data/stack";
import { motionOn } from "@/lib/motion";
import GhostText from "@/common/components/section/GhostText";
import SectionHeader from "@/common/components/section/SectionHeader";

const ICONS: Record<StackIcon, ComponentType<{ size?: number; color?: string }>> = {
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  bun: SiBun,
  hono: SiHono,
  postgresql: SiPostgresql,
  expo: SiExpo,
  tailwind: SiTailwindcss,
  neon: SiNeon,
  shadcn: SiShadcnui,
  git: SiGit,
  figma: SiFigma,
  vercel: SiVercel,
};

const RAD = Math.PI / 180;
const token = (name: string) => `var(--color-${name})`;
/** Top offset of each ring label, in % (prototype values). */
const LABEL_TOP = ["27%", "14%", "1.4%"];

/**
 * 05 — Stack. Radial grid: three concentric rings (radius 22% / 35% / 48% of
 * the container) and 30° spokes around a lime "TS" core.
 *
 * The section pins for 160%. The core spins in, rings expand and spokes
 * rotate in with the scrub; chips pop in once on enter and are never tied to
 * scroll progress. Rings orbit with scroll in alternating directions. Chips
 * are only translated, so they stay upright, and every offset is computed in
 * px from the container width.
 */
export default function StackOrbit() {
  const t = useTranslations("stack");
  const pin = useRef<HTMLDivElement>(null);
  const radial = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = pin.current;
      const box = radial.current;
      if (!el || !box || !motionOn()) return;

      let target = 0;
      let rotation = 0;
      const chips = Array.from(box.querySelectorAll<HTMLElement>("[data-chip]")).map(
        (chip) => ({
          chip,
          angle: Number(chip.dataset.angle),
          radius: Number(chip.dataset.radius),
          // Alternate direction per ring; outer rings turn a little slower.
          factor:
            (Number(chip.dataset.ring) % 2 ? -1 : 1) *
            (1 - Number(chip.dataset.ring) * 0.2),
        }),
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              target = self.progress * 320;
            },
          },
        })
        .from("[data-core]", { scale: 0, rotate: -180, ease: "back.out(2)", duration: 0.25 }, 0)
        .from(
          "[data-ring]",
          { scale: 0.3, opacity: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
          0,
        )
        .from("[data-spokes]", { rotate: -120, opacity: 0, duration: 0.4 }, 0)
        .to({}, { duration: 0.6 });

      gsap.from("[data-chip-pop]", {
        scale: 0,
        rotate: -30,
        stagger: 0.04,
        duration: 0.8,
        ease: "back.out(3)",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      const tick = () => {
        if (Math.abs(target - rotation) < 0.01) return;
        rotation += (target - rotation) * 0.1;
        const unit = box.clientWidth / 100;
        for (const { chip, angle, radius, factor } of chips) {
          const from = angle * RAD;
          const to = (angle + rotation * factor) * RAD;
          const x = (Math.cos(to) - Math.cos(from)) * radius * unit;
          const y = (Math.sin(to) - Math.sin(from)) * radius * unit;
          chip.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: pin },
  );

  return (
    <section id="stack" data-section="stack" aria-labelledby="stack-title">
      <div
        ref={pin}
        className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-paper-2 py-[88px] text-ink"
      >
        <GhostText text={t("ghost")} className="bottom-10" reverse />
        <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-pad">
          <SectionHeader id="stack" title={t.raw("title")} />
          <div
            ref={radial}
            className="relative mx-auto mt-8 aspect-square w-[min(640px,62vh,92vw)]"
          >
            <div
              data-spokes
              aria-hidden
              className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(from_0deg,var(--spoke)_0deg_0.4deg,transparent_0.4deg_30deg)] [--spoke:color-mix(in_srgb,var(--color-ink)_9%,transparent)] grid-on:[--spoke:color-mix(in_srgb,var(--color-blue)_40%,transparent)]"
            />
            {STACK_RINGS.map((ring, i) => (
              <div key={ring.id} aria-hidden>
                <div
                  className="absolute top-1/2 left-1/2 -translate-1/2"
                  style={{ width: `${ring.radius * 2}%`, height: `${ring.radius * 2}%` }}
                >
                  <div
                    data-ring
                    className="size-full rounded-full border-[1.5px] border-dashed border-ink/25 grid-on:border-solid grid-on:border-blue"
                  />
                </div>
                <span
                  className="absolute left-1/2 -translate-x-1/2 bg-paper-2 px-1.5 font-mono text-[10px] tracking-hud text-muted uppercase"
                  style={{ top: LABEL_TOP[i] }}
                >
                  {t(`rings.${ring.id}`)}
                </span>
              </div>
            ))}
            <div className="absolute top-1/2 left-1/2 w-[18%] -translate-1/2">
              <div
                data-core
                aria-hidden
                className="flex aspect-square items-center justify-center rounded-full bg-lime text-[clamp(28px,5vw,56px)] font-extrabold tracking-[-0.04em] text-ink-static shadow-[0_0_0_8px_var(--color-paper-2),0_0_0_9.5px_color-mix(in_srgb,var(--color-ink)_25%,transparent)]"
              >
                {t("core")}
              </div>
            </div>

            {STACK_RINGS.map((ring, ringIndex) => (
              <ul key={ring.id} aria-label={t(`rings.${ring.id}`)}>
                {ring.items.map((item, i) => {
                  const angle = chipAngle(ringIndex, i, ring.items.length);
                  const Icon = item.icon ? ICONS[item.icon] : null;
                  const fg = token(item.fg ?? "ink-static");
                  const position: CSSProperties = {
                    left: `${50 + Math.cos(angle * RAD) * ring.radius}%`,
                    top: `${50 + Math.sin(angle * RAD) * ring.radius}%`,
                  };
                  return (
                    <li
                      key={item.name}
                      data-chip
                      data-ring={ringIndex}
                      data-angle={angle}
                      data-radius={ring.radius}
                      className="absolute z-[2] -translate-1/2 will-change-transform"
                      style={position}
                    >
                      <span data-chip-pop className="block">
                        <span
                          className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[clamp(12px,1.4vw,16px)] max-[719px]:gap-0 max-[719px]:p-2 leading-none font-bold whitespace-nowrap shadow-[0_0_0_3px_var(--color-print),0_10px_20px_-10px_color-mix(in_srgb,var(--color-ink-static)_40%,transparent)] transition-transform duration-200 hover:scale-[1.12]"
                          style={{ background: token(item.bg), color: fg }}
                        >
                          {Icon ? (
                            <Icon size={16} color="currentColor" />
                          ) : (
                            <span
                              aria-hidden
                              className="flex size-4 items-center justify-center rounded-full border border-current font-mono text-[9px] font-medium uppercase"
                            >
                              {item.name.charAt(0)}
                            </span>
                          )}
                          <span className="max-[719px]:sr-only">{item.name}</span>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
