"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUi } from "@/common/stores/ui";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Root Lenis instance driven by the GSAP ticker and kept in sync with
 * ScrollTrigger. Under prefers-reduced-motion Lenis is not mounted at all and
 * the page scrolls natively.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const loaderDone = useUi((s) => s.loaderDone);

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = lenisRef.current?.lenis;
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
  }, [reducedMotion]);

  // The page must not scroll underneath the loader.
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    if (loaderDone) lenis.start();
    else lenis.stop();
  }, [loaderDone, reducedMotion]);

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
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
