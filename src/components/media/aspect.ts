import type { Aspect } from "@/data/types";

export const ratio = (a: Aspect) => a.replace(":", " / ");
export const ratioNum = (a: Aspect) => {
  const [w, h] = a.split(":").map(Number);
  return w / h;
};
