"use client";

import { site } from "@/data/site";
import { Mark } from "../Mark";
import { StepTitle } from "../StepTitle";
import { useReel } from "../reel/ReelProvider";

const DEV = process.env.NODE_ENV !== "production";

/**
 * The ending. Ink field entered through a cut at the A's angle, an email
 * address set as the headline, and the mark rising out of the bottom edge.
 */
export function Contact() {
  const { open } = useReel();
  const social = site.social.filter((s) => s.href || DEV);

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      data-nav="ink"
      data-theme="ink"
      className="chamfer-tl relative overflow-hidden bg-ink pt-[clamp(110px,20vh,220px)] [--ch:clamp(64px,12vw,230px)]"
    >
      <div className="frame">
        <div className="grid-12 gap-y-6">
          <h2 id="contact-title" className="meta col-span-2 lg:col-span-3">
            Contact
          </h2>
          <p className="meta col-span-2 text-right text-[var(--fg-mute)] lg:col-span-3 lg:col-start-10">
            {site.location}
          </p>
        </div>

        <div className="mt-[clamp(48px,10vh,120px)]">
          <p className="lead mb-5 text-[var(--fg-mute)]">Have a project?</p>
          <StepTitle as="p" lines={["Let’s make", "something."]} className="text-[clamp(56px,10.4vw,200px)] normal-case" />
        </div>

        <a
          href={`mailto:${site.email}`}
          className="cut-link mt-[clamp(56px,11vh,130px)] block w-fit text-[clamp(30px,9.3vw,184px)] leading-[0.9] font-semibold tracking-[-0.055em]"
        >
          {site.email}
        </a>

        <div className="grid-12 mt-[clamp(56px,10vh,110px)] gap-y-10 border-t hair pt-6">
          <div className="col-span-2 lg:col-span-3">
            <p className="meta text-[var(--fg-mute)]">Studio</p>
            <p className="meta mt-1">{site.location}</p>
            <p className="meta">Available worldwide</p>
          </div>
          <ul className="col-span-2 lg:col-span-3" aria-label="Elsewhere">
            <li className="meta mb-1 text-[var(--fg-mute)]" aria-hidden>
              Elsewhere
            </li>
            {social.map((s) => (
              <li key={s.label} className="meta">
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="line-link">
                    {s.label} <span className="turn-arrow">→</span>
                  </a>
                ) : (
                  <span className="text-[var(--fg-mute)]" title="Add URL in src/data/site.ts">
                    {s.label} <span className="normal-case">(link needed)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="col-span-2 lg:col-span-3">
            <p className="meta text-[var(--fg-mute)]">Reel</p>
            <button type="button" onClick={open} aria-haspopup="dialog" className="meta line-link mt-1">
              Watch the showreel <span className="turn-arrow">→</span>
            </button>
          </div>
          <div className="col-span-2 flex flex-col items-end text-right lg:col-span-3">
            <p className="meta text-[var(--fg-mute)]">© {new Date().getFullYear()} {site.name}</p>
            <a href="#main" className="meta line-link mt-1">
              Back to top <span className="inline-block -rotate-90">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* The mark rises out of the bottom edge: the site ends where it began. */}
      <div aria-hidden className="frame mt-[clamp(72px,14vh,160px)] -mb-[14vw] overflow-hidden">
        <Mark className="block h-auto w-full text-paper" />
      </div>
    </footer>
  );
}
