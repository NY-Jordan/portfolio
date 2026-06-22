"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";

interface LoaderProps {
  onComplete?: () => void;
}

const HOLD_DURATION_MS = 4000;

export function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/animations/12345.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }, container);

    const timer = window.setTimeout(() => {
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete,
      });
    }, HOLD_DURATION_MS);

    return () => {
      ctx.revert();
      window.clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background"
    >
      <div className="w-48 sm:w-56">
        {animationData ? (
          <Lottie animationData={animationData} loop autoplay />
        ) : null}
      </div>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/60">
        Yvan Jordan
      </span>
    </div>
  );
}
