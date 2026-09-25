"use client";

import { useEffect, useRef, useState } from "react";
import { FINE, useMedia } from "@/lib/useMedia";

const LABELS: Record<string, string> = { view: "View", play: "Play", open: "Open" };

/**
 * A small label that follows the pointer over media only. The system cursor
 * is never hidden. Fine pointers only.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = useMedia(FINE);

  useEffect(() => {
    if (!enabled) return;
    let x = -100;
    let y = -100;
    let raf = 0;
    const paint = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t ? LABELS[t.dataset.cursor ?? ""] ?? null : null);
    };
    const leave = () => setLabel(null);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} aria-hidden className="cursor-chip meta" data-on={label ? "true" : "false"}>
      {label ?? ""}
    </div>
  );
}
