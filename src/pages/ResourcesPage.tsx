import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { AISection } from "../components/AISection";
import { FAQSection } from "../components/FAQSection";
import { CTABanner } from "../components/CTABanner";
import { LeadMagnetPopup } from "../components/LeadMagnetPopup";

/* ─── Featured (hand-crafted) blog posts shown first ─── */
const FEATURED_POSTS = [
  {
    slug: "psychiatry-cash-based-dpc-practice-guide",
    tag: "PSYCHIATRY",
    title:
      "How Psychiatrists Can Build a Thriving DPC & Cash-Based Practice",
    excerpt:
      "Insurance reimbursement for psychiatric care has never been worse. A step-by-step guide to structuring a cash-based psychiatry practice with ketamine, TMS, and membership revenue.",
    readTime: "14 min read",
    coverImageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=85&auto=format&fit=crop&crop=top",
  },
  {
    slug: "which-medical-specialties-are-best-for-dpc-cash-based-practices",
    tag: "PRACTICE STRATEGY",
    title:
      "Which Medical Specialties Are Built for DPC & Cash-Based Practices?",
    excerpt:
      "Not every specialty translates equally to an insurance-free model. A data-driven guide to choosing the right niche — family medicine, pediatrics, psychiatry, dermatology, and more.",
    readTime: "12 min read",
    coverImageUrl:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=85&auto=format&fit=crop&crop=top",
  },
  {
    slug: "family-medicine-dpc-transition",
    tag: "FAMILY MEDICINE DPC",
    title: "The Family Medicine Physician's Honest Guide to Going DPC",
    excerpt:
      "The hard part isn't the medicine. Here's the honest version of the financial model, legal landscape, and patient acquisition conversation.",
    readTime: "7 min read",
    coverImageUrl: "/blog-cover-family-medicine-dpc.jpg",
  },
  {
    slug: "vaccine-costs-pediatric-dpc",
    tag: "PRACTICE FINANCE",
    title:
      "Why Vaccine Costs Are the #1 Financial Blind Spot in Pediatric DPC Practices",
    excerpt:
      "Vaccines are the most overlooked cost driver in pediatric DPC practices. Learn procurement strategy, VFC compliance, and membership pricing approaches.",
    readTime: "6 min read",
    coverImageUrl: "/blog-cover-vaccine-costs.jpg",
  },
];


/* Per-slug image position overrides (avoids global CSS changes) */
const COVER_POSITION: Record<string, string> = {
  "90-day-dpc-launch-checklist": "center 30%",
  "which-medical-specialties-are-best-for-dpc-cash-based-practices": "center 30%",
};

export function ResourcesPage() {
  useSEO({
    title: "Blog",
    description: "Expert insights on DPC practice finance, pediatric direct primary care, and physician entrepreneurship from Dr. Ekene Ajufo.",
    path: "/blog",
  });
  // Static articles only — add new posts to FEATURED_POSTS above
  const allArticles = [...FEATURED_POSTS];

  return (
    <div className="bg-cream min-h-screen">
      <LeadMagnetPopup />
      {/* Header */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Blog
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Insights for physicians building{" "}
            <span className="italic text-gold">independent practices.</span>
          </h1>
        </div>
      </section>

      {/* Article Cards */}
      <section className="pb-8 md:pb-10">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-white rounded-xl border border-border/60 flex flex-col hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Cover image */}
                {article.coverImageUrl && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={article.coverImageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      style={COVER_POSITION[article.slug] ? { objectPosition: COVER_POSITION[article.slug] } : undefined}
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                    {article.tag}
                  </span>
                  <h3
                    className="text-lg font-semibold text-navy mt-2 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-navy/50 mt-2 leading-relaxed flex-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    {article.readTime && (
                      <span className="text-xs text-navy/40 flex items-center gap-1">
                        <Clock className="size-3" />
                        {article.readTime}
                      </span>
                    )}
                    <span className="text-sm font-medium text-navy/70 group-hover:text-navy flex items-center gap-1 transition-colors ml-auto">
                      Read article
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AISection />
      <FAQSection />
      <CTABanner />
    </div>
  );
}
