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
    // Handle taken from the camera credit on Troy The Magician's Pop Mart reel.
    { label: "Instagram", href: "https://www.instagram.com/armanasadi08/" },
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
const still = (
  src: string,
  width: number,
  height: number,
  aspect: ImageMedia["aspect"],
  alt: string,
  focus: string,
): ImageMedia => ({ kind: "image", src, width, height, aspect, alt, focus });

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
    still("/about/arman-on-set.jpg", 1200, 1800, "2:3", "Arman on his camera rig at a Gunna show", "50% 30%"),
    still("/projects/max-khadar/frame-02.jpg", 1280, 720, "16:9", "One Question Go with Will Smith", "35% 45%"),
    still("/projects/manchester-united-chef-magz/still-01.jpg", 900, 1600, "9:16", "Manchester United × Chef Magz shoot", "50% 42%"),
    still("/projects/pop-mart-troy-the-magician/still-01.jpg", 640, 1136, "9:16", "Pop Mart store launch with Troy The Magician", "50% 40%"),
    still("/projects/darkest-man/frame-02.jpg", 1280, 720, "16:9", "Darkest Man quiz shoot", "50% 50%"),
    still("/projects/harry-pinero/frame-01.jpg", 1280, 720, "16:9", "Harry Pinero quiz with Beta Squad", "70% 40%"),
  ],
};
