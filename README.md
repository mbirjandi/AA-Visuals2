# AA Visuals — Arman Asadi

Portfolio for Arman Asadi, videographer + editor, London.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · no animation library.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where things live

- `src/data/projects.ts` — every project (homepage sequence, /work, /work/[slug], previews)
- `src/data/site.ts` — contact, socials, services, showreel config
- `src/lib/mark.ts` — the AA mark, traced from `design/aa-logo-source.jpg`
- `src/app/globals.css` — tokens, the cut-link / reveal / page-transition system
- `MEDIA.md` — which files are still needed and at what spec

## System in one paragraph

Two inks (#171C1F / #F4F3EF). One angle: the A's outer stroke, 60.4°, whose run per
unit height (0.5685) drives every chamfer, reveal wipe, link hover, stepped title
indent and the page transition. Inter Tight for display and text, Geist Mono for
credits-style metadata.
