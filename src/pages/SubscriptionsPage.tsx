import { Check, Zap, BookOpen, Layers, Sparkles } from "lucide-react";
import { CTABanner } from "../components/CTABanner";

interface Subscription {
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice?: number;
  annualLabel?: string;
  includes: string[];
  cta: string;
  checkoutUrl: string;
  featured?: boolean;
}

const SUBSCRIPTIONS: Subscription[] = [
  {
    icon: Zap,
    tag: "AI & Productivity",
    tagColor: "bg-purple-50 text-purple-700",
    name: "AI Workflow Digest",
    tagline: "The monthly AI briefing built for busy physicians",
    monthlyPrice: 39,
    annualPrice: 390,
    annualLabel: "$390/yr",
    includes: [
      "Monthly AI tool deep dive (reviewed and tested for physicians)",
      "3 new prompts added to your personal library each month",
      '"Workflow win of the month" — real physician AI case study',
      "AI news relevant to medical practice and DPC",
      "Home & personal productivity AI tip of the month",
    ],
    cta: "Subscribe for $39/mo",
    checkoutUrl: "https://buy.stripe.com/dRm7sK6Tr7ovdVM24j6J207",
    featured: false,
  },
  {
    icon: BookOpen,
    tag: "Resource Library",
    tagColor: "bg-emerald-50 text-emerald-700",
    name: "Operator's Vault",
    tagline: "The resource library that replaces hours of research",
    monthlyPrice: 49,
    annualPrice: 490,
    annualLabel: "$490/yr",
    includes: [
      "50+ templates: SOPs, financial models, legal docs",
      "Monthly new template drop based on member requests",
      "DPC benchmarking data updated quarterly",
      "Vendor comparison guides (EMR, billing, labs)",
      "Private member community access",
    ],
    cta: "Subscribe for $49/mo",
    checkoutUrl: "https://buy.stripe.com/28EdR87Xv38fbNE4cr6J209",
    featured: false,
  },
  {
    icon: Layers,
    tag: "Comprehensive",
    tagColor: "bg-blue-50 text-blue-700",
    name: "Practice OS Membership",
    tagline: "The operating system for physician-owned practices",
    monthlyPrice: 149,
    annualPrice: 1490,
    annualLabel: "$1,490/yr",
    includes: [
      "Everything in Operator's Vault",
      "Monthly group coaching call with Dr. Ajufo",
      "Quarterly 1:1 strategy check-in (30 min)",
      "Priority async support (48-hr response)",
      "Revenue benchmarking & growth tracking",
      "Monthly AI tool spotlight — live demo on group coaching call",
      "Private #ai-tools-and-workflows community channel",
    ],
    cta: "Subscribe for $149/mo",
    checkoutUrl: "https://buy.stripe.com/9B6dR8elTgZ55pg24j6J20a",
    featured: true,
  },
];

interface Bundle {
  name: string;
  includes: string[];
  monthlyPrice: number;
  savings: string;
  cta: string;
  checkoutUrl: string;
}

const BUNDLES: Bundle[] = [
  {
    name: "Starter Bundle",
    includes: ["AI Workflow Digest ($39/mo)", "Operator's Vault ($49/mo)"],
    monthlyPrice: 79,
    savings: "Save $9/mo",
    cta: "Subscribe to Bundle",
    checkoutUrl: "/contact",
  },
  {
    name: "Growth Bundle",
    includes: ["Operator's Vault ($49/mo)", "Practice OS Membership ($149/mo)"],
    monthlyPrice: 179,
    savings: "Save $19/mo",
    cta: "Subscribe to Bundle",
    checkoutUrl: "/contact",
  },
  
  {
    name: "Physician Productivity Bundle",
    includes: [
      "AI Workflow Digest ($39/mo)",
      "Operator's Vault ($49/mo)",
    ],
    monthlyPrice: 79,
    savings: "Save $9/mo",
    cta: "Subscribe to Bundle",
    checkoutUrl: "https://buy.stripe.com/6oUdR87Xv38fcRI24j6J208",
  },
];

function SubscriptionCard({ sub }: { sub: Subscription }) {
  const isExternal = sub.checkoutUrl.startsWith("http");
  return (
    <div
      className={`relative rounded-xl border p-6 flex flex-col ${
        sub.featured
          ? "border-gold bg-cream shadow-lg"
          : "border-border/60 bg-white"
      }`}
    >
      {sub.featured && (
        <div className="absolute -top-3 left-6 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
          Most popular
        </div>
      )}

      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${sub.tagColor}`}
        >
          {sub.tag}
        </span>
        <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center">
          <sub.icon className="size-5 text-navy/60" />
        </div>
      </div>

      {/* Name + Tagline */}
      <h3
        className="text-xl font-semibold text-navy leading-snug"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {sub.name}
      </h3>
      <p className="text-sm text-navy/50 italic mt-1.5">{sub.tagline}</p>

      {/* Price */}
      <div className="mt-4">
        <p
          className="text-3xl font-bold text-navy"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ${sub.monthlyPrice}
          <span className="text-base font-normal text-navy/40">/mo</span>
        </p>
        {sub.annualLabel && (
          <p className="text-xs text-navy/40 mt-0.5">
            Annual: {sub.annualLabel} (save{" "}
            {Math.round(
              ((sub.monthlyPrice * 12 - (sub.annualPrice ?? 0)) /
                (sub.monthlyPrice * 12)) *
                100
            )}
            %)
          </p>
        )}
      </div>

      {/* Includes */}
      <ul className="mt-5 space-y-2.5 flex-1">
        {sub.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="size-3.5 text-gold mt-0.5 shrink-0" />
            <span className="text-sm text-navy/65">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-6">
        {isExternal ? (
          <a
            href={sub.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              sub.featured
                ? "bg-gold text-navy hover:bg-gold-light"
                : "bg-navy text-white hover:bg-navy-light"
            }`}
          >
            {sub.cta}
          </a>
        ) : (
          <a
            href={sub.checkoutUrl}
            className={`block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              sub.featured
                ? "bg-gold text-navy hover:bg-gold-light"
                : "bg-navy text-white hover:bg-navy-light"
            }`}
          >
            {sub.cta}
          </a>
        )}
      </div>
    </div>
  );
}

export function SubscriptionsPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Subscriptions
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Stay sharp.{" "}
            <span className="italic text-gold">Stay ahead.</span>
          </h1>
          <p className="mt-5 text-navy/60 max-w-lg leading-relaxed">
            Ongoing resources, AI tools, and community — designed for
            physician-owners who want to keep growing after launch.
          </p>
        </div>
      </section>

      {/* Subscription Cards */}
      <section className="py-8 md:py-10 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5">
            {SUBSCRIPTIONS.map((sub, i) => (
              <SubscriptionCard key={i} sub={sub} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-10 md:py-14">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Bundle & Save
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Combine memberships.{" "}
            <span className="italic text-gold">Pay less.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {BUNDLES.map((bundle, i) => {
              const isExternal = bundle.checkoutUrl.startsWith("http");
              return (
                <div
                  key={i}
                  className="rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="size-4 text-gold" />
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      Bundle
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold text-navy leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {bundle.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5 flex-1">
                    {bundle.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Check className="size-3.5 text-gold shrink-0" />
                        <span className="text-sm text-navy/65">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gold/20">
                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-2xl font-bold text-navy"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          ${bundle.monthlyPrice}
                          <span className="text-sm font-normal text-navy/40">
                            /mo
                          </span>
                        </p>
                        <p className="text-xs font-semibold text-green-600">
                          {bundle.savings}
                        </p>
                      </div>
                      {isExternal ? (
                        <a
                          href={bundle.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                        >
                          {bundle.cta}
                        </a>
                      ) : (
                        <a
                          href={bundle.checkoutUrl}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                        >
                          {bundle.cta}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
