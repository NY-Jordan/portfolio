"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Cover art from the NY-Jordan identity system, shown at its real
 * proportions with a gentle tilt and a small spinning accent ring —
 * a light touch, not a gimmick.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" style={{ perspective: 1000 }}>
      <motion.div
        className="relative aspect-[10/3] overflow-hidden rounded-sm border border-border bg-card shadow-2xl"
        animate={{ rotateX: [0, 3, 0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/images/brand/linkedin-cover.png"
          alt="NY-Jordan identity system cover"
          fill
          sizes="(min-width: 1024px) 448px, 80vw"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-background/80 to-transparent" />
      </motion.div>

      <span className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-accent/60" aria-hidden="true" />
      <span className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-accent/60" aria-hidden="true" />
      <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-accent/60" aria-hidden="true" />
      <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-accent/60" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        className="absolute -right-4 -top-4 h-10 w-10 rounded-full border border-dashed border-accent/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
