import { ArrowRight, BarChart2 } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { CTABanner } from "../components/CTABanner";

const FREE_GUIDES = [
  {
    icon: "📘",
    title: "DPC Practice Launch Guide",
    tagline: "The core 90-day playbook — checklist, financial template, EMR guide, and membership agreement.",
    cta: "Get the free guide",
    href: "https://funnels.practicerxconsulting.com/freeguide-page",
  },
  {
    icon: "🗺️",
    title: "State-by-State DPC Launch Guide",
    tagline: "Is DPC even legal where you live? All 50 states, plus 12 deep dives.",
    cta: "Get the free guide",
    href: "https://funnels.practicerxconsulting.com/stateguides",
  },
  {
    icon: "🖥️",
    title: "DPC EMR Vendor Comparison Guide",
    tagline: "10 EMRs compared honestly — pricing, features, and real trade-offs.",
    cta: "Get the free guide",
    href: "https://funnels.practicerxconsulting.com/emrguide-page",
  },
  {
    icon: "📄",
    title: "DPC Launch Templates Library",
    tagline: "Membership agreement, pricing model, and onboarding packet — ready to edit.",
    cta: "Get the free templates",
    href: "https://funnels.practicerxconsulting.com/templateslibrary",
  },
];

export function FreeGuidesPage() {
  useSEO({
    title: "Free Guides",
    description:
      "Free, no-credit-card resources for physicians building a DPC or concierge practice: launch guide, state-by-state legal guide, EMR comparison, templates library, and a free practice audit.",
    path: "/free-guides",
  });

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Free Guides
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight max-w-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Everything you need to{" "}
            <span className="italic text-gold">start exploring — free.</span>
          </h1>
          <p className="mt-5 text-navy/60 max-w-lg leading-relaxed">
            No credit card, no sales call required. Pick the resource that
            matches where you are right now.
          </p>
        </div>
      </section>

      {/* ── Guide Cards ──────────────────────────────────────── */}
      <section className="pb-8 md:pb-10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {FREE_GUIDES.map((guide, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-cream p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-lg mb-4">
                  {guide.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-navy leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {guide.title}
                </h3>
                <p className="text-sm text-navy/50 mt-1.5 flex-1">
                  {guide.tagline}
                </p>
                <a
                  href={guide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                >
                  {guide.cta} <ArrowRight className="size-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Practice Audit ──────────────────────────────── */}
      <section className="py-8 md:py-10 bg-white border-t border-border/40">
        <div className="container">
          <div className="rounded-xl border border-gold/40 bg-cream p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <BarChart2 className="size-5 text-gold" />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold text-navy leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Not sure where to start? Get a Free Practice Audit.
                </h3>
                <p className="text-sm text-navy/50 mt-1.5 max-w-md">
                  A quick, personalized look at your practice or launch plan —
                  no cost, no obligation.
                </p>
              </div>
            </div>
            <a
              href="https://funnels.practicerxconsulting.com/practiceaudit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shrink-0"
            >
              Get my free audit <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
