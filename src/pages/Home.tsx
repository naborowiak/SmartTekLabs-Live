import React from "react";
import { Hero } from "../components/home/Hero";
import { EventFeature } from "../components/home/EventFeature";
import { CaseStudy } from "../components/home/CaseStudy";
import { Services } from "../components/home/Services";
import { HowWeWork } from "../components/home/HowWeWork";
import { About } from "../components/home/About";
import { ContactSection } from "../components/home/ContactSection";
import type { SetPage } from "@/lib/navigation";

/**
 * Order is the argument: lead with events (the work we want more of, and the only
 * work with real screenshots), prove it immediately, then widen to the full range.
 * The ServiceNow/Microsoft specialties are real but unillustrated, so they sit
 * inside About as background on the person rather than holding a section of claims.
 *
 * Surfaces alternate base/raised down the page — adjacent sections sharing a
 * surface visually merge, so this sequence has to be re-checked whenever a
 * section is added or removed.
 */
export function Home({ setPage }: { setPage: SetPage }) {
  return (
    <main>
      <Hero setPage={setPage} />
      <EventFeature setPage={setPage} />
      <CaseStudy setPage={setPage} />
      <Services setPage={setPage} />
      <HowWeWork />
      <About />
      <ContactSection />
    </main>
  );
}
