"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MARK_H, MARK_PATH, MARK_W, WEDGE_CORE } from "@/lib/mark";
import { reel, site } from "@/data/site";
import { useReel } from "../reel/ReelProvider";
import { PlayGlyph } from "../PlayGlyph";
import { HeroFootage } from "./HeroFootage";
import { REDUCED, useMedia } from "@/lib/useMedia";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * The page opens on the mark itself. Film floods into the letterforms, and
 * scrolling pushes the camera through the wedge between the two As until the
 * footage owns the frame. Native scroll drives it (sticky, no hijacking).
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const markBox = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const shotRef = useRef<HTMLSpanElement>(null);

  const [stage, setStage] = useState<"mark" | "film">("mark");
  const [visible, setVisible] = useState(true);
  const reduced = useMedia(REDUCED);
  const { open } = useReel();

  // Pause footage when the hero is off screen or the tab is hidden.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Scroll-linked zoom through the wedge.
  useEffect(() => {
    if (reduced) return;
    const sec = section.current;
    const box = markBox.current;
    if (!sec || !box) return;

    const intros = sec.querySelectorAll<HTMLElement>("[data-hero-intro]");
    let sMax = 30;
    let raf = 0;
    let last = "";

    const measure = () => {
      const w = box.offsetWidth;
      const h = (w * MARK_H) / MARK_W;
      const cx = box.offsetLeft + (w * WEDGE_CORE.x) / MARK_W;
      const cy = box.offsetTop + (h * WEDGE_CORE.y) / MARK_H;
      const r = (WEDGE_CORE.r * w) / MARK_W;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const far = Math.max(Math.hypot(cx, cy), Math.hypot(vw - cx, cy), Math.hypot(cx, vh - cy), Math.hypot(vw - cx, vh - cy));
      sMax = (far / r) * 1.06;
    };

    const frame = () => {
      raf = 0;
      const range = sec.offsetHeight - window.innerHeight;
      const p = clamp(-sec.getBoundingClientRect().top / Math.max(range, 1));
      const z = clamp(p / 0.8);
      const s = Math.exp(Math.log(sMax) * smooth(z));
      box.style.transform = `scale(${s})`;
      box.style.visibility = z >= 1 ? "hidden" : "visible";
      const o = String(1 - clamp(z / 0.2));
      intros.forEach((el) => (el.style.opacity = o));
      if (film.current) film.current.style.opacity = String(clamp((z - 0.78) / 0.2));
      if (scrim.current) scrim.current.style.opacity = String(clamp((z - 0.6) / 0.4));
      const next = z > 0.45 ? "film" : "mark";
      if (next !== last) {
        last = next;
        setStage(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      box.style.transform = "";
      measure();
      frame();
    };

    measure();
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const onTick = useCallback((tc: string, shot: number) => {
    if (tcRef.current) tcRef.current.textContent = tc;
    if (shotRef.current) shotRef.current.textContent = String(shot + 1).padStart(2, "0");
  }, []);

  const hasReel = Boolean(reel.file || reel.embed);
  const fg = stage === "film" ? "ink" : "paper";

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      data-nav={fg}
      className={`relative ${reduced ? "h-[100svh]" : "h-[195svh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper">
        {/* Film layer: ink first, footage cuts in along the A. */}
        <div className="absolute inset-0 bg-ink">
          <div className="hero-film absolute inset-0">
            <HeroFootage active={visible && !reduced} onTick={onTick} />
          </div>
        </div>

        {/* Paper with the mark cut out of it. Scaling this is the zoom. */}
        <div
          ref={markBox}
          aria-hidden
          className="hero-mark absolute"
          style={{ transformOrigin: `${(WEDGE_CORE.x / MARK_W) * 100}% ${(WEDGE_CORE.y / MARK_H) * 100}%` }}
        >
          <svg viewBox={`0 0 ${MARK_W} ${MARK_H}`} className="block h-auto w-full overflow-visible">
            <path
              fillRule="evenodd"
              fill="var(--color-paper)"
              d={`M-60000 -60000H${MARK_W + 60000}V${MARK_H + 60000}H-60000Z${MARK_PATH}`}
            />
          </svg>
        </div>

        <div ref={scrim} aria-hidden className="absolute inset-0 bg-ink/30 opacity-0">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/40" />
        </div>

        {/* Type. */}
        <div data-theme={fg} className="frame absolute inset-0 flex flex-col justify-between pt-[calc(var(--nav-h)+2svh)] pb-[var(--gutter)] transition-colors duration-300">
          <div className="grid-12 items-start">
            <div data-hero-intro className="col-span-3 lg:col-span-4">
              <h1 id="hero-title" className="text-[clamp(15px,1.3vw,20px)] leading-[1.08] font-semibold tracking-[-0.01em] uppercase">
                <span className="block">{site.person}</span>
                <span className="block">{site.role}</span>
                <span className="block">London</span>
              </h1>
            </div>
            <p className="meta col-span-1 text-right lg:col-span-4 lg:col-start-9" aria-hidden>
              <span className="text-[var(--fg-mute)]">
                Shot <span ref={shotRef} className="tnum">01</span>/{String(reel.stills.length).padStart(2, "0")}
              </span>
              <span className="mt-1 block">
                <span ref={tcRef} className="tnum">00:00:00:00</span>
              </span>
            </p>
          </div>

          <div className="grid-12 items-end gap-y-6">
            <div className="relative col-span-4 lg:col-span-6">
              <p className="lead max-w-[15ch]" data-hero-intro>
                Films for artists, creators and brands.
              </p>
              <p ref={film} className="meta absolute bottom-0 left-0 opacity-0" aria-hidden>
                {site.person} — {site.role} — {site.location}
              </p>
            </div>
            <div className="col-span-4 flex justify-start lg:col-span-4 lg:col-start-9 lg:justify-end">
              <button
                type="button"
                onClick={open}
                data-cursor="play"
                className="cut-link group flex items-center gap-3 text-[clamp(18px,1.6vw,24px)] font-semibold tracking-[-0.03em] uppercase"
                aria-haspopup="dialog"
              >
                <PlayGlyph className="h-[0.8em] w-auto transition-transform duration-300 group-hover:translate-x-1" />
                Play reel
                <span className="sr-only">{hasReel ? "" : " (coming soon)"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
