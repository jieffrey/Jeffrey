"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT } from "@/lib/data/contact";
import { motionOn } from "@/lib/motion";
import Magnetic from "@/common/components/hud/Magnetic";
import SectionHeader from "@/common/components/section/SectionHeader";

const BUTTON =
  "inline-flex h-[52px] items-center gap-2.5 rounded-full px-6 text-base font-semibold";

/**
 * 07 — Contact. Axial grid: everything is centered on one vertical axis line.
 * The surface is ink in both themes.
 *
 * The ink floods in as a circle expanding from the bottom center (clip-path
 * scrub), the headline letters fall into place with alternating rotation
 * (scrubbed), and the rest rises in. Buttons are magnetic.
 */
export default function Contact() {
  const t = useTranslations("contact");
  const section = useRef<HTMLElement>(null);
  const title = t.raw("title") as string;
  const year = String(new Date().getFullYear());

  useGSAP(
    () => {
      const el = section.current;
      if (!el || !motionOn()) return;

      gsap.fromTo(
        el,
        { clipPath: "circle(6% at 50% 100%)" },
        {
          clipPath: "circle(150% at 50% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 10%",
            scrub: true,
          },
        },
      );
      gsap.from(el.querySelectorAll("[data-heading] [data-char]"), {
        yPercent: 140,
        rotate: (i) => (i % 2 ? 1 : -1) * 24,
        opacity: 0,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 5%",
          scrub: true,
        },
      });
      gsap.from(el.querySelectorAll("[data-rise]"), {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-buttons]", start: "top 95%" },
      });
    },
    { scope: section, dependencies: [title], revertOnUpdate: true },
  );

  return (
    <section
      id="contact"
      ref={section}
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative bg-ink-static py-[104px] text-center text-paper-static min-[721px]:py-[136px]"
    >
      <div
        aria-hidden
        data-axis
        className="absolute inset-y-0 left-1/2 w-px bg-paper-static/18 grid-on:w-0.5 grid-on:bg-lime"
      />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-8 px-pad grid-on:*:outline grid-on:*:outline-offset-[6px] grid-on:*:outline-lime/50 grid-on:*:outline-dashed">
        <SectionHeader
          id="contact"
          title={title}
          customHeadingMotion
          className="flex flex-col items-center"
          eyebrowClassName="justify-center text-ash [&_b]:text-lime"
          headingClassName="text-[clamp(56px,10vw,160px)] [&_em]:text-lime"
        />
        <p data-rise className="max-w-[40ch] text-lg leading-normal text-ash">
          {t("lead")}
        </p>
        <ul data-rise data-buttons className="flex flex-wrap justify-center gap-3">
          <li>
            <Magnetic>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label={t("emailLabel", { email: CONTACT.email })}
                className={`${BUTTON} bg-lime text-ink-static`}
              >
                {t("email")}
              </a>
            </Magnetic>
          </li>
          {(["github", "linkedin"] as const).map((key) => (
            <li key={key}>
              <Magnetic>
                <a
                  href={CONTACT[key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("external", { name: t(key) })}
                  className={`${BUTTON} inset-ring-[1.5px] inset-ring-paper-static/40`}
                >
                  {t(key)}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
        <footer
          data-rise
          className="mt-[88px] pb-24 font-mono text-[11px] tracking-chip text-ash/75 uppercase"
        >
          {t("footer", { year })}
        </footer>
      </div>
    </section>
  );
}
