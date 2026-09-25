import Link from "next/link";
import { pad, projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { fitVw } from "@/lib/fit";
import { MediaFrame } from "../media/MediaFrame";

/** The whole block is the link. Hover cuts the next film in beside the name. */
export function NextProject({ next, index }: { next: Project; index: number }) {
  const vw = fitVw(next.titleLines, 62, 17);
  return (
    <section data-nav="paper" aria-label="Next project" className="frame pb-[clamp(120px,22vh,240px)]">
      <Link
        href={`/work/${next.slug}`}
        transitionTypes={["to-project"]}
        data-cursor="open"
        className="group grid-12 relative border-t hair pt-4"
      >
        <span className="meta col-span-2 lg:col-span-3">Next project</span>
        <span className="meta tnum col-span-2 text-right text-[var(--fg-mute)] lg:col-span-3 lg:col-start-10">
          {pad(index + 1)} / {pad(projects.length)}
        </span>
        <span className="display col-span-4 mt-[clamp(28px,6vh,72px)] lg:col-span-8" style={{ fontSize: `max(52px, ${vw.toFixed(2)}vw)` }}>
          {next.titleLines.map((l, i) => (
            <span key={l} className="block pb-[0.04em]" style={i ? { paddingLeft: `calc(${i} * 0.8em * var(--run))` } : undefined}>
              {l}
            </span>
          ))}
        </span>
        <span
          aria-hidden
          className="next-cut col-span-4 mt-8 self-end lg:col-span-4 lg:col-start-9 lg:mt-0"
        >
          <MediaFrame media={next.cover} aspect="16:9" sizes="(min-width: 1024px) 32vw, 100vw" label={next.title} />
        </span>
        <span className="meta col-span-4 mt-6 flex items-center gap-2 lg:col-span-3">
          {next.category} — {next.year} <span className="turn-arrow">→</span>
        </span>
      </Link>
    </section>
  );
}
