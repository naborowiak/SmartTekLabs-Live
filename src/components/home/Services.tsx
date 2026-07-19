import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Globe, PartyPopper, Database, LayoutGrid, Sparkles, ArrowRight } from "lucide-react";
import { Glow, Section, SectionContainer, SectionHeading, Tone } from "../ui/design-system";
import type { SetPage } from "@/lib/navigation";

/**
 * The work, plotted as a range rather than a grid of cards.
 *
 * Six equal cards said "we do six things" and flattened the actual story. The
 * real story is the span: a reunion committee at one end, a Fortune 500 workflow
 * team at the other, one architect across the whole line. The palette does the
 * arguing — gold at the community end (and the hero is the arch at night),
 * ramping through cyan and blue to deep enterprise blue.
 */
type Stop = {
  id: string;
  who: string;
  shortWho: string;
  tone: Tone;
  pos: number; // % along the line
  need: string;
  work: { icon: typeof Bot; label: string; desc: string }[];
  link?: { label: string; action: "events" };
};

const STOPS: Stop[] = [
  {
    id: "committees",
    who: "Reunion & event committees",
    shortWho: "Committees",
    tone: "gold",
    pos: 8,
    need: "You've got a night to run, a sponsor to keep happy, and a spreadsheet held together with hope.",
    work: [
      {
        icon: PartyPopper,
        label: "Event Experiences",
        desc: "Event sites, live scoreboards, sponsor loops, MC decks, and printed materials. The whole night, built to match.",
      },
      {
        icon: Sparkles,
        label: "Decks, Dashboards & Signage",
        desc: "Presentations, live dashboards, QR-code hubs, and branded templates — instead of faking it in PowerPoint at midnight.",
      },
    ],
    link: { label: "See the event work", action: "events" },
  },
  {
    id: "smb",
    who: "Small business & nonprofits",
    shortWho: "Small business",
    tone: "cyan",
    pos: 50,
    need: "You need to look like you mean it, and you need the busywork to stop eating your week.",
    work: [
      {
        icon: Globe,
        label: "Websites That Aren't Templates",
        desc: "Sites, landing pages, and portals built from scratch — for the organizations that want to look like they mean it.",
      },
      {
        icon: Bot,
        label: "AI Automation & Agents",
        desc: "Assistants and automations that take the repetitive work off your plate — the same ones we use to build faster than a shop this size should.",
      },
    ],
  },
  {
    id: "enterprise",
    who: "Enterprise workflow teams",
    shortWho: "Enterprise",
    tone: "deep",
    pos: 92,
    need: "You're running a serious platform and you want a senior architect, not a bench of juniors learning on your budget.",
    work: [
      {
        icon: Database,
        label: "ServiceNow Consulting",
        desc: "Ten years deep: catalog items, Flow Designer, integrations, portals, HRSD, ITSM, and the scripting underneath.",
      },
      {
        icon: LayoutGrid,
        label: "Microsoft & Power Platform",
        desc: "PowerApps, Power Automate, SharePoint, Teams, and the connected spreadsheets your team already lives in.",
      },
    ],
  },
];

const dotLit: Record<Tone, string> = {
  cyan: "bg-primary shadow-[0_0_0_6px_rgba(0,188,212,0.18),0_0_26px_rgba(0,188,212,0.85)]",
  blue: "bg-secondary shadow-[0_0_0_6px_rgba(33,150,243,0.18),0_0_26px_rgba(33,150,243,0.85)]",
  deep: "bg-[#1976d2] shadow-[0_0_0_6px_rgba(25,118,210,0.18),0_0_26px_rgba(25,118,210,0.85)]",
  gold: "bg-accent shadow-[0_0_0_6px_rgba(232,191,86,0.18),0_0_26px_rgba(232,191,86,0.9)]",
};

const textLit: Record<Tone, string> = {
  cyan: "text-primary",
  blue: "text-secondary",
  deep: "text-[#4a9eff]",
  gold: "text-accent",
};

const chipLit: Record<Tone, string> = {
  cyan: "border-primary/30 bg-primary/10 text-primary",
  blue: "border-secondary/30 bg-secondary/10 text-secondary",
  deep: "border-[#1976d2]/30 bg-[#1976d2]/10 text-[#4a9eff]",
  gold: "border-accent/30 bg-accent/10 text-accent",
};

const panelEdge: Record<Tone, string> = {
  cyan: "border-primary/25",
  blue: "border-secondary/25",
  deep: "border-[#1976d2]/25",
  gold: "border-accent/25",
};

export function Services({ setPage }: { setPage: SetPage }) {
  const [activeId, setActiveId] = useState(STOPS[0].id);
  const active = STOPS.find((s) => s.id === activeId) ?? STOPS[0];

  return (
    <Section id="services">
      <Glow className="left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-secondary/[0.07]" />

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="What We Build"
            tone="gold"
            title="Most shops pick one end of this line."
            lede="Trivia night for a reunion committee on Friday. ServiceNow architecture for a workflow team on Monday. The range is the point — and the standard doesn't move."
          />
        </motion.div>

        {/* ------------------------------- The line ------------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Who it's for
          </div>

          <div
            role="tablist"
            aria-label="Who we build for"
            className="relative h-24 select-none sm:h-20"
          >
            {/* The rail itself: community gold ramping to enterprise blue */}
            <div className="absolute left-0 right-0 top-3 h-[3px] rounded-full bg-gradient-to-r from-accent via-primary to-[#1976d2] opacity-70" />

            {STOPS.map((stop) => {
              const isActive = stop.id === active.id;
              return (
                <button
                  key={stop.id}
                  role="tab"
                  id={`stop-${stop.id}`}
                  aria-selected={isActive}
                  aria-controls="spectrum-panel"
                  onClick={() => setActiveId(stop.id)}
                  onMouseEnter={() => setActiveId(stop.id)}
                  className="absolute top-0 -translate-x-1/2 focus-visible:outline-none"
                  style={{ left: `${stop.pos}%` }}
                >
                  <span
                    className={`mx-auto block rounded-full transition-all duration-300 ${
                      isActive ? `h-[22px] w-[22px] ${dotLit[stop.tone]}` : "h-3.5 w-3.5 bg-slate-600 group-hover:bg-slate-500"
                    }`}
                    style={{ marginTop: isActive ? 2 : 6 }}
                  />
                  <span
                    className={`mt-3 block whitespace-nowrap text-xs font-bold transition-colors duration-300 sm:text-sm ${
                      isActive ? textLit[stop.tone] : "text-slate-500"
                    }`}
                  >
                    {stop.shortWho}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ------------------------------ The panel ------------------------------ */}
        <div id="spectrum-panel" role="tabpanel" aria-labelledby={`stop-${active.id}`} className="mx-auto mt-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className={`rounded-2xl border bg-card p-7 md:p-9 ${panelEdge[active.tone]}`}
            >
              <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${chipLit[active.tone]}`}>
                {active.who}
              </div>

              <p className="mt-5 max-w-2xl font-heading text-xl font-bold leading-snug text-white md:text-2xl">
                “{active.need}”
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {active.work.map((w) => (
                  <div key={w.label} className="flex gap-4">
                    <div className={`h-fit rounded-lg border p-2.5 ${chipLit[active.tone]}`}>
                      <w.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white">{w.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {active.link && (
                <button
                  onClick={() => setPage(active.link!.action)}
                  className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
                >
                  {active.link.label}
                  <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionContainer>
    </Section>
  );
}
