"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Content } from "@/content";
import { WaitlistDialog } from "@/components/sections/WaitlistDialog";

type Ctx = { open: () => void };

const WaitlistContext = createContext<Ctx>({ open: () => {} });

export function useWaitlist() {
  return useContext(WaitlistContext);
}

/**
 * Wraps the page so the two "Join the wait list" buttons and the dialog share
 * one piece of state without turning every section into a client component.
 */
export function WaitlistProvider({
  copy,
  locale,
  children,
}: {
  copy: Content["waitlist"];
  locale: string;
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistDialog
        copy={copy}
        locale={locale}
        open={isOpen}
        onClose={() => setOpen(false)}
      />
    </WaitlistContext.Provider>
  );
}
