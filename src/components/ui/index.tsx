"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Nudges its child toward the cursor, then springs back on exit. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

const ARROW = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type LinkProps = ComponentProps<"a"> & { children: ReactNode; withArrow?: boolean };

/** Filled clay CTA with a light sweep and a nudging arrow. */
export function PrimaryLink({ children, className, withArrow = true, ...rest }: LinkProps) {
  return (
    <a
      {...rest}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full",
        "bg-clay px-7 py-3.5 text-sm font-semibold tracking-wide text-cream",
        "shadow-[0_10px_30px_-12px_rgba(123,52,16,0.85)] transition-all duration-300",
        "hover:bg-clay-deep hover:shadow-[0_16px_40px_-12px_rgba(123,52,16,0.9)]",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay-deep",
        "active:scale-[0.97]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      {withArrow && (
        <span className="relative transition-transform duration-300 group-hover:translate-x-1">
          {ARROW}
        </span>
      )}
    </a>
  );
}

/** Outlined companion CTA. */
export function GhostLink({ children, className, withArrow = false, ...rest }: LinkProps) {
  return (
    <a
      {...rest}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-clay/30 bg-cream/60 px-7 py-3.5",
        "text-sm font-semibold tracking-wide text-clay-deep backdrop-blur-sm transition-all duration-300",
        "hover:border-clay/70 hover:bg-sand hover:text-clay",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay-deep",
        "active:scale-[0.97]",
        className,
      )}
    >
      {children}
      {withArrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{ARROW}</span>
      )}
    </a>
  );
}

/** Small pill used for eyebrows and product tags. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-clay/20 bg-cream/70 px-3 py-1",
        "text-[11px] font-semibold uppercase tracking-[0.14em] text-clay-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Section label: a short rule followed by small caps. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-clay">
      <span aria-hidden className="h-px w-8 bg-clay/50" />
      {children}
    </span>
  );
}
