import { MARK_H, MARK_PATH, MARK_W } from "@/lib/mark";

type Props = {
  className?: string;
  title?: string;
};

/** The AA mark as crisp vector. Inherits colour from `currentColor`. */
export function Mark({ className, title }: Props) {
  return (
    <svg
      viewBox={`0 0 ${MARK_W} ${MARK_H}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}
