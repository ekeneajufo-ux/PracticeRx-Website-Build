import { Check, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { CTABanner } from "../components/CTABanner";
import { DiagnosticProducts } from "../components/DiagnosticProducts";
import { GuidesResources } from "../components/GuidesResources";

const PLANS = [
  {
    tag: "Single Session",
    title: "Strategy Session",
    desc: "A focused call to validate your model, market, and next steps.",
    features: [
      "60-minute deep dive",
      "Custom roadmap",
      "Model selection: DPC vs concierge",
      "Action items in 24 hours",
    ],
    cta: "Book session",
    featured: false,
  },
  {
    tag: "12-Week Program",
    title: "Practice Launch",
    desc: "Our flagship, end-to-end engagement to open your doors in 90 days.",
    features: [
      "Weekly 1:1 coaching",
      "Legal, EMR, and ops playbooks",
      "Patient acquisition system",
      "Pricing & membership design",
      "Done-with-you implementation",
    ],
    cta: "Apply now",
    featured: true,
  },
  {
    tag: "Ongoing",
    title: "Monthly Advisory",
    desc: "For practices that are open and ready to scale sustainably.",
    features: [
      "Monthly strategy calls",
      "Async support & reviews",
      "Team & systems coaching",
      "Quarterly growth plan",
    ],
    cta: "Get started",
    featured: false,
  },
];

const STEPS = [
  {
    num: "01",
    title: "Discovery call",
    desc: "We learn your goals, market, and constraints — and map the realistic path.",
  },
  {
    num: "02",
    title: "Design & build",
    desc: "Model, ops, tech stack, and brand. Every piece engineered to launch.",
  },
  {
    num: "03",
    title: "Launch & grow",
    desc: "Open your doors with a patient pipeline and a system you can scale.",
  },
];

export function ServicesPage() {
  useSEO({
    title: "Services",
    description: "Expert consulting services for physicians launching DPC, concierge, and cash-based practices. From business formation to patient acquisition.",
    path: "/services",
  });
  return (
    <div>
      {/* Header */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: text */}
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
                Three ways to work together — whether you&apos;re just exploring,
                ready to launch, or scaling an existing practice.
              </p>
            </div>
            {/* Right: infographic */}
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

      {/* Pricing Cards */}
      <section className="py-8 md:py-10 bg-white">
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
                <Link
                  to="/contact"
                  className={`mt-6 block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                    plan.featured
                      ? "bg-gold text-navy hover:bg-gold-light"
                      : "bg-navy text-white hover:bg-navy-light"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Workflow Optimization */}
      <section className="py-8 md:py-10">
        <div className="container">
          <div className="rounded-xl border-2 border-purple-200/60 bg-gradient-to-br from-purple-50/40 to-white p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: details */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Brain className="size-6 text-purple-600" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                    AI &amp; Productivity
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-semibold text-navy leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  AI Workflow Optimization
                </h3>
                <p className="text-sm text-navy/50 italic mt-1.5">
                  Stop doing manually what AI can do in seconds
                </p>
                <p className="mt-4 text-sm text-navy/60 leading-relaxed">
                  A done-with-you audit of your clinical and personal workflow —
                  identifying the top 10 tasks AI can handle or accelerate, with a
                  custom implementation plan, tool recommendations, and a 25-prompt
                  library built for physician life.
                </p>
              </div>

              {/* Right: deliverables + CTA */}
              <div>
                <ul className="space-y-2.5">
                  {[
                    "Custom AI opportunity report (top 10 tasks identified)",
                    "Tool recommendation stack for your practice type",
                    "60-min live implementation call",
                    "25-prompt physician library (clinical + personal)",
                    "30-day async follow-up check-in",
                  ].map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="size-3.5 text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-navy/65">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p
                      className="text-3xl font-bold text-navy"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      $497
                    </p>
                    <p className="text-[11px] text-navy/40">One-time payment</p>
                  </div>
                  <a
                    href="https://buy.stripe.com/4gM14mfpXcIPg3UdN16J206"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-md"
                  >
                    Book AI Audit — $497
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-10 md:py-14">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            The Process
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            From idea to open doors in{" "}
            <span className="italic text-gold">90 days.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border/60 p-6"
              >
                <p
                  className="text-4xl font-semibold text-gold/40 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.num}
                </p>
                <h3 className="text-base font-semibold text-navy">{s.title}</h3>
                <p className="text-sm text-navy/50 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entry-Level Products */}
      <DiagnosticProducts />

      {/* Guides & Resources */}
      <GuidesResources />

      <CTABanner />
    </div>
  );
}
