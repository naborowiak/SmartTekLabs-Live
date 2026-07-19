import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { ClippedLink } from './ui/design-system';
import { CALENDLY_URL } from '@/lib/site';
import type { PageName, SetPage } from '@/lib/navigation';
import archLogo from '@/assets/arch-only-small.png';

interface NavbarProps {
  activePage: PageName;
  setPage: SetPage;
}

type NavLink = { label: string; page: 'home' | 'events'; sectionId?: string };

const navLinks: NavLink[] = [
  { label: 'Home', page: 'home' },
  { label: 'Services', page: 'home', sectionId: 'services' },
  { label: 'Event Experiences', page: 'events' },
  { label: 'Work', page: 'home', sectionId: 'work' },
  { label: 'About', page: 'home', sectionId: 'about' },
  { label: 'Contact', page: 'home', sectionId: 'contact' },
];

export function Navbar({ activePage, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'events', sectionId?: string) => {
    setMobileMenuOpen(false);
    setPage(page, sectionId);
  };

  // Only whole-page links get the active treatment; section links stay muted.
  const isActive = (link: NavLink) => !link.sectionId && link.page === activePage;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-primary/20" : "bg-transparent py-6"
      )}
    >
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      )}
      
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNavClick('home')}
        >
          <img src={archLogo} alt="Smart Tek Labs Arch" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          <div className="flex items-center">
            <span className="font-logo font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              SmartTek
            </span>
            <div className="ml-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 clip-button tracking-wider">
              LABS
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.page, link.sectionId)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                isActive(link) ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.label}
            </button>
          ))}

          <ClippedLink
            variant="gold"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm"
          >
            Book a call
          </ClippedLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.page, link.sectionId)}
              className={cn(
                "text-left text-lg font-medium py-2 border-b border-border/50 transition-colors",
                isActive(link) ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
          <ClippedLink
            variant="gold"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a call
          </ClippedLink>
        </div>
      )}
    </header>
  );
}
