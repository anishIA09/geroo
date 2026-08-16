"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { DiyaArt, RangoliArt, WhatsAppIcon } from "@/components/art";
import { EASE } from "@/components/motion/primitives";
import { Chip, GhostLink, Magnetic, PrimaryLink } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

const HEADLINE: string[][] = [
  ["Hand-painted", "diyas"],
  ["that", "light", "up"],
  ["your", "celebrations."],
];

/** Words are masked by their wrapper and slide up into place. */
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

const softVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const artY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="grain relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Ambient background */}
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : glowY }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-deep to-cream" />
        <div className="animate-drift absolute -left-32 top-4 h-[34rem] w-[34rem] rounded-full bg-clay/12 blur-3xl" />
        <div className="animate-drift absolute -right-24 top-40 h-[30rem] w-[30rem] rounded-full bg-teal/22 blur-3xl [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
      </motion.div>

      {/* Slowly turning rangoli watermark */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-40 -top-24 -z-10 hidden w-[42rem] opacity-[0.09] lg:block"
      >
        <RangoliArt className="h-full w-full" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ── Copy ─────────────────────────────────────────── */}
        <motion.div
          style={{ y: reduce ? 0 : copyY }}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.075 } } }}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={softVariants} className="mb-6">
              <Chip className="bg-cream/80 backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay" />
                Handpainted at home since {site.since}
              </Chip>
            </motion.div>

            <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.2rem]">
              {HEADLINE.map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line.map((word) => {
                    const accent = word === "light" || word === "up";
                    return (
                      <span
                        key={word}
                        className="inline-block overflow-hidden pb-[0.12em] align-bottom"
                      >
                        <motion.span
                          variants={reduce ? softVariants : wordVariants}
                          className={
                            accent
                              ? "relative mr-[0.25em] inline-block text-clay"
                              : "mr-[0.25em] inline-block"
                          }
                        >
                          {word}
                          {word === "up" && (
                            <motion.svg
                              aria-hidden
                              viewBox="0 0 200 14"
                              preserveAspectRatio="none"
                              className="absolute -bottom-1 left-0 h-2.5 w-full text-teal-deep"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{
                                duration: 1,
                                delay: 1.05,
                                ease: EASE,
                              }}
                            >
                              <motion.path
                                d="M2 9 C50 2, 150 2, 198 7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                              />
                            </motion.svg>
                          )}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              variants={softVariants}
              className="mt-4 font-script text-2xl text-clay-deep/80 sm:text-3xl"
            >
              &ldquo;{site.tagline}&rdquo;
            </motion.p>

            <motion.p
              variants={softVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {site.meaning} Every diya and rangoli is painted by one pair of
              hands — washable, reusable, and made in the colours you ask for.
            </motion.p>

            <motion.div
              variants={softVariants}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <PrimaryLink
                  href={whatsappLink(
                    `Hi ${site.name}! I'd like to place an order.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow={false}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Order on WhatsApp
                </PrimaryLink>
              </Magnetic>
              <GhostLink href="#products" withArrow>
                Browse the collection
              </GhostLink>
            </motion.div>

            <motion.ul
              variants={softVariants}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-soft"
            >
              {[
                "100% hand-painted",
                "Washable & reusable",
                "Ships across India",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0 text-teal-deep"
                    aria-hidden
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <path
                      d="m6 10.4 2.6 2.6L14.2 7.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* ── Artwork ──────────────────────────────────────── */}
        <motion.div style={{ y: reduce ? 0 : artY }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative mx-auto max-w-lg"
          >
            {/* Glow behind the lamp */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
            />

            <motion.div
              animate={reduce ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <DiyaArt className="relative w-full drop-shadow-[0_28px_40px_rgba(123,52,16,0.24)]" />
            </motion.div>

            {/* Floating detail cards */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE }}
              className="absolute -left-2 bottom-4 sm:-left-6"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, 9, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="rounded-2xl border border-clay/12 bg-cream/90 px-4 py-3 shadow-[0_18px_40px_-22px_rgba(58,31,18,0.65)] backdrop-blur-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  Diyas from
                </p>
                <p className="font-display text-2xl font-semibold text-clay">
                  ₹80
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
              className="absolute -right-1 top-2 sm:-right-4"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -11, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 rounded-full border border-clay/12 bg-cream/90 px-4 py-2.5 shadow-[0_18px_40px_-22px_rgba(58,31,18,0.65)] backdrop-blur-sm"
              >
                <span className="flex -space-x-1.5">
                  {["bg-clay", "bg-teal-deep", "bg-gold", "bg-terracotta"].map(
                    (c) => (
                      <span
                        key={c}
                        className={`h-4 w-4 rounded-full ring-2 ring-cream ${c}`}
                      />
                    ),
                  )}
                </span>
                <span className="text-xs font-semibold text-ink">
                  Your colours
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: cueOpacity }}
        className="mt-14 hidden justify-center lg:flex"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-ink-soft/70"
        >
          Scroll
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-clay/25 p-1">
            <motion.span
              animate={
                reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-clay"
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
