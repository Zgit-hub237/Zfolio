"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a card with a cursor-following glow and a subtle hover lift.
 * Pure CSS custom-property update on mousemove — no motion loop, so it's
 * inert (not just invisible) on touch and under prefers-reduced-motion.
 */
export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative isolate transition-transform duration-300 motion-safe:hover:-translate-y-0.5 ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: "radial-gradient(240px circle at var(--mx) var(--my), rgba(46,204,113,0.14), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
