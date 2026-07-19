import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorPlay, FileSpreadsheet, Presentation, Ticket, QrCode, ChartBar as BarChart3, LayoutTemplate, PartyPopper, Users, Landmark, GraduationCap, Building, Star, CircleCheck as CheckCircle2, ChevronDown } from "lucide-react";
import {
  AccentCard, ClippedButton, Glow, Section, SectionContainer, SectionHeading, Tone,
} from "../components/ui/design-system";
import { CaseStudy } from "../components/home/CaseStudy";
import { ContactSection } from "../components/home/ContactSection";
import type { SetPage } from "@/lib/navigation";

const deliverables = [
  { icon: MonitorPlay, title: "Custom Event Websites", desc: "Registration, details, and schedules all in one branded place." },
  { icon: FileSpreadsheet, title: "Live Scoreboards", desc: "Real-time automated scoring for trivia and games." },
  { icon: Presentation, title: "Sponsor Loops", desc: "Professional rolling slides to maximize sponsor visibility." },
  { icon: LayoutTemplate, title: "Master Presentations", desc: "Polished PowerPoint or Keynote decks for the MC." },
  { icon: Ticket, title: "Printable Materials", desc: "Handouts, answer sheets, and flyers that match your theme." },
  { icon: PartyPopper, title: "Game Graphics", desc: "Custom visual rounds, raffle slides, and interactive elements." },
  { icon: QrCode, title: "QR Code Hubs", desc: "Scannable table cards linking to digital menus or scoreboards." },
  { icon: BarChart3, title: "Data & Tracking", desc: "Secure databases for team rosters and automated tallies." },
];

const audiences = [
  { label: "Class Reunions", icon: Users },
  { label: "Trivia Nights", icon: PartyPopper },
  { label: "Fundraisers", icon: Landmark },
  { label: "School Events", icon: GraduationCap },
  { label: "Community Events", icon: Building },
  { label: "Booster Clubs", icon: Star },
];

const packages = [
  {
    name: "Event Essentials",
    desc: "For smaller gatherings needing a digital hub.",
    price: "Custom Quote",
    features: ["Custom Event Landing Page", "Digital Registration/RSVP", "Basic Event Branding", "1 Digital Flyer/Asset"],
  },
  {
    name: "Live Event Experience",
    desc: "The sweet spot for trivia nights and interactive fundraisers.",
    price: "Custom Quote",
    featured: true,
    features: ["Everything in Essentials", "Live Interactive Scoreboard", "Master Presentation Deck", "Sponsor Recognition Loops", "QR Code Table Hubs", "Printable Answer Sheets"],
  },
  {
    name: "Signature Event Package",
    desc: "Full white-glove digital production for major events.",
    price: "Custom Quote",
    features: ["Everything in Live Event", "Complex Automations/Workflows", "Custom Integrations", "Post-event Analytics", "Priority Support"],
  },
];

const sponsorValue = [
  { title: "Live Logo Loops", desc: "Dynamic sponsor slides that play on the big screen during breaks." },
  { title: "Digital Placements", desc: "Sponsor banners integrated directly into the live scoreboard or website." },
  { title: "Print & Handouts", desc: "High-res logo integration on answer sheets, table cards, and programs." },
];

const processSteps: { num: string; title: string; desc: string; tone: Tone }[] = [
  { num: "1", title: "Discovery", desc: "We meet to discuss your event size, audience, and needs.", tone: "cyan" },
  { num: "2", title: "Asset Collection", desc: "You provide logos, sponsor info, and trivia/event content.", tone: "blue" },
  { num: "3", title: "The Build", desc: "We design and build your custom digital experience.", tone: "deep" },
  { num: "4", title: "Handoff & Rehearsal", desc: "We train your team and do a dry run before the big day.", tone: "gold" },
];

const faqs = [
  { q: "Do you run the actual physical event?", a: "No, we act as your digital production team. We build all the tech, websites, and presentations beforehand so your MC or committee can run the event flawlessly on the night of." },
  { q: "Do we need our own laptops and screens?", a: "Yes. You will use your own venue's AV equipment (projectors, TVs) and your own laptops to display the scoreboards and presentations we build for you." },
  { q: "How much does a package cost?", a: "Pricing varies based on the size and complexity of your event. A simple website might be a few hundred dollars, while a full trivia night package is typically custom quoted. Contact us to get an exact number." },
  { q: "Can we sell sponsorships on the digital tools?", a: "Absolutely. In fact, many of our clients pay for our services purely through the increased sponsor revenue they generate by offering premium digital placements (like logos on the live scoreboard)." },
  { q: "How far in advance should we contact you?", a: "For large events like a 50-year reunion or massive trivia night, 3-6 months is ideal. For smaller events or specific deliverables, 4-6 weeks is usually sufficient." },
  { q: "Do people need to download an app?", a: "No. Everything we build is web-based. Attendees simply scan a QR code with their phone camera to access hubs, submit answers, or view the schedule." },
  { q: "Will the tech work if the venue Wi-Fi is bad?", a: "We optimize all our tools for low bandwidth, but core features like live scoreboards do require an internet connection. We always recommend having a hotspot backup just in case." },
];

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-heading text-lg font-semibold text-white transition-colors hover:text-accent"
      >
        {q}
        <ChevronDown className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 leading-relaxed text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Events({ setPage }: { setPage: SetPage }) {
  return (
    <main className="bg-background pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border py-24 md:py-32">
        <div className="absolute inset-0 z-0 bg-cyber-grid opacity-30" />
        <Glow className="left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-accent/10" />

        <div className="container relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12">
          <div className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-accent md:text-sm">
            Smart Tek Labs Event Experiences
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl"
          >
            Custom Digital Experiences for Reunions, Trivia Nights, Fundraisers,
            <span className="gold-text-animated mt-2 block">and Community Events.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-300"
          >
            Ditch the messy spreadsheets and generic templates. We build the websites, live scoreboards, sponsor loops,
            and digital materials that make your event feel professionally produced.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ClippedButton variant="gold" onClick={scrollToContact}>
              Discuss Your Event
            </ClippedButton>
          </motion.div>
        </div>
      </section>

      {/* What We Build + Perfect For */}
      <Section surface="raised" bordered={false}>
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
              title="Everything you need, built to match."
              lede="Every piece of your event's digital footprint, designed as one cohesive set instead of a pile of mismatched templates."
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                <AccentCard tone="gold" icon={item.icon} title={item.title} className="bg-background">
                  {item.desc}
                </AccentCard>
              </motion.div>
            ))}
          </div>

          {/* Perfect For */}
          <div className="mt-24 text-center md:mt-32">
            <div className="mb-10 text-xs font-bold uppercase tracking-[0.22em] text-accent md:text-sm">
              Perfect For
            </div>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 md:gap-4">
              {audiences.map((audience, index) => (
                <motion.div
                  key={audience.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-full border border-border bg-background px-6 py-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <audience.icon size={20} className="text-accent" />
                  <span className="font-heading font-semibold tracking-wide">{audience.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* Featured Example — shared with the home page */}
      <CaseStudy setPage={setPage} />

      {/* Sponsor Value */}
      <Section surface="raised">
        <Glow className="-right-[5%] top-1/4 h-[500px] w-[500px] bg-accent/[0.07]" />

        <SectionContainer>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                kicker="Sponsor Revenue"
                tone="gold"
                align="left"
                title="Unlock more sponsor revenue."
                lede="When your event tech looks professional, sponsors are willing to pay more for visibility. Our digital packages create premium, high-visibility placements that generic paper flyers simply can't offer."
                className="mb-0"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {sponsorValue.map((sv) => (
                <div
                  key={sv.title}
                  className="group flex gap-4 rounded-xl border border-accent/20 bg-accent/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_18px_50px_-12px_rgba(232,191,86,0.25)]"
                >
                  <Star className="shrink-0 text-accent" size={24} />
                  <div>
                    <h4 className="mb-1 font-heading text-lg font-bold text-white">{sv.title}</h4>
                    <p className="text-sm text-slate-400">{sv.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </SectionContainer>
      </Section>

      {/* Packages */}
      <Section>
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              kicker="Packages & Pricing"
              tone="gold"
              title="Pick a starting point, not a straitjacket."
              lede="Every event is unique. We customize our packages to fit your specific needs and audience size."
            />
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  pkg.featured
                    ? "z-10 border-accent bg-card shadow-[0_0_40px_rgba(232,191,86,0.15)] md:scale-105"
                    : "border-border bg-card/50 hover:-translate-y-1 hover:border-accent/40"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="mb-2 font-heading text-2xl font-bold text-white">{pkg.name}</h3>
                <p className="mb-6 h-10 text-sm text-slate-400">{pkg.desc}</p>
                <div className="mb-8 border-b border-border pb-8 font-heading text-3xl font-bold text-white">
                  {pkg.price}
                </div>
                <ul className="mb-8 flex-grow space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className={`w-full rounded-lg py-3 text-sm font-bold tracking-wide transition-colors ${
                    pkg.featured
                      ? "bg-accent text-accent-foreground hover:brightness-110"
                      : "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Get a Quote
                </button>
              </motion.div>
            ))}
          </div>
        </SectionContainer>
      </Section>

      {/* Process */}
      <Section surface="raised">
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              kicker="How It Works"
              tone="gold"
              title="Four steps to event day."
              lede="We handle the build so your committee can focus on filling the room."
            />
          </motion.div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-[3.75rem] hidden h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 lg:block"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <AccentCard tone={step.tone} step={step.num} title={step.title} className="bg-background">
                    {step.desc}
                  </AccentCard>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionContainer className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading kicker="FAQ" tone="gold" title="Frequently asked questions" />
          </motion.div>

          <div className="space-y-1">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </SectionContainer>
      </Section>

      <ContactSection
        title="Ready to upgrade your next event?"
        description="Let us handle the tech and design, so you can focus on selling tickets and running a great night."
        defaultService="Event Experiences"
      />
    </main>
  );
}
