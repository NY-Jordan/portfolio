"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  gradient: string;
}

export function ProjectImage({ src, alt, title, gradient }: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${gradient}`}
      >
        <span className="font-mono text-sm tracking-wide text-foreground/50">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary/40">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 32rem, 100vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
