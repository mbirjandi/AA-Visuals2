import { ViewTransition } from "react";
import type { Project } from "@/data/types";
import { MediaFrame } from "../media/MediaFrame";
import { ratioNum } from "../media/aspect";
import { Reveal } from "../Reveal";

const morph = (slug: string) => ({
  name: `media-${slug}`,
  share: { "to-project": "morph", default: "none" },
  default: "none" as const,
});

function Overview({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <div className={className}>
      <h2 className="meta text-[var(--fg-mute)]">Overview</h2>
      <p className="lead mt-4 max-w-[26ch]">{p.summary}</p>
    </div>
  );
}

/** Wide work runs edge to edge; vertical work stands beside its overview. */
export function ProjectHero({ p }: { p: Project }) {
  const tall = ratioNum(p.hero.aspect) < 1;

  if (tall) {
    return (
      <section data-nav="paper" aria-label="Film" className="frame grid-12 mt-[clamp(48px,10vh,120px)] gap-y-12">
        <Overview p={p} className="col-span-4 self-end lg:col-span-5" />
        <div className="col-span-4 lg:col-span-4 lg:col-start-8">
          <ViewTransition {...morph(p.slug)}>
            <div className="mx-auto w-full max-w-[calc(86svh*9/16)] chamfer-br">
              <MediaFrame media={p.hero} sizes="(min-width: 1024px) 34vw, 100vw" priority />
            </div>
          </ViewTransition>
        </div>
      </section>
    );
  }

  return (
    <>
      <section data-nav="ink" aria-label="Film" className="mt-[clamp(40px,8vh,96px)]">
        <ViewTransition {...morph(p.slug)}>
          <div className="w-full">
            <MediaFrame media={p.hero} sizes="100vw" priority quality={90} />
          </div>
        </ViewTransition>
      </section>
      <div className="frame grid-12 mt-[clamp(48px,10vh,120px)]">
        <Reveal kind="type" className="col-span-4 lg:col-span-7 lg:col-start-5">
          <Overview p={p} />
        </Reveal>
      </div>
    </>
  );
}
