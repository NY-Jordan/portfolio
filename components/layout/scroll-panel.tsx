import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ScrollPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function ScrollPanel({ id, children, className }: ScrollPanelProps) {
  return (
    <section
      id={id}
      className={cn("h-dvh w-screen shrink-0 snap-start overflow-hidden", className)}
    >
      <div data-vscroll className="flex h-full flex-col overflow-y-auto">
        <div className="m-auto w-full max-w-6xl px-6 py-20">{children}</div>
      </div>
    </section>
  );
}
