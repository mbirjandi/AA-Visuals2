"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a media query. Server snapshot is `false`. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const FINE = "(hover: hover) and (pointer: fine)";
