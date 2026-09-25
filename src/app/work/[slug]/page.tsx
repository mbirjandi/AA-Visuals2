import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getAdjacent, getProject, projects } from "@/data/projects";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectHero } from "@/components/project/ProjectHero";
import { MediaBlocks } from "@/components/project/MediaBlocks";
import { NextProject } from "@/components/project/NextProject";
import { Contact } from "@/components/home/Contact";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const image = p.cover.kind === "image" ? p.cover.src : undefined;
  return {
    title: p.title,
    description: `${p.category} — ${p.role}, ${p.year}. ${p.summary}`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { index, next } = getAdjacent(slug);
  const nextIndex = (index + 1) % projects.length;

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div data-nav="paper" className="bg-paper">
        <article aria-labelledby="project-title">
          <ProjectHeader p={p} index={index} />
          <ProjectHero p={p} />
          <div className="mt-[clamp(96px,18vh,210px)]">
            <MediaBlocks blocks={p.blocks} title={p.title} />
          </div>
          <section aria-labelledby="credits-title" className="frame grid-12 mt-[clamp(110px,20vh,230px)] gap-y-8 pb-[clamp(110px,20vh,230px)]">
            <h2 id="credits-title" className="meta col-span-4 lg:col-span-3">
              Credits
            </h2>
            <dl className="col-span-4 lg:col-span-9">
              {p.credits.map((c) => (
                <div key={c.label} className="grid grid-cols-4 items-baseline gap-x-[var(--col-gap)] border-t hair py-4 lg:grid-cols-9">
                  <dt className="meta col-span-4 text-[var(--fg-mute)] lg:col-span-3">{c.label}</dt>
                  <dd className="col-span-4 text-[clamp(22px,2.4vw,40px)] leading-tight font-medium tracking-[-0.03em] lg:col-span-6">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
        <NextProject next={next} index={nextIndex} />
        <Contact />
      </div>
    </ViewTransition>
  );
}
