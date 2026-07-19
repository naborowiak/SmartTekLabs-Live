import React from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import type { SetPage } from "@/lib/navigation";
import archLogo from "@/assets/arch-only-small.png";

export function Footer({ setPage }: { setPage: SetPage }) {
  return (
    <footer className="bg-[#01030B] border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={archLogo} alt="Smart Tek Labs Arch" className="h-8 w-auto" />
              <div className="flex items-center">
                <span className="font-logo font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  SmartTek
                </span>
                <div className="ml-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 clip-button tracking-wider">
                  LABS
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              A boutique digital solutions studio building serious, polished digital work for businesses, event committees, nonprofits, and creators.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 tracking-wide">SERVICES</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {/* Keep in step with the stops in home/Services.tsx */}
              <li><button onClick={() => setPage('events')} className="hover:text-accent transition-colors text-left">Event Experiences</button></li>
              <li><button onClick={() => setPage('home', 'services')} className="hover:text-primary transition-colors text-left">Decks, Dashboards & Signage</button></li>
              <li><button onClick={() => setPage('home', 'services')} className="hover:text-primary transition-colors text-left">Websites That Aren't Templates</button></li>
              <li><button onClick={() => setPage('home', 'services')} className="hover:text-primary transition-colors text-left">AI Automation & Agents</button></li>
              <li><button onClick={() => setPage('home', 'about')} className="hover:text-primary transition-colors text-left">ServiceNow Consulting</button></li>
              <li><button onClick={() => setPage('home', 'about')} className="hover:text-primary transition-colors text-left">Microsoft & Power Platform</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 tracking-wide">EXPLORE</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors text-left">Home</button></li>
              <li><button onClick={() => setPage('home', 'work')} className="hover:text-white transition-colors text-left">Work & Examples</button></li>
              <li><button onClick={() => setPage('home', 'about')} className="hover:text-white transition-colors text-left">About</button></li>
              <li><button onClick={() => setPage('home', 'contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-6 tracking-wide">CONTACT</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>St. Louis, MO</span>
              </li>
              <li className="text-xs mt-4">
                Remote Friendly
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Smart Tek Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
