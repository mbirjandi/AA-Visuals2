import { site } from "@/data/site";
import { Reveal } from "../Reveal";

/** An index, not a feature grid: three disciplines, set like a credit roll. */
export function Services() {
  return (
    <section aria-labelledby="services-title" data-nav="paper" data-theme="paper" className="frame pb-[clamp(120px,22vh,240px)]">
      <div className="grid-12 gap-y-10">
        <h2 id="services-title" className="meta col-span-4 lg:col-span-3">
          Services
        </h2>
        <div className="col-span-4 lg:col-span-9">
          <Reveal as="p" kind="type" className="display max-w-[14ch] text-[clamp(44px,6.6vw,120px)] normal-case">
            From the shoot to the upload.
          </Reveal>
          <ol className="mt-[clamp(48px,9vh,110px)] border-b hair">
            {site.services.map((s, i) => (
              <li key={s.name} className="grid grid-cols-4 items-baseline gap-x-[var(--col-gap)] gap-y-2 border-t hair py-5 lg:grid-cols-9 lg:py-6">
                <span className="meta tnum col-span-1 text-[var(--fg-mute)] lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-3 text-[clamp(26px,2.9vw,50px)] leading-none font-semibold tracking-[-0.04em] uppercase lg:col-span-4">
                  {s.name}
                </h3>
                <p className="col-span-3 col-start-2 max-w-[38ch] text-[17px] leading-snug lg:col-span-4 lg:col-start-6">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
          <div className="grid-12 mt-8 gap-y-4 !grid-cols-4 lg:!grid-cols-9">
            <p className="meta col-span-4 text-[var(--fg-mute)] lg:col-span-5">
              Music videos, branded content, YouTube production and social.
            </p>
            <p className="meta col-span-4 lg:col-span-4 lg:text-right">
              {site.tools.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
