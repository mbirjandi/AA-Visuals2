"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/data/types";
import { REDUCED, useMedia } from "@/lib/useMedia";

/*
  One ambient video plays at a time: whichever registered video is most in
  view (≥ 50%). Everything else is paused. Sources aren't attached until a
  video is within a screen of the viewport.
*/
const ratios = new Map<HTMLVideoElement, number>();
let raf = 0;
function arbitrate() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    let best: HTMLVideoElement | null = null;
    let bestR = 0.5;
    for (const [v, r] of ratios) {
      if (v.dataset.userPaused === "true") continue;
      if (r >= bestR) {
        best = v;
        bestR = r;
      }
    }
    for (const v of ratios.keys()) {
      if (v === best) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    }
  });
}

type Props = {
  media: VideoMedia;
  className?: string;
  /** "ambient": plays when in view. "hover": parent controls via `playing`. */
  mode?: "ambient" | "hover";
  playing?: boolean;
  controls?: boolean;
};

export function LazyVideo({ media, className = "", mode = "ambient", playing, controls = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [paused, setPaused] = useState(true);
  const reduced = useMedia(REDUCED);

  // Attach sources only when near the viewport.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(v);
    return () => near.disconnect();
  }, []);

  // Ambient: register with the arbiter.
  useEffect(() => {
    const v = ref.current;
    if (!v || !armed || mode !== "ambient" || reduced) return;
    const vis = new IntersectionObserver(
      ([e]) => {
        ratios.set(v, e.intersectionRatio);
        arbitrate();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    vis.observe(v);
    return () => {
      vis.disconnect();
      ratios.delete(v);
      v.pause();
    };
  }, [armed, mode, reduced]);

  // Hover: parent decides.
  useEffect(() => {
    const v = ref.current;
    if (!v || mode !== "hover" || !armed) return;
    if (playing && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [playing, mode, armed, reduced]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.dataset.userPaused = "false";
      ratios.set(v, 1);
      v.play().catch(() => {});
    } else {
      v.dataset.userPaused = "true";
      v.pause();
    }
  };

  return (
    <div className={`relative h-full w-full ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        style={{ objectPosition: media.focus }}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        {armed && media.webm ? <source src={media.webm} type="video/webm" /> : null}
        {armed ? <source src={media.mp4} type="video/mp4" /> : null}
      </video>
      {controls && mode === "ambient" ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!paused}
          className="meta absolute right-3 bottom-3 bg-ink/70 px-2.5 py-1.5 text-paper"
        >
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> {media.alt}</span>
        </button>
      ) : null}
    </div>
  );
}
