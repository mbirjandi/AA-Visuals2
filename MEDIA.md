# Media checklist

Real assets already in use (from the previous site / public YouTube frames):

| File | Used for |
| --- | --- |
| `public/about/arman-on-set.jpg` (1200×1800) | About portrait, hero still, Gunna page BTS |
| `public/projects/manchester-united-chef-magz/still-01.jpg` (900×1600) | MUFC cover + Instagram poster |
| `public/projects/darkest-man/frame-01..03.jpg` (1280×720) | Darkest Man cover and case study |
| `public/projects/darkest-man/thumbnail.jpg` | Kept for reference (not displayed) |

Everything else is declared with `pending()` in `src/data/projects.ts` and renders as a
slate. In development each slate prints its exact path and spec. To replace one:

1. Export the file to the path shown on the slate.
2. In `src/data/projects.ts`, swap the `pending(...)` call for an image or video entry:

```ts
// still
{ kind: "image", src: "/projects/gunna/cover.webp", width: 2400, height: 1350, aspect: "16:9", alt: "…" }
// silent loop (plays in view, one at a time, pauses off-screen)
{ kind: "video", mp4: "/projects/gunna/hero.mp4", poster: "/projects/gunna/hero-poster.webp", aspect: "16:9", alt: "…" }
// or a YouTube / Vimeo / Instagram piece (loads only on click)
{ kind: "youtube", id: "…", title: "…", aspect: "16:9", alt: "…", poster: { …image } }
```

## Specs

| Aspect | Stills (WebP/JPG, sRGB, ≤ 500 KB) | Loops (MP4 H.264, silent, 8–15s, ≤ 6 MB) |
| --- | --- | --- |
| 16:9 | 2400 × 1350 | 1920 × 1080 |
| 21:9 | 2520 × 1080 | 2520 × 1080 |
| 9:16 | 1080 × 1920 | 1080 × 1920 |
| 4:5 | 1600 × 2000 | 1080 × 1350 |

Encode loops with, e.g.
`ffmpeg -i in.mov -an -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 hero.mp4`
and grab the poster from the first frame.

## Still needed

| Project | Files |
| --- | --- |
| Gunna | `cover.webp` 16:9, `hero.mp4` 16:9, `frame-01.webp` 16:9, `frame-02/03.webp` 4:5 |
| Harry Pinero | `cover.webp`, `hero.mp4`, `frame-01..03.webp` — all 9:16 |
| MUFC × Chef Magz | `frame-01/02.webp` 4:5, `frame-03.webp` 16:9 |
| Pop Mart × Troy The Magician | `cover.webp` 4:5, `hero.mp4` 4:5, `frame-01.webp` 16:9, `frame-02.webp` 4:5 |
| Max Khadar | `cover.webp` 16:9, `hero.mp4` 16:9, `frame-01/02.webp` 16:9 |

## Showreel (`src/data/site.ts → reel`)

- `public/reel/showreel.mp4` — H.264 1920×1080, 60–120s, ≤ 25 MB → set `reel.file`
- or a Vimeo/YouTube id → set `reel.embed`
- `public/reel/loop.mp4` — silent 10–15s cut for the hero mask, ≤ 5 MB → set `reel.loop`
  (until then the hero cuts between real stills, toned monochrome)

## Links

Social URLs in `src/data/site.ts → social` are empty. Empty links are hidden in
production and flagged “(link needed)” in development.
