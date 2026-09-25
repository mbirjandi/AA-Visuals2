"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/data/types";
import { FINE, REDUCED, useMedia } from "@/lib/useMedia";
import { MediaFrame } from "./media/MediaFrame";

export type IndexItem = {
  slug: string;
  name: string;
  sub?: string;
  meta: string[];
  media: Media;
};

/**
 * A typeset list of names. On fine pointers, hovering a row floats that
 * project's frame beside the cursor inside a parallelogram cut at the A's
 * angle; the other rows fall back. Touch gets the plain list.
 */
export function ProjectIndex({ items, size = "lg", label }: { items: IndexItem[]; size?: "lg" | "md"; label: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const fine = useMedia(FINE);
  const reduced = useMedia(REDUCED);
  const frame = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const loop = () => {
      const k = reduced ? 1 : 0.2;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      if (frame.current) frame.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fine, reduced]);

  const onMove = (e: React.PointerEvent) => {
    const w = frame.current?.offsetWidth ?? 0;
    const h = frame.current?.offsetHeight ?? 0;
    target.current = {
      // Pinned to the right-hand columns so it never covers the name being read.
      x: window.innerWidth - w - parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter") || "24") - window.innerWidth * 0.06,
      y: Math.max(16, Math.min(e.clientY - h / 2, window.innerHeight - h - 16)),
    };
    if (!armed) {
      pos.current = { ...target.current };
      setArmed(true);
    }
  };

  const type =
    size === "lg"
      ? "text-[clamp(38px,7.2vw,132px)] leading-[0.86] tracking-[-0.05em]"
      : "text-[clamp(34px,5.4vw,96px)] leading-[0.88] tracking-[-0.045em]";

  return (
    <div className="relative" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <ul aria-label={label} className="group/list border-b hair">
        {items.map((it, i) => (
          <li
            key={it.slug}
            className={`border-t hair transition-opacity duration-300 ${active !== null && active !== i ? "opacity-25" : ""}`}
          >
            <Link
              href={`/work/${it.slug}`}
              transitionTypes={["to-project"]}
              data-cursor="open"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-4 items-end gap-x-[var(--col-gap)] gap-y-2 py-[clamp(10px,1.4vw,20px)] lg:grid-cols-12"
            >
              <span className={`col-span-4 font-medium uppercase lg:col-span-9 ${type}`}>
                <span className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-[calc(0.8em*var(--run)*0.5)] group-focus-visible:translate-x-[calc(0.8em*var(--run)*0.5)]">
                  {it.name}
                </span>
                {it.sub ? (
                  <span className="ml-3 align-top text-[max(13px,0.2em)] tracking-[-0.01em] text-[var(--fg-mute)] normal-case">
                    {it.sub}
                  </span>
                ) : null}
              </span>
              <span className="meta col-span-4 flex justify-between gap-4 text-[var(--fg-mute)] lg:col-span-3 lg:justify-end lg:text-right">
                {it.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine ? (
        <div
          ref={frame}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-40 w-[clamp(220px,21vw,360px)]"
          style={{ visibility: active === null ? "hidden" : "visible" }}
        >
          <div
            className="relative aspect-[4/5] transition-[clip-path] duration-500 ease-[var(--ease-cut)]"
            style={{
              ["--ch" as string]: "clamp(44px, 5vw, 84px)",
              clipPath:
                active === null
                  ? "polygon(0 0, 0 0, 0 calc(100% - var(--ch)), 0 100%, 0 100%, 0 var(--ch))"
                  : "polygon(calc(var(--ch) * var(--run)) 0, 100% 0, 100% calc(100% - var(--ch)), calc(100% - var(--ch) * var(--run)) 100%, 0 100%, 0 var(--ch))",
            }}
          >
            {armed
              ? items.map((it, i) => (
                  <div key={it.slug} className="absolute inset-0" style={{ visibility: active === i ? "visible" : "hidden" }}>
                    <MediaFrame media={it.media} fill aspect="4:5" sizes="360px" label={it.name} />
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
