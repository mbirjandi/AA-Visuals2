"use client";

import Image from "next/image";
import { useState } from "react";
import type { EmbedMedia } from "@/data/types";
import { ratio } from "./aspect";

const SRC: Record<EmbedMedia["kind"], (id: string) => string> = {
  youtube: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
  vimeo: (id) => `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`,
  instagram: (id) => `https://www.instagram.com/reel/${id}/embed/`,
};
const WATCH: Record<EmbedMedia["kind"], (id: string) => string> = {
  youtube: (id) => `https://www.youtube.com/watch?v=${id}`,
  vimeo: (id) => `https://vimeo.com/${id}`,
  instagram: (id) => `https://www.instagram.com/reel/${id}/`,
};
const NAME: Record<EmbedMedia["kind"], string> = { youtube: "YouTube", vimeo: "Vimeo", instagram: "Instagram" };

/**
 * Third-party players are heavy and set cookies, so they load only when
 * the viewer asks. Until then this is a still, a play control and a link out.
 */
export function LiteEmbed({ media, sizes = "100vw", priority }: { media: EmbedMedia; sizes?: string; priority?: boolean }) {
  const [live, setLive] = useState(false);
  const tall = media.kind === "instagram";

  if (live) {
    return (
      <div className="relative h-full w-full bg-ink" style={{ aspectRatio: tall ? "9 / 16" : ratio(media.aspect) }}>
        <iframe
          src={SRC[media.kind](media.id)}
          title={media.title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="group relative h-full w-full overflow-hidden bg-ink" data-cursor="play" style={{ aspectRatio: ratio(media.aspect) }}>
      {media.poster ? (
        <Image
          src={media.poster.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          quality={80}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]"
          style={{ objectPosition: media.poster.focus }}
        />
      ) : null}
      <button
        type="button"
        onClick={() => setLive(true)}
        className="absolute inset-0 flex items-end justify-start p-[clamp(14px,2vw,28px)] text-left text-paper"
      >
        <span className="sr-only">Play {media.title} (loads {NAME[media.kind]})</span>
        <span aria-hidden className="flex items-center gap-3 bg-paper px-4 py-3 text-ink" style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 2.6em * 0.5685) 100%, 0 100%)", paddingRight: "2.4em" }}>
          <svg viewBox="0 0 10 12" className="h-3 w-2.5" aria-hidden><path d="M0 0L10 6L0 12Z" fill="currentColor" /></svg>
          <span className="meta">Play — {NAME[media.kind]}</span>
        </span>
      </button>
      <a
        href={WATCH[media.kind](media.id)}
        target="_blank"
        rel="noopener noreferrer"
        className="meta line-link absolute top-[clamp(14px,2vw,28px)] right-[clamp(14px,2vw,28px)] text-paper [text-shadow:0_1px_12px_rgb(0_0_0/0.45)]"
      >
        Open on {NAME[media.kind]} <span className="turn-arrow">→</span>
      </a>
    </div>
  );
}
