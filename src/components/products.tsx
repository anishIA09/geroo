"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ProductArt } from "@/components/art";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Chip, GhostLink, SectionLabel } from "@/components/ui";
import { orderSteps, products, whatsappLink, type Product } from "@/lib/site";

const SPRING = { stiffness: 220, damping: 20, mass: 0.5 };

/** Card that tips toward the pointer and carries a light glare with it. */
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), SPRING);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgba(255,255,255,0.6), transparent 62%)`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", ...SPRING }}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }
      }
      className={className}
    >
      {children}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { backgroundImage: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <TiltCard className="group relative h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-clay/12 bg-cream shadow-[0_20px_50px_-34px_rgba(58,31,18,0.7)] transition-[border-color,box-shadow] duration-400 group-hover:border-clay/30 group-hover:shadow-[0_34px_70px_-34px_rgba(123,52,16,0.6)]">
        {/* Art panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-sand via-cream-deep to-sand px-6 pt-8 pb-6">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-2xl transition-all duration-500 group-hover:h-52 group-hover:w-52 group-hover:bg-gold/35"
          />
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ transform: "translateZ(40px)" }}
            className="relative mx-auto flex h-40 items-center justify-center"
          >
            <ProductArt art={product.art} className="h-full w-auto max-w-full" />
          </motion.div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
          <p className="text-sm leading-relaxed text-ink-soft">{product.blurb}</p>

          <div className="mt-1 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Chip key={tag} className="border-clay/15 bg-sand/70 px-2.5 py-0.5 text-[10px]">
                {tag}
              </Chip>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-clay/10 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                Price
              </p>
              <p className="font-display text-lg font-semibold text-clay">{product.price}</p>
            </div>
            <a
              href={whatsappLink(product.enquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 rounded-full bg-sand px-4 py-2 text-xs font-semibold text-clay-deep transition-colors duration-300 hover:bg-clay hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              Enquire
              <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function Products() {
  return (
    <section id="products" className="relative scroll-mt-24 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-sand/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
              Small pieces,{" "}
              <span className="relative inline-block text-clay">
                painted slowly
                <span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-teal/40" />
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Festive, abstract or dotted — in acrylic, on clay and MDF. Machine-made décor is
              uniform; these are not, and that is exactly the point.
            </p>
          </Reveal>

          <Reveal delay={0.15} direction="left">
            <GhostLink href="#story" withArrow>
              The story behind them
            </GhostLink>
          </Reveal>
        </div>

        {/* Cards */}
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" gap={0.1}>
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* How to order */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-clay/12 bg-gradient-to-br from-sand via-cream-deep to-sand p-8 sm:p-12">
          <span
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/20 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-clay/12 blur-3xl"
          />

          <Reveal className="relative">
            <SectionLabel>How to order</SectionLabel>
            <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold text-ink sm:text-3xl">
              Three messages and it&rsquo;s on its way.
            </h3>
          </Reveal>

          <Stagger className="relative mt-10 grid gap-8 md:grid-cols-3" gap={0.12}>
            {orderSteps.map((step, index) => (
              <StaggerItem key={step.step}>
                <div className="group relative">
                  {/* Connector */}
                  {index < orderSteps.length - 1 && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 + index * 0.15, ease: EASE }}
                      className="absolute left-14 top-6 hidden h-px w-[calc(100%-2.5rem)] origin-left bg-clay/25 md:block"
                    />
                  )}
                  <motion.span
                    whileHover={{ rotate: -8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 320, damping: 14 }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-clay font-display text-lg font-semibold text-cream shadow-[0_12px_28px_-14px_rgba(123,52,16,0.9)]"
                  >
                    {step.step}
                  </motion.span>
                  <h4 className="mt-5 font-display text-lg font-semibold text-ink">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
