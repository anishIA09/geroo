"use client";

import { useId } from "react";

/**
 * Hand-drawn SVG stand-ins for the product photography.
 * Swap these for real photos once shoot files are available — every card
 * renders whatever <ProductArt> returns, so only this file needs to change.
 */

const CLAY = "#9c4019";
const CLAY_DEEP = "#7b3410";
const CLAY_LIGHT = "#c4703f";
const TEAL = "#7fcfcf";
const TEAL_DEEP = "#2f8f91";
const GOLD = "#e0a33f";
const CREAM = "#fdf7ef";
const INK = "#3a1f12";

/** Teardrop flame with a soft halo. Flicker comes from the CSS keyframes. */
function Flame({ scale = 1, animate = true }: { scale?: number; animate?: boolean }) {
  const id = useId();
  return (
    <g transform={`scale(${scale})`}>
      <circle r="30" cy="-18" fill={`url(#${id}-glow)`} />
      <g
        className={animate ? "animate-flicker" : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
      >
        <path
          d="M0 0 C-10 -11 -9 -26 0 -40 C9 -26 10 -11 0 0 Z"
          fill={`url(#${id}-flame)`}
        />
        <path d="M0 -3 C-4.5 -9 -4.5 -18 0 -26 C4.5 -18 4.5 -9 0 -3 Z" fill={CREAM} opacity="0.85" />
      </g>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e2621f" />
          <stop offset="55%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#ffe6a3" />
        </linearGradient>
      </defs>
    </g>
  );
}

/** A single painted clay diya, three-quarter view. */
export function DiyaArt({ className, animate = true }: { className?: string; animate?: boolean }) {
  const id = useId();
  const dots = Array.from({ length: 9 }, (_, i) => 48 + i * 20);

  return (
    <svg viewBox="0 0 280 200" className={className} role="img" aria-label="Hand-painted clay diya">
      <defs>
        <linearGradient id={`${id}-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CLAY_LIGHT} />
          <stop offset="55%" stopColor={CLAY} />
          <stop offset="100%" stopColor={CLAY_DEEP} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M36 88 C36 132 82 160 140 160 C198 160 244 132 244 88 Z" />
        </clipPath>
      </defs>

      <ellipse cx="140" cy="168" rx="92" ry="11" fill={INK} opacity="0.1" />

      {/* Bowl */}
      <path
        d="M36 88 C36 132 82 160 140 160 C198 160 244 132 244 88 Z"
        fill={`url(#${id}-bowl)`}
      />

      {/* Painted decoration, kept inside the bowl silhouette */}
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M20 112 C70 128 210 128 260 112 L260 122 C210 138 70 138 20 122 Z" fill={CREAM} opacity="0.92" />
        {dots.map((x) => (
          <circle key={x} cx={x} cy="117" r="3.4" fill={TEAL_DEEP} />
        ))}
        {dots.slice(0, 8).map((x) => (
          <circle key={`u-${x}`} cx={x + 10} cy="100" r="4.6" fill={TEAL} opacity="0.9" />
        ))}
        {dots.slice(1, 8).map((x) => (
          <circle key={`d-${x}`} cx={x} cy="140" r="3" fill={GOLD} opacity="0.95" />
        ))}
      </g>

      {/* Spout pinch */}
      <path d="M226 76 L272 66 L236 104 Z" fill={CLAY} />
      <path d="M226 76 L272 66 L244 82 Z" fill={CLAY_LIGHT} opacity="0.7" />

      {/* Rim */}
      <ellipse cx="140" cy="88" rx="104" ry="26" fill={CLAY_DEEP} />
      <ellipse cx="140" cy="88" rx="104" ry="26" fill="none" stroke={CREAM} strokeWidth="2.5" opacity="0.5" />
      <ellipse cx="140" cy="90" rx="88" ry="19" fill="#5d2609" />
      <ellipse cx="140" cy="92" rx="78" ry="15" fill={GOLD} opacity="0.28" />

      {/* Wick + flame */}
      <path d="M240 78 L252 66" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <g transform="translate(254 62)">
        <Flame scale={0.95} animate={animate} />
      </g>
    </svg>
  );
}

/** Tall standing samai lamp. */
export function SamaiArt({ className, animate = true }: { className?: string; animate?: boolean }) {
  const id = useId();

  return (
    <svg viewBox="0 0 280 280" className={className} role="img" aria-label="Hand-painted samai lamp">
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CLAY_DEEP} />
          <stop offset="42%" stopColor={CLAY_LIGHT} />
          <stop offset="100%" stopColor={CLAY} />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="256" rx="76" ry="10" fill={INK} opacity="0.1" />

      {/* Tiered base */}
      <ellipse cx="140" cy="246" rx="70" ry="15" fill={CLAY_DEEP} />
      <ellipse cx="140" cy="240" rx="70" ry="15" fill={`url(#${id}-metal)`} />
      <ellipse cx="140" cy="228" rx="52" ry="12" fill={CLAY_DEEP} />
      <ellipse cx="140" cy="223" rx="52" ry="12" fill={`url(#${id}-metal)`} />
      <ellipse cx="140" cy="213" rx="34" ry="8" fill={CLAY} />

      {/* Stem with a mid knob */}
      <path d="M128 120 C124 160 124 186 130 212 L150 212 C156 186 156 160 152 120 Z" fill={`url(#${id}-metal)`} />
      <ellipse cx="140" cy="170" rx="24" ry="13" fill={CLAY_DEEP} />
      <ellipse cx="140" cy="166" rx="24" ry="13" fill={`url(#${id}-metal)`} />
      <ellipse cx="140" cy="166" rx="24" ry="13" fill="none" stroke={TEAL} strokeWidth="2.5" opacity="0.85" />
      <circle cx="140" cy="196" r="4" fill={TEAL} />
      <circle cx="140" cy="140" r="4" fill={GOLD} />

      {/* Top bowl */}
      <path d="M84 112 C84 132 108 144 140 144 C172 144 196 132 196 112 Z" fill={`url(#${id}-metal)`} />
      <path d="M186 104 L224 96 L196 124 Z" fill={CLAY} />
      <ellipse cx="140" cy="110" rx="60" ry="16" fill={CLAY_DEEP} />
      <ellipse cx="140" cy="110" rx="60" ry="16" fill="none" stroke={CREAM} strokeWidth="2.5" opacity="0.5" />
      <ellipse cx="140" cy="112" rx="48" ry="11" fill="#5d2609" />
      <ellipse cx="140" cy="113" rx="40" ry="8" fill={GOLD} opacity="0.3" />

      {/* Painted dots on the base tiers */}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={86 + i * 15.5} cy="240" r="3.2" fill={CREAM} opacity="0.9" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={`t-${i}`} cx={100 + i * 16} cy="223" r="2.8" fill={TEAL} />
      ))}

      <path d="M200 100 L214 88" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <g transform="translate(216 84)">
        <Flame scale={0.9} animate={animate} />
      </g>
    </svg>
  );
}

/** Concentric MDF rangoli board. */
export function RangoliArt({ className }: { className?: string }) {
  const id = useId();
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const outer = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg viewBox="0 0 280 280" className={className} role="img" aria-label="Hand-painted MDF rangoli">
      <defs>
        <radialGradient id={`${id}-board`}>
          <stop offset="0%" stopColor="#f7e3c9" />
          <stop offset="100%" stopColor="#e3c8a6" />
        </radialGradient>
      </defs>

      <ellipse cx="140" cy="262" rx="96" ry="10" fill={INK} opacity="0.08" />

      {/* MDF disc */}
      <circle cx="140" cy="140" r="126" fill={`url(#${id}-board)`} />
      <circle cx="140" cy="140" r="126" fill="none" stroke={CLAY_DEEP} strokeWidth="4" />

      <g transform="translate(140 140)">
        {/* Outer teardrop ring */}
        {outer.map((a) => (
          <g key={`o-${a}`} transform={`rotate(${a})`}>
            <path d="M0 -118 C-6 -108 -6 -98 0 -92 C6 -98 6 -108 0 -118 Z" fill={CLAY} />
          </g>
        ))}

        <circle r="88" fill="none" stroke={TEAL_DEEP} strokeWidth="3" />
        <circle r="80" fill="none" stroke={CLAY_DEEP} strokeWidth="1.5" strokeDasharray="3 7" />

        {/* Petals */}
        {petals.map((a, i) => (
          <g key={`p-${a}`} transform={`rotate(${a})`}>
            <path
              d="M0 -78 C-22 -56 -22 -28 0 -12 C22 -28 22 -56 0 -78 Z"
              fill={i % 2 === 0 ? CLAY : TEAL_DEEP}
              opacity={i % 2 === 0 ? 0.95 : 0.85}
            />
            <path
              d="M0 -66 C-11 -52 -11 -32 0 -22 C11 -32 11 -52 0 -66 Z"
              fill={i % 2 === 0 ? GOLD : TEAL}
              opacity="0.9"
            />
            <circle cy="-88" r="4.5" fill={GOLD} />
          </g>
        ))}

        {/* Core */}
        <circle r="26" fill={CLAY_DEEP} />
        <circle r="18" fill={GOLD} />
        <circle r="9" fill={CREAM} />
        {petals.map((a) => (
          <g key={`c-${a}`} transform={`rotate(${a})`}>
            <circle cy="-34" r="3" fill={CREAM} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Palette + brush, for the custom / bulk card. */
export function CustomArt({ className }: { className?: string }) {
  const id = useId();
  const blobs = [
    { cx: 96, cy: 108, r: 14, fill: CLAY },
    { cx: 138, cy: 92, r: 14, fill: TEAL_DEEP },
    { cx: 180, cy: 98, r: 14, fill: GOLD },
    { cx: 200, cy: 138, r: 14, fill: TEAL },
    { cx: 168, cy: 172, r: 14, fill: CLAY_LIGHT },
  ];

  return (
    <svg viewBox="0 0 280 240" className={className} role="img" aria-label="Custom colours and designs">
      <defs>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2ddc0" />
          <stop offset="100%" stopColor="#dcbf98" />
        </linearGradient>
      </defs>

      <ellipse cx="146" cy="216" rx="92" ry="10" fill={INK} opacity="0.09" />

      {/* Palette */}
      <path
        d="M140 46 C202 46 244 88 244 132 C244 166 214 174 196 180 C180 186 176 200 158 200 C104 200 52 174 52 124 C52 78 88 46 140 46 Z"
        fill={`url(#${id}-wood)`}
        stroke={CLAY_DEEP}
        strokeWidth="3.5"
      />
      <circle cx="104" cy="158" r="17" fill={CREAM} stroke={CLAY_DEEP} strokeWidth="3" />

      {blobs.map((b) => (
        <circle key={b.cx} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} />
      ))}

      {/* Brush */}
      <g transform="rotate(-28 210 60)">
        <rect x="196" y="16" width="15" height="86" rx="7" fill={CLAY_DEEP} />
        <rect x="196" y="98" width="15" height="16" rx="3" fill={TEAL_DEEP} />
        <path d="M196 112 L211 112 L207 142 L200 142 Z" fill={CLAY} />
      </g>
    </svg>
  );
}

export function ProductArt({
  art,
  className,
}: {
  art: "diya" | "samai" | "rangoli" | "custom";
  className?: string;
}) {
  if (art === "samai") return <SamaiArt className={className} />;
  if (art === "rangoli") return <RangoliArt className={className} />;
  if (art === "custom") return <CustomArt className={className} />;
  return <DiyaArt className={className} />;
}

/* ── Value icons ───────────────────────────────────────────── */

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, React.ReactNode> = {
  brush: (
    <>
      <path d="M14.5 3.5 20.5 9.5 11 19a3 3 0 0 1-1.7.9l-4 .6.6-4A3 3 0 0 1 6.8 15Z" />
      <path d="m12.5 5.5 6 6" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-.9 2-1.8 0-1.4-1.2-1.7-1.2-2.9 0-.9.7-1.5 1.7-1.5H16a5 5 0 0 0 5-5c0-3.7-4-6.8-9-6.8Z" />
      <circle cx="7.8" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  tag: (
    <>
      <path d="M20.5 12.7 12.8 20.4a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1-.6-1.6l.5-6a2 2 0 0 1 1.8-1.8l6-.5a2 2 0 0 1 1.6.6l6.4 6.4a2 2 0 0 1 .2 2.6Z" />
      <circle cx="8.4" cy="8.4" r="1.4" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21a6 6 0 0 0 6-6c0-4-3.5-6-4.5-9-2 2.5-3 3.5-3 5.5 0 1.2-1 1.8-1.7 1.1-.6-.6-.8-1.4-.8-2.1A6.9 6.9 0 0 0 6 15a6 6 0 0 0 6 6Z" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3s6 6.1 6 10.2A6 6 0 0 1 6 13.2C6 9.1 12 3 12 3Z" />
      <path d="M9.2 14.4a2.9 2.9 0 0 0 2.6 2.6" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
    </>
  ),
};

export function ValueIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...iconProps}>
      {ICONS[name] ?? ICONS.heart}
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.3-1.7c-.2-.3 0-.4.1-.6l.4-.5a2 2 0 0 0 .3-.4.5.5 0 0 0 0-.5c0-.2-.6-1.5-.9-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2A5 5 0 0 0 7.8 15a11.5 11.5 0 0 0 4.4 3.9 14.8 14.8 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
