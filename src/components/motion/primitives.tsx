"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing so every section decelerates the same way. */
export const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
};

/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
}: RevealProps) {
  const reduce = useReducedMotion();
  const base = OFFSETS[direction];
  const scale = distance === undefined ? 1 : distance / 30;
  const from = reduce ? OFFSETS.none : { x: base.x * scale, y: base.y * scale };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that releases its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const staticVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? staticVariants : itemVariants}>
      {children}
    </motion.div>
  );
}
