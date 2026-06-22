"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { scrollToPanel } from "@/lib/scroll-to-panel";
import { useLanguage } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";

const NAV_IDS = ["top", "about", "skills", "experience", "projects"] as const;

const ACTIVE_COLOR = "#22d3ee";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    scrollToPanel(id);
  };

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex flex-col items-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/70 p-1.5 backdrop-blur-md">
        <div className="hidden items-center gap-1 md:flex">
          {NAV_IDS.map((id) => {
            const isActive = activeId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm transition-colors hover:cursor-pointer",
                  !isActive && "text-muted-foreground hover:text-foreground"
                )}
                style={isActive ? { color: ACTIVE_COLOR } : undefined}
              >
                {t.nav[id]}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px"
                    style={{ background: ACTIVE_COLOR }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
          <span className="mx-1 h-5 w-px bg-border" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>

        <LanguageToggle />
        <ThemeToggle />
      </nav>

      {menuOpen && (
        <nav className="mt-2 flex w-44 flex-col gap-0.5 rounded-2xl border border-border/60 bg-secondary/90 p-2 backdrop-blur-md md:hidden">
          {NAV_IDS.map((id) => {
            const isActive = activeId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  !isActive && "text-muted-foreground hover:text-foreground"
                )}
                style={isActive ? { color: ACTIVE_COLOR } : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-mobile-bg"
                    className="absolute inset-0 rounded-lg bg-background/60"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">{t.nav[id]}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
