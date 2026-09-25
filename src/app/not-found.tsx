import Link from "next/link";

export default function NotFound() {
  return (
    <section data-nav="paper" className="frame flex min-h-[100svh] flex-col justify-end pt-[var(--nav-h)] pb-[var(--gutter)]">
      <p className="meta text-[var(--fg-mute)]">404</p>
      <h1 className="display mt-4 text-[clamp(120px,30vw,560px)]">Cut.</h1>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-6 border-t hair pt-4">
        <p className="text-[17px]">This page didn’t make the edit.</p>
        <Link href="/" className="line-link line-link--on text-[15px] font-medium">
          Back to the work <span className="turn-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
