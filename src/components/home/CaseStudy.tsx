import { motion } from "framer-motion";
import { Glow, Section, SectionContainer, SectionHeading } from "../ui/design-system";
import { ArrowRight, Sparkles } from "lucide-react";
import { CALENDLY_URL } from "@/lib/site";
import type { SetPage } from "@/lib/navigation";
import { STUDIES } from "@/lib/caseStudies";

export function CaseStudy({ setPage }: { setPage: SetPage }) {
  return (
    <Section id="work" surface="raised">
      <Glow className="left-1/2 top-1/4 h-[400px] w-[700px] -translate-x-1/2 bg-primary/[0.06]" />

      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="Our Work"
            tone="cyan"
            title="Case studies."
            lede="Most of the enterprise work ships under NDA. Here are the ones we can show you, end to end — both live, both built the whole way down."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {STUDIES.map((study, i) => (
            <motion.button
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setPage("case-study", study.slug)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_18px_50px_-12px_rgba(0,188,212,0.25)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-card">
                <img
                  src={study.thumb}
                  alt={study.thumbAlt}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              </div>

              <div className="flex flex-grow flex-col p-7">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{study.tag}</div>
                <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-white">{study.title}</h3>
                <div className="mt-4 h-px w-12 bg-primary/60" />
                <p className="mt-4 flex-grow text-sm leading-relaxed text-slate-400">{study.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-white">
                  View case study
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.button>
          ))}

          {/* ------------------------- The one that's next ------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-dashed border-accent/30 bg-background transition-all duration-300 hover:border-accent/60 md:col-span-2 lg:col-span-1"
          >
            {/* No media strip: with nothing to screenshot, a matching image block would
                be an empty grey box announcing the absence. The arch motif sits behind
                the whole card instead, so it stretches to the study cards' height. */}
            <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-25" />
            <svg
              viewBox="0 0 300 300"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-70"
              preserveAspectRatio="xMidYMax meet"
              aria-hidden="true"
            >
              <path
                d="M 70 300 C 70 40, 230 40, 230 300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeDasharray="7 9"
                className="text-accent/35 transition-colors duration-500 group-hover:text-accent/60"
              />
            </svg>

            <div className="relative flex flex-grow flex-col justify-center p-7">
              <Sparkles size={24} className="mb-5 text-accent/70 transition-transform duration-500 group-hover:scale-110" />
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Under construction</div>
              <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-white">Future projects incoming</h3>
              <div className="mt-4 h-px w-12 bg-accent/60" />
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                There's always something in the build. The next case study could be your reunion, your fundraiser, or
                the workflow that's been quietly ruining everyone's Mondays.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent transition-colors hover:text-white"
              >
                Put yours here
                <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  );
}
