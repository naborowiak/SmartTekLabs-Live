import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import { ClippedButton, ClippedLink } from "../ui/design-system";
import { CALENDLY_URL } from "@/lib/site";
import type { SetPage } from "@/lib/navigation";
import heroArchPoster from "@/assets/hero-arch.jpg";
import heroArchVideo from "@/assets/hero-arch.mp4";

const ROLES = ["Work", "Events", "Business", "Community", "Everything In Between"];

export function Hero({ setPage }: { setPage: SetPage }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Video Background — plays at full strength; the scrims below carve out
          legibility instead of dimming the whole frame. */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroArchPoster}
          className="w-full h-full object-cover"
        >
          <source src={heroArchVideo} type="video/mp4" />
        </video>
      </div>

      {/* Edge scrim: darkens the top (so the fixed navbar stays readable) and the
          bottom (to blend into the next section), leaving the middle band — where
          the arch's electricity arcs — untouched. */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/85 via-transparent to-background"></div>

      {/* Centre scrim, deliberately light: the arch legs (and the electricity that
          arcs up them) sit directly behind the headline, so anything heavier here
          dims the best part of the video. Legibility comes from the text's own
          halo shadows instead. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 44% 40% at 50% 44%, rgba(2,6,23,0.5) 0%, rgba(2,6,23,0.22) 52%, rgba(2,6,23,0) 76%)',
        }}
      ></div>

      <div className="absolute inset-0 z-0 bg-cyber-grid opacity-20"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles size={16} />
          Smart solutions. Powered by AI.
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-4"
        >
          {/* text-shadow is applied per-span, never on the h1: the rotating word uses
              background-clip:text, and a shadow on that paints *over* the gold
              gradient and muddies it. It gets a drop-shadow filter instead. */}
          <span className="[text-shadow:0_0_3px_rgba(2,6,23,0.95),0_2px_10px_rgba(2,6,23,0.9),0_4px_34px_rgba(2,6,23,0.75)]">
            AI-Powered Digital Solutions
          </span>
          <br />
          {/* The hidden copy of the longest phrase holds the line width steady so
              rotating words never reflow the headline; the visible row is centered
              over it so short words stay optically centered too.
              It's also sized independently of the h1: at the h1's own mobile size
              the longest phrase overflows the viewport and gets silently clipped. */}
          <span className="relative block text-[1.6rem] sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="invisible" aria-hidden="true">for Everything In Between</span>
            <span className="absolute inset-0 flex items-baseline justify-center whitespace-nowrap">
              <span className="text-slate-300 [text-shadow:0_0_3px_rgba(2,6,23,0.95),0_2px_10px_rgba(2,6,23,0.9),0_4px_34px_rgba(2,6,23,0.75)]">for&nbsp;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="gold-text-animated drop-shadow-[0_2px_16px_rgba(2,6,23,0.95)]"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl leading-relaxed [text-shadow:0_0_2px_rgba(2,6,23,0.9),0_2px_10px_rgba(2,6,23,0.95)]"
        >
          One senior solutions architect who builds the whole thing — enterprise workflow on <span className="text-primary font-medium">ServiceNow and the Microsoft stack</span>, custom sites and automations, and event experiences that look professionally produced.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <ClippedLink
            variant="gold"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <CalendarDays size={17} />
            Book a call
          </ClippedLink>
          <ClippedButton variant="ghost" onClick={() => setPage('home', 'events')} className="w-full sm:w-auto">
            See event work
          </ClippedButton>
        </motion.div>

        {/* Trust tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-300 [text-shadow:0_0_2px_rgba(2,6,23,0.9),0_2px_10px_rgba(2,6,23,0.95)]"
        >
          {["ServiceNow", "Power Platform", "AI & Automation", "Websites", "Event Experiences"].map((tag, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/70"></div>
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
