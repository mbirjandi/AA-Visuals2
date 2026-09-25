import type { Aspect, ImageMedia, PendingMedia, Project } from "./types";

/**
 * Every project lives here. Add a project by appending an entry — the
 * homepage sequence, /work index, project pages, previews and "next
 * project" links are all generated from this list.
 *
 * Missing footage is declared with `pending()`, which renders a slate and
 * documents the file to drop in. Swap it for an image/video entry once the
 * asset exists. See MEDIA.md for the full checklist.
 */

const SPEC: Record<Aspect, string> = {
  "16:9": "2400 × 1350",
  "9:16": "1080 × 1920",
  "4:5": "1600 × 2000",
  "21:9": "2520 × 1080",
  "2:3": "1600 × 2400",
  "3:2": "2400 × 1600",
  "1:1": "1600 × 1600",
};

function pending(
  slug: string,
  file: string,
  aspect: Aspect,
  alt: string,
): PendingMedia {
  const isVideo = file.endsWith(".mp4");
  return {
    kind: "pending",
    aspect,
    alt,
    path: `/projects/${slug}/${file}`,
    spec: isVideo
      ? `MP4 · H.264 · ${SPEC[aspect].replace(/ /g, "")} max · silent loop 8–15s · ≤ 6 MB, plus ${file.replace(".mp4", "-poster.webp")}`
      : `WebP or JPG · ${SPEC[aspect]} · sRGB · ≤ 500 KB`,
  };
}

const onSet: ImageMedia = {
  kind: "image",
  src: "/about/arman-on-set.jpg",
  width: 1200,
  height: 1800,
  aspect: "2:3",
  alt: "Arman Asadi checking a shot on his camera rig at a Gunna show",
  focus: "50% 40%",
};

const mufcStill: ImageMedia = {
  kind: "image",
  src: "/projects/manchester-united-chef-magz/still-01.jpg",
  width: 900,
  height: 1600,
  aspect: "9:16",
  alt: "A personalised Manchester United shirt reading ‘Gunna 1’ held up at the shoot",
  focus: "50% 45%",
};

/** Frames pulled from the published YouTube videos (1280 × 720). */
const frame = (slug: string, n: 1 | 2 | 3, alt: string, focus?: string): ImageMedia => ({
  kind: "image",
  src: `/projects/${slug}/frame-0${n}.jpg`,
  width: 1280,
  height: 720,
  aspect: "16:9",
  alt,
  focus,
});
const dmFrame = (n: 1 | 2 | 3, alt: string, focus?: string) => frame("darkest-man", n, alt, focus);

const popStill: ImageMedia = {
  kind: "image",
  src: "/projects/pop-mart-troy-the-magician/still-01.jpg",
  width: 640,
  height: 1136,
  aspect: "9:16",
  alt: "Troy The Magician carrying an armful of Pop Mart boxes out of the store",
  focus: "50% 28%",
};

export const projects: Project[] = [
  {
    slug: "gunna",
    title: "Gunna",
    titleLines: ["Gunna"],
    client: "Gunna",
    year: "2025",
    role: "Videography",
    format: "16:9",
    category: "Music video",
    summary: "Camera on a music video for Gunna.",
    feature: "bleed",
    cover: pending("gunna", "cover.webp", "16:9", "Still from the Gunna music video"),
    hero: pending("gunna", "hero.mp4", "16:9", "Opening shots from the Gunna music video"),
    blocks: [
      {
        layout: "offset",
        side: "right",
        media: onSet,
        caption: "On the rig at a Gunna show.",
      },
      { layout: "full", media: pending("gunna", "frame-01.webp", "16:9", "Still from the Gunna music video") },
      {
        layout: "pair",
        media: [
          pending("gunna", "frame-02.webp", "4:5", "Still from the Gunna music video"),
          pending("gunna", "frame-03.webp", "4:5", "Still from the Gunna music video"),
        ],
      },
    ],
    credits: [
      { label: "Artist", value: "Gunna" },
      { label: "Videography", value: "Arman Asadi" },
    ],
  },
  {
    slug: "harry-pinero",
    title: "Harry Pinero",
    titleLines: ["Harry", "Pinero"],
    client: "Harry Pinero",
    year: "2026",
    role: "Edit",
    format: "16:9",
    category: "YouTube",
    summary: "‘Who’s The Smartest YouTuber’ with Beta Squad. Cut for Harry Pinero’s channel.",
    feature: "split",
    cover: frame("harry-pinero", 1, "Two contestants at the quiz table, one hiding a grin behind his hands", "70% 40%"),
    hero: {
      kind: "youtube",
      id: "q011tqQk1qc",
      title: "Who's The Smartest YouTuber Ft Beta Squad",
      aspect: "16:9",
      alt: "Harry Pinero — Who's The Smartest YouTuber ft Beta Squad, on YouTube",
      poster: frame("harry-pinero", 1, "Two contestants at the quiz table"),
    },
    blocks: [
      { layout: "full", media: frame("harry-pinero", 3, "Three contestants at the table, one arguing his answer", "50% 40%") },
      {
        layout: "offset",
        side: "left",
        media: frame("harry-pinero", 2, "Two contestants laughing, with the on-screen ‘Mafia’ graphic"),
        caption: "From the final cut.",
      },
    ],
    credits: [
      { label: "Channel", value: "Harry Pinero" },
      { label: "Featuring", value: "Beta Squad" },
      { label: "Edit", value: "Arman Asadi" },
    ],
  },
  {
    slug: "manchester-united-chef-magz",
    title: "Manchester United × Chef Magz",
    titleLines: ["Manchester", "United"],
    titleSub: "× Chef Magz",
    client: "Manchester United × Chef Magz",
    year: "2024",
    role: "Shoot and edit",
    format: "4:5",
    category: "Branded content",
    summary: "Branded content for Manchester United with Chef Magz. Shot and cut by Arman.",
    feature: "poster",
    cover: mufcStill,
    hero: {
      kind: "instagram",
      id: "DWd1Cp6CGmR",
      title: "Manchester United × Chef Magz reel",
      aspect: "9:16",
      alt: "Manchester United × Chef Magz reel on Instagram",
      poster: mufcStill,
    },
    blocks: [
      {
        layout: "pair",
        media: [
          pending("manchester-united-chef-magz", "frame-01.webp", "4:5", "Still from the Manchester United × Chef Magz shoot"),
          pending("manchester-united-chef-magz", "frame-02.webp", "4:5", "Still from the Manchester United × Chef Magz shoot"),
        ],
      },
      { layout: "full", media: pending("manchester-united-chef-magz", "frame-03.webp", "16:9", "Still from the Manchester United × Chef Magz shoot") },
    ],
    credits: [
      { label: "Client", value: "Manchester United" },
      { label: "With", value: "Chef Magz" },
      { label: "Shoot & edit", value: "Arman Asadi" },
    ],
  },
  {
    slug: "pop-mart-troy-the-magician",
    title: "Pop Mart × Troy The Magician",
    titleLines: ["Pop", "Mart"],
    titleSub: "× Troy The Magician",
    client: "Pop Mart × Troy The Magician",
    year: "2025",
    role: "Videography",
    format: "9:16",
    category: "Branded content",
    summary: "A Pop Mart UK store launch with Troy The Magician. Filmed by Arman for Troy’s Instagram.",
    feature: "inverse",
    cover: popStill,
    hero: {
      kind: "instagram",
      id: "DXURpWhDMIX",
      title: "Pop Mart UK store launch with Troy The Magician",
      aspect: "9:16",
      alt: "Pop Mart × Troy The Magician reel on Instagram",
      poster: popStill,
    },
    blocks: [
      { layout: "full", media: pending("pop-mart-troy-the-magician", "frame-01.webp", "16:9", "Still from the Pop Mart store launch") },
      {
        layout: "offset",
        side: "right",
        media: pending("pop-mart-troy-the-magician", "frame-02.webp", "4:5", "Still from the Pop Mart store launch"),
      },
    ],
    credits: [
      { label: "Client", value: "Pop Mart UK" },
      { label: "With", value: "Troy The Magician" },
      { label: "Videography", value: "Arman Asadi" },
    ],
  },
  {
    slug: "darkest-man",
    title: "Darkest Man",
    titleLines: ["Darkest", "Man"],
    client: "Darkest Man",
    year: "2026",
    role: "Shoot and edit",
    format: "21:9",
    category: "YouTube production",
    summary:
      "‘Extreme General Knowledge Quiz’ with Max Khadar, Specs and Harry Pinero. Shot and cut for Darkest Man’s channel.",
    feature: "scope",
    cover: dmFrame(1, "Two contestants mid-round on the quiz set, one holding up a phone", "50% 38%"),
    hero: {
      kind: "youtube",
      id: "AB1XDUvcXws",
      title: "EXTREME GENERAL KNOWLEDGE QUIZ! ft Max Khadar, Specs & Harry Pinero",
      aspect: "16:9",
      alt: "Darkest Man — Extreme General Knowledge Quiz, on YouTube",
      poster: dmFrame(1, "Two contestants mid-round on the quiz set, one holding up a phone"),
    },
    blocks: [
      {
        layout: "scope",
        media: { ...dmFrame(2, "A contestant in a ‘No Rules’ jersey celebrating with arms out", "50% 45%"), aspect: "21:9" },
      },
      {
        layout: "offset",
        side: "left",
        media: dmFrame(3, "Two contestants shaking hands, with the on-screen scoreboard below"),
        caption: "From the final cut.",
      },
    ],
    credits: [
      { label: "Channel", value: "Darkest Man" },
      { label: "Featuring", value: "Max Khadar, Specs, Harry Pinero" },
      { label: "Shoot & edit", value: "Arman Asadi" },
    ],
  },
  {
    slug: "max-khadar",
    title: "Max Khadar",
    titleLines: ["Max", "Khadar"],
    client: "Max Khadar",
    year: "2026",
    role: "Edit",
    format: "16:9",
    category: "YouTube production",
    summary: "‘One Question Go’ with Will Smith. Cut for Max Khadar’s channel.",
    feature: "type",
    cover: frame("max-khadar", 1, "Will Smith laughing with the host across the table", "55% 35%"),
    hero: {
      kind: "youtube",
      id: "tmmYdv_CqtY",
      title: "ONE QUESTION GO FT WILL SMITH",
      aspect: "16:9",
      alt: "Max Khadar — One Question Go ft Will Smith, on YouTube",
      poster: frame("max-khadar", 1, "Will Smith laughing with the host across the table"),
    },
    blocks: [
      {
        layout: "scope",
        media: { ...frame("max-khadar", 2, "Will Smith lunging forward in his chair as the host clutches his head", "50% 45%"), aspect: "21:9" },
      },
      {
        layout: "offset",
        side: "right",
        media: frame("max-khadar", 3, "Will Smith mid-answer while the host checks his phone"),
      },
    ],
    credits: [
      { label: "Channel", value: "Max Khadar" },
      { label: "Featuring", value: "Will Smith" },
      { label: "Edit", value: "Arman Asadi" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    index: i,
    next: projects[(i + 1) % projects.length],
  };
}

export const pad = (n: number) => String(n).padStart(2, "0");
