/**
 * Single source of truth for everything on the landing page.
 *
 * ── FILL THESE IN ─────────────────────────────────────────────
 * The brand questionnaire listed a few details as "still required".
 * They are marked `TODO` below — edit them here and the whole page updates.
 */

export const site = {
  name: "Geroo",
  since: 2001,
  tagline: "Art that lights up your celebrations.",
  meaning:
    "Geroo is the warm brown-red earth colour laid on the floor at Diwali the canvas a rangoli is drawn upon.",
  city: "India", // TODO: the city the studio is based in
  description:
    "Hand-painted clay diyas and MDF rangoli, made one piece at a time in a home studio since 2001. Washable, reusable and endlessly customisable.",
} as const;

export const contact = {
  /** TODO: replace with the real number, country code first, digits only. */
  whatsappNumber: "919004610001",
  /** TODO: replace with the real handle. */
  instagramHandle: "geroo_by_archana",
  instagramUrl: "https://instagram.com/geroo_by_archana",
} as const;

/** Builds a wa.me deep link with the message pre-typed for the customer. */
export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Why Geroo", href: "#values" },
] as const;

export type Product = {
  id: string;
  art: "diya" | "samai" | "rangoli" | "custom";
  name: string;
  blurb: string;
  price: string;
  tags: readonly string[];
  enquiry: string;
};

export const products: readonly Product[] = [
  {
    id: "diyas",
    art: "diya",
    name: "Hand-Painted Diyas",
    blurb:
      "Classic clay diyas finished in acrylic festive motifs, abstract strokes and dotted work, no two exactly alike.",
    price: "₹80 – ₹100",
    tags: ["Clay", "Acrylic", "Washable"],
    enquiry:
      "Hi Geroo! I'd like to know more about your hand-painted clay diyas.",
  },
  {
    id: "samai",
    art: "samai",
    name: "Samai",
    blurb:
      "Statement standing lamps for the entrance, the pooja corner or the centre of a celebration table.",
    price: "up to ₹300",
    tags: ["Standing", "Statement", "Reusable"],
    enquiry: "Hi Geroo! I'd like to know more about your samai.",
  },
  {
    id: "rangoli",
    art: "rangoli",
    name: "MDF Rangoli",
    blurb:
      "Ready-to-place rangoli boards, handpainted in layers. Lay them out in a minute, wipe them clean, use them every year.",
    price: "On request",
    tags: ["MDF", "Reusable", "Wipe clean"],
    enquiry: "Hi Geroo! I'd like to know more about your MDF rangoli designs.",
  },
  {
    id: "custom",
    art: "custom",
    name: "Custom & Bulk Orders",
    blurb:
      "Weddings, return gifts and corporate hampers pick your colours, your motifs and your quantity.",
    price: "Let's talk",
    tags: ["Weddings", "Return gifts", "Corporate"],
    enquiry:
      "Hi Geroo! I have a custom / bulk requirement and would like to discuss designs and quantities.",
  },
] as const;

export const orderSteps = [
  {
    step: "01",
    title: "Say hello on WhatsApp",
    body: "Tell us the occasion, the quantity and roughly what you have in mind.",
  },
  {
    step: "02",
    title: "Pick colours & designs",
    body: "We share options, agree on the palette and confirm the final piece count.",
  },
  {
    step: "03",
    title: "Painted & packed",
    body: "Each piece is handpainted, left to cure, then carefully packed and shipped across India.",
  },
] as const;

export const values = [
  {
    icon: "brush",
    title: "Craftsmanship",
    body: "Every single piece is painted by hand never printed, never machine-stamped.",
  },
  {
    icon: "palette",
    title: "Creativity",
    body: "Festive, abstract or dotted. Colour combinations are explored, not repeated.",
  },
  {
    icon: "tag",
    title: "Affordability",
    body: "Beautiful festive décor without an unnecessarily high price tag.",
  },
  {
    icon: "flame",
    title: "Tradition",
    body: "Keeping the warmth of traditional Indian festive décor alive, year after year.",
  },
  {
    icon: "droplet",
    title: "Reusability",
    body: "Washable finishes, so the same diyas come back out every Diwali.",
  },
  {
    icon: "heart",
    title: "Personalisation",
    body: "Most orders can be tailored to your colours, motifs and quantities.",
  },
] as const;

export const stats = [
  { value: 2001, suffix: "", label: "Painting since" },
  { value: 100, suffix: "%", label: "Hand-painted" },
  { value: 1, suffix: "", label: "Pair of hands" },
] as const;
