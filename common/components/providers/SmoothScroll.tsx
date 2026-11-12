"use client";
import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUi } from "@/common/stores/ui";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import VelocitySkew from "./VelocitySkew";

/**
 * Root Lenis instance driven by the GSAP ticker and kept in sync with
 * ScrollTrigger. Under prefers-reduced-motion Lenis is not mounted at all and
 * the page scrolls natively.
 *
 * ReactLenis creates its instance in an effect and publishes it through
 * state, so it is NOT available in this component's first effect. Everything
 * here reads it from useLenis(), which re-renders when the instance appears.
 * Reading it once from a ref left Lenis without a raf loop: it then swallowed
 * wheel events and never scrolled.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useLenis();
  const loaderDone = useUi((s) => s.loaderDone);

  // Lenis is created with autoRaf: false; the GSAP ticker is its only driver.
  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  // The page must not scroll underneath the loader. Every other state
  // (loader skipped, remount, locale change) ends in start().
  useEffect(() => {
    if (!lenis) return;
    if (loaderDone) lenis.start();
    else lenis.stop();
    return () => lenis.start();
  }, [lenis, loaderDone]);

  // Web fonts change text metrics, so trigger positions are measured again.
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.09 }}>
      <VelocitySkew />
      {children}
    </ReactLenis>
  );
}
