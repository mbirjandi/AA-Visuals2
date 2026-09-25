import type { PendingMedia } from "@/data/types";

const SHOW_SPEC =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_ASSET_SPECS === "1";

type Props = {
  media: PendingMedia;
  label?: string;
  className?: string;
};

/**
 * Holding frame for footage that hasn't been supplied yet. Reads as a
 * title card: ink field, the A's stroke as a faint band, film metadata.
 * In development it also prints the exact file and spec to drop in.
 */
export function Slate({ media, label, className = "" }: Props) {
  return (
    <div
      role="img"
      aria-label={`${media.alt} (frame coming soon)`}
      data-theme="ink"
      className={`relative isolate h-full w-full overflow-hidden bg-ink-2 text-paper ${className}`}
    >
      {/* the A's stroke, twice: outer edge and counter */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-[14%] w-[22%] origin-bottom-left bg-paper/[0.035]"
        style={{ transform: "skewX(var(--skew))" }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-[44%] w-px origin-bottom-left bg-paper/10"
        style={{ transform: "skewX(var(--skew))" }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-[clamp(12px,1.6vw,22px)]">
        <div className="meta flex justify-between gap-4 text-mute-inv">
          <span>{label ?? media.alt}</span>
          <span className="tnum">{media.aspect}</span>
        </div>
        <div className="meta flex items-end justify-between gap-4 text-mute-inv">
          <span className="tnum">00:00:00:00</span>
          {SHOW_SPEC ? (
            <span className="max-w-[70%] text-right normal-case tracking-normal text-paper/70">
              <span className="block text-paper">{media.path}</span>
              {media.spec}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
