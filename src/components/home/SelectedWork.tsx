import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { pad, projects } from "@/data/projects";
import type { Media, Project } from "@/data/types";
import { MediaFrame } from "../media/MediaFrame";
import { Reveal } from "../Reveal";
import { StepTitle } from "../StepTitle";
import { Credits } from "../Credits";

const href = (p: Project) => `/work/${p.slug}`;
const TYPES = ["to-project"];

/** The media for a feature: links to the project, morphs into its hero. */
function FeatureMedia({
  p,
  media = p.cover,
  sizes,
  aspect,
  className = "",
  frameClass = "",
}: {
  p: Project;
  media?: Media;
  sizes: string;
  aspect?: Media["aspect"];
  className?: string;
  frameClass?: string;
}) {
  return (
    <Link
      href={href(p)}
      transitionTypes={TYPES}
      tabIndex={-1}
      aria-hidden
      data-cursor="open"
      className={`group block ${className}`}
    >
      <ViewTransition name={`media-${p.slug}`} share={{ "to-project": "morph", default: "none" }} default="none">
        <Reveal kind="media" className={`overflow-hidden ${frameClass}`}>
          <div className="h-full w-full transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.025]">
            <MediaFrame media={media} sizes={sizes} aspect={aspect} label={`${p.title} — ${p.category}`} />
          </div>
        </Reveal>
      </ViewTransition>
    </Link>
  );
}

function TitleLink({ p, children, className = "" }: { p: Project; children: ReactNode; className?: string }) {
  return (
    <Link href={href(p)} transitionTypes={TYPES} className={`block w-fit ${className}`}>
      {children}
    </Link>
  );
}

function FeatureCredits({ p, i, className = "" }: { p: Project; i: number; className?: string }) {
  return (
    <Credits
      className={className}
      cols={2}
      items={[
        { label: "Project", value: `${pad(i + 1)} / ${pad(projects.length)}` },
        { label: "Year", value: p.year },
        { label: "Format", value: p.category },
        { label: "Role", value: p.role },
      ]}
    />
  );
}

function Open({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <Link
      href={href(p)}
      transitionTypes={TYPES}
      className={`line-link line-link--on inline-flex w-fit items-center gap-2 text-[15px] font-medium ${className}`}
    >
      Open project <span className="turn-arrow">→</span>
      <span className="sr-only">: {p.title}</span>
    </Link>
  );
}

function Summary({ p, className = "" }: { p: Project; className?: string }) {
  return <p className={`max-w-[34ch] text-[17px] leading-snug ${className}`}>{p.summary}</p>;
}

/* ── Compositions ───────────────────────────────────────────── */

/** 01 — Name set wall to wall; full-bleed film cuts up into its baseline. */
function Bleed({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`} className="relative">
      <div className="frame">
        <TitleLink p={p}>
          <StepTitle id={`f-${p.slug}`} lines={p.titleLines} className="-ml-[0.04em] text-[clamp(72px,25.5vw,480px)]" />
        </TitleLink>
      </div>
      <FeatureMedia
        p={p}
        sizes="100vw"
        className="relative z-10 -mt-[4.2vw]"
        frameClass="chamfer-tl"
      />
      <div className="frame grid-12 mt-6 gap-y-8 lg:mt-8">
        <FeatureCredits p={p} i={i} className="col-span-4 lg:col-span-3" />
        <div className="col-span-4 flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
          <Summary p={p} />
          <Open p={p} />
        </div>
      </div>
    </article>
  );
}

/** 02 — Stepped name left, tall vertical frame dropped in on the right. */
function Split({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`} className="frame grid-12 gap-y-10">
      <div className="col-span-4 flex flex-col justify-between gap-10 lg:col-span-7">
        <TitleLink p={p}>
          <StepTitle id={`f-${p.slug}`} lines={p.titleLines} className="text-[clamp(64px,18.5vw,300px)] lg:text-[12.4vw]" />
        </TitleLink>
        <div className="hidden gap-8 lg:grid lg:grid-cols-7 lg:gap-x-[var(--col-gap)]">
          <FeatureCredits p={p} i={i} className="col-span-3" />
          <div className="col-span-4 flex flex-col gap-5">
            <Summary p={p} />
            <Open p={p} />
          </div>
        </div>
      </div>
      <FeatureMedia
        p={p}
        sizes="(min-width: 1024px) 34vw, 72vw"
        className="col-span-3 col-start-2 lg:col-span-4 lg:col-start-9 lg:mt-[18vh]"
        frameClass="chamfer-br"
      />
      <div className="col-span-4 grid gap-6 lg:hidden">
        <FeatureCredits p={p} i={i} />
        <Summary p={p} />
        <Open p={p} />
      </div>
    </article>
  );
}

/** 03 — Poster: the name runs full measure, the still stands on its baseline. */
function Poster({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`} className="frame">
      <TitleLink p={p}>
        <StepTitle id={`f-${p.slug}`} lines={p.titleLines} label={p.title} className="-ml-[0.03em] text-[clamp(44px,12.9vw,260px)]" />
      </TitleLink>
      <div className="grid-12 mt-8 gap-y-10 lg:-mt-[5.4vw]">
        <div className="col-span-4 flex flex-col justify-end gap-8 lg:col-span-4 lg:pb-2">
          <p className="lead">{p.titleSub}</p>
          <FeatureCredits p={p} i={i} />
          <Summary p={p} />
          <Open p={p} />
        </div>
        <FeatureMedia
          p={p}
          aspect="4:5"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="col-span-4 row-start-1 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </article>
  );
}

/** 04 — Inverse: an ink field cut at the A's angle; type leads, frame follows. */
function Inverse({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`} data-theme="ink" data-nav="ink" className="chamfer-tl bg-ink py-[clamp(72px,14vh,160px)] [--ch:clamp(56px,10vw,190px)]">
      <div className="frame grid-12 gap-y-10">
        <FeatureMedia
          p={p}
          sizes="(min-width: 1024px) 36vw, 100vw"
          className="col-span-4 lg:col-span-5"
        />
        <div className="col-span-4 flex flex-col justify-between gap-10 lg:col-span-6 lg:col-start-7">
          <div>
            <TitleLink p={p}>
              <StepTitle id={`f-${p.slug}`} lines={p.titleLines} label={p.title} className="text-[clamp(88px,13.4vw,250px)]" />
            </TitleLink>
            <p className="lead mt-5 pl-[calc(2*0.8*clamp(88px,13.4vw,250px)*var(--run))]">{p.titleSub}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-[var(--col-gap)]">
            <FeatureCredits p={p} i={i} />
            <div className="flex flex-col gap-5">
              <Summary p={p} />
              <Open p={p} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** 05 — Scope: 2.39-ish letterbox across the full width, credits under it. */
function Scope({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`}>
      <FeatureMedia p={p} aspect="21:9" sizes="100vw" frameClass="chamfer-br" />
      <div className="frame grid-12 mt-6 gap-y-8 lg:mt-8">
        <TitleLink p={p} className="col-span-4 lg:col-span-7">
          <StepTitle id={`f-${p.slug}`} lines={p.titleLines} className="text-[clamp(72px,14.5vw,280px)]" />
        </TitleLink>
        <div className="col-span-4 flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:pt-3">
          <FeatureCredits p={p} i={i} />
          <Summary p={p} />
          <Open p={p} />
        </div>
      </div>
    </article>
  );
}

/** 06 — Type: the name is the image. A small frame sits in its counter. */
function TypeLed({ p, i }: { p: Project; i: number }) {
  return (
    <article aria-labelledby={`f-${p.slug}`} className="frame relative">
      <div className="grid-12 gap-y-8">
        <FeatureCredits p={p} i={i} className="col-span-4 lg:col-span-3" />
        <FeatureMedia
          p={p}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="col-span-4 lg:col-span-4 lg:col-start-9"
        />
      </div>
      <TitleLink p={p} className="mt-6 lg:-mt-[6vw]">
        <StepTitle id={`f-${p.slug}`} lines={p.titleLines} className="-ml-[0.04em] text-[clamp(60px,19.5vw,380px)]" />
      </TitleLink>
      <div className="grid-12 mt-8 gap-y-6">
        <div className="col-span-4 flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
          <Summary p={p} />
          <Open p={p} />
        </div>
      </div>
    </article>
  );
}

const LAYOUTS = { bleed: Bleed, split: Split, poster: Poster, inverse: Inverse, scope: Scope, type: TypeLed };

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" data-nav="paper" data-theme="paper" className="pt-[clamp(96px,18vh,200px)] pb-[clamp(96px,16vh,180px)]">
      <header className="frame grid-12 mb-[clamp(40px,8vh,96px)] border-t hair pt-4">
        <h2 id="work-title" className="meta col-span-2 lg:col-span-3">
          Selected work
        </h2>
        <p className="meta col-span-2 text-right text-[var(--fg-mute)] lg:col-span-3 lg:col-start-10">
          {pad(projects.length)} projects — 2024/25
        </p>
      </header>
      <div className="flex flex-col gap-[clamp(120px,24vh,260px)]">
        {projects.map((p, i) => {
          const L = LAYOUTS[p.feature];
          return <L key={p.slug} p={p} i={i} />;
        })}
      </div>
    </section>
  );
}
