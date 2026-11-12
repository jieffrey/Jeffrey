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
 * lib/loader.ts). The page is released (scroll unlocked, intro started) when
 * the count ends, while the wipe is still running.
 */
export default function Loader() {
  const t = useTranslations();
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    const { loaderDone, setLoaderDone } = useUi.getState();
    html.dataset.hydrated = "1";

    const release = () => {
      html.dataset.ready = "1";
      try {
        sessionStorage.setItem(LOADER_SESSION_KEY, "1");
      } catch {
        // Storage can be blocked; the loader then simply plays every visit.
      }
      setLoaderDone();
    };

    if (!root || loaderDone || html.dataset.loader !== "on") {
      delete html.dataset.loader;
      release();
      return;
    }

    window.scrollTo(0, 0);
    const progress = { value: 0 };
    gsap
      .timeline()
      .to(progress, {
        value: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = pad(progress.value);
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progress.value / 100})`;
          }
        },
        onComplete: release,
      })
      .to(root, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          delete html.dataset.loader;
        },
      });
  });

  return (
    <div
      ref={rootRef}
      role="status"
      className="loader fixed inset-0 z-[100] flex-col justify-between bg-ink-static px-pad py-7 text-paper-static"
    >
      <span className="sr-only">{t("loader.label")}</span>
      <div
        aria-hidden
        className="flex justify-between font-mono text-xs tracking-hud text-ash uppercase"
      >
        <span>{t("hud.brand")}</span>
        <span>{t("loader.tagline")}</span>
      </div>
      <div aria-hidden>
        <div
          ref={countRef}
          className="text-[clamp(120px,24vw,360px)] leading-[0.8] font-extrabold tracking-[-0.06em] text-lime tabular-nums"
        >
          000
        </div>
        <div className="h-0.5 bg-paper-static/15">
          <i
            ref={barRef}
            className="block h-full origin-left scale-x-0 bg-lime will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
