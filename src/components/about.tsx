"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { RangoliArt, SamaiArt, ValueIcon } from "@/components/art";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Chip, SectionLabel } from "@/components/ui";
import { site, stats, values } from "@/lib/site";

/** Counts up once, the first time it scrolls into view. */
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduce) {
      node.textContent = String(value);
      return;
    }

    // Years look wrong counting from zero — start just below instead.
    const from = value > 1900 ? value - 24 : 0;
    const controls = animate(from, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>{value > 1900 ? value - 24 : 0}</span>
      {suffix}
    </span>
  );
}

export function About() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ── Story ─────────────────────────────────────────── */}
      <section id="story" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Art collage */}
          <Reveal direction="right" className="relative">
            <div className="grain relative aspect-square overflow-hidden rounded-[2.5rem] border border-clay/12 bg-gradient-to-br from-sand via-cream to-cream-deep">
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute -right-24 -top-24 w-[28rem] opacity-20"
              >
                <RangoliArt className="h-full w-full" />
              </motion.div>

              <motion.div
                aria-hidden
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-8 w-48 opacity-90 sm:w-56"
              >
                <SamaiArt className="h-full w-full drop-shadow-[0_20px_30px_rgba(123,52,16,0.2)]" />
              </motion.div>

              {/* Logo stamp */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: 2 }}
                className="absolute right-6 top-1/2 w-44 -translate-y-1/2 sm:right-10 sm:w-56"
              >
                <Image
                  src="/geroo-logo.jpg"
                  alt={`${site.name} logo`}
                  width={560}
                  height={560}
                  className="logo-blend h-auto w-full"
                />
              </motion.div>

              <span className="absolute bottom-6 right-6 font-script text-2xl text-clay-deep/70 sm:text-3xl">
                since {site.since}
              </span>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-4 left-6 rotate-[-6deg] rounded-2xl border border-clay/15 bg-cream px-4 py-2.5 shadow-[0_16px_36px_-20px_rgba(58,31,18,0.7)]"
            >
              <p className="font-script text-xl text-clay">one pair of hands</p>
            </motion.div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <SectionLabel>About us</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
                From a creative hobby to a{" "}
                <span className="text-clay">tradition of its own</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                <p>
                  {site.name} began in {site.since} as a creative hobby — a way to spend time doing
                  something she loved. That craftsmanship and love for making art gradually turned
                  the hobby into a venture of its own.
                </p>
                <p>
                  At the heart of it is a simple belief: handmade pieces have a charm of their own.
                  Machine-made diyas offer perfect uniformity. {site.name} celebrates the character,
                  the brush marks and the personal touch that only hand-painted art carries.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="mt-8 border-l-2 border-clay/40 pl-5">
                <p className="font-script text-2xl leading-snug text-clay-deep sm:text-3xl">
                  &ldquo;Hand-painted. Made with love. Meant to be reused.&rdquo;
                </p>
              </blockquote>
            </Reveal>

            {/* Stats */}
            <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4" gap={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <p className="font-display text-3xl font-semibold text-clay sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
                    {stat.label}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section id="values" className="relative scroll-mt-24 py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sand/45 to-transparent"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <SectionLabel>Why Geroo</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
              Six reasons these come back out every year
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {values.map((value) => (
              <StaggerItem key={value.title} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-clay/12 bg-cream p-6 transition-[border-color,box-shadow] duration-400 hover:border-clay/30 hover:shadow-[0_28px_60px_-38px_rgba(123,52,16,0.7)]"
                >
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal/0 blur-2xl transition-colors duration-500 group-hover:bg-teal/30"
                  />
                  <motion.span
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 13 }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-cream"
                  >
                    <ValueIcon name={value.icon} className="h-6 w-6" />
                  </motion.span>
                  <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{value.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap justify-center gap-2">
            {["Individual shoppers", "Families", "Weddings & events", "Return gifts", "Corporate gifting", "Bulk orders"].map(
              (audience) => (
                <Chip key={audience} className="bg-cream">
                  {audience}
                </Chip>
              ),
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
