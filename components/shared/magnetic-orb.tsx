"use client";

import { useEffect, useRef } from "react";

const REPULSION_RADIUS = 380;
const NEBULA_MAX_PUSH = 34;
const RING_LERP = 0.16;
const NEBULA_LERP = 0.06;

function easeOutQuad(t: number) {
  return t * (2 - t);
}

/**
 * Single soft nebula glow anchored behind the hero content, paired with a
 * cursor-tracking ring + halo. The nebula stays one cohesive mass and only
 * nudges/deforms slightly away from the cursor — it never splits into
 * visibly separate blobs.
 */
export function MagneticOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const nebula = nebulaRef.current;
    const ring = ringRef.current;
    if (!container || !nebula || !ring) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const nebulaTarget = { x: 0, y: 0, scale: 1 };
    const nebulaCurrent = { x: 0, y: 0, scale: 1 };
    const ringTarget = { x: 0, y: 0, opacity: 0 };
    const ringCurrent = { x: 0, y: 0, opacity: 0 };
    const mouse = { x: 0, y: 0, inside: false };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.inside =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
    };

    const handlePointerLeave = () => {
      mouse.inside = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    let frameId: number;

    const tick = () => {
      const rect = container.getBoundingClientRect();

      if (mouse.inside) {
        ringTarget.x = mouse.x;
        ringTarget.y = mouse.y;
        ringTarget.opacity = 1;

        const anchor = nebula.getBoundingClientRect();
        const cx = anchor.left + anchor.width / 2 - rect.left;
        const cy = anchor.top + anchor.height / 2 - rect.top;

        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.hypot(dx, dy) || 0.0001;

        if (dist < REPULSION_RADIUS) {
          const proximity = easeOutQuad(1 - dist / REPULSION_RADIUS);
          const nx = dx / dist;
          const ny = dy / dist;

          nebulaTarget.x = nx * NEBULA_MAX_PUSH * proximity;
          nebulaTarget.y = ny * NEBULA_MAX_PUSH * proximity;
          nebulaTarget.scale = 1 + proximity * 0.035;
        } else {
          nebulaTarget.x = 0;
          nebulaTarget.y = 0;
          nebulaTarget.scale = 1;
        }
      } else {
        ringTarget.opacity = 0;
        nebulaTarget.x = 0;
        nebulaTarget.y = 0;
        nebulaTarget.scale = 1;
      }

      nebulaCurrent.x += (nebulaTarget.x - nebulaCurrent.x) * NEBULA_LERP;
      nebulaCurrent.y += (nebulaTarget.y - nebulaCurrent.y) * NEBULA_LERP;
      nebulaCurrent.scale += (nebulaTarget.scale - nebulaCurrent.scale) * NEBULA_LERP;

      ringCurrent.x += (ringTarget.x - ringCurrent.x) * RING_LERP;
      ringCurrent.y += (ringTarget.y - ringCurrent.y) * RING_LERP;
      ringCurrent.opacity += (ringTarget.opacity - ringCurrent.opacity) * RING_LERP;

      nebula.style.transform = `translate3d(${nebulaCurrent.x}px, ${nebulaCurrent.y}px, 0) scale(${nebulaCurrent.scale})`;
      ring.style.transform = `translate3d(${ringCurrent.x}px, ${ringCurrent.y}px, 0) translate(-50%, -50%)`;
      ring.style.opacity = `${ringCurrent.opacity}`;

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={nebulaRef}
        className="absolute right-[4%] top-[10%] size-[38rem] rounded-full blur-[110px] will-change-transform sm:right-[6%] sm:top-[8%] sm:size-[46rem]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.55) 0%, rgba(99,102,241,0.42) 38%, rgba(59,130,246,0.32) 62%, transparent 78%)",
        }}
      />

      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-20 rounded-full opacity-0 will-change-transform"
        style={{
          border: "1px solid rgba(199,184,255,0.55)",
          boxShadow:
            "0 0 50px 14px rgba(139,92,246,0.25), 0 0 18px 2px rgba(199,184,255,0.2)",
        }}
      />
    </div>
  );
}
