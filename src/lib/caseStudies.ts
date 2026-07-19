import type { LucideIcon } from "lucide-react";
import {
  Layers, Globe, Monitor, Printer,
  KeyRound, BookOpen, CalendarCheck, MessagesSquare, Images, Handshake, ShieldCheck, Accessibility,
  Camera, Mic, Video, FileCheck, UserCheck, Wallet,
  Smartphone, LayoutGrid, Users, Trophy, Star, Zap, FileText, Clock, Gift, CalendarClock,
  QrCode, Mail,
} from "lucide-react";

// Affton work-grid thumbnail (the live reunion homepage) and the QR contact card
// shown in the poster's collateral row.
import afftonSiteDesktop from "@/assets/affton-site-desktop.jpg";
import afftonContactCard from "@/assets/affton-contact-card.jpg";
// Post-session comms and the branded case file the product generates: the
// Gmail-delivered session email, the clean report email, and page 1 of the
// downloadable Diagnostic Report PDF rasterized to an image.
import taEmailInbox from "@/assets/totalassist-email.png";
import taEmailReport from "@/assets/totalassist-email2.png";
import taReport from "@/assets/totalassist-report.png";
// Fresh captures of the up-to-date TotalAssist build: above-the-fold hero grabs
// plus full-page scroll captures (desktop 1440-wide, mobile 390-wide) that pan
// through the live site inside the laptop/phone frames, and the pricing page.
import taHeroDesktop from "@/assets/ta-desktop-hero.jpg";
import taHeroMobile from "@/assets/ta-mobile-hero.jpg";
import taPricingNew from "@/assets/ta-pricing.jpg";
// Full-page scroll captures of the updated site (optimized from the source
// PNGs) that pan through the laptop/phone frames as an auto "app demo".
import taSiteScroll from "@/assets/totalassist-main.jpg";
import taMobileScroll from "@/assets/totalassist-cell.jpg";

// Fresh multi-breakpoint captures pulled straight from the live affton1976.com
// (desktop 1440×900, tablet 1024×768, mobile 390×845), plus two full-page grabs
// used as auto-scrolling "app demo" panels. Event-production pieces (trivia deck,
// scoreboard, print) aren't on the public site, so those stay the originals above.
import capHomeDesktop from "@/assets/affton-captures/site-desktop.jpg";
import capHomeMobile from "@/assets/affton-captures/mobile-hero.jpg";
import capSponsors from "@/assets/affton-captures/sponsors.jpg";
import capEventsMobile from "@/assets/affton-captures/events-mobile.jpg";
import capContactMobile from "@/assets/affton-captures/contact-mobile.jpg";
import capSponsorsMobile from "@/assets/affton-captures/sponsors-mobile.jpg";
import capYearbook from "@/assets/affton-captures/yearbook.jpg";
import capGallery from "@/assets/affton-captures/gallery.jpg";
import capMemories from "@/assets/affton-captures/memories.jpg";
import capTrivia from "@/assets/affton-captures/trivia.jpg";
import capScoreboard from "@/assets/affton-captures/scoreboard.jpg";
import capTableCard from "@/assets/affton-captures/table-card.jpg";
import capHomeDesktopScroll from "@/assets/affton-captures/home-desktop-scroll.jpg";
import capHomeMobileScroll from "@/assets/affton-captures/home-mobile-scroll.jpg";

// Event-night and platform pieces the earlier captures missed: the raffle-basket
// reel (an 8-second loop), the printed run-of-show, the AIM-style messenger, and
// the admin command center. All shot from the real build.
import capRaffle from "@/assets/affton-raffle.mp4";
import capRafflePoster from "@/assets/affton-raffle-poster.jpg";
import capSchedule from "@/assets/affton-class-schedule.jpg";
import capAim from "@/assets/affton-aim-panel.png";
import capAdmin from "@/assets/affton-admin-console.png";

/**
 * Case studies as a collection. Most of the enterprise work is under NDA, which
 * is why only a couple are public — the section says so rather than letting the
 * gap read as inexperience.
 *
 * HONESTY RULES, both studies:
 *  - Affton's night is Oct 2 2026 and TotalAssist is pre-launch with no real
 *    users. Neither has results. Nothing here claims any.
 *  - TotalAssist's own site markets "our agent handles 90% of issues" — that's a
 *    product claim with no user base behind it yet, so it is NOT repeated here.
 *  - TotalAssist's stack is deliberately absent: the source is on Replit behind
 *    Cloudflare and unverified, and inventing one would be fabrication.
 */
/**
 * Media is keyed by the frame the art belongs in, not by a fit mode, because
 * every asset here has a fixed aspect we already know:
 *
 *  - `device` is for the 16:10 captures (all of them 1600×1000) that fill a
 *    LaptopFrame edge to edge. `mobile` adds the real phone capture beside it.
 *  - `screen` is for art that isn't 16:10 — the 16:9 trivia deck, the 2.19:1
 *    scoreboard. These previously went through LaptopFrame with fit="contain",
 *    which letterboxed them into black bars and hung laptop chrome on a gym
 *    projector slide. They carry their true pixel size so the frame can reserve
 *    the right box before the image loads.
 *  - `print` is paper, which is neither. Portrait and landscape pieces sit side
 *    by side, so each carries its own dimensions rather than being forced into
 *    a shared box.
 *
 * There is deliberately no `fit` option: a mode that crops or letterboxes is a
 * way to put art in the wrong frame and paper over it. Pick the right frame.
 */
export type Media =
  | { kind: "device"; src: string; alt: string; mobile?: string; mobileAlt?: string }
  | { kind: "screen"; src: string; alt: string; w: number; h: number }
  | { kind: "print"; images: { src: string; alt: string; caption: string; w: number; h: number }[] };

export type Piece = { id: string; label: string; icon: LucideIcon; blurb: string; media: Media };

/* ------------------------------------------------------------------ *
 * Poster layout (the all-black flagship case-study presentation).
 *
 * Optional on a Study: when present, CaseStudyPage renders the cinematic
 * poster instead of the standard layout. `scroll` on a device shot turns a
 * tall full-page capture into a slow auto-panning "app demo".
 * ------------------------------------------------------------------ */
export type Shot = { src: string; alt: string };
export type ScrollShot = Shot & { scroll?: boolean };

/* A single labelled, framed piece inside a package showcase. `laptop`/`phone`
 * carry a ScrollShot (tall full-page grabs auto-pan); `screen` is any other
 * flat capture; `video` is the autoplaying raffle loop. */
export type PackageFrame =
  | { kind: "laptop"; label: string; shot: ScrollShot }
  | { kind: "phone"; label: string; shot: ScrollShot }
  | { kind: "screen"; label: string; src: string; alt: string; portrait?: boolean }
  | { kind: "video"; label: string; src: string; poster?: string; alt: string };

export type PosterPill = { icon: LucideIcon; label: string };
export type PosterCollateral = { icon: LucideIcon; title: string; src: string; alt: string; portrait?: boolean };

/* Accent themes a package's border, number badge, pills and frame hovers. */
export type PosterAccent = "purple" | "gold" | "cyan" | "indigo";

/* One numbered "package" panel. `collateral` is the optional titled sub-row
 * beneath the main frames (comms cards, print, signage, case files). */
export type PosterPackage = {
  n: string;
  accent: PosterAccent;
  kicker: string;
  tagline: string;
  live?: string;
  frames: PackageFrame[];
  pills?: PosterPill[];
  collateralTitle?: string;
  collateral?: PosterCollateral[];
};

export type PosterData = {
  // The big hero headline: plain `lines` stacked, then a gradient `accent` line.
  // `gradient` is a Tailwind class string applied to the accent line's text.
  heroTitle: { lines: string[]; accent: string; gradient: string };
  heroCluster: { desktop: Shot; phone: Shot; tablet?: Shot };
  heroStats: { v: string; l: string }[];
  packages: PosterPackage[];
  features: { icon: LucideIcon; title: string; text: string }[];
  // Optional interactive walkthrough (an Arcade embed). `padBottom` is the
  // aspect spacer the embed provider gives, e.g. "calc(54.6079% + 41px)".
  demo?: { heading: string; sub: string; url: string; title: string; padBottom: string };
};

export type Study = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  thumb: string;
  thumbAlt: string;
  liveUrl: string;
  liveLabel: string;
  challenge: string;
  next: string;
  pieces: Piece[];
  build: { icon: LucideIcon; area: string; detail: string }[];
  stack?: string[];
  numbers?: { v: string; l: string }[];
  poster?: PosterData;
};

const AFFTON: Study = {
  slug: "affton",
  tag: "Community Platform",
  title: "How Affton's Class of '76 traded a paper flyer and a spreadsheet for one connected community platform",
  excerpt:
    "Not an event page — a platform. Phone-first login for a class that doesn't all use email, a digital yearbook, real-time chat, photo galleries, a memorial wall, live trivia scoring, sponsor and donation management, and an admin command center. All purple and gold.",
  thumb: afftonSiteDesktop,
  thumbAlt: "Affton Class of '76 reunion registration site",
  liveUrl: "https://affton1976.com",
  liveLabel: "affton1976.com",
  challenge:
    "Fifty years on, the committee was running a milestone reunion on a paper flyer, a spreadsheet, and a phone tree — for a class that doesn't uniformly use email, let alone an app.",
  next: "Built and waiting. The night runs October 2, 2026, for the 300+ classmates expected.",
  pieces: [],
  build: [
    {
      icon: KeyRound,
      area: "Identity, built for the audience",
      detail:
        "Phone-first login — because a class of '76 doesn't all do email. A 3-step wizard fuzzy-matches your name against the class directory, then a “Is this you?” photo step stops duplicate accounts before they start.",
    },
    {
      icon: BookOpen,
      area: "The digital yearbook",
      detail:
        "A searchable directory where each classmate's yearbook photo and current photo cross-fade every six seconds. Maiden names handled. For those who've passed, a candle takes the place of the current photo.",
    },
    {
      icon: CalendarCheck,
      area: "Events & RSVP",
      detail:
        "Card, list, and calendar views; attendee facepiles; party size and dietary needs; add-to-calendar. Admins edit it all through a WYSIWYG with drafts and capacity limits.",
    },
    {
      icon: Monitor,
      area: "Trivia night, scored live",
      detail:
        "A branded MC deck and a grade-book scoreboard that tallies and ranks itself as judges enter scores — no spreadsheet, no maths at the front table between rounds.",
    },
    {
      icon: MessagesSquare,
      area: "Real-time chat",
      detail:
        "An AIM-style buddy list — a deliberate nod to the era these classmates lived through. Live delivery over Supabase Realtime, read receipts, unread badges, GIFs.",
    },
    {
      icon: Images,
      area: "Galleries & memories",
      detail:
        "Masonry gallery with lightbox, filters, and an admin approval queue before anything goes public. A GSAP scroll timeline of milestones, and an In Memoriam wall with a flickering flame.",
    },
    {
      icon: Handshake,
      area: "Sponsors & donations",
      detail:
        "Sponsor applications with logo upload and address autocomplete, a pending → approved → paid workflow, dual notification emails, and an infinite logo marquee. Donations track against a $5,000 goal, live.",
    },
    {
      icon: Printer,
      area: "Print that matches the pixels",
      detail:
        "Sponsor-laden table cards and QR contact cards, designed to the same purple and gold — so the room and the screens read as one event rather than two.",
    },
    {
      icon: ShieldCheck,
      area: "An admin command center",
      detail:
        "Stats, approval queues, and inline page editing — admins click any text and it becomes editable, auto-saving to the CMS. The committee runs the whole thing without calling anyone.",
    },
    {
      icon: Accessibility,
      area: "Read aloud, on purpose",
      detail:
        "Text-to-speech narration of the site via the Web Speech API, with voice selection — built for classmates who can't comfortably read it. Fifty years on, that matters.",
    },
  ],
  stack: [
    "React", "TypeScript", "Vite", "Tailwind",
    "Supabase Postgres", "Supabase Auth", "Realtime", "Storage",
    "Edge Functions", "Resend", "GSAP", "FullCalendar",
  ],
  // The reader here is a reunion committee chair who found us by word of mouth,
  // not an engineer evaluating our schema. "12 Postgres tables" tells them
  // nothing they can act on; what they want to know is whether this covers their
  // night and spares them the spreadsheet. Every figure is already asserted
  // elsewhere in this study — 300+ from `next`, the count of ten from `build`,
  // the goal from the sponsors entry — so the strip stays true without claiming
  // a result the event hasn't had yet. Labels stay short enough to sit on one
  // line in a four-up strip; a couple wrapping and the rest not looks broken.
  numbers: [
    { v: "300+", l: "Classmates it serves" },
    { v: "10", l: "Jobs in one place" },
    { v: "$5,000", l: "Donation goal, live" },
    { v: "0", l: "Spreadsheets to keep" },
  ],
  poster: {
    heroTitle: {
      lines: ["Affton High", "Class of 1976"],
      accent: "50-Year Reunion",
      gradient: "from-accent via-[#f7d987] to-accent",
    },
    heroCluster: {
      desktop: { src: capHomeDesktop, alt: "Affton Class of 1976 reunion homepage on desktop — purple and gold, live countdown, Register Now" },
      phone: { src: capHomeMobile, alt: "The reunion site on a phone: stacked detail cards and buttons" },
    },
    heroStats: [
      { v: "50", l: "Years" },
      { v: "350+", l: "Classmates" },
      { v: "1", l: "Weekend" },
      { v: "Countless", l: "Memories" },
    ],
    packages: [
      {
        n: "01",
        accent: "purple",
        kicker: "Website Platform",
        tagline: "The digital home for our reunion community.",
        live: "affton1976.com",
        frames: [
          { kind: "laptop", label: "Website Homepage", shot: { src: capHomeDesktopScroll, alt: "The full Affton reunion homepage on desktop, purple and gold", scroll: true } },
          { kind: "phone", label: "Mobile Experience", shot: { src: capHomeMobileScroll, alt: "The full Affton reunion homepage on a phone", scroll: true } },
          { kind: "laptop", label: "Admin Portal", shot: { src: capAdmin, alt: "Affton reunion admin dashboard: classmates, registrations, donations and RSVPs, with a searchable classmate table" } },
        ],
        pills: [
          { icon: Images, label: "Gallery" },
          { icon: Users, label: "Classmates" },
          { icon: Wallet, label: "Donations" },
          { icon: Handshake, label: "Sponsors" },
          { icon: CalendarCheck, label: "Events" },
        ],
        collateralTitle: "Communications & Collateral",
        collateral: [
          { icon: MessagesSquare, title: "AIM Messenger", src: capAim, alt: "Affton Instant Messenger buddy list — classmates chatting in real time", portrait: true },
          { icon: BookOpen, title: "Digital Yearbook", src: capYearbook, alt: "Affton digital yearbook directory of classmate then-and-now photos" },
          { icon: QrCode, title: "QR Contact Card", src: afftonContactCard, alt: "Affton Class of 1976 contact card with a QR code linking to the reunion site" },
        ],
      },
      {
        n: "02",
        accent: "gold",
        kicker: "Trivia Night Experience",
        tagline: "Interactive fun, live engagement, and memorable moments.",
        frames: [
          { kind: "screen", label: "Live Scoreboard", src: capScoreboard, alt: "Trivia Night Grade Book scoreboard with per-round scores, totals and placings" },
          { kind: "screen", label: "Trivia Deck / Slides", src: capTrivia, alt: "Chalkboard trivia night title slide, Welcome Back Cougars — Affton Class of 1976" },
          { kind: "video", label: "Raffle Baskets", src: capRaffle, poster: capRafflePoster, alt: "A looping reel of themed raffle baskets assembled for the reunion" },
        ],
        collateralTitle: "Schedule & Signage",
        collateral: [
          { icon: CalendarClock, title: "Printed Schedule", src: capSchedule, alt: "Affton Class of 1976 reunion run-of-show schedule, printed in purple and gold", portrait: true },
          { icon: Printer, title: "Sponsor Table Card", src: capTableCard, alt: "Affton trivia table card ringed with local sponsor logos", portrait: true },
          { icon: Handshake, title: "Sponsor Wall", src: capSponsors, alt: "The reunion site's sponsor wall of local business logos" },
        ],
      },
    ],
    features: [
      { icon: Monitor, title: "Responsive Website", text: "Beautiful on every device" },
      { icon: Smartphone, title: "Mobile Experience", text: "Seamless & intuitive" },
      { icon: ShieldCheck, title: "Admin Tools", text: "Powerful & easy to manage" },
      { icon: Mail, title: "Email Campaigns", text: "Engage & inform" },
      { icon: Zap, title: "Live Scoreboard", text: "Real-time excitement" },
      { icon: Layers, title: "Trivia Collateral", text: "Slides, signage & more" },
      { icon: Printer, title: "Event Signage", text: "Professional & on-brand" },
      { icon: Users, title: "Community First", text: "Built for connection" },
    ],
  },
};

const TOTALASSIST: Study = {
  slug: "totalassist",
  tag: "AI Product",
  title: "How TotalAssist turned home tech support into four taps instead of a phone tree",
  excerpt:
    "A 24/7 AI support product for the tech in your house. Describe it, photograph it, talk it through, or point a camera at it — then tap through the fix. When the AI stalls, a human takes over with the full history, and every fix is saved as a shareable case.",
  thumb: taHeroDesktop,
  thumbAlt: "TotalAssist landing page with an AI Guided Support demo",
  liveUrl: "https://totalassist.tech",
  liveLabel: "totalassist.tech",
  challenge:
    "Home tech breaks at 9pm, and the options are a phone tree, a forum thread from 2013, or paying someone to drive out on Tuesday. Support that's actually available tends to be either expensive or useless.",
  next: "Built and live at totalassist.tech — pre-launch, up and running ahead of its first customers.",
  pieces: [],
  build: [
    {
      icon: MessagesSquare,
      area: "Assist Pills, not jargon",
      detail:
        "Triage by tapping. Instead of asking a panicking human to describe a router, it offers the next sensible choice — “Slow speeds”, “Keeps dropping”, “Can't connect” — and narrows from there.",
    },
    {
      icon: Camera,
      area: "Photo analysis",
      detail: "Snap the blinking light, the error screen, the tangle behind the TV, and get a diagnosis from the picture.",
    },
    {
      icon: Mic,
      area: "Voice support",
      detail: "Hands-free guidance for when you're under a desk with both hands full and no way to read a screen.",
    },
    {
      icon: Video,
      area: "Video diagnostic",
      detail: "Point the camera at the problem for real-time visual guidance — the thing you'd want a competent friend for.",
    },
    {
      icon: UserCheck,
      area: "Human takeover, with context",
      detail:
        "When the agent can't finish the job, a real technician picks it up holding the whole conversation — so nobody has to start over.",
    },
    {
      icon: FileCheck,
      area: "Every fix becomes a case",
      detail:
        "Timestamped, downloadable, shareable. So the next person who touches it — or you, in a year — knows exactly what was done.",
    },
  ],
  numbers: [
    { v: "4", l: "Ways to ask for help" },
    { v: "$0", l: "Free plan, no card" },
    { v: "24/7", l: "Always awake" },
    { v: "3", l: "Simple plans" },
  ],
  poster: {
    heroTitle: {
      lines: ["Home tech support", "in four taps —"],
      accent: "not a phone tree",
      gradient: "from-[#22D3EE] via-[#38BDF8] to-[#818CF8]",
    },
    heroCluster: {
      desktop: { src: taHeroDesktop, alt: "TotalAssist landing page on desktop — Guided Support walking a customer through a fix, Problem → Guided fix → Resolved" },
      phone: { src: taHeroMobile, alt: "TotalAssist on a phone, showing the responsive mobile layout" },
    },
    heroStats: [
      { v: "4", l: "Ways to ask" },
      { v: "24/7", l: "Always awake" },
      { v: "$0", l: "Free to start" },
      { v: "3", l: "Simple plans" },
    ],
    packages: [
      {
        n: "01",
        accent: "cyan",
        kicker: "The App & Website",
        tagline: "A live AI that triages your home tech — four ways to ask, on any device.",
        live: "totalassist.tech",
        frames: [
          { kind: "laptop", label: "Landing & Live Demo", shot: { src: taSiteScroll, alt: "The full TotalAssist landing page — Guided Support, how it works, and the live AI demo", scroll: true } },
          { kind: "phone", label: "Mobile Experience", shot: { src: taMobileScroll, alt: "The full TotalAssist site on a phone, scrolling through the mobile layout", scroll: true } },
          { kind: "laptop", label: "Plans & Pricing", shot: { src: taPricingNew, alt: "TotalAssist pricing: Free, Home (most popular) and Pro plans, monthly or annual" } },
        ],
        pills: [
          { icon: MessagesSquare, label: "Describe it" },
          { icon: Camera, label: "Photograph it" },
          { icon: Mic, label: "Talk it through" },
          { icon: Video, label: "Point a camera" },
          { icon: UserCheck, label: "Human takeover" },
        ],
      },
      {
        n: "02",
        accent: "indigo",
        kicker: "Case Files & Follow-up",
        tagline: "Every session becomes a shareable diagnostic report — emailed as a branded PDF.",
        frames: [
          { kind: "screen", label: "Session Email", src: taEmailReport, alt: "TotalAssist diagnostic report email with a report summary and resolution details", portrait: true },
          { kind: "screen", label: "Diagnostic Report (PDF)", src: taReport, alt: "Page one of the TotalAssist Diagnostic Report PDF: executive summary, session details and issue summary", portrait: true },
        ],
        pills: [
          { icon: FileCheck, label: "Resolution summary" },
          { icon: MessagesSquare, label: "Full transcript" },
          { icon: Star, label: "Recommendations" },
        ],
      },
    ],
    features: [
      { icon: MessagesSquare, title: "Live AI Chat", text: "Triage in seconds" },
      { icon: Camera, title: "Photo Diagnosis", text: "Snap the problem" },
      { icon: Mic, title: "Voice Support", text: "Hands-free help" },
      { icon: Video, title: "Video Diagnostic", text: "Point & fix" },
      { icon: UserCheck, title: "Human Takeover", text: "With full context" },
      { icon: FileCheck, title: "Case Reports", text: "Emailed as a PDF" },
      { icon: Monitor, title: "Responsive Site", text: "Beautiful on every device" },
      { icon: Wallet, title: "Honest Pricing", text: "Free plan, no card" },
    ],
    demo: {
      heading: "See it in action",
      sub: "Walk through a real Wi-Fi troubleshooting session — from diagnosis to case report.",
      url: "https://demo.arcade.software/mQTnZSy0FqkBmcbbbk0U?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true",
      title: "Resolve a Wi-Fi outage and download the case report",
      padBottom: "calc(54.6079% + 41px)",
    },
  },
};

export const STUDIES: Study[] = [AFFTON, TOTALASSIST];

export function getStudy(slug: string): Study | undefined {
  return STUDIES.find((s) => s.slug === slug);
}
