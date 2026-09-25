"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: ElementType;
  kind?: "media" | "type" | "block";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Media reveals wrap children so the frame can settle from a slight scale. */
  inner?: boolean;
};

let io: IntersectionObserver | null = null;

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io!.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
  );
  return io;
}

/**
 * Wipes content in along the A's stroke the first time it enters view.
 * The lean of the edge is computed from the element's own height so the
 * wipe is always parallel to the logo, on a headline or a 21:9 frame.
 */
export function Reveal({ as: Tag = "div", kind = "block", delay = 0, className, style, children, inner }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    el.style.setProperty("--s", `${Math.ceil(h * 1.5 * 0.5685) + 2}px`);
    observer().observe(el);
    return () => observer().unobserve(el);
  }, []);

  // The observed element stays unclipped (IntersectionObserver ignores
  // fully clipped targets); the wipe runs on an inner layer.
  const Inner = kind === "media" || Tag === "div" ? "div" : "span";
  return (
    <Tag
      ref={ref}
      data-reveal={kind}
      className={kind === "media" ? `overflow-hidden ${className ?? ""}` : className}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <Inner className={`reveal-clip block ${kind === "media" ? "h-full" : ""}`}>
        {inner || kind === "media" ? <div className="reveal-inner h-full w-full">{children}</div> : children}
      </Inner>
    </Tag>
  );
}
