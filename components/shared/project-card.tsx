"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Info, X } from "lucide-react";

import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { ProjectImage } from "@/components/shared/project-image";
import { useLanguage } from "@/components/providers/language-provider";

const GRADIENTS = [
  "from-white/[0.16] via-white/[0.04] to-transparent",
  "from-white/[0.12] via-white/[0.03] to-transparent",
  "from-white/[0.20] via-white/[0.05] to-transparent",
  "from-white/[0.09] via-white/[0.02] to-transparent",
];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.githubUrl ? (
        <Button asChild size="sm" variant="outline">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
        </Button>
      ) : null}
      {project.demoUrl ? (
        <Button asChild size="sm" variant="outline">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <ArrowUpRight className="size-3.5" />
            Live
          </a>
        </Button>
      ) : null}
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { lang } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="h-[36rem] [perspective:1500px]">
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] md:hover:[transform:rotateY(180deg)]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col gap-3 overflow-hidden rounded-xl border border-border p-4 [backface-visibility:hidden]">
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            aria-label={lang === "fr" ? "Voir les points clés" : "View key features"}
            className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground md:hidden"
          >
            <Info className="size-3.5" />
          </button>

          <ProjectImage
            src={project.image}
            alt={project.title}
            title={project.title}
            gradient={gradient}
          />

          <h3 className="font-display text-base font-medium">
            {project.title}
          </h3>

          <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
            {project.description[lang]}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-secondary/30 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <CheckCircle2 className="size-3.5" />
              {lang === "fr" ? "Points clés" : "Key features"}
            </span>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              aria-label={lang === "fr" ? "Retour" : "Back"}
              className="flex size-7 items-center justify-center rounded-full border border-border/80 bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground md:hidden"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 text-sm text-foreground">
            {project.features.map((feature) => (
              <li key={feature[lang]} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/60" />
                <span>{feature[lang]}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
}
