"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type Tag = keyof typeof motionTags;

interface RevealTextProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
}

const wordVariants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.55, ease } },
};

/**
 * Scroll-triggered reveal. Plain string children stagger word-by-word;
 * rich JSX children (line breaks, nested spans) reveal as one masked block
 * so arbitrary markup never has to be split apart.
 */
export default function RevealText({ children, as = "div", className, delay = 0 }: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motionTags[as];
  const StaticTag = as;

  if (prefersReducedMotion) {
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.035, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-top">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  return (
    <div className="overflow-hidden">
      <MotionTag
        className={className}
        initial={{ opacity: 0, y: "45%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </MotionTag>
    </div>
  );
}
