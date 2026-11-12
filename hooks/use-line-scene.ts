"use client";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lineStep } from "@/lib/data/line";
import { LINE_STACK_SESSION_KEY } from "@/lib/loader";
import { useCamera } from "@/common/stores/camera";
import { useUi } from "@/common/stores/ui";
import { absoluteTop, useScrollToY } from "./use-scroll-to-section";

export interface LineSceneRefs {
  section: RefObject<HTMLElement | null>;
  scene: RefObject<HTMLDivElement | null>;
  world: RefObject<HTMLDivElement | null>;
  head: RefObject<HTMLElement | null>;
  marquee: RefObject<HTMLDivElement | null>;
  endHint: RefObject<HTMLDivElement | null>;
  ropes: RefObject<(HTMLElement | null)[]>;
  hangers: RefObject<(HTMLElement | null)[]>;
  swings: RefObject<(HTMLElement | null)[]>;
}

/** Number of times the marquee text is repeated in the DOM. */
export const MARQUEE_REPEAT = 5;

const INTRO_FROM = { z: -2200, ry: -34, y: -260 };
const DEG = 180 / Math.PI;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Scroll distance between two prints. */
const segment = () => Math.max(480, window.innerHeight * 0.7);

const isScene = () => document.documentElement.dataset.line === "scene";
const hasMotion = () => document.documentElement.dataset.motion === "on";

/**
 * Drives The Line. All numbers come from docs/design/the-line.html.
 *
 * Scene mode: places ropes and prints in 3D, moves the camera along the line
 * with scroll (lerp 0.085), swings each print with a spring driven by scroll
 * velocity plus an idle sine, applies mouse parallax, the header parallax,
 * the marquee and the camera intro after the loader.
 *
 * Stack mode (low-performance fallback): only the swing runs. Under reduced
 * motion nothing runs at all.
 */
export function useLineScene(refs: LineSceneRefs, count: number) {
  const loaderDone = useUi((s) => s.loaderDone);
  const scrollToY = useScrollToY();
  const camera = useRef({ t: 0, intro: { z: 0, ry: 0, y: 0 } });
  const {
    section: sectionRef,
    scene: sceneRef,
    world: worldRef,
    head: headRef,
    marquee: marqueeRef,
    endHint: endHintRef,
    ropes: ropesRef,
    hangers: hangersRef,
    swings: swingsRef,
  } = refs;

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const world = worldRef.current;
    const head = headRef.current;
    const marquee = marqueeRef.current;
    const endHint = endHintRef.current;
    if (!section || !scene || !world || !head || !marquee || !endHint) return;

    const ropes = ropesRef.current.filter((el) => el !== null);
    const hangers = hangersRef.current.filter((el) => el !== null);
    const swings = swingsRef.current
      .filter((el) => el !== null)
      .map((el) => ({ el, angle: 0, velocity: 0 }));
    const cam = camera.current;
    const ui = useUi.getState();

    ui.setLineMode(isScene() ? "scene" : "stack");
    if (!hasMotion()) {
      return () => useUi.getState().setLineMode(null);
    }

    cam.t = 0;
    cam.intro = isScene() ? { ...INTRO_FROM } : { z: 0, ry: 0, y: 0 };

    /** Positions ropes and prints for the current camera config. */
    const place = () => {
      if (!isScene()) return;
      const { config } = useCamera.getState();
      const d = lineStep(config.gap);
      const length = Math.hypot(d.x, d.y, d.z);
      const yaw = Math.atan2(-d.z, d.x) * DEG;
      const pitch = Math.atan2(d.y, Math.hypot(d.x, d.z)) * DEG;
      ropes.forEach((rope, k) => {
        const i = k - 1;
        rope.style.width = `${length}px`;
        rope.style.transform = `translate3d(${i * d.x}px,${i * d.y}px,${i * d.z}px) rotateY(${yaw}deg) rotateZ(${pitch}deg)`;
      });
      hangers.forEach((hanger, i) => {
        hanger.style.transform = `translate3d(${i * d.x}px,${i * d.y}px,${i * d.z}px) rotateY(${config.angle}deg)`;
      });
      scene.style.perspective = `${config.persp}px`;
    };

    /** Removes every inline style the scene wrote (used when falling back). */
    const clear = () => {
      for (const el of [...ropes, ...hangers, scene, world, head, marquee]) {
        el.removeAttribute("style");
      }
      for (const swing of swings) swing.el.style.transform = "";
      endHint.dataset.on = "false";
    };

    const fallBackToStack = () => {
      document.documentElement.dataset.line = "stack";
      try {
        sessionStorage.setItem(LINE_STACK_SESSION_KEY, "1");
      } catch {
        // Storage can be blocked; the check simply runs again next visit.
      }
      clear();
      const state = useUi.getState();
      state.setLineMode("stack");
      state.setLinePrint(null);
      useCamera.getState().setPanelOpen(false);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // Layout is measured on resize only, never inside the frame loop.
    const metrics = { top: 0, height: 0, loop: 0, width: 0, segment: 1 };
    const measure = () => {
      metrics.top = absoluteTop(section);
      metrics.height = section.offsetHeight;
      metrics.loop = marquee.scrollWidth / MARQUEE_REPEAT;
      metrics.width = window.innerWidth;
      metrics.segment = segment();
    };

    let prev = 0;
    let velocity = 0;
    let mouseX = 0;
    let mouseY = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let hover = -1;
    let frames = 0;
    let fpsAt = 0;
    let startedAt = 0;
    let slowSeconds = 0;
    let lastPrint = -1;
    let lastHead = "";
    const opacities: string[] = [];

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    const onPointerOver = (e: PointerEvent) => {
      const print =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>("[data-line-index]")
          : null;
      hover = print ? Number(print.dataset.lineIndex) : -1;
    };
    const onPointerLeave = () => {
      hover = -1;
    };

    const swing = (now: number, sway: number, lift: boolean) => {
      swings.forEach((item, i) => {
        const wind = clamp(-velocity * 80 * sway * (1 + (i % 3) * 0.22), -18, 18);
        const goal = wind + Math.sin(now / 900 + i * 1.3) * 0.7 * sway;
        item.velocity += (goal - item.angle) * 0.07;
        item.velocity *= 0.87;
        item.angle += item.velocity;
        const z = lift ? ` translateZ(${i === hover ? 40 : 0}px)` : "";
        item.el.style.transform = `rotateZ(${item.angle.toFixed(2)}deg)${z}`;
      });
    };

    const tick = (time: number) => {
      const now = time * 1000;
      if (!startedAt) startedAt = fpsAt = now;
      const sceneMode = isScene();

      frames++;
      if (now - fpsAt > 1000) {
        useCamera.getState().setFps(frames);
        // Phones that cannot hold the 3D scene drop to the flat stack.
        const measurable =
          sceneMode &&
          window.innerWidth < 720 &&
          document.visibilityState === "visible" &&
          now - startedAt > 4000;
        slowSeconds = measurable && frames < 30 ? slowSeconds + 1 : 0;
        frames = 0;
        fpsAt = now;
        if (slowSeconds >= 3) {
          fallBackToStack();
          return;
        }
      }

      // Nothing is visible behind the loader; the first frame after it
      // starts from the intro pose.
      if (!useUi.getState().loaderDone) return;

      const y = window.scrollY;
      const { top } = metrics;
      if (y >= top + metrics.height) return;

      const { config } = useCamera.getState();
      const raw = (y - top) / metrics.segment;
      const target = sceneMode ? clamp(raw, 0, count - 1) : raw;
      velocity += (target - prev - velocity) * 0.2;
      prev = target;

      if (!sceneMode) {
        swing(now, config.sway, false);
        return;
      }

      cam.t += (target - cam.t) * 0.085;
      parallaxX += (mouseX - parallaxX) * 0.06;
      parallaxY += (mouseY - parallaxY) * 0.06;

      const d = lineStep(config.gap);
      const { intro, t } = cam;
      const { width } = metrics;
      const scale = Math.min(1, width / 1100) * (width < 720 ? 0.85 : 1);
      world.style.transform = `scale(${scale}) translate3d(0,${intro.y}px,0) rotateX(${config.tilt - parallaxY * 4}deg) rotateY(${parallaxX * 6 + intro.ry}deg) translate3d(${-t * d.x}px,${-t * d.y}px,${-t * d.z + intro.z}px)`;

      hangers.forEach((hanger, i) => {
        const rel = i - t;
        let opacity = 1;
        if (rel < -0.55) opacity = Math.max(0, 1 + (rel + 0.55) * 2.2);
        else if (rel > 3.5) opacity = Math.max(0.12, 1 - (rel - 3.5) * 0.3);
        // Most prints sit at a constant opacity; only write real changes.
        const value = opacity.toFixed(2);
        if (opacities[i] !== value) {
          opacities[i] = value;
          hanger.style.opacity = value;
          hanger.style.pointerEvents = opacity < 0.3 ? "none" : "auto";
        }
      });
      swing(now, config.sway, true);

      const headKey = t.toFixed(3);
      if (headKey !== lastHead) {
        lastHead = headKey;
        head.style.transform = `translateY(${-t * 24}px)`;
        head.style.opacity = String(Math.max(0.18, 1 - t * 0.55));
      }

      const { loop } = metrics;
      if (loop > 0) {
        marquee.style.transform = `translateX(${-((t * 220 + now * 0.02) % loop)}px) skewX(${clamp(-velocity * 400, -14, 14)}deg)`;
      }
      endHint.dataset.on = String(target > count - 1.4);

      const print = Math.round(t);
      if (print !== lastPrint) {
        lastPrint = print;
        useUi.getState().setLinePrint(print);
      }
    };

    place();
    measure();
    const refresh = () => {
      measure();
    };
    window.addEventListener("resize", refresh);
    ScrollTrigger.addEventListener("refresh", refresh);
    const unsubscribe = useCamera.subscribe((state, previous) => {
      if (state.config !== previous.config) place();
    });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerover", onPointerOver, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    gsap.ticker.add(tick);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", refresh);
      ScrollTrigger.removeEventListener("refresh", refresh);
      window.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerover", onPointerOver);
      section.removeEventListener("pointerleave", onPointerLeave);
      gsap.ticker.remove(tick);
      const state = useUi.getState();
      state.setLineMode(null);
      state.setLinePrint(null);
    };
  }, [
    sectionRef,
    sceneRef,
    worldRef,
    headRef,
    marqueeRef,
    endHintRef,
    ropesRef,
    hangersRef,
    swingsRef,
    count,
  ]);

  // Camera intro: flies in once the loader has released the page.
  useEffect(() => {
    if (!loaderDone || !isScene()) return;
    const tween = gsap.to(camera.current.intro, {
      z: 0,
      ry: 0,
      y: 0,
      duration: 2.6,
      ease: "expo.out",
      delay: 0.15,
    });
    return () => {
      tween.kill();
    };
  }, [loaderDone]);

  /** Moves the camera to print `index` (scene mode). */
  const goToPrint = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      scrollToY(absoluteTop(section) + clamp(index, 0, count - 1) * segment());
    },
    [sectionRef, count, scrollToY],
  );

  /** True when print `index` is the one in front of the camera. */
  const isFront = useCallback(
    (index: number) => Math.abs(index - camera.current.t) <= 0.6,
    [],
  );

  return { goToPrint, isFront, isScene };
}
