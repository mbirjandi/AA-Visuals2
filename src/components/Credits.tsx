type Item = { label: string; value: string };

/** Film-credit style metadata: small caps labels, values beneath. */
export function Credits({ items, className = "", cols = 1 }: { items: Item[]; className?: string; cols?: 1 | 2 | 3 | 5 }) {
  const grid = { 1: "", 2: "grid-cols-2", 3: "grid-cols-3", 5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" }[cols];
  return (
    <dl className={`grid gap-x-[var(--col-gap)] gap-y-4 ${grid} ${className}`}>
      {items.map((it) => (
        <div key={it.label}>
          <dt className="meta text-[var(--fg-mute)]">{it.label}</dt>
          <dd className="meta mt-1">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
