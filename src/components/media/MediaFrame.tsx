import Image from "next/image";
import type { Media } from "@/data/types";
import { ratio } from "./aspect";
import { Slate } from "./Slate";
import { LazyVideo } from "./LazyVideo";
import { LiteEmbed } from "./LiteEmbed";

type Props = {
  media: Media;
  sizes: string;
  priority?: boolean;
  /** Fill the parent instead of sizing from the media's aspect ratio. */
  fill?: boolean;
  /** Override the aspect used for layout (e.g. crop a 16:9 still to 21:9). */
  aspect?: Media["aspect"];
  label?: string;
  className?: string;
  quality?: 70 | 80 | 90;
};

/** Renders any Media entry: still, self-hosted video, lite embed or slate. */
export function MediaFrame({ media, sizes, priority, fill, aspect, label, className = "", quality = 80 }: Props) {
  const style = fill ? undefined : { aspectRatio: ratio(aspect ?? media.aspect) };
  const box = `relative overflow-hidden bg-ink-2 ${fill ? "h-full w-full" : "w-full"} ${className}`;

  switch (media.kind) {
    case "image":
      return (
        <div className={box} style={style}>
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className="object-cover"
            style={{ objectPosition: media.focus }}
          />
        </div>
      );
    case "video":
      return (
        <div className={box} style={style}>
          <LazyVideo media={media} />
        </div>
      );
    case "pending":
      return (
        <div className={box} style={style}>
          <Slate media={media} label={label} />
        </div>
      );
    default:
      return (
        <div className={box} style={style}>
          <LiteEmbed media={media} sizes={sizes} priority={priority} />
        </div>
      );
  }
}
