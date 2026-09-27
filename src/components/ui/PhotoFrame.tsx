import Image from "next/image";
import { ReactNode } from "react";

interface PhotoFrameProps {
  src: string;
  alt: string;
  rotate?: "none" | "left" | "right";
  watermark?: ReactNode;
  badges?: ReactNode[];
  width?: number;
  height?: number;
  priority?: boolean;
}

const rotateClass: Record<NonNullable<PhotoFrameProps["rotate"]>, string> = {
  none: "",
  left: "-rotate-3 group-hover:rotate-0",
  right: "rotate-2 group-hover:rotate-0",
};

/**
 * Shared glassmorphic photo frame: ambient aurora glow, animated conic
 * ring on hover, and a foreground glass panel. Callers supply their own
 * already-positioned floating badges/watermark so each section keeps its
 * own content.
 */
export default function PhotoFrame({
  src,
  alt,
  rotate = "none",
  watermark,
  badges = [],
  width = 680,
  height = 850,
  priority = false,
}: PhotoFrameProps) {
  return (
    <div className="relative w-full group">
      <div className="absolute -inset-3 bg-gradient-to-tr from-accent/30 via-accent-2/15 to-transparent rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

      <div
        aria-hidden="true"
        className="absolute -inset-[3px] rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-safe:animate-spin-slower pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, rgb(var(--accent-rgb) / 0.6), transparent 25%, rgb(var(--accent-2-rgb) / 0.6), transparent 75%, rgb(var(--accent-rgb) / 0.6))",
        }}
      />

      <div
        className={`relative rounded-[2rem] p-3.5 sm:p-4 bg-dark-2/90 backdrop-blur-xl border border-dark-4 group-hover:border-accent/40 transform transition-all duration-500 ease-out shadow-2xl overflow-hidden ${rotateClass[rotate]}`}
      >
        {watermark}

        <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-dark-3">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-full object-cover object-top filter contrast-[1.04] saturate-[1.04] transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />
        </div>

        {badges.map((badge, i) => (
          <div key={i}>{badge}</div>
        ))}
      </div>
    </div>
  );
}
