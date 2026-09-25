"use client";

import { useEffect, useRef, useState } from "react";
import { reel } from "@/data/site";
import { Mark } from "../Mark";

const SHOW_SPEC =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_ASSET_SPECS === "1";

const tc = (s: number) => {
  if (!Number.isFinite(s)) return "00:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
};

/**
 * Full-screen reel. A native <dialog> gives focus trapping, Esc to close
 * and an inert page for free. Self-hosted files get a minimal custom
 * transport; embeds use the provider's player; with neither, a holding slate.
 */
export function ReelDialog({ onClose }: { onClose: () => void }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    el.showModal();
    document.documentElement.style.overflow = "hidden";
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener("cancel", onCancel);
    return () => {
      el.removeEventListener("cancel", onCancel);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const file = reel.file;
  const embed = reel.embed;

  return (
    <dialog
      ref={dlg}
      aria-label="Showreel"
      data-theme="ink"
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink"
    >
      <div className="frame flex h-full flex-col">
        <div className="flex h-[var(--nav-h)] items-center justify-between">
          <Mark className="h-[17px] w-auto sm:h-[19px]" />
          <p className="meta hidden text-mute-inv sm:block">Showreel — Arman Asadi</p>
          <button type="button" onClick={onClose} className="cut-link text-[13px] font-medium" autoFocus>
            Close <span aria-hidden>(Esc)</span>
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center pb-[var(--gutter)]">
          {file ? (
            <div className="relative aspect-video max-h-full w-full">
              <video
                ref={vid}
                className="h-full w-full bg-black object-contain"
                poster={file.poster}
                playsInline
                autoPlay
                muted={muted}
                preload="auto"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setD(e.currentTarget.duration)}
                onClick={toggle}
              >
                {file.webm ? <source src={file.webm} type="video/webm" /> : null}
                <source src={file.mp4} type="video/mp4" />
              </video>
            </div>
          ) : embed ? (
            <div className="relative aspect-video max-h-full w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                title="Arman Asadi showreel"
                src={
                  embed.provider === "vimeo"
                    ? `https://player.vimeo.com/video/${embed.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`
                    : `https://www.youtube-nocookie.com/embed/${embed.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
                }
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="grid w-full gap-8 self-end lg:grid-cols-12">
              <p className="display col-span-full text-[clamp(56px,13vw,220px)] lg:col-span-9">
                Reel&nbsp;in
                <br />
                <span className="block pl-[calc(0.8em*var(--run))]">the edit.</span>
              </p>
              <div className="flex flex-col justify-end gap-5 lg:col-span-3">
                <p className="text-[17px] leading-snug text-paper/80">
                  The new showreel is being cut. Until then, the work speaks for itself.
                </p>
                <button type="button" className="line-link line-link--on w-fit text-[15px] font-medium" onClick={() => {
                  onClose();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  See selected work <span className="turn-arrow">→</span>
                </button>
                {SHOW_SPEC ? (
                  <p className="meta normal-case tracking-normal text-mute-inv">
                    Dev: add /public/reel/showreel.mp4 (H.264 1920×1080, ≤25&nbsp;MB) and set <code>reel.file</code> in src/data/site.ts — or set <code>reel.embed</code> to a Vimeo/YouTube id.
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {file ? (
          <div className="flex items-center gap-4 pb-[var(--gutter)] sm:gap-6">
            <button type="button" onClick={toggle} className="meta w-14 text-left" aria-label={playing ? "Pause reel" : "Play reel"}>
              {playing ? "Pause" : "Play"}
            </button>
            <span className="meta tnum text-mute-inv">{tc(t)}</span>
            <input
              type="range"
              min={0}
              max={d || 0}
              step={0.1}
              value={t}
              aria-label="Seek"
              aria-valuetext={`${tc(t)} of ${tc(d)}`}
              onChange={(e) => {
                const v = vid.current;
                if (v) v.currentTime = Number(e.target.value);
              }}
              className="reel-seek h-6 flex-1 cursor-pointer"
              style={{ ["--p" as string]: d ? `${(t / d) * 100}%` : "0%" }}
            />
            <span className="meta tnum text-mute-inv">{tc(d)}</span>
            <button type="button" onClick={() => setMuted((m) => !m)} className="meta w-20 text-right" aria-pressed={muted}>
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
