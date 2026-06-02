import { Check, Clock, ShoppingCart, Sparkles } from "lucide-react";

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

const BUNDLE = {
  name: "Practice Readiness + Revenue Modeler Bundle",
  originalPrice: 494,
  price: 397,
  savings: 97,
  checkoutUrl: "https://buy.stripe.com/9B6eVc2DbbEL1909wL6J205",
  includes: ["Practice Readiness Assessment ($197)", "DPC Revenue & Pricing Modeler ($297)"],
};

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

        {/* Product Grid — 2 columns */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* Bundle & Save Banner */}
        <div className="mt-8 rounded-xl border-2 border-gold/40 bg-gradient-to-r from-gold/5 to-gold/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-5 text-gold" />
                <span className="text-sm font-bold text-gold uppercase tracking-wider">
                  Bundle &amp; Save
                </span>
              </div>
              <h3
                className="text-xl md:text-2xl font-semibold text-navy leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {BUNDLE.name}
              </h3>
              <ul className="mt-3 space-y-1">
                {BUNDLE.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-3.5 text-gold shrink-0" />
                    <span className="text-sm text-navy/65">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <div className="text-center md:text-right">
                <span className="text-sm text-navy/40 line-through">
                  ${BUNDLE.originalPrice}
                </span>
                <p
                  className="text-3xl font-bold text-navy"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ${BUNDLE.price}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Save ${BUNDLE.savings}
                </p>
              </div>
              <a
                href={BUNDLE.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
              >
                <ShoppingCart className="size-4" />
                Buy Bundle
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
