"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroBackdrop } from "@/components/shared/hero-backdrop";
import { MagneticOrb } from "@/components/shared/magnetic-orb";
import { GithubIcon } from "@/components/shared/brand-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { scrollToPanel } from "@/lib/scroll-to-panel";

const TECHNOLOGIES = ["React", "Next.js", "Laravel", "Node.js"];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/NY-Jordan",
    icon: GithubIcon,
  },
];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex h-dvh w-screen shrink-0 snap-start flex-col overflow-hidden"
    >
      <HeroBackdrop />
      <MagneticOrb />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-start gap-4"
        >
          <span className="mt-3 hidden flex-col items-center gap-2 sm:flex">
            <span className="size-2 rounded-full bg-accent shadow-[0_0_12px] shadow-accent" />
            <span className="h-24 w-px bg-gradient-to-b from-accent to-transparent" />
          </span>

          <div className="flex max-w-2xl flex-col gap-6">
            <h1 className="font-display flex flex-wrap items-center gap-3 text-5xl tracking-tight text-balance sm:text-6xl lg:text-7xl">
              <span className="font-light text-muted-foreground">
                {t.hero.greeting}
              </span>
             
              <span className="font-semibold">Yvan</span>
               <span className="inline-flex items-center gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:size-9"
                  >
                    <link.icon className="size-4 sm:size-[1.1rem]" />
                  </a>
                ))}
              </span>
            </h1>
            <p className="max-w-md text-xl leading-snug text-muted-foreground sm:text-2xl">
              {t.hero.subtitleLine1}
              <br />
              {t.hero.subtitleLine2}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground">
              {TECHNOLOGIES.map((tech, i) => (
                <span key={tech} className="flex items-center gap-3">
                  {tech}
                  {i < TECHNOLOGIES.length - 1 && (
                    <span className="text-accent">•</span>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToPanel("projects")}>
                {t.hero.ctaProjects}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a target="_blank" href="https://drive.google.com/file/d/1CEQ23Z3sEAD4B4RINOg-4cMze4XRjjh5/view?usp=drive_link" download>
                  <Download className="size-4" />
                  {t.hero.ctaResume}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          {t.hero.scroll}
        </span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center rounded-full border border-border/80 p-1.5"
        >
          <ChevronRight className="size-3.5 text-foreground" />
        </motion.span>
      </div>
    </section>
  );
}
