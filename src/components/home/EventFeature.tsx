import React from "react";
import { motion } from "framer-motion";
import { ClippedButton, Glow, Section, SectionContainer, SectionHeading } from "../ui/design-system";
import { CircleCheck as CheckCircle2, MonitorPlay, Presentation, FileText, QrCode, Ticket, FileSpreadsheet, Gamepad2 } from "lucide-react";
import type { SetPage } from "@/lib/navigation";

const deliverables = [
  { icon: MonitorPlay, text: "Custom event websites & landing pages" },
  { icon: FileSpreadsheet, text: "Live interactive scoreboards" },
  { icon: Presentation, text: "Sponsor recognition slides & loops" },
  { icon: FileText, text: "Polished PowerPoint presentations" },
  { icon: Ticket, text: "Printable PDFs, handouts & materials" },
  { icon: Gamepad2, text: "Raffle, trivia, and game-night graphics" },
  { icon: QrCode, text: "QR code pages and digital info hubs" },
];

export function EventFeature({ setPage }: { setPage: SetPage }) {
  return (
    <Section id="events">
      <Glow className="left-1/2 top-1/2 h-[400px] w-3/4 -translate-x-1/2 -translate-y-1/2 bg-accent/[0.07]" />

      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              kicker="Event Experiences"
              tone="gold"
              align="left"
              title="Make your event feel professionally produced."
              lede="Custom event tech and digital materials for reunions, trivia nights, fundraisers, and community events. Move past generic templates and deliver something that looks polished, runs smoothly, and wows your attendees — and your sponsors."
              className="mb-10 md:mb-12"
            />

            <ClippedButton variant="gold" onClick={() => setPage('events')}>
              View Event Experiences →
            </ClippedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-card p-8 shadow-2xl shadow-accent/[0.07] md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-transparent" />

              <div className="relative z-10">
                <h3 className="mb-8 font-heading text-xl font-bold text-white">Digital Event Deliverables</h3>

                <ul className="space-y-4">
                  {deliverables.map((item) => (
                    <li key={item.text} className="group flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                      <span className="text-slate-300 transition-colors group-hover:text-white">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  );
}
