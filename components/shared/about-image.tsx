"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Music } from "lucide-react";

const ICONS = { music: Music, dumbbell: Dumbbell } as const;

interface AboutImageProps {
  src: string;
  alt: string;
  icon: keyof typeof ICONS;
}

export function AboutImage({ src, alt, icon }: AboutImageProps) {
  const [hasError, setHasError] = useState(false);
  const Icon = ICONS[icon];

  if (hasError) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40">
        <Icon className="size-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-secondary/40">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 20rem, 50vw"
        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
