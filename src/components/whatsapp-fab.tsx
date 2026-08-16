"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { WhatsAppIcon } from "@/components/art";
import { EASE } from "@/components/motion/primitives";
import { site, whatsappLink } from "@/lib/site";

/** Floating order button — stays out of the way until the hero is behind you. */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 520));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink(`Hi ${site.name}! I'd like to place an order.`)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-clay py-4 pl-4 pr-4 text-cream shadow-[0_18px_44px_-16px_rgba(123,52,16,0.95)] transition-[padding] duration-400 hover:bg-clay-deep hover:pr-6 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay-deep sm:bottom-8 sm:right-8"
          aria-label="Order on WhatsApp"
        >
          {/* Pulse ring */}
          {!reduce && (
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-clay"
            />
          )}
          <WhatsAppIcon className="relative h-6 w-6 shrink-0" />
          <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-400 group-hover:ml-2.5 group-hover:max-w-[10rem] group-hover:opacity-100">
            Order on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
