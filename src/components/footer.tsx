"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { InstagramIcon, RangoliArt, WhatsAppIcon } from "@/components/art";
import { Reveal } from "@/components/motion/primitives";
import { Magnetic } from "@/components/ui";
import { contact, navLinks, products, site, whatsappLink } from "@/lib/site";

/** Footer link with an underline that sweeps in from the left. */
function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1.5 py-1 text-sm text-cream/70 transition-colors duration-300 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
      <span
        aria-hidden
        className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        &rarr;
      </span>
    </a>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8">
      {/* ── Closing CTA ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-clay-deep px-8 py-14 text-center sm:px-14 sm:py-20">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -left-32 -top-40 w-[36rem] opacity-[0.08]"
            >
              <RangoliArt className="h-full w-full" />
            </motion.div>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="font-script text-2xl text-gold sm:text-3xl">
                Let&rsquo;s make something
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
                Tell us the occasion. We&rsquo;ll paint the rest.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70">
                Diwali, a wedding, return gifts or a corporate hamper send a
                message and we&rsquo;ll take it from there.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <a
                    href={whatsappLink(
                      `Hi ${site.name}! I'd like to place an order.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-clay-deep shadow-[0_14px_36px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold active:scale-[0.98]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-clay/12 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <WhatsAppIcon className="relative h-4 w-4" />
                    <span className="relative">Message us on WhatsApp</span>
                  </a>
                </Magnetic>

                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors duration-300 hover:border-cream/60 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                >
                  <InstagramIcon className="h-4 w-4" />
                  See the latest work
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Footer proper ─────────────────────────────────── */}
      <div className="mt-16 bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream p-1">
                  <Image
                    src="/geroo-logo.png"
                    alt=""
                    width={112}
                    height={112}
                    className="logo-blend h-full w-full object-contain"
                  />
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold text-cream">
                    {site.name}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-cream/50">
                    Since {site.since}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
                {site.meaning}
              </p>

              <div className="mt-6 flex gap-2.5">
                {[
                  {
                    href: whatsappLink(`Hi ${site.name}!`),
                    label: "WhatsApp",
                    icon: <WhatsAppIcon className="h-5 w-5" />,
                  },
                  {
                    href: contact.instagramUrl,
                    label: "Instagram",
                    icon: <InstagramIcon className="h-5 w-5" />,
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-colors hover:border-gold/60 hover:bg-gold/15 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <nav aria-label="Quick links">
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="#products">How to Order</FooterLink>
                </li>
              </ul>
            </nav>

            {/* Products */}
            <nav aria-label="Products">
              <ColumnHeading>Products</ColumnHeading>
              <ul className="flex flex-col gap-0.5">
                {products.map((product) => (
                  <li key={product.id}>
                    <FooterLink href={whatsappLink(product.enquiry)} external>
                      {product.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <ColumnHeading>Get in touch</ColumnHeading>
              <ul className="flex flex-col gap-2 text-sm text-cream/70">
                <li>
                  <FooterLink href={whatsappLink(`Hi ${site.name}!`)} external>
                    Order on WhatsApp
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={contact.instagramUrl} external>
                    @{contact.instagramHandle}
                  </FooterLink>
                </li>
                <li className="pt-2 text-cream/50">
                  Home studio &middot; {site.city}
                  <br />
                  Shipping pan-India
                </li>
              </ul>

              <p className="mt-6 font-script text-xl text-gold/90">
                &ldquo;{site.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/45 sm:flex-row">
            <p>
              &copy; {site.since}&ndash;{new Date().getFullYear()} {site.name}.
              All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Hand-painted with
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-clay-soft"
              >
                &hearts;
              </motion.span>
              in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
