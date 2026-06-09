import { Check, Clock, ShoppingCart, BarChart2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  tag: string;
  tagColor: string;
  name: string;
  tagline: string;
  delivery: string;
  deliverables: string[];
  price: number;
  checkoutUrl: string;
}

const PRODUCTS: Product[] = [
  {
    tag: "Diagnostic",
    tagColor: "bg-blue-50 text-blue-700",
    name: "Practice Readiness Assessment",
    tagline: "Is your practice actually ready to go DPC?",
    delivery: "Delivered in 48 hours",
    deliverables: [
      "Scored readiness report (PDF)",
      "Dimension-by-dimension breakdown",
      "Top 3 gaps to address",
      "30-min debrief call",
    ],
    price: 197,
    checkoutUrl: "https://funnels.practicerxconsulting.com/readinessassessment",
  },
  {
    tag: "Financial Tool",
    tagColor: "bg-emerald-50 text-emerald-700",
    name: "DPC Revenue & Pricing Modeler",
    tagline: "Find your membership price and break-even point",
    delivery: "Self-serve + 1 live walkthrough",
    deliverables: [
      "Custom DPC financial model (Excel/Google Sheet)",
      "Recommended pricing tiers",
      "Break-even analysis",
      "60-min walkthrough call",
    ],
    price: 297,
    checkoutUrl: "https://funnels.practicerxconsulting.com/pricingmodeler-page",
  },
  {
    tag: "Marketing",
    tagColor: "bg-purple-50 text-purple-700",
    name: "Patient Acquisition Audit",
    tagline: "Why aren't patients finding your practice?",
    delivery: "Delivered in 72 hours",
    deliverables: [
      "Digital presence scorecard",
      "Top 5 acquisition opportunities",
      "30-day quick-win action list",
      "45-min strategy call",
    ],
    price: 247,
    checkoutUrl: "https://funnels.practicerxconsulting.com/audit-page",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-border/60 p-6 flex flex-col hover:shadow-md transition-shadow">
      {/* Tag + Delivery */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${product.tagColor}`}
        >
          {product.tag}
        </span>
        <div className="flex items-center gap-1 text-navy/40">
          <Clock className="size-3" />
          <span className="text-[11px]">{product.delivery}</span>
        </div>
      </div>

      {/* Name + Tagline */}
      <h3
        className="text-lg font-semibold text-navy leading-snug"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {product.name}
      </h3>
      <p className="text-sm text-navy/50 italic mt-1.5">{product.tagline}</p>

      {/* Deliverables */}
      <ul className="mt-4 space-y-2 flex-1">
        {product.deliverables.map((d, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="size-3.5 text-gold mt-0.5 shrink-0" />
            <span className="text-sm text-navy/65">{d}</span>
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="mt-5 pt-5 border-t border-border/40">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-2xl font-bold text-navy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ${product.price}
            </p>
            <p className="text-[11px] text-navy/40">One-time payment</p>
          </div>
          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
          >
            <ShoppingCart className="size-3.5" />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

function FreeAuditCard() {
  return (
    <div className="bg-navy rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-6 mb-5">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
            <BarChart2 className="size-4.5 text-gold" />
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold/20 text-gold">
            100% Free
          </span>
        </div>
        <h3
          className="text-xl font-semibold text-white leading-snug"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Free Practice Freedom Audit
        </h3>
        <p className="text-sm text-white/60 italic mt-1">
          Not sure where you stand? Start here — on us.
        </p>
        <ul className="mt-3 space-y-1.5">
          {[
            "Digital presence grade (A–F)",
            "Local market opportunity score",
            "Revenue liberation estimate",
            "Top 3 personalized opportunities",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="size-3.5 text-gold mt-0.5 shrink-0" />
              <span className="text-sm text-white/70">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="shrink-0">
        <div className="mb-2">
          <p
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            $0
          </p>
          <p className="text-[11px] text-white/40">Delivered in 24 hours</p>
        </div>
        <Link
          to="/free-audit"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-gold text-navy rounded-lg hover:bg-gold/90 transition-colors whitespace-nowrap"
        >
          Get My Free Audit
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function DiagnosticProducts() {
  return (
    <section id="products" className="py-10 md:py-14 bg-background">
      <div className="container">
        {/* Header */}
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/40">
          Entry-Level Products
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Not sure where to start?{" "}
          <span className="italic text-gold">Begin here.</span>
        </h2>
        <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
          Physician-specific diagnostics and tools designed to give you clarity
          fast — and a clear path forward.
        </p>

        {/* Free Audit featured card */}
        <div className="mt-8">
          <FreeAuditCard />
        </div>

        {/* Product Grid — 2 columns */}
        <div className="grid md:grid-cols-2 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
