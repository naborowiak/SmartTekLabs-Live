import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { Glow, Section, SectionContainer, SectionHeading, Tone } from "../ui/design-system";
import { Lightbulb, Route, Cpu, Rocket } from "lucide-react";

/**
 * The process, drawn on the brand mark itself.
 *
 * An arch is a gateway — a journey with a start, a summit, and a landing — which
 * is the same shape as a four-step process. A pulse climbs it as you scroll,
 * lighting each step as it passes and turning gold at the launch.
 *
 * `t` is a position along the SVG path (0 = left footing, 1 = right footing), not
 * a coordinate: node positions are measured off the real curve with
 * getPointAtLength, so the dots sit exactly on the arch at any width.
 */
// A cubic with both control points straight above the footings approximates the
// Gateway's catenary — near-vertical legs, flattening toward the summit. A
// quadratic gives a parabola, which reads as a rainbow, not the arch.
// The span is inset to 340..860 (not the full width) to leave room for the side
// labels: at 1024 a wider arch pushes the step-4 label past the viewport, where
// the section's overflow-hidden silently crops it.
const ARCH_PATH = "M 340 560 C 340 -80, 860 -80, 860 560";

type Step = {
  t: number;
  num: string;
  title: string;
  desc: string;
  side: "left" | "right";
  tone: Tone;
  icon: typeof Lightbulb;
};

const STEPS: Step[] = [
  {
    t: 0.09,
    num: "1",
    title: "Bring the idea",
    desc: "Tell us what you want to create, or the problem you need solved. No technical knowledge required.",
    side: "left",
    tone: "cyan",
    icon: Lightbulb,
  },
  {
    t: 0.34,
    num: "2",
    title: "Shape the experience",
    desc: "We map the flow, look, and features so everything fits your goals and your audience.",
    side: "left",
    tone: "blue",
    icon: Route,
  },
  {
    t: 0.66,
    num: "3",
    title: "Build with AI & automation",
    desc: "We build it using AI, automation, and modern tools to move fast and keep quality high.",
    side: "right",
    tone: "deep",
    icon: Cpu,
  },
  {
    t: 0.91,
    num: "4",
    title: "Launch polished & ready",
    desc: "You get a finished, professional result that works and looks the part from day one.",
    side: "right",
    tone: "gold",
    icon: Rocket,
  },
];

const nodeFill: Record<Tone, string> = {
  cyan: "bg-gradient-to-br from-primary to-[#0891a5] shadow-[0_0_24px_rgba(0,188,212,0.85)]",
  blue: "bg-gradient-to-br from-secondary to-[#1565c0] shadow-[0_0_24px_rgba(33,150,243,0.85)]",
  deep: "bg-gradient-to-br from-[#1976d2] to-[#0d47a1] shadow-[0_0_24px_rgba(25,118,210,0.85)]",
  gold: "bg-gradient-to-br from-[#f7ef8a] via-accent to-[#bd8d28] shadow-[0_0_30px_rgba(232,191,86,0.9)]",
};

const titleLit: Record<Tone, string> = {
  cyan: "text-primary",
  blue: "text-secondary",
  deep: "text-[#4a9eff]",
  gold: "text-accent",
};

export function HowWeWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  // Measure where each step actually falls on the curve.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPoints(
      STEPS.map((s) => {
        const p = path.getPointAtLength(len * s.t);
        return { x: p.x, y: p.y };
      }),
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.55"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // With reduced motion the arch is simply lit — no travelling pulse.
  const climb = reduceMotion ? 1 : progress;
  const isLit = (t: number) => climb >= t - 0.02;

  return (
    <Section id="process" surface="raised">
      <Glow className="left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 bg-primary/[0.07]" />

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="How We Work"
            tone="cyan"
            title="Four moves, start to summit."
            lede="No jargon, no drawn-out discovery phase. Here's exactly what working together looks like."
          />
        </motion.div>

        <div ref={trackRef}>
          {/* ---------------- Desktop: the journey up the arch ---------------- */}
          <div className="relative mx-auto hidden max-w-5xl lg:block">
            <svg
              viewBox="0 0 1200 620"
              className="w-full"
              role="img"
              aria-label="A four-step process drawn along an arch, from bring the idea to launch"
            >
              <defs>
                {/* Left-to-right, matching the direction of travel: the path runs
                    left footing → summit → right footing, so a horizontal ramp puts
                    cyan at the start, blue at the summit, and gold at the launch. */}
                <linearGradient id="archLit" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00bcd4" />
                  <stop offset="50%" stopColor="#2196f3" />
                  <stop offset="100%" stopColor="#e8bf56" />
                </linearGradient>
              </defs>

              {/* Unlit arch */}
              <path
                ref={pathRef}
                d={ARCH_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                className="text-slate-700/70"
              />

              {/* The pulse: same path, drawn in as you scroll */}
              <motion.path
                d={ARCH_PATH}
                fill="none"
                stroke="url(#archLit)"
                strokeWidth={4}
                strokeLinecap="round"
                style={{ pathLength: climb }}
                className="drop-shadow-[0_0_10px_rgba(0,188,212,0.55)]"
              />

              {/* Ground */}
              <line x1="230" y1="561" x2="970" y2="561" stroke="currentColor" strokeWidth={1} className="text-slate-800" />
            </svg>

            {/* Nodes + labels, positioned off the measured curve */}
            {points.map((pt, i) => {
              const step = STEPS[i];
              const lit = isLit(step.t);
              return (
                <div
                  key={step.num}
                  className="absolute"
                  style={{ left: `${(pt.x / 1200) * 100}%`, top: `${(pt.y / 620) * 100}%` }}
                >
                  <div
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-500 ${
                      lit ? `h-11 w-11 ${nodeFill[step.tone]}` : "h-7 w-7 border-2 border-slate-600 bg-background"
                    }`}
                  >
                    <span
                      className={`font-heading text-base font-bold transition-colors duration-500 ${
                        lit ? (step.tone === "gold" ? "text-accent-foreground" : "text-white") : "text-slate-500"
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Label, hung off the outside of the curve */}
                  <div
                    className={`absolute top-1/2 w-[200px] -translate-y-1/2 transition-opacity duration-500 xl:w-[240px] ${
                      step.side === "left" ? "right-8 text-right" : "left-8 text-left"
                    } ${lit ? "opacity-100" : "opacity-40"}`}
                  >
                    <div className={`mb-1.5 flex items-center gap-2 ${step.side === "left" ? "justify-end" : "justify-start"}`}>
                      <step.icon size={15} className={lit ? titleLit[step.tone] : "text-slate-600"} />
                      <h3
                        className={`font-heading text-lg font-bold transition-colors duration-500 ${
                          lit ? titleLit[step.tone] : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- Mobile: the same climb, vertical ---------------- */}
          <div className="relative mx-auto max-w-md lg:hidden">
            <div className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-slate-700/70" />
            <div
              className="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"
              style={{ height: `calc(${Math.min(Math.max(climb, 0), 1) * 100}% - 1rem)` }}
            />

            <div className="space-y-10">
              {STEPS.map((step) => {
                const lit = isLit(step.t);
                return (
                  <div key={step.num} className="relative pl-12">
                    <div
                      className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
                        lit ? nodeFill[step.tone] : "border-2 border-slate-600 bg-background"
                      }`}
                    >
                      <span
                        className={`font-heading text-sm font-bold ${
                          lit ? (step.tone === "gold" ? "text-accent-foreground" : "text-white") : "text-slate-500"
                        }`}
                      >
                        {step.num}
                      </span>
                    </div>

                    <div className={`transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-50"}`}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <step.icon size={15} className={lit ? titleLit[step.tone] : "text-slate-600"} />
                        <h3 className={`font-heading text-lg font-bold ${lit ? titleLit[step.tone] : "text-slate-500"}`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
