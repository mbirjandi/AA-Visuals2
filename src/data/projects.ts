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

const dmFrame = (n: 1 | 2 | 3, alt: string, focus?: string): ImageMedia => ({
  kind: "image",
  src: `/projects/darkest-man/frame-0${n}.jpg`,
  width: 1280,
  height: 720,
  aspect: "16:9",
  alt,
  focus,
});

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
    year: "2025",
    role: "Edit",
    format: "9:16",
    category: "YouTube",
    summary: "Vertical edits for Harry Pinero’s channel.",
    feature: "split",
    cover: pending("harry-pinero", "cover.webp", "9:16", "Frame from a Harry Pinero vertical edit"),
    hero: pending("harry-pinero", "hero.mp4", "9:16", "A Harry Pinero vertical edit"),
    blocks: [
      {
        layout: "pair",
        media: [
          pending("harry-pinero", "frame-01.webp", "9:16", "Frame from a Harry Pinero vertical edit"),
          pending("harry-pinero", "frame-02.webp", "9:16", "Frame from a Harry Pinero vertical edit"),
        ],
      },
      {
        layout: "offset",
        side: "left",
        media: pending("harry-pinero", "frame-03.webp", "9:16", "Frame from a Harry Pinero vertical edit"),
      },
    ],
    credits: [
      { label: "Channel", value: "Harry Pinero" },
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
    format: "4:5",
    category: "Branded content",
    summary: "Branded content for Pop Mart with Troy The Magician.",
    feature: "inverse",
    cover: pending("pop-mart-troy-the-magician", "cover.webp", "4:5", "Still from the Pop Mart × Troy The Magician film"),
    hero: pending("pop-mart-troy-the-magician", "hero.mp4", "4:5", "The Pop Mart × Troy The Magician film"),
    blocks: [
      { layout: "full", media: pending("pop-mart-troy-the-magician", "frame-01.webp", "16:9", "Still from the Pop Mart × Troy The Magician film") },
      {
        layout: "offset",
        side: "right",
        media: pending("pop-mart-troy-the-magician", "frame-02.webp", "4:5", "Still from the Pop Mart × Troy The Magician film"),
      },
    ],
    credits: [
      { label: "Client", value: "Pop Mart" },
      { label: "With", value: "Troy The Magician" },
      { label: "Videography", value: "Arman Asadi" },
    ],
  },
  {
    slug: "darkest-man",
    title: "Darkest Man",
    titleLines: ["Darkest", "Man"],
    client: "Darkest Man",
    year: "2025",
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
    year: "2024",
    role: "Edit",
    format: "16:9",
    category: "YouTube production",
    summary: "Cut for Max Khadar’s YouTube channel.",
    feature: "type",
    cover: pending("max-khadar", "cover.webp", "16:9", "Frame from the Max Khadar video"),
    hero: pending("max-khadar", "hero.mp4", "16:9", "The Max Khadar video"),
    blocks: [
      {
        layout: "pair",
        media: [
          pending("max-khadar", "frame-01.webp", "16:9", "Frame from the Max Khadar video"),
          pending("max-khadar", "frame-02.webp", "16:9", "Frame from the Max Khadar video"),
        ],
      },
    ],
    credits: [
      { label: "Channel", value: "Max Khadar" },
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
