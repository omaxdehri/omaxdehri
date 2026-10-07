"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ComponentProps } from "react";

/* ---------- Fade-up on scroll ---------- */
export function FadeUp({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const shouldReduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ---------- Stagger container ---------- */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduce ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger child (use inside StaggerContainer) ---------- */
export function StaggerChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={
        shouldReduce
          ? { hidden: {}, visible: {} }
          : {
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Animated CTA button ---------- */
export function AnimatedButton({
  children,
  className = "",
  ...props
}: ComponentProps<typeof motion.a>) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      whileHover={shouldReduce ? {} : { scale: 1.03 }}
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/* ---------- Animated button (native button element) ---------- */
export function AnimatedButtonEl({
  children,
  className = "",
  ...props
}: ComponentProps<typeof motion.button>) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.button
      whileHover={shouldReduce ? {} : { scale: 1.03 }}
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
