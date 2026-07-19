import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, MotionConfig, useInView, useReducedMotion, useScroll, animate,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, ZoomIn, X } from "lucide-react";
import { ClippedButton, ClippedLink, Glow } from "../ui/design-system";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/site";
import type { SetPage } from "@/lib/navigation";
import { STUDIES, type Study, type ScrollShot, type Shot, type PosterPackage, type PackageFrame, type PosterAccent } from "@/lib/caseStudies";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* ---------------------------------------------------------------- *
 * The all-black flagship case-study presentation. A cinematic dark
 * poster laid out like a one-page brief: hero device cluster with a
 * headline stat strip, two numbered "package" panels (Website Platform
 * in purple, Trivia Night in gold), and a full-width feature bar.
 * Only rendered when a Study carries `poster`.
 * ---------------------------------------------------------------- */

/* Per-package accent tokens — purple (Package 01) and gold (Package 02) —
 * kept in one place so the border, number badge, pills and labels stay in sync. */
const ACCENT = {
  purple: {
    panel: "border-[#8B5CF6]/30 hover:border-[#8B5CF6]/45",
    glow: "bg-[#8B5CF6]/[0.10]",
    badge: "border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-[#A78BFA]",
    kicker: "text-[#A78BFA]",
    pill: "border-[#8B5CF6]/30 bg-[#8B5CF6]/[0.08] text-[#C4B5FD]",
    frame: "group-hover/z:border-[#8B5CF6]/50",
  },
  gold: {
    panel: "border-accent/30 hover:border-accent/45",
    glow: "bg-accent/[0.10]",
    badge: "border-accent/50 bg-accent/10 text-accent",
    kicker: "text-accent",
    pill: "border-accent/30 bg-accent/[0.08] text-accent",
    frame: "group-hover/z:border-accent/50",
  },
  cyan: {
    panel: "border-[#22D3EE]/30 hover:border-[#22D3EE]/45",
    glow: "bg-[#22D3EE]/[0.10]",
    badge: "border-[#22D3EE]/50 bg-[#22D3EE]/10 text-[#67E8F9]",
    kicker: "text-[#67E8F9]",
    pill: "border-[#22D3EE]/30 bg-[#22D3EE]/[0.08] text-[#A5F3FC]",
    frame: "group-hover/z:border-[#22D3EE]/50",
  },
  indigo: {
    panel: "border-[#818CF8]/30 hover:border-[#818CF8]/45",
    glow: "bg-[#818CF8]/[0.10]",
    badge: "border-[#818CF8]/50 bg-[#818CF8]/10 text-[#A5B4FC]",
    kicker: "text-[#A5B4FC]",
    pill: "border-[#818CF8]/30 bg-[#818CF8]/[0.08] text-[#C7D2FE]",
    frame: "group-hover/z:border-[#818CF8]/50",
  },
} as const;

type ZoomItem = { src: string; alt: string } | null;

function Reveal({
  children, className, delay = 0, y = 30,
}: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* A clickable media wrapper that opens the lightbox and shows a zoom hint. */
function Zoomable({
  src, alt, onZoom, className, children,
}: { src: string; alt: string; onZoom: (i: ZoomItem) => void; className?: string; children: React.ReactNode }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Enlarge: ${alt}`}
      onClick={() => onZoom({ src, alt })}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onZoom({ src, alt }); } }}
      className={cn("group/z relative cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-primary/60", className)}
    >
      {children}
      <span className="pointer-events-none absolute bottom-3 right-3 z-20 grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/z:opacity-100">
        <ZoomIn size={15} />
      </span>
    </div>
  );
}

/* Notch-less phone. `scroll` turns a tall full-page capture into a slow auto-pan. */
function PhoneFrame({ shot, className, panDuration }: { shot: ScrollShot; className?: string; panDuration?: string }) {
  return (
    <div className={cn("relative rounded-[1.7rem] border border-slate-700/80 bg-[#11141d] p-1.5 shadow-2xl", className)}>
      {/* subtle earpiece on the bezel — no camera notch */}
      <span className="absolute left-1/2 top-[7px] z-10 h-[3px] w-8 -translate-x-1/2 rounded-full bg-slate-700/90" aria-hidden="true" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-black">
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          className={cn("absolute inset-0 h-full w-full object-cover", shot.scroll ? "app-pan" : "object-top")}
          style={shot.scroll && panDuration ? { animationDuration: panDuration } : undefined}
        />
      </div>
    </div>
  );
}

function LaptopFrame({ shot, className }: { shot: ScrollShot; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-t-xl border-x border-t border-slate-700/80 bg-[#161b28] p-2.5 pb-2 shadow-2xl">
        <div className="mb-2 flex justify-center"><span className="h-1 w-1 rounded-full bg-slate-600" /></div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className={cn("absolute inset-0 h-full w-full object-cover", shot.scroll ? "app-pan" : "object-top")}
          />
        </div>
      </div>
      <div className="relative -mx-[3%] h-3 rounded-b-lg bg-gradient-to-b from-[#2b3242] to-[#11141d] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-14 -translate-x-1/2 rounded-b-md bg-[#0b0e15]" />
      </div>
    </div>
  );
}

function TabletFrame({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <div className={cn("relative rounded-2xl border border-slate-700/80 bg-[#11141d] p-1.5 shadow-2xl", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
        <img src={shot.src} alt={shot.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}

/* A plain framed screenshot at its own aspect (decks, scoreboards, print). */
function ImageFrame({ src, alt, portrait }: { src: string; alt: string; portrait?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/15 bg-[#11141d] shadow-2xl", portrait && "mx-auto")}>
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

/* A uniform labelled thumbnail used across the package panels. Every piece is
 * cropped to a shared aspect (landscape or portrait) so a panel of mixed media
 * reads as a tidy grid, the way the reference brief does; the full-resolution
 * capture is one click away via the lightbox (video is a silent autoplay loop,
 * so it isn't zoomable). */
function MiniFrame({
  label, src, alt, accent, portrait, video, poster, scroll, onZoom,
}: {
  label: string; src: string; alt: string; accent: PosterAccent;
  portrait?: boolean; video?: boolean; poster?: string; scroll?: boolean;
  onZoom: (i: ZoomItem) => void;
}) {
  const box = (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/12 bg-[#11141d] shadow-lg",
        portrait ? "aspect-[3/4]" : "aspect-video",
      )}
    >
      {video ? (
        <video
          src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <img
          src={src} alt={alt} loading="lazy"
          className={cn("absolute inset-0 h-full w-full object-cover object-top", scroll && "app-pan")}
        />
      )}
    </div>
  );

  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-slate-500">
        {label}
      </figcaption>
      {video ? box : (
        <Zoomable src={src} alt={alt} onZoom={onZoom} className={cn("block rounded-lg", ACCENT[accent].frame)}>
          {box}
        </Zoomable>
      )}
    </figure>
  );
}

/* One numbered package panel: header, a grid of MiniFrames, an optional pill
 * row, and an optional titled collateral sub-grid. Themed purple or gold. */
function PackagePanel({ pkg, onZoom }: { pkg: PosterPackage; onZoom: (i: ZoomItem) => void }) {
  const a = ACCENT[pkg.accent];

  // `laptop`/`phone` frames render inside real device chrome (a computer / a
  // phone); `screen`/`video` frames (slides, scoreboards, print, docs, email)
  // stay flat cards — a printed schedule doesn't belong in a laptop bezel.
  const devices = pkg.frames.filter(
    (f): f is Extract<PackageFrame, { kind: "laptop" | "phone" }> => f.kind === "laptop" || f.kind === "phone",
  );
  const flats = pkg.frames.filter(
    (f): f is Extract<PackageFrame, { kind: "screen" | "video" }> => f.kind === "screen" || f.kind === "video",
  );

  const flatMini = (f: Extract<PackageFrame, { kind: "screen" | "video" }>) =>
    f.kind === "video"
      ? { label: f.label, src: f.src, alt: f.alt, poster: f.poster, video: true as const }
      : { label: f.label, src: f.src, alt: f.alt, portrait: f.portrait };

  return (
    <div className={cn("group relative h-full overflow-hidden rounded-3xl border bg-[#0a0f1c] p-6 transition-all duration-500 md:p-8", a.panel)}>
      <div className={cn("pointer-events-none absolute -right-[8%] -top-[26%] h-[62%] w-[55%] rounded-full opacity-70 blur-2xl", a.glow)} />

      {/* header */}
      <div className="relative z-10 mb-6 flex items-start gap-4">
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl border font-heading text-lg font-bold tabular-nums", a.badge)}>
          {pkg.n}
        </span>
        <div className="min-w-0">
          <div className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", a.kicker)}>Package {pkg.n}</div>
          <h3 className="mt-0.5 font-heading text-2xl font-bold text-white md:text-[1.65rem]">{pkg.kicker}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{pkg.tagline}</p>
        </div>
      </div>

      {/* device showcase — laptops and phones in real chrome, bottom-aligned so
          a laptop + phone sit together like a desk; extra laptops wrap full-width */}
      {devices.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-end gap-x-4 gap-y-5">
          {devices.map((f, i) => {
            const isPhone = f.kind === "phone";
            return (
              <figure
                key={i}
                className={cn("min-w-0", isPhone ? "w-[26%] min-w-[92px] max-w-[140px]" : "flex-1 basis-[56%] min-w-[220px]")}
              >
                <figcaption className="mb-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.1em] text-slate-500">
                  {f.label}
                </figcaption>
                <Zoomable src={f.shot.src} alt={f.shot.alt} onZoom={onZoom} className={cn("block", ACCENT[pkg.accent].frame)}>
                  {isPhone ? <PhoneFrame shot={f.shot} panDuration="26s" /> : <LaptopFrame shot={f.shot} />}
                </Zoomable>
              </figure>
            );
          })}
        </div>
      )}

      {/* flat frames — slides, scoreboards, print, email, docs */}
      {flats.length > 0 && (
        <div className={cn("relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3", devices.length > 0 && "mt-5")}>
          {flats.map((f, i) => (
            <MiniFrame key={i} accent={pkg.accent} onZoom={onZoom} {...flatMini(f)} />
          ))}
        </div>
      )}

      {/* feature pills */}
      {pkg.pills && (
        <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
          {pkg.pills.map((p) => (
            <span key={p.label} className={cn("inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold", a.pill)}>
              <p.icon size={14} /> {p.label}
            </span>
          ))}
        </div>
      )}

      {/* collateral sub-grid */}
      {pkg.collateral && (
        <div className="relative z-10 mt-7 border-t border-white/10 pt-6">
          {pkg.collateralTitle && (
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{pkg.collateralTitle}</div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {pkg.collateral.map((c, i) => (
              <MiniFrame key={i} accent={pkg.accent} onZoom={onZoom} label={c.title} src={c.src} alt={c.alt} portrait={c.portrait} />
            ))}
          </div>
        </div>
      )}

      {pkg.live && (
        <a
          href={`https://${pkg.live}`} target="_blank" rel="noopener noreferrer"
          className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:bg-accent/[0.14]"
        >
          <ExternalLink size={13} /> {pkg.live}
        </a>
      )}
    </div>
  );
}

function Lightbox({ item, onClose }: { item: ZoomItem; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#030308]/90 p-4 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={item.alt}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <motion.img
            src={item.src} alt={item.alt}
            className="max-h-[88vh] w-auto max-w-[min(1100px,94vw)] rounded-xl border border-white/15 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const m = /^(\D*)([\d,]+)(.*)$/.exec(value);
  const [text, setText] = useState(m ? `${m[1]}0${m[3]}` : value);

  useEffect(() => {
    if (!m) { setText(value); return; }
    const target = parseInt(m[2].replace(/,/g, ""), 10);
    if (!inView) return;
    if (reduce || target === 0) { setText(value); return; }
    const controls = animate(0, target, {
      duration: 1.2, ease: EASE,
      onUpdate: (v) => setText(`${m[1]}${Math.round(v).toLocaleString()}${m[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref} className={className}>{text}</span>;
}

const clipCorner = "[clip-path:polygon(6%_0,100%_0,100%_74%,94%_100%,0_100%,0_26%)]";

export function CaseStudyPoster({ study, setPage }: { study: Study; setPage: SetPage }) {
  const p = study.poster!;
  const [zoom, setZoom] = useState<ZoomItem>(null);
  const { scrollYProgress } = useScroll();
  const others = STUDIES.filter((s) => s.slug !== study.slug);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [study.slug]);

  return (
    <MotionConfig reducedMotion="user">
    <article className="bg-background text-white">
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-primary via-[#8B5CF6] to-accent"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ------------------------------- HERO ------------------------------- */}
      <header className="relative overflow-hidden pb-16 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-40 [mask-image:radial-gradient(120%_90%_at_70%_15%,#000_32%,transparent_78%)]" />
        <Glow className="right-[-120px] top-0 h-[460px] w-[640px] bg-[#4C2A82]/30" />
        <Glow className="left-[-140px] bottom-[-60px] h-[360px] w-[440px] bg-primary/[0.08]" />

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <button
            onClick={() => setPage("home", "work")}
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            All case studies
          </button>

          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <motion.div
                className="mb-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-primary md:text-sm">Case Study</span>
                <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 md:text-sm">{study.tag}</span>
              </motion.div>

              <h1 className="font-heading text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
                {p.heroTitle.lines.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }} animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden">
                  <motion.span
                    className={cn("block bg-gradient-to-r bg-clip-text text-transparent", p.heroTitle.gradient)}
                    initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
                  >
                    {p.heroTitle.accent}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
              >
                {study.excerpt}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.68, ease: EASE, delay: 0.38 }}
              >
                <ClippedLink variant="gold" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit {study.liveLabel} <ExternalLink size={16} />
                </ClippedLink>
                <ClippedButton variant="ghost" onClick={() => { document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Explore the build
                </ClippedButton>
              </motion.div>
            </div>

            {/* device cluster — laptop + phone only, sized up to fill the column
                (the tablet is gone; that real estate goes to bigger devices) */}
            <motion.div
              className="relative mx-auto h-[330px] w-full max-w-2xl sm:h-[420px] lg:h-[490px] lg:max-w-none"
              initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            >
              <LaptopFrame shot={p.heroCluster.desktop} className="absolute left-0 top-[6%] z-[1] w-[82%]" />
              <PhoneFrame shot={p.heroCluster.phone} className="absolute bottom-[-2%] right-0 z-[3] w-[28%] min-w-[104px] max-w-[210px]" />
            </motion.div>
          </div>

          {/* headline stat strip */}
          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4 md:mt-16">
            {p.heroStats.map((s, i) => (
              <div key={s.l} className="text-center sm:text-left">
                <CountUp
                  value={s.v}
                  className={cn(
                    "block font-heading text-4xl font-bold leading-none tracking-tight tabular-nums md:text-5xl",
                    ACCENT[p.packages[i % p.packages.length].accent].kicker,
                  )}
                />
                <div className="mt-2.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{s.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </header>

      {/* ------------------------------ THE PACKAGES ------------------------------ */}
      <section id="packages" className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <Glow className="left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 bg-[#8B5CF6]/[0.07]" />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <Reveal className="mb-12 max-w-2xl md:mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#A78BFA]">Two packages, one event</div>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">Every surface, on brand.</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              One event, built the whole way down — the digital platform and the room it powers, reading as a single thing.
              Every image is the live work; click any to enlarge.
            </p>
          </Reveal>

          {/* Side-by-side only at xl, where each panel has real room; below that
              they stack full-width so the frames and labels never get crushed.
              `items-stretch` (default) + h-full panels keep the two columns the
              same overall height when they are side by side. */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-7">
            {p.packages.map((pkg, i) => (
              <Reveal key={pkg.n} delay={i * 0.08} className="h-full">
                <PackagePanel pkg={pkg} onZoom={setZoom} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ FEATURE BAR ------------------------------ */}
      <section className="border-y border-border bg-gradient-to-b from-card to-transparent">
        <div className="container mx-auto grid grid-cols-2 gap-x-6 px-6 sm:grid-cols-4 md:px-12 xl:grid-cols-8">
          {p.features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.05}
              className={cn(
                "flex items-start gap-3 py-6 pr-4 md:py-7",
                i < p.features.length - 1 && "xl:border-r xl:border-border",
                i % 2 === 0 && "border-r border-border sm:border-r-0 xl:border-r",
                i < 6 && "border-b border-border sm:[&:nth-child(-n+4)]:border-b sm:[&:nth-child(n+5)]:border-b-0 xl:border-b-0",
              )}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/[0.08] text-[#A78BFA]">
                <f.icon size={17} />
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold leading-tight text-white">{f.title}</div>
                <div className="mt-0.5 text-[11.5px] leading-snug text-slate-500">{f.text}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ SEE IT IN ACTION ------------------------------ */}
      {p.demo && (
        <section className="border-b border-border py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <Reveal className="mx-auto max-w-5xl">
              <div className="mb-9 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#67E8F9]">Interactive demo</div>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">{p.demo.heading}</h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-400">{p.demo.sub}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/12 shadow-2xl">
                <div style={{ position: "relative", paddingBottom: p.demo.padBottom, height: 0, width: "100%" }}>
                  <iframe
                    src={p.demo.url}
                    title={p.demo.title}
                    loading="lazy"
                    allowFullScreen
                    allow="clipboard-write"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", colorScheme: "light" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* --------------------------------- CTA --------------------------------- */}
      <section className="relative overflow-hidden py-20 text-center md:py-28">
        <Glow className="left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-[#4C2A82]/25" />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              Want something built the whole way down?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
              That's the whole job. Tell us what's breaking or what you're dreaming up, and we'll figure out the rest together.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <ClippedLink variant="gold" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a call</ClippedLink>
              <ClippedButton variant="ghost" onClick={() => setPage("home", "work")}>
                <ArrowLeft size={16} /> Back to work
              </ClippedButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Other studies ------------------------------ */}
      {others.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">More work</div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {others.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setPage("case-study", s.slug)}
                  className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-background">
                    <img src={s.thumb} alt={s.thumbAlt} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{s.tag}</div>
                    <div className="mt-1.5 line-clamp-2 font-heading text-base font-bold leading-snug text-white">{s.title}</div>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox item={zoom} onClose={() => setZoom(null)} />
    </article>
    </MotionConfig>
  );
}
