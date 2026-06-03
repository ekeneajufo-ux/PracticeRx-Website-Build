import { Check, Clock, Flame, DollarSign, Download } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { CTABanner } from "../components/CTABanner";
import { FAQSection } from "../components/FAQSection";
import { AISection } from "../components/AISection";
import { AIForPhysicians } from "../components/AIForPhysicians";
import { Testimonial } from "../components/Testimonial";
import { Process } from "../components/Process";
import { DiagnosticProducts } from "../components/DiagnosticProducts";
import { GuidesResources } from "../components/GuidesResources";
import { LeadMagnetPopup } from "../components/LeadMagnetPopup";

const FREE_GUIDE_URL = "https://funnels.practicerxconsulting.com/freeguide-page";

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="pt-6 pb-8 md:pt-10 md:pb-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white border border-border/60 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm">✨</span>
              <span className="text-xs font-medium text-navy/70">For physicians ready to go independent</span>
            </div>
            <h1
              className="text-5xl md:text-5xl lg:text-[4.2rem] font-semibold text-navy leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Launch your DPC or concierge practice in{" "}
              <span className="italic text-gold">90 days.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-navy/60 max-w-lg leading-relaxed">
              A proven playbook, hands-on coaching, and the AI-powered tools you
              need to build a thriving independent practice &mdash; without the
              burnout.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={FREE_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="size-5" />
                Download Free Launch Guide
              </a>
              <a
                href="https://funnels.practicerxconsulting.com/strategysession"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-navy border-2 border-navy/20 rounded-lg hover:bg-navy/5 transition-colors"
              >
                Book a Free Discovery Call
              </a>
            </div>
            {/* Trusted by badge */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <div className="w-7 h-7 rounded-full bg-gold/30 border-2 border-cream" />
                <div className="w-7 h-7 rounded-full bg-navy/20 border-2 border-cream" />
                <div className="w-7 h-7 rounded-full bg-gold/50 border-2 border-cream" />
              </div>
              <p className="text-xs text-navy/50">Trusted by 40+ physician founders</p>
            </div>
          </div>

          {/* Right: Image placeholder + stats badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gold/20 to-gold/5">
              <img
                src="/hero-clinic.jpg"
                alt="Modern clinic interior with a physician"
                className="w-full h-[420px] md:h-[560px] object-cover"
              />
            </div>
            {/* Stats badge */}
            <div className="absolute -bottom-4 -left-4 md:bottom-6 md:-left-8 bg-white rounded-xl shadow-lg border border-border/50 px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="size-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-navy">96% retention</p>
                <p className="text-[10px] text-navy/50">across active members</p>
              </div>
            </div>
            {/* 90 days badge */}
            <div className="absolute top-4 right-4 bg-gold/90 text-navy rounded-lg px-4 py-2">
              <p className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>90 days</p>
              <p className="text-[10px] font-medium">to open doors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: "90 days", label: "To launch" },
    { value: "80%", label: "Lower overhead" },
    { value: "96%", label: "Patient retention" },
    { value: "2x", label: "Income potential" },
  ];
  return (
    <section className="py-5 border-y border-border/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p
                className="text-3xl md:text-4xl font-semibold text-navy tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.value}
              </p>
              <p className="text-sm text-navy/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-navy/35 mt-4">
          Figures based on industry benchmarks and DPC practice data.
        </p>
      </div>
    </section>
  );
}

/* ─── Problem Section ─── */
function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "15 minutes per patient",
      desc: "Insurance-driven volume erodes quality, relationships, and the joy of practicing medicine.",
    },
    {
      icon: Flame,
      title: "Burnout is the default",
      desc: "Endless documentation, prior auths, and admin overhead leave little room for actual care.",
    },
    {
      icon: DollarSign,
      title: "Income tied to coding",
      desc: "Revenue depends on billing complexity instead of the value you actually deliver.",
    },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          The Problem
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The system is broken.{" "}
          <span className="italic text-navy/70">You don&apos;t have to be.</span>
        </h2>
        <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
          Independent practice gives you back the time, autonomy, and income
          that the system has quietly taken away.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border/60 p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
                <p.icon className="size-5 text-navy/60" />
              </div>
              <h3 className="text-base font-semibold text-navy">{p.title}</h3>
              <p className="text-sm text-navy/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services / Pricing Cards ─── */
function ServicesSection() {
  const plans = [
    {
      tag: "Single Session",
      title: "Strategy Session",
      desc: "A focused call to validate your model, market, and next steps.",
      price: "Starting at $250",
      features: [
        "60-minute deep dive",
        "Custom roadmap",
        "Model selection: DPC vs concierge",
        "Action items in 24 hours",
      ],
      cta: "Book session",
      href: "https://funnels.practicerxconsulting.com/strategysession",
      featured: false,
    },
    {
      tag: "12-Week Program",
      title: "Practice Launch",
      desc: "Our flagship, end-to-end engagement to open your doors in 90 days.",
      price: "Starting at $3,500",
      features: [
        "Weekly 1:1 coaching",
        "Legal, EMR, and ops playbooks",
        "Patient acquisition system",
        "Pricing & membership design",
        "Done-with-you implementation",
      ],
      cta: "Apply now",
      href: "https://funnels.practicerxconsulting.com/12weekfunnelconsulting",
      featured: true,
    },
    {
      tag: "Ongoing",
      title: "Monthly Advisory",
      desc: "For practices that are open and ready to scale sustainably.",
      price: "Starting at $750/month",
      features: [
        "Monthly strategy calls",
        "Async support & reviews",
        "Team & systems coaching",
        "Quarterly growth plan",
      ],
      cta: "Get started",
      href: "https://funnels.practicerxconsulting.com/monthlysessions-page",
      featured: false,
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          The Path
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          A clear path to{" "}
          <span className="italic text-gold">independence.</span>
        </h2>
        <p className="mt-4 text-navy/60 max-w-lg leading-relaxed">
          Whatever stage you&apos;re in, there&apos;s a way forward designed
          around the realities of building a real practice.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-xl border p-6 flex flex-col ${
                plan.featured
                  ? "border-navy bg-navy shadow-lg"
                  : "border-border/60 bg-white"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  Most chosen
                </div>
              )}
              <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${plan.featured ? "text-gold" : "text-gold"}`}>
                {plan.tag}
              </span>
              <h3
                className={`text-xl font-semibold mt-2 ${plan.featured ? "text-white" : "text-navy"}`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {plan.title}
              </h3>
              <p className={`text-sm mt-2 leading-relaxed ${plan.featured ? "text-white/70" : "text-navy/50"}`}>
                {plan.desc}
              </p>
              <p className={`text-xs mt-2 italic ${plan.featured ? "text-gold/70" : "text-navy/40"}`}>
                {plan.price}
              </p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="size-4 text-gold mt-0.5 shrink-0" />
                    <span className={`text-sm ${plan.featured ? "text-white/80" : "text-navy/70"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  plan.featured
                    ? "bg-gold text-navy hover:bg-gold-light"
                    : "bg-navy text-white hover:bg-navy-light"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Lead Magnet Section ─── */
function LeadMagnetSection() {
  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left column */}
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Free Resource
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get the DPC Practice{" "}
              <span className="italic text-gold">Launch Guide.</span>
            </h2>
            <p className="mt-4 text-navy/60 text-base md:text-lg leading-relaxed">
              Everything you need to open your doors &mdash; in one place.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Phase-by-phase launch checklist",
                "Financial modeling template",
                "EMR & tech stack guide",
                "Membership agreement template",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="size-4 text-gold shrink-0" />
                  <span className="text-sm text-navy/70">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={FREE_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="size-5" />
                Download Free Guide
              </a>
            </div>
          </div>

          {/* Right column — Guide cover mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-[280px] md:w-[320px]">
              {/* Shadow / depth */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-navy/10 rounded-xl" />
              {/* Guide cover */}
              <div className="relative bg-navy rounded-xl p-8 md:p-10 flex flex-col items-center text-center shadow-xl">
                {/* Logo circle */}
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <span
                    className="text-xl font-bold text-gold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Rx
                  </span>
                </div>
                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-semibold text-white leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  DPC Practice<br />Launch Guide
                </h3>
                {/* Divider */}
                <div className="w-12 h-0.5 bg-gold/50 mt-4 mb-4" />
                {/* Subtitle */}
                <p className="text-xs text-white/50 uppercase tracking-[0.15em]">
                  PracticeRx Consulting
                </p>
                {/* Page preview lines */}
                <div className="mt-6 w-full space-y-2">
                  <div className="h-1.5 bg-white/10 rounded w-full" />
                  <div className="h-1.5 bg-white/10 rounded w-4/5" />
                  <div className="h-1.5 bg-white/10 rounded w-3/5" />
                  <div className="h-1.5 bg-white/10 rounded w-4/5" />
                  <div className="h-1.5 bg-white/10 rounded w-2/3" />
                </div>
                {/* Bottom accent */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                  <p className="text-[10px] text-white/40">Free Download</p>
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Founder Section ─── */
function FounderSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/dr-ajufo-circle.png"
              alt="Dr. Ekene Ajufo, MD, FAAP — Founder of PracticeRx Consulting"
              className="w-72 md:w-80 lg:w-96 h-auto drop-shadow-lg"
            />
          </div>

          {/* Text */}
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Meet The Founder
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Dr. Ekene Ajufo,{" "}
              <span className="italic text-gold">MD, FAAP</span>
            </h2>
            <p className="mt-2 text-sm font-medium text-navy/50 tracking-wide">
              MD &middot; Practicing Pediatrician &middot; AI Healthcare Business Consultant
            </p>
            <p className="mt-5 text-navy/60 leading-relaxed">
              Dr. Ekene Ajufo is a practicing pediatrician and healthcare
              entrepreneur who has navigated the business of medicine firsthand.
              With experience across multiple practice locations and a deep
              understanding of the DPC and cash-pay model, she brings
              physician-to-physician insight to every engagement.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Board-certified pediatrician (FAAP)",
                "Mentored physicians into independence",
                "Founded cash-based practices",
                "Clinical AI consultant: Stanford & ABAIM AI Certified",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="size-4 text-gold shrink-0" />
                  <span className="text-sm text-navy/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export function HomePage() {
  useSEO({ path: "/" });
  return (
    <div>
      <LeadMagnetPopup />
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <ServicesSection />
      <DiagnosticProducts />
      <GuidesResources />
      <AIForPhysicians />
      <LeadMagnetSection />
      <AISection />
      <FounderSection />
      <Process />
      <Testimonial />
      <FAQSection />
      <CTABanner />
    </div>
  );
}
