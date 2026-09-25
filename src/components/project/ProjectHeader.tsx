import Link from "next/link";
import { pad, projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { fitVw } from "@/lib/fit";
import { StepTitle } from "../StepTitle";
import { Credits } from "../Credits";

export function ProjectHeader({ p, index }: { p: Project; index: number }) {
  const vw = fitVw(p.titleLines, 90, 24);
  return (
    <header data-nav="paper" className="frame pt-[calc(var(--nav-h)+clamp(40px,9vh,110px))]">
      <div className="grid-12 border-t hair pt-4">
        <p className="meta tnum col-span-2 lg:col-span-3">
          Project {pad(index + 1)} / {pad(projects.length)}
        </p>
        <p className="meta col-span-2 hidden text-[var(--fg-mute)] lg:col-span-3 lg:block">{p.category}</p>
        <p className="meta col-span-2 text-right lg:col-span-3 lg:col-start-10">
          <Link href="/work" className="line-link">
            All work <span className="turn-arrow">→</span>
          </Link>
        </p>
      </div>

      <StepTitle
        as="h1"
        id="project-title"
        lines={p.titleLines}
        label={p.title}
        className="-ml-[0.04em] mt-[clamp(36px,8vh,96px)]"
      />
      <style>{`#project-title{font-size:max(56px, ${vw.toFixed(2)}vw)}`}</style>
      {p.titleSub ? (
        <p className="lead mt-4" style={{ paddingLeft: `calc(${p.titleLines.length} * 0.8 * ${vw.toFixed(2)}vw * var(--run))` }}>
          {p.titleSub}
        </p>
      ) : null}

      <Credits
        cols={5}
        className="mt-[clamp(40px,8vh,90px)] border-t hair pt-4"
        items={[
          { label: "Client", value: p.client },
          { label: "Year", value: p.year },
          { label: "Role", value: p.role },
          { label: "Format", value: p.format },
          { label: "Category", value: p.category },
        ]}
      />
    </header>
  );
}
