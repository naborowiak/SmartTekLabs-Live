import React from "react";
import { motion } from "framer-motion";
import { ContactForm } from "../ContactForm";
import { ClippedLink, Glow, Section, SectionContainer } from "../ui/design-system";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/site";
import { CalendarDays, MapPin, Mail, Sparkles } from "lucide-react";

interface ContactSectionProps {
  title?: string;
  description?: string;
  defaultService?: string;
}

export function ContactSection({
  title = "Got a night to plan, or something else that needs building?",
  description = "Tell us the date and what you're up against. We'll tell you straight whether we're the right fit.",
  defaultService = ""
}: ContactSectionProps) {
  return (
    <Section id="contact" surface="raised">
      <Glow className="-right-[10%] -top-[20%] h-[600px] w-[600px] bg-primary/10" />

      <SectionContainer>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary md:text-sm">
              <Sparkles size={15} />
              Let's Talk
            </div>

            <h2 className="mb-6 font-heading text-4xl font-bold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {title}
            </h2>

            <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-400 md:text-xl">
              {description}
            </p>

            {/* Booking is the primary action; the form beside this is the slower path
                for people who'd rather write than talk. */}
            <div className="mb-10">
              <ClippedLink variant="gold" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <CalendarDays size={17} />
                Book a 30-minute call
              </ClippedLink>
              <p className="mt-3 text-sm text-slate-500">Free, no pitch — we'll scope it together.</p>
            </div>

            <div className="space-y-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Email Us</p>
                  <span className="text-lg font-medium text-white transition-colors group-hover:text-primary">
                    {CONTACT_EMAIL}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Location</p>
                  <p className="text-lg font-medium text-white">St. Louis, MO</p>
                  <p className="text-sm text-primary">Remote Friendly</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm defaultService={defaultService} className="shadow-2xl shadow-black/50" />
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  );
}
