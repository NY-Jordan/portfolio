"use client";

import { useEffect, useRef } from "react";

interface ShapeConfig {
  size: number;
  color: string;
  type: "circle" | "square" | "triangle";
}

interface Shape extends ShapeConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const COLORS = ["#8b5cf6", "#22d3ee", "#f472b6", "#fb923c", "#34d399", "#60a5fa"];
const SHAPE_TYPES: ShapeConfig["type"][] = ["circle", "square", "triangle"];
const SHAPE_COUNT = 12;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomVelocity() {
  const speed = randomBetween(0.3, 0.7);
  const direction = Math.random() < 0.5 ? -1 : 1;
  return speed * direction;
}

function applyShapeStyle(el: HTMLDivElement, config: ShapeConfig) {
  el.style.width = `${config.size}px`;
  el.style.height = `${config.size}px`;
  el.style.opacity = "0.6";
  el.style.background = config.color;
  el.style.boxShadow = `0 0 18px ${config.color}66`;
  el.style.borderRadius =
    config.type === "circle" ? "9999px" : config.type === "square" ? "6px" : "0";
  el.style.clipPath =
    config.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "";
}

export function BouncingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeElsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let width = container.clientWidth;
    let height = container.clientHeight;

    const shapes: Shape[] = shapeElsRef.current.map((el) => {
      const config: ShapeConfig = {
        size: randomBetween(14, 38),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      };
      if (el) applyShapeStyle(el, config);

      return {
        ...config,
        x: randomBetween(config.size, Math.max(width - config.size, config.size)),
        y: randomBetween(config.size, Math.max(height - config.size, config.size)),
        vx: randomVelocity(),
        vy: randomVelocity(),
      };
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    });
    resizeObserver.observe(container);

    let frameId: number;

    const tick = () => {
      for (const shape of shapes) {
        shape.x += shape.vx;
        shape.y += shape.vy;

        const r = shape.size / 2;
        if (shape.x - r < 0) {
          shape.x = r;
          shape.vx = Math.abs(shape.vx);
        } else if (shape.x + r > width) {
          shape.x = width - r;
          shape.vx = -Math.abs(shape.vx);
        }
        if (shape.y - r < 0) {
          shape.y = r;
          shape.vy = Math.abs(shape.vy);
        } else if (shape.y + r > height) {
          shape.y = height - r;
          shape.vy = -Math.abs(shape.vy);
        }
      }

      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const a = shapes[i];
          const b = shapes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const minDist = (a.size + b.size) / 2;

          if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            a.x -= (nx * overlap) / 2;
            a.y -= (ny * overlap) / 2;
            b.x += (nx * overlap) / 2;
            b.y += (ny * overlap) / 2;

            const relVx = b.vx - a.vx;
            const relVy = b.vy - a.vy;
            const relSpeed = relVx * nx + relVy * ny;

            if (relSpeed < 0) {
              a.vx += relSpeed * nx;
              a.vy += relSpeed * ny;
              b.vx -= relSpeed * nx;
              b.vy -= relSpeed * ny;
            }
          }
        }
      }

      shapes.forEach((shape, index) => {
        const el = shapeElsRef.current[index];
        if (el) {
          el.style.transform = `translate3d(${shape.x - shape.size / 2}px, ${shape.y - shape.size / 2}px, 0)`;
        }
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {Array.from({ length: SHAPE_COUNT }, (_, index) => (
        <div
          key={index}
          ref={(el) => {
            shapeElsRef.current[index] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
        />
      ))}
    </div>
  );
}
