"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { ReelDialog } from "./ReelDialog";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useReel = () => useContext(Ctx);

export function ReelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus?.();
  }, []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen ? <ReelDialog onClose={close} /> : null}
    </Ctx.Provider>
  );
}
