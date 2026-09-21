import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/components/ui/tag";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale, Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  statusLabels: Dictionary["work"]["status"];
}

export function ProjectCard({ project, locale, statusLabels }: ProjectCardProps) {
  const cover = project.media[0];

  return (
    <Link
      href={`/${locale}/work/${project.slug}`}
      className="group flex flex-col gap-4 border border-border p-6 transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt[locale]}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="label-mono text-muted-foreground">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.tagline[locale]}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Tag className={project.status === "shipped" ? "border-accent/40 text-accent" : undefined}>
          {statusLabels[project.status]}
        </Tag>
        {project.technologies.slice(0, 3).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </Link>
  );
}
