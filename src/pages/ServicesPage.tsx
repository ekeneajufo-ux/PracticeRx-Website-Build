import { Check, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { CTABanner } from "../components/CTABanner";

const FREE_RESOURCES = [
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
    href: "https://funnels.practicerxconsulting.com/emrguide",
  },
  {
    icon: "📄",
    title: "DPC Launch Templates Library",
    tagline: "Membership agreement, pricing model, and onboarding packet — ready to edit.",
    cta: "Get the free templates",
    href: "https://funnels.practicerxconsulting.com/templateslibrary",
  },
];

const PLANS = [
  {
    tag: "Single Session",
    title: "Strategy Session",
    price: "Starting at $250",
    desc: "A focused call to validate your model, market, and next steps.",
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
    price: "Starting at $3,500",
    desc: "Our flagship, end-to-end engagement to open your doors in 90 days.",
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
    price: "Starting at $750/mo",
    desc: "For practices that are open and ready to scale sustainably.",
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

export function ServicesPage() {
  useSEO({
    title: "Services",
    description:
      "Work directly with Dr. Ekene Ajufo to launch your DPC or concierge practice. Choose from a Strategy Session ($250), Practice Launch ($3,500), or Monthly Advisory ($750/mo) — all with hands-on guidance and a clear 90-day path.",
    path: "/services",
  });

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Services
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight max-w-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Programs designed for{" "}
                <span className="italic text-gold">real launches.</span>
              </h1>
              <p className="mt-5 text-navy/60 max-w-lg leading-relaxed">
                Three ways to work together — whether you&apos;re exploring,
                ready to launch, or scaling an existing practice.
              </p>

              {/* Audience fork */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#coaching"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
                >
                  I want done-with-you coaching
                </a>
                <a
                  href="https://funnels.practicerxconsulting.com/aiworkflowdigest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-navy/20 text-navy text-sm font-semibold hover:bg-cream transition-colors"
                >
                  I want a self-serve resource <ArrowRight className="size-3.5" />
                </a>
                <a
                  href="#free-resources"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-navy/20 text-navy text-sm font-semibold hover:bg-cream transition-colors"
                >
                  Browse free resources <Download className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="/physician-roadmap.jpg"
                alt="The Physician's Roadmap to a Profitable Cash-Based Practice"
                className="w-full max-w-md rounded-xl shadow-lg border border-border/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Coaching Tiers ──────────────────────────────── */}
      <section id="coaching" className="py-8 md:py-10 bg-white">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            The Path
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
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
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  plan.featured
                    ? "border-gold bg-cream shadow-lg"
                    : "border-border/60 bg-white"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-6 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                    Most chosen
                  </div>
                )}
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                  {plan.tag}
                </span>
                <h3
                  className="text-xl font-semibold text-navy mt-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.title}
                </h3>
                <p
                  className="text-lg font-semibold text-navy mt-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.price}
                </p>
                <p className="text-sm text-navy/50 mt-2 leading-relaxed">
                  {plan.desc}
                </p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="size-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-navy/70">{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.href.startsWith("http") ? (
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
                ) : (
                  <Link
                    to={plan.href}
                    className={`mt-6 block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      plan.featured
                        ? "bg-gold text-navy hover:bg-gold-light"
                        : "bg-navy text-white hover:bg-navy-light"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Resources ───────────────────────────────────── */}
      <section id="free-resources" className="py-8 md:py-10 bg-white border-t border-border/40">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Free Resources
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Not ready to pay for{" "}
            <span className="italic text-gold">anything yet?</span>
          </h2>
          <p className="mt-4 text-navy/60 max-w-lg leading-relaxed">
            Start with these free guides and templates — no credit card, no sales
            call required.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {FREE_RESOURCES.map((resource, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-cream p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-lg mb-4">
                  {resource.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-navy leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {resource.title}
                </h3>
                <p className="text-sm text-navy/50 mt-1.5 flex-1">
                  {resource.tagline}
                </p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                >
                  {resource.cta} <ArrowRight className="size-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not ready to commit? ─────────────────────────────── */}
      <section className="py-8 md:py-10 bg-cream border-t border-border/40">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Start Here
            </span>
            <h2
              className="text-2xl md:text-3xl font-semibold text-navy mt-3 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not ready to commit to a full program?
            </h2>
            <p className="mt-4 text-navy/60 leading-relaxed">
              Start with a focused diagnostic or resource. Each is physician-specific,
              delivered fast, and designed to give you clarity — and a clear next step.
            </p>
            <a
              href="https://funnels.practicerxconsulting.com/aiworkflowdigest"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/90 transition-colors"
            >
              Browse self-serve resources <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
