import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import {
  ClippedButton, ClippedLink, Section, SectionContainer, SectionHeading,
  AccentCard, Stat, Glow, DeviceShowcase, LaptopFrame,
} from "../components/ui/design-system";
import { CALENDLY_URL } from "@/lib/site";
import type { SetPage } from "@/lib/navigation";
import { getStudy, STUDIES, type Media } from "@/lib/caseStudies";

function PieceMedia({ media }: { media: Media }) {
  if (media.kind === "print") {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {media.images.map((img) => (
          <figure key={img.src} className="flex flex-col">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-slate-400">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (media.mobile) {
    return (
      <DeviceShowcase
        desktop={media.src}
        desktopAlt={media.alt}
        desktopFit={media.fit}
        mobile={media.mobile}
        mobileAlt={media.mobileAlt ?? media.alt}
      />
    );
  }

  return <LaptopFrame src={media.src} alt={media.alt} fit={media.fit} />;
}

export function CaseStudyPage({ slug, setPage }: { slug: string; setPage: SetPage }) {
  const study = getStudy(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!study) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-white">Case study not found</h1>
        <p className="mt-3 text-slate-400">That project isn't one we can show — yet.</p>
        <ClippedButton variant="cyan" onClick={() => setPage("home", "work")} className="mt-8">
          <ArrowLeft size={16} /> Back to work
        </ClippedButton>
      </div>
    );
  }

  const [hero, ...rest] = study.pieces;
  const others = STUDIES.filter((s) => s.slug !== study.slug);

  return (
    <article>
      {/* ------------------------------- Hero ------------------------------- */}
      <Section surface="base" bordered={false} className="pb-16 pt-32 md:pb-20 md:pt-40">
        <Glow className="left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 bg-primary/[0.08]" />
        <SectionContainer>
          <button
            onClick={() => setPage("home", "work")}
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            All case studies
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-accent md:text-sm">{study.tag}</div>
            <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
              {study.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">{study.excerpt}</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ClippedLink variant="gold" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit {study.liveLabel}
                <ExternalLink size={16} />
              </ClippedLink>
              <ClippedLink variant="ghost" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Start a project like this
              </ClippedLink>
            </div>
          </motion.div>
        </SectionContainer>
      </Section>

      {/* --------------------------- Primary showcase --------------------------- */}
      <Section surface="raised">
        <Glow className="right-0 top-1/3 h-[380px] w-[520px] bg-secondary/[0.07]" />
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PieceMedia media={hero.media} />
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-slate-400">{hero.blurb}</p>
          </motion.div>

          {study.numbers && (
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
              {study.numbers.map((n, i) => (
                <Stat key={n.l} value={n.v} label={n.l} tone={i % 2 === 0 ? "cyan" : "gold"} />
              ))}
            </div>
          )}
        </SectionContainer>
      </Section>

      {/* ----------------------------- The challenge ----------------------------- */}
      <Section surface="base">
        <SectionContainer>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">The challenge</div>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Where it started.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-slate-300 md:text-xl">{study.challenge}</p>
              <div className="mt-8 rounded-2xl border border-accent/25 bg-accent/[0.06] p-6 md:p-8">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Status</div>
                <p className="mt-3 text-base leading-relaxed text-slate-300">{study.next}</p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </Section>

      {/* ------------------------------ Piece gallery ------------------------------ */}
      {rest.length > 0 && (
        <Section surface="raised">
          <Glow className="left-0 top-1/4 h-[360px] w-[500px] bg-primary/[0.06]" />
          <SectionContainer>
            <SectionHeading kicker="A closer look" tone="cyan" title="Every surface, on brand." align="left" />
            <div className="flex flex-col gap-20 md:gap-28">
              {rest.map((piece, i) => {
                const flip = i % 2 === 1;
                return (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div className={flip ? "lg:order-2" : ""}>
                      <PieceMedia media={piece.media} />
                    </div>
                    <div className={flip ? "lg:order-1" : ""}>
                      <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                        <piece.icon size={16} />
                        {piece.label}
                      </div>
                      <p className="mt-5 text-lg leading-relaxed text-slate-300">{piece.blurb}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SectionContainer>
        </Section>
      )}

      {/* ------------------------------ What we built ------------------------------ */}
      <Section surface="base">
        <SectionContainer>
          <SectionHeading
            kicker="Under the hood"
            tone="gold"
            title="What we built."
            lede="The full scope — the parts you see, and the machinery that makes them run."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {study.build.map((b, i) => (
              <motion.div
                key={b.area}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              >
                <AccentCard tone={i % 2 === 0 ? "cyan" : "gold"} icon={b.icon} title={b.area}>
                  {b.detail}
                </AccentCard>
              </motion.div>
            ))}
          </div>

          {study.stack && (
            <div className="mt-16 border-t border-border pt-12">
              <div className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Built with
              </div>
              <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionContainer>
      </Section>

      {/* --------------------------------- CTA --------------------------------- */}
      <Section surface="raised">
        <Glow className="left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 bg-accent/[0.07]" />
        <SectionContainer className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              Want something built the whole way down?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              That's the whole job. Tell us what's breaking or what you're dreaming up, and we'll figure out the rest
              together.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <ClippedLink variant="gold" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a call
              </ClippedLink>
              <ClippedButton variant="ghost" onClick={() => setPage("home", "work")}>
                <ArrowLeft size={16} /> Back to work
              </ClippedButton>
            </div>
          </motion.div>
        </SectionContainer>
      </Section>

      {/* ------------------------------ Other studies ------------------------------ */}
      {others.length > 0 && (
        <Section surface="base">
          <SectionContainer>
            <div className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">More work</div>
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
                    <div className="mt-1.5 line-clamp-2 font-heading text-base font-bold leading-snug text-white">
                      {s.title}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </button>
              ))}
            </div>
          </SectionContainer>
        </Section>
      )}
    </article>
  );
}
