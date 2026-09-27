"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

interface ActiveIndicatorProps {
  layoutId: string;
  className?: string;
}

/**
 * Render inside the currently-active item of a tab/nav group (the item
 * needs `position: relative`). Framer Motion animates it sliding between
 * items whenever a different sibling mounts it with the same layoutId.
 */
export default function ActiveIndicator({ layoutId, className }: ActiveIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={layoutId}
      className={className ?? "absolute inset-0 bg-accent rounded-full"}
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}
