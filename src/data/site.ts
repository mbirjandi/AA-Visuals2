import type { ImageMedia, VideoMedia } from "./types";

export const site = {
  name: "AA Visuals",
  person: "Arman Asadi",
  role: "Videographer + Editor",
  location: "London, UK",
  email: "hello@aavisuals.co",
  url: "https://aavisuals.co",
  description:
    "Arman Asadi shoots and edits for artists, creators and brands. Music videos, branded content and YouTube production. Based in London.",

  /**
   * Social profiles. Leave `href` empty until the real URL is confirmed —
   * empty links are hidden in production and flagged in development.
   */
  social: [
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
    { label: "Vimeo", href: "" },
    { label: "LinkedIn", href: "" },
  ],

  services: [
    { name: "Videography", detail: "Shooting, lighting, composition and camera movement." },
    { name: "Editing", detail: "Short-form, long-form, storytelling, transitions and sound design." },
    { name: "Post-production", detail: "Colour grading, motion graphics and one consistent look across a series." },
  ],
  tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
} as const;

/**
 * Showreel. Supply either a self-hosted file (preferred — full control over
 * the player) or a Vimeo/YouTube id. While both are null the hero cuts
 * between real stills and PLAY REEL opens a holding slate.
 *
 *   /public/reel/showreel.mp4      H.264, 1920×1080, 60–120s, ≤ 25 MB
 *   /public/reel/showreel.webm     optional VP9/AV1 version
 *   /public/reel/loop.mp4          silent 10–15s cut for the hero mask, ≤ 5 MB
 *   /public/reel/poster.webp       2400×1350 frame
 */
export const reel: {
  file: VideoMedia | null;
  loop: VideoMedia | null;
  embed: { provider: "vimeo" | "youtube"; id: string } | null;
  /** Real stills cut together in the hero until a loop exists. */
  stills: ImageMedia[];
} = {
  file: null,
  loop: null,
  embed: null,
  stills: [
    {
      kind: "image",
      src: "/about/arman-on-set.jpg",
      width: 1200,
      height: 1800,
      aspect: "2:3",
      alt: "Arman on his camera rig at a Gunna show",
      focus: "50% 30%",
    },
    {
      kind: "image",
      src: "/projects/manchester-united-chef-magz/still-01.jpg",
      width: 900,
      height: 1600,
      aspect: "9:16",
      alt: "Manchester United × Chef Magz shoot",
      focus: "50% 42%",
    },
    {
      kind: "image",
      src: "/projects/darkest-man/frame-02.jpg",
      width: 1280,
      height: 720,
      aspect: "16:9",
      alt: "Darkest Man quiz shoot",
      focus: "50% 50%",
    },
    {
      kind: "image",
      src: "/projects/darkest-man/frame-01.jpg",
      width: 1280,
      height: 720,
      aspect: "16:9",
      alt: "Darkest Man quiz shoot",
      focus: "40% 40%",
    },
  ],
};
