"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  initials: string;
}

export function ProfilePhoto({ src, alt, initials }: ProfilePhotoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative shrink-0">
      <div
        aria-hidden
        className="absolute -inset-5 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.25) 55%, transparent 75%)",
        }}
      />
      <div className="relative size-40 overflow-hidden rounded-full border border-border bg-secondary/40 sm:size-48 md:size-56">
        {hasError ? (
          <div className="flex size-full items-center justify-center font-display text-4xl font-medium text-muted-foreground">
            {initials}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="14rem"
            className="object-cover"
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}
