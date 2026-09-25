import type { ElementType } from "react";
import { Reveal } from "./Reveal";

type Props = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Lines step right along the A's right stroke (true) or stack flush (false). */
  step?: boolean;
  reveal?: boolean;
  /** Accessible name, when the lines alone read awkwardly. */
  label?: string;
};

/**
 * Oversized title whose lines step along the A's stroke: each line is
 * indented by one line-height × 0.5685, so the rag itself draws the angle.
 */
export function StepTitle({ lines, as: Tag = "h3", className = "", id, step = true, reveal = true, label }: Props) {
  return (
    <Tag id={id} className={`display ${className}`} aria-label={label}>
      {lines.map((line, i) => {
        const style = step && i > 0 ? { paddingLeft: `calc(${i} * 0.8em * var(--run))` } : undefined;
        return reveal ? (
          <Reveal key={line} as="span" kind="type" delay={i * 90} className="block pb-[0.04em]" style={style}>
            {line}
          </Reveal>
        ) : (
          <span key={line} className="block pb-[0.04em]" style={style}>
            {line}
          </span>
        );
      })}
    </Tag>
  );
}
