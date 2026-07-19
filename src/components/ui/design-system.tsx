import React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Device frames
 *
 * Drawn in CSS rather than composited into stock device photos: they stay
 * crisp at any size, inherit the dark theme, cost nothing to ship, and can't
 * date the way a photo of a 2019 laptop does. Screenshots go inside them.
 * ------------------------------------------------------------------ */

/**
 * A laptop lid + base. Screen is 16:10 — feed it a capture taken at 16:10
 * (e.g. 1440×900) and `fit="cover"` fills it edge to edge with no crop.
 *
 * `fit="contain"` is the honest fallback for art that isn't 16:10 (a 16:9 slide,
 * a very wide app screenshot). Cover would silently crop the sides — which on
 * the Affton scoreboard means losing the TOTAL/PLACE columns, i.e. the part that
 * proves the thing tallies itself.
 */
export function LaptopFrame({
  src,
  alt,
  className,
  objectPosition = "top",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: "top" | "center";
  fit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Lid */}
      <div className="rounded-t-xl border-x border-t border-slate-700/80 bg-[#161b28] p-2.5 pb-2 shadow-2xl">
        <div className="mb-2 flex justify-center">
          <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full",
              fit === "cover" ? "object-cover" : "object-contain",
              objectPosition === "top" && fit === "cover" ? "object-top" : "object-center",
            )}
          />
        </div>
      </div>
      {/* Base — slightly wider than the lid, with a hinge notch */}
      <div className="relative -mx-[3%] h-3 rounded-b-lg bg-gradient-to-b from-[#2b3242] to-[#11141d] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-14 -translate-x-1/2 rounded-b-md bg-[#0b0e15]" />
      </div>
    </div>
  );
}

/** A phone. Screen is 9:19.5 — feed it a real mobile-width capture, not a squeezed desktop one. */
export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[1.8rem] border border-slate-700/80 bg-[#11141d] p-1.5 shadow-2xl",
        className,
      )}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-black">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
        {/* Notch */}
        <div className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      </div>
    </div>
  );
}

/**
 * A plain screen frame that adopts the artwork's own aspect ratio.
 *
 * For art that isn't 16:10 — a 16:9 slide deck, the 2.19:1 scoreboard, print
 * pieces. Forcing those into LaptopFrame means either cropping away the content
 * that makes the point, or `fit="contain"` letterboxing them inside black bars
 * that read as broken. Passing the real pixel dimensions lets the browser
 * reserve the box before the image loads, so nothing reflows underneath it.
 */
export function ScreenFrame({
  src,
  alt,
  w,
  h,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-700/80 bg-[#11141d] shadow-2xl",
        className,
      )}
    >
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

/**
 * Laptop with a phone overlapping its corner — the same page at two real
 * breakpoints, side by side. The phone is optional: without a genuine
 * mobile-width capture it's omitted rather than faked by squeezing a desktop
 * screenshot into a phone-shaped hole, which fools nobody and looks it.
 *
 * Both the laptop's reserved margin and the phone's width are percentages of
 * this wrapper, so the pair scales as one unit and the phone stays pinned to
 * the laptop's corner at every width. Anything absolute here (a fixed phone
 * width, or anchoring the phone to a wider container than the laptop) detaches
 * the two as the viewport grows.
 */
export function DeviceShowcase({
  desktop,
  desktopAlt,
  desktopFit = "cover",
  mobile,
  mobileAlt,
  className,
}: {
  desktop: string;
  desktopAlt: string;
  desktopFit?: "cover" | "contain";
  mobile?: string;
  mobileAlt?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <LaptopFrame src={desktop} alt={desktopAlt} fit={desktopFit} className={mobile ? "mr-[12%] sm:mr-[14%]" : ""} />
      {mobile && (
        <PhoneFrame
          src={mobile}
          alt={mobileAlt ?? ""}
          className="absolute -bottom-4 right-0 w-[22%] min-w-[74px] max-w-[130px]"
        />
      )}
    </div>
  );
}

// Button with the clipped corners style
type ClippedVariant = "gold" | "ghost" | "cyan";

const clippedBase =
  "clip-button relative inline-flex items-center justify-center gap-2 px-6 py-3 font-heading font-medium tracking-wide transition-all duration-300";

const clippedVariants: Record<ClippedVariant, string> = {
  gold: "bg-accent text-accent-foreground hover:brightness-110 shadow-[0_0_15px_rgba(232,191,86,0.3)]",
  cyan: "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(0,188,212,0.3)]",
  // Sits over the hero video, so it needs its own backing to stay readable.
  ghost: "bg-white/5 backdrop-blur-sm border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
};

interface ClippedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ClippedVariant;
  children: React.ReactNode;
}

export function ClippedButton({ variant = "gold", className, children, ...props }: ClippedButtonProps) {
  return (
    <button className={cn(clippedBase, clippedVariants[variant], className)} {...props}>
      {children}
    </button>
  );
}

/** Same styling as ClippedButton, but a real anchor — booking links must be links. */
interface ClippedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ClippedVariant;
  children: React.ReactNode;
}

export function ClippedLink({ variant = "gold", className, children, ...props }: ClippedLinkProps) {
  return (
    <a className={cn(clippedBase, clippedVariants[variant], className)} {...props}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Section rhythm primitives
 * ------------------------------------------------------------------ */

export type Tone = "cyan" | "blue" | "deep" | "gold";

// Static class maps — Tailwind can only see class names written out in full.
const toneText: Record<Tone, string> = {
  cyan: "text-primary",
  blue: "text-secondary",
  deep: "text-[#1976d2]",
  gold: "text-accent",
};

const toneBorder: Record<Tone, string> = {
  cyan: "border-primary/25 group-hover:border-primary/70",
  blue: "border-secondary/25 group-hover:border-secondary/70",
  deep: "border-[#1976d2]/25 group-hover:border-[#1976d2]/70",
  gold: "border-accent/25 group-hover:border-accent/70",
};

const toneWash: Record<Tone, string> = {
  cyan: "from-primary/[0.09]",
  blue: "from-secondary/[0.09]",
  deep: "from-[#1976d2]/[0.09]",
  gold: "from-accent/[0.09]",
};

const toneGlow: Record<Tone, string> = {
  cyan: "group-hover:shadow-[0_18px_50px_-12px_rgba(0,188,212,0.30)]",
  blue: "group-hover:shadow-[0_18px_50px_-12px_rgba(33,150,243,0.30)]",
  deep: "group-hover:shadow-[0_18px_50px_-12px_rgba(25,118,210,0.30)]",
  gold: "group-hover:shadow-[0_18px_50px_-12px_rgba(232,191,86,0.30)]",
};

const toneBadge: Record<Tone, string> = {
  cyan: "bg-gradient-to-br from-primary to-[#0891a5] text-primary-foreground shadow-[0_8px_20px_-6px_rgba(0,188,212,0.6)]",
  blue: "bg-gradient-to-br from-secondary to-[#1565c0] text-white shadow-[0_8px_20px_-6px_rgba(33,150,243,0.6)]",
  deep: "bg-gradient-to-br from-[#1976d2] to-[#0d47a1] text-white shadow-[0_8px_20px_-6px_rgba(25,118,210,0.6)]",
  gold: "bg-gradient-to-br from-[#f7ef8a] via-accent to-[#bd8d28] text-accent-foreground shadow-[0_8px_20px_-6px_rgba(232,191,86,0.6)]",
};

const toneChip: Record<Tone, string> = {
  cyan: "bg-primary/10 border-primary/25 text-primary",
  blue: "bg-secondary/10 border-secondary/25 text-secondary",
  deep: "bg-[#1976d2]/10 border-[#1976d2]/25 text-[#1976d2]",
  gold: "bg-accent/10 border-accent/25 text-accent",
};

/**
 * Consistent vertical rhythm + alternating surface tone for every section.
 * `tone="raised"` maps to the card surface so sections alternate as you scroll.
 */
export function Section({
  id,
  children,
  surface = "base",
  className,
  bordered = true,
}: {
  id?: string;
  children: React.ReactNode;
  surface?: "base" | "raised";
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 md:py-24 lg:py-28",
        surface === "raised" ? "bg-card" : "bg-background",
        bordered && "border-t border-border",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("container relative z-10 mx-auto px-6 md:px-12", className)}>{children}</div>;
}

/**
 * Kicker + oversized headline + lede. The single source of section headers so
 * every section shares one type scale and spacing.
 */
export function SectionHeading({
  kicker,
  tone = "cyan",
  title,
  lede,
  align = "center",
  className,
}: {
  kicker?: string;
  tone?: Tone;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-16 md:mb-20", centered && "text-center", className)}>
      {kicker && (
        <div className={cn("mb-5 text-xs font-bold uppercase tracking-[0.22em] md:text-sm", toneText[tone])}>
          {kicker}
        </div>
      )}
      <h2
        className={cn(
          "font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.06]",
          centered && "mx-auto max-w-4xl",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed text-slate-400 md:text-xl",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/**
 * The workhorse card: soft tinted wash, tone-matched border that lights up on
 * hover, optional numbered badge. Mirrors the reference site's card treatment
 * translated to the dark palette.
 */
export function AccentCard({
  tone = "cyan",
  step,
  icon: Icon,
  title,
  children,
  footer,
  className,
}: {
  tone?: Tone;
  step?: string;
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 md:p-8",
        toneBorder[tone],
        toneGlow[tone],
        className,
      )}
    >
      {/* Tinted wash */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100",
          toneWash[tone],
        )}
      />

      <div className="relative z-10 flex h-full flex-col">
        {(step || Icon) && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {step && (
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold",
                    toneBadge[tone],
                  )}
                >
                  {step}
                </div>
              )}
              {Icon && !step && (
                <div className={cn("rounded-xl border p-3", toneChip[tone])}>
                  <Icon size={24} />
                </div>
              )}
            </div>
            {Icon && step && <Icon size={22} className="text-slate-500 transition-colors group-hover:text-slate-300" />}
          </div>
        )}

        {title && <h3 className="mb-3 font-heading text-xl font-bold text-white">{title}</h3>}

        {children && <div className="flex-grow text-sm leading-relaxed text-slate-400">{children}</div>}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

/** Big number + label, for the proof band. */
export function Stat({ value, label, tone = "cyan" }: { value: string; label: string; tone?: Tone }) {
  return (
    <div className="text-center">
      <div className={cn("font-heading text-4xl font-bold tracking-tight md:text-5xl", toneText[tone])}>{value}</div>
      <div className="mt-2 text-sm text-slate-400">{label}</div>
    </div>
  );
}

/** Soft radial glow positioned behind section content. */
export function Glow({ className }: { className?: string }) {
  return <div className={cn("pointer-events-none absolute rounded-full blur-[130px]", className)} />;
}
