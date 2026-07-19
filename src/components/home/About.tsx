import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, MapPin } from "lucide-react";

/**
 * The specialties used to be a full section with eight capability cards — but
 * there's no client work to show behind any of it, so a whole section of claims
 * was writing cheques the page couldn't cash. It lives here instead, as
 * background on the person: brief, named, and not pretending to be proof.
 */
const SPECIALTIES = [
  "ServiceNow ITSM",
  "ServiceNow HRSD",
  "Service Portal & Catalog",
  "Flow Designer",
  "Integrations",
  "Power Automate",
  "PowerApps",
  "SharePoint & Teams",
  "Scripting & Custom Dev",
];
import { Glow, Section, SectionContainer, SectionHeading, Stat } from "../ui/design-system";
import { CALENDLY_URL, LINKEDIN_URL } from "@/lib/site";
import headshot from "@/assets/headshot.jpg";

const stats = [
  { value: "10+", label: "Years architecting", tone: "cyan" as const },
  { value: "1:1", label: "You work with me directly", tone: "blue" as const },
  { value: "US", label: "Based · zero offshore", tone: "deep" as const },
  { value: "Days", label: "To value, not months", tone: "gold" as const },
];

export function About() {
  return (
    <Section id="about">
      <Glow className="-left-[10%] top-1/4 h-[500px] w-[500px] bg-secondary/[0.08]" />

      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-2xl shadow-black/50">
              <img
                src={headshot}
                alt="Neal Borowiak, Senior Solutions Architect and founder of Smart Tek Labs"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              {/* Blend the photo into the section */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-heading text-2xl font-bold text-white">Neal Borowiak</div>
                <div className="mt-1 text-sm font-medium text-primary">Senior Solutions Architect</div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={13} className="text-slate-500" />
                  St. Louis, MO · Remote-capable
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SectionHeading
              kicker="Who You're Working With"
              tone="cyan"
              align="left"
              title="A senior architect you actually talk to."
              lede="No agency layers, no offshore hand-offs, no junior team learning on your budget. You work directly with the person designing and building the thing."
              className="mb-10 md:mb-12"
            />

            <p className="mb-10 max-w-xl leading-relaxed text-slate-400">
              Ten-plus years architecting enterprise platforms — deep in ServiceNow and the Microsoft Power Platform,
              plus the unglamorous plumbing that makes large organizations actually run. Smart Tek Labs brings that
              same standard to whoever needs it, whether that's a workflow team running a serious platform or a
              reunion committee that wants their trivia night to feel professionally produced.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} tone={stat.tone} />
              ))}
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-white"
              >
                Book a call with me
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Specialties: the day job, stated plainly and kept small */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-border pt-10 md:mt-20"
        >
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#4a9eff] md:text-sm">
            The day job
          </div>
          <p className="mb-7 max-w-3xl leading-relaxed text-slate-400">
            Ten years deep in <span className="font-medium text-white">ServiceNow</span> and the{" "}
            <span className="font-medium text-white">Microsoft Power Platform</span> — the enterprise work that pays
            for the good tooling and sets the standard everything else here is built to.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SPECIALTIES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#1976d2]/25 bg-[#1976d2]/10 px-4 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-[#1976d2]/60 hover:text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </SectionContainer>
    </Section>
  );
}
