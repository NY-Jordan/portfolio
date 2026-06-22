"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { scrollToPanel } from "@/lib/scroll-to-panel";
import { useLanguage } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";

const NAV_IDS = ["top", "about", "skills", "experience", "projects"] as const;

const ACTIVE_COLOR = "#22d3ee";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("top");
  const { t } = useLanguage();

  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 p-1.5 backdrop-blur-md">
        {NAV_IDS.map((id) => {
          const isActive = activeId === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToPanel(id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors hover:cursor-pointer",
                !isActive && "text-muted-foreground hover:text-foreground"
              )}
              style={isActive ? { color: ACTIVE_COLOR } : undefined}
            >
              {t.nav[id]}
              {isActive && (
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-px"
                  style={{ background: ACTIVE_COLOR }}
                />
              )}
            </button>
          );
        })}

        <span className="mx-1 h-5 w-px bg-border" />

        <LanguageToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
}
