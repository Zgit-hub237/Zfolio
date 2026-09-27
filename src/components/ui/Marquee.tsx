"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Infinite horizontal ticker, pauses on hover. Falls back to a plain
 * wrapped row under prefers-reduced-motion.
 */
export default function Marquee({ children, className }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>{children}</div>;
  }

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max items-center gap-2 animate-marquee hover:[animation-play-state:paused] ${className ?? ""}`}>
        {children}
        {children}
      </div>
    </div>
  );
}
