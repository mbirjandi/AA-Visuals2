"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reel } from "@/data/site";

const SHOT_MS = 1500;
const FPS = 25;

/**
 * What plays inside the mark. A silent loop if one exists; otherwise real
 * stills, hard-cut on a steady rhythm with a slow push-in on each shot.
 * A running timecode and shot counter sit alongside, like a viewer.
 */
export function HeroFootage({ active, onTick }: { active: boolean; onTick?: (tc: string, shot: number) => void }) {
  const [shot, setShot] = useState(0);
  const vid = useRef<HTMLVideoElement>(null);
  const stills = reel.stills;
  const loop = reel.loop;

  // Hard cuts.
  useEffect(() => {
    if (!active || loop) return;
    const id = window.setInterval(() => setShot((s) => (s + 1) % stills.length), SHOT_MS);
    return () => window.clearInterval(id);
  }, [active, loop, stills.length]);

  // Loop playback follows visibility.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  // Timecode: one continuous clock while playing; the shot counter rides along.
  const shotRef = useRef(shot);
  useEffect(() => {
    shotRef.current = shot;
  }, [shot]);
  useEffect(() => {
    if (!active || !onTick) return;
    let raf = 0;
    const start = performance.now();
    const p = (n: number) => String(n).padStart(2, "0");
    const tick = (now: number) => {
      const f = Math.floor(((now - start) / 1000) * FPS);
      const s = Math.floor(f / FPS);
      onTick(`00:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(f % FPS)}`, shotRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, onTick]);

  if (loop) {
    return (
      <video
        ref={vid}
        className="absolute inset-0 h-full w-full object-cover"
        poster={loop.poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        {loop.webm ? <source src={loop.webm} type="video/webm" /> : null}
        <source src={loop.mp4} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      {stills.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0"
          style={{ visibility: i === shot ? "visible" : "hidden" }}
        >
          <Image
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            quality={80}
            className={`hero-still object-cover ${i === shot && active ? "hero-shot" : ""}`}
            style={{ objectPosition: s.focus }}
          />
        </div>
      ))}
    </div>
  );
}
