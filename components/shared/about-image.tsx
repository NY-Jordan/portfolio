"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Music } from "lucide-react";

const ICONS = { music: Music, dumbbell: Dumbbell } as const;

interface AboutImageProps {
  src: string;
  alt: string;
  icon: keyof typeof ICONS;
  title: string;
}

export function AboutImage({ src, alt, icon, title }: AboutImageProps) {
  const [hasError, setHasError] = useState(false);
  const Icon = ICONS[icon];

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-secondary/40 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-[1.02]">
      {hasError ? (
        <div className="flex size-full items-center justify-center">
          <Icon className="size-8 text-muted-foreground" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 20rem, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}

      <span className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md sm:size-9">
        <Icon className="size-3.5 sm:size-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <h3 className="font-display text-sm font-semibold text-white sm:text-lg">{title}</h3>
      </div>
    </div>
  );
}
