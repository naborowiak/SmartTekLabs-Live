import React, { useState } from "react";
import { ClippedButton } from "./ui/design-system";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  defaultService?: string;
  className?: string;
}

export function ContactForm({ defaultService = "", className }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend call, just show success state
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className={cn("relative overflow-hidden rounded-lg border border-primary/30 bg-card p-12 text-center", className)}>
        <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-primary"></div>
        
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-heading font-bold text-white mb-2">Message received</h3>
        <p className="text-muted-foreground">We'll get back to you shortly to discuss your project.</p>
        
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm text-primary hover:text-white transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-border bg-card p-8", className)}>
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-primary/50"></div>
      <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-primary/50"></div>
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-primary/50"></div>
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-primary/50"></div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
          <input 
            type="text" 
            id="name" 
            required 
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Your name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
          <input 
            type="email" 
            id="email" 
            required 
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-slate-300">What can we help with?</label>
          <select 
            id="service" 
            defaultValue={defaultService}
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
          >
            {/* Keep these in step with the cards in home/Services.tsx */}
            <option value="" disabled>Select a service area</option>
            <option value="Event Experiences">Event Experiences</option>
            <option value="Websites That Aren't Templates">Websites</option>
            <option value="AI Automation & Agents">AI Automation & Agents</option>
            <option value="ServiceNow Consulting">ServiceNow Consulting</option>
            <option value="Microsoft & Power Platform">Microsoft & Power Platform</option>
            <option value="Decks, Dashboards & Signage">Decks, Dashboards & Signage</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
          <textarea 
            id="message" 
            required 
            rows={4}
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>
        
        <ClippedButton variant="gold" className="w-full" type="submit">
          Send Message
        </ClippedButton>
      </form>
    </div>
  );
}
