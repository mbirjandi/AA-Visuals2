import type { MediaBlock } from "@/data/types";
import { MediaFrame } from "../media/MediaFrame";
import { Reveal } from "../Reveal";

function Caption({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  return <p className={`meta mt-3 text-[var(--fg-mute)] ${className}`}>{text}</p>;
}

/** The body of a case study: media first, composed differently each time. */
export function MediaBlocks({ blocks, title }: { blocks: MediaBlock[]; title: string }) {
  return (
    <div className="flex flex-col gap-[clamp(72px,16vh,190px)]">
      {blocks.map((b, i) => {
        switch (b.layout) {
          case "full":
            return (
              <figure key={i} data-nav="ink">
                <Reveal kind="media">
                  <MediaFrame media={b.media} sizes="100vw" label={title} />
                </Reveal>
                <figcaption className="frame"><Caption text={b.caption} /></figcaption>
              </figure>
            );
          case "scope":
            return (
              <figure key={i} data-nav="ink">
                <Reveal kind="media" className="chamfer-br">
                  <MediaFrame media={b.media} aspect="21:9" sizes="100vw" label={title} />
                </Reveal>
                <figcaption className="frame"><Caption text={b.caption} /></figcaption>
              </figure>
            );
          case "pair":
            return (
              <figure key={i} className="frame grid-12 gap-y-6">
                <Reveal kind="media" className="col-span-4 lg:col-span-6">
                  <MediaFrame media={b.media[0]} sizes="(min-width: 1024px) 48vw, 100vw" label={title} />
                </Reveal>
                <Reveal kind="media" delay={120} className="col-span-3 col-start-2 lg:col-span-5 lg:col-start-8 lg:mt-[16vh]">
                  <MediaFrame media={b.media[1]} sizes="(min-width: 1024px) 40vw, 75vw" label={title} />
                </Reveal>
                {b.caption ? <figcaption className="col-span-4 lg:col-span-6"><Caption text={b.caption} /></figcaption> : null}
              </figure>
            );
          case "offset": {
            const right = b.side === "right";
            return (
              <figure key={i} className="frame grid-12 items-end gap-y-4">
                <Reveal
                  kind="media"
                  className={`col-span-4 ${right ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-7"} ${right ? "chamfer-tl" : "chamfer-br"}`}
                >
                  <MediaFrame media={b.media} sizes="(min-width: 1024px) 55vw, 100vw" label={title} />
                </Reveal>
                {b.caption ? (
                  <figcaption className={`col-span-4 lg:row-start-1 ${right ? "lg:col-span-3 lg:col-start-3" : "lg:col-span-3 lg:col-start-9"}`}>
                    <p className="lead max-w-[16ch]">{b.caption}</p>
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          case "note":
            return (
              <div key={i} className="frame grid-12">
                <p className="lead col-span-4 lg:col-span-6 lg:col-start-5">{b.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
