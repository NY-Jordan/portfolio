"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const COOLDOWN_MS = 850;
const WHEEL_THRESHOLD = 12;

export function HorizontalScrollContainer({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getPanels = () => Array.from(container.children) as HTMLElement[];

    const getCurrentIndex = () => {
      const panels = getPanels();
      let closest = 0;
      let closestDistance = Infinity;

      panels.forEach((panel, index) => {
        const distance = Math.abs(panel.offsetLeft - container.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      return closest;
    };

    const goToPanel = (index: number) => {
      const panels = getPanels();
      const clamped = Math.max(0, Math.min(index, panels.length - 1));
      const target = panels[clamped];
      if (!target) return;

      isAnimatingRef.current = true;
      container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, COOLDOWN_MS);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

      const target = event.target as HTMLElement;
      const innerScroll = target.closest<HTMLElement>("[data-vscroll]");

      if (innerScroll) {
        const { scrollTop, scrollHeight, clientHeight } = innerScroll;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const scrollingDown = event.deltaY > 0;

        if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop)) {
          return;
        }
      }

      event.preventDefault();
      if (isAnimatingRef.current) return;

      goToPanel(getCurrentIndex() + (event.deltaY > 0 ? 1 : -1));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-dvh w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}
