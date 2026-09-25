/** Aspect ratios used across the portfolio, written as "w:h". */
export type Aspect = "16:9" | "9:16" | "4:5" | "21:9" | "2:3" | "3:2" | "1:1";

type MediaBase = {
  /** Describes what is in the frame, for screen readers. */
  alt: string;
  aspect: Aspect;
  /** CSS object-position, for art-directing the crop. */
  focus?: string;
};

export type ImageMedia = MediaBase & {
  kind: "image";
  src: string;
  width: number;
  height: number;
};

export type VideoMedia = MediaBase & {
  kind: "video";
  /** H.264 MP4. Required. */
  mp4: string;
  /** Optional VP9/AV1 WebM, served first when present. */
  webm?: string;
  /** Poster frame shown before playback and to reduced-motion users. */
  poster: string;
};

export type EmbedMedia = MediaBase & {
  kind: "youtube" | "instagram" | "vimeo";
  id: string;
  title: string;
  /** Still shown until the viewer chooses to load the third-party player. */
  poster?: ImageMedia;
};

/**
 * An asset that has not been supplied yet. Renders as a designed slate so
 * layouts hold their shape; `path` + `spec` describe exactly what to drop in.
 */
export type PendingMedia = MediaBase & {
  kind: "pending";
  path: string;
  spec: string;
};

export type Media = ImageMedia | VideoMedia | EmbedMedia | PendingMedia;

/** Layout blocks for the case-study body. Mixed freely per project. */
export type MediaBlock =
  | { layout: "full"; media: Media; caption?: string }
  | { layout: "scope"; media: Media; caption?: string }
  | { layout: "pair"; media: [Media, Media]; caption?: string }
  | { layout: "offset"; media: Media; side: "left" | "right"; caption?: string }
  | { layout: "note"; text: string };

/** How a project is composed in the homepage sequence. */
export type FeatureLayout = "bleed" | "split" | "poster" | "inverse" | "scope" | "type";

export type Project = {
  slug: string;
  /** Display lines for the oversized title. */
  titleLines: string[];
  /** Second line set smaller, e.g. "× Chef Magz". */
  titleSub?: string;
  /** Plain-text title, e.g. "Manchester United × Chef Magz". */
  title: string;
  client: string;
  year: string;
  role: string;
  format: Aspect;
  category: string;
  /** One sentence. Credits, not copywriting. */
  summary: string;
  feature: FeatureLayout;
  /** Frame used on the homepage and in previews. */
  cover: Media;
  /** Optional short muted loop for hover / in-view previews. */
  preview?: VideoMedia;
  /** Primary piece on the project page. */
  hero: Media;
  blocks: MediaBlock[];
  credits: { label: string; value: string }[];
};
