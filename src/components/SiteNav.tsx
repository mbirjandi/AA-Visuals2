"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "./Mark";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * No bar, no container. The nav sits on the page like a running head and
 * takes its colour from whatever section is beneath it ([data-nav]).
 */
export function SiteNav() {
  const [theme, setTheme] = useState<"paper" | "ink">("paper");
  const pathname = usePathname();
  const instagram = site.social.find((s) => s.label === "Instagram")?.href;

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const stack = document.elementsFromPoint(window.innerWidth / 2, 28);
      for (const el of stack) {
        if (el.closest("[data-site-nav]")) continue;
        const host = el.closest<HTMLElement>("[data-nav]");
        if (host) {
          setTheme(host.dataset.nav === "ink" ? "ink" : "paper");
          return;
        }
      }
      setTheme("paper");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Sections (the hero) can change their own theme without a scroll.
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-nav"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header
      data-site-nav
      data-theme={theme}
      className="frame pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{ viewTransitionName: "site-nav" }}
    >
      <nav aria-label="Primary" className="grid-12 h-[var(--nav-h)] items-center">
        <Link
          href="/"
          aria-label="AA Visuals — home"
          className="pointer-events-auto col-span-1 -m-2 block w-fit p-2 lg:col-span-3"
        >
          <Mark className="h-[17px] w-auto sm:h-[19px]" />
        </Link>
        <p className="meta col-span-3 hidden text-[var(--fg-mute)] lg:block">
          {site.person} <span aria-hidden>—</span> {site.role}
        </p>
        <ul className="pointer-events-auto col-span-3 flex items-center justify-end gap-x-[clamp(14px,2.4vw,34px)] text-[13px] font-medium tracking-[-0.01em] lg:col-span-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="cut-link">
                {l.label}
              </Link>
            </li>
          ))}
          {instagram ? (
            <li className="hidden sm:block">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="cut-link">
                Instagram <span className="turn-arrow">→</span>
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
