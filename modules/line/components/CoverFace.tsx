"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import type { PrintFaceId } from "@/lib/data/line";
import PrintFace from "./PrintFace";

/** Native size the print artwork is drawn at. */
const ART_WIDTH = 320;
const ART_HEIGHT = 216;

/**
 * A print's artwork scaled to cover its parent (project cards, case-study
 * hero). The art is laid out in px at print size, so it is scaled as a whole
 * with a transform; the factor is measured in px from the container.
 */
export default function CoverFace({ face, title }: { face: PrintFaceId; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const scale = Math.max(el.clientWidth / ART_WIDTH, el.clientHeight / ART_HEIGHT);
      el.style.setProperty("--cover-scale", scale.toFixed(4));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 origin-center"
        style={
          {
            width: ART_WIDTH,
            height: ART_HEIGHT,
            transform: "translate(-50%, -50%) scale(var(--cover-scale, 2))",
          } as CSSProperties
        }
      >
        <PrintFace face={face} title={title} cover />
      </div>
    </div>
  );
}
