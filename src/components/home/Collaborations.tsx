import { getProject } from "@/data/projects";
import { ProjectIndex, type IndexItem } from "../ProjectIndex";

const ORDER: { slug: string; name: string; sub?: string }[] = [
  { slug: "gunna", name: "Gunna" },
  { slug: "manchester-united-chef-magz", name: "Manchester United", sub: "with Chef Magz" },
  { slug: "pop-mart-troy-the-magician", name: "Pop Mart", sub: "with Troy The Magician" },
  { slug: "harry-pinero", name: "Harry Pinero", sub: "with Beta Squad" },
  { slug: "darkest-man", name: "Darkest Man" },
  { slug: "max-khadar", name: "Max Khadar", sub: "with Will Smith" },
];

export function Collaborations() {
  const items: IndexItem[] = ORDER.flatMap(({ slug, name, sub }) => {
    const p = getProject(slug);
    return p ? [{ slug, name, sub, meta: [p.category, p.year], media: p.cover }] : [];
  });

  return (
    <section aria-labelledby="collab-title" data-nav="paper" data-theme="paper" className="frame pb-[clamp(120px,22vh,240px)]">
      <div className="grid-12 gap-y-6">
        <div className="col-span-4 lg:col-span-3">
          <h2 id="collab-title" className="meta">
            Selected collaborations
          </h2>
          <p className="meta mt-1 text-[var(--fg-mute)]">Artists, brands, channels</p>
        </div>
        <div className="col-span-4 lg:col-span-9">
          <ProjectIndex items={items} label="Collaborations" />
        </div>
      </div>
    </section>
  );
}
