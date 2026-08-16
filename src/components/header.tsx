"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { WhatsAppIcon } from "@/components/art";
import { EASE } from "@/components/motion/primitives";
import { cn } from "@/lib/cn";
import { navLinks, site, whatsappLink } from "@/lib/site";

/** Highlights the nav item whose section currently owns the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-gradient-to-r from-clay via-gold to-teal-deep"
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // A drawer that stays open while the page scrolls behind it feels broken.
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-clay/12 bg-cream/85 shadow-[0_10px_40px_-24px_rgba(58,31,18,0.5)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a
            href="#home"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
            aria-label={`${site.name} — home`}
          >
            <motion.span
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
              className="relative block h-11 w-11 shrink-0 sm:h-12 sm:w-12"
            >
              <Image
                src="/geroo-logo.png"
                alt=""
                fill
                sizes="48px"
                priority
                className="logo-blend object-contain"
              />
            </motion.span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-tight text-clay-deep sm:text-2xl">
                {site.name}
                <span className="text-xs"> by Archana</span>
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                Since {site.since}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
                      isActive
                        ? "text-clay-deep"
                        : "text-ink-soft hover:text-clay",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-sand"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={whatsappLink(
                `Hi ${site.name}! I'd like to place an order.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_24px_-10px_rgba(123,52,16,0.9)] transition-colors hover:bg-clay-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay-deep sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </motion.a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-clay/20 bg-cream/70 text-clay-deep transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  animate={
                    menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-0 top-0 h-0.5 w-5 rounded bg-current"
                />
                <motion.span
                  animate={
                    menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current"
                />
                <motion.span
                  animate={
                    menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current"
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-b border-clay/12 bg-cream/97 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
              className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: EASE },
                    },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 font-display text-lg transition-colors",
                      active === link.href
                        ? "bg-sand text-clay-deep"
                        : "text-ink hover:bg-sand/60 hover:text-clay",
                    )}
                  >
                    {link.label}
                    <span aria-hidden className="text-clay/50">
                      &rarr;
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: EASE },
                  },
                }}
                className="mt-2 sm:hidden"
              >
                <a
                  href={whatsappLink(
                    `Hi ${site.name}! I'd like to place an order.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-clay px-5 py-3.5 text-sm font-semibold text-cream"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
