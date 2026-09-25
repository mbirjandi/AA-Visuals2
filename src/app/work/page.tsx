import type { Metadata } from "next";
import { ViewTransition } from "react";
import { pad, projects } from "@/data/projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Work",
  description: "Music videos, branded content and YouTube production shot and edited by Arman Asadi.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div data-nav="paper" className="bg-paper">
        <section aria-labelledby="work-title" className="frame pt-[calc(var(--nav-h)+clamp(40px,9vh,110px))] pb-[clamp(120px,22vh,240px)]">
          <div className="grid-12 border-t hair pt-4">
            <p className="meta col-span-2 lg:col-span-3">Index</p>
            <p className="meta tnum col-span-2 text-right text-[var(--fg-mute)] lg:col-span-3 lg:col-start-10">
              {pad(projects.length)} projects
            </p>
          </div>
          <h1 id="work-title" className="display mt-[clamp(36px,8vh,96px)] mb-[clamp(56px,12vh,140px)] -ml-[0.04em] text-[clamp(120px,27vw,520px)]">
            Work
          </h1>
          <ProjectIndex
            size="md"
            label="All projects"
            items={projects.map((p, i) => ({
              slug: p.slug,
              name: p.title,
              meta: [pad(i + 1), p.category, p.role, p.year],
              media: p.cover,
            }))}
          />
        </section>
        <Contact />
      </div>
    </ViewTransition>
  );
}
