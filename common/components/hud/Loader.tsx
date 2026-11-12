"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { LOADER_SESSION_KEY } from "@/lib/loader";
import { useUi } from "@/common/stores/ui";

const pad = (value: number) => String(Math.round(value)).padStart(3, "0");

/**
 * First-visit loader: ink overlay, lime 000 → 100 counter, progress bar, then
 * a wipe up. The inline boot script decides whether it shows at all (see
 * lib/loader.ts); this component only plays it and reports completion.
 */
export default function Loader() {
  const t = useTranslations("loader");
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    const { loaderDone, setLoaderDone } = useUi.getState();

    const finish = () => {
      delete html.dataset.loader;
      try {
        sessionStorage.setItem(LOADER_SESSION_KEY, "1");
      } catch {
        // Storage can be blocked; the loader then simply plays every visit.
      }
      setLoaderDone();
    };

    if (!root || loaderDone || html.dataset.loader !== "on") {
      finish();
      return;
    }

    const progress = { value: 0 };
    gsap
      .timeline({ onComplete: finish })
      .to(progress, {
        value: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = pad(progress.value);
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progress.value / 100})`;
          }
        },
      })
      .to(root, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "expo.inOut",
        delay: 0.15,
      });
  });

  return (
    <div
      ref={rootRef}
      role="status"
      className="loader fixed inset-0 z-[100] flex-col justify-end bg-ink-static p-5 text-lime sm:p-8"
    >
      <span className="sr-only">{t("label")}</span>
      <span
        ref={countRef}
        aria-hidden
        className="font-display text-[clamp(7rem,28vw,24rem)] leading-[0.8] font-extrabold tracking-display tabular-nums"
      >
        000
      </span>
      <div aria-hidden className="mt-6 h-[3px] w-full bg-paper-static/15">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-lime will-change-transform"
        />
      </div>
    </div>
  );
}
