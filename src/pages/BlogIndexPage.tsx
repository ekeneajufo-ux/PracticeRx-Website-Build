import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

/* ─── Blog Posts ─── */
const BLOG_POSTS = [
  {
    slug: "family-medicine-dpc-transition",
    category: "Family Medicine DPC",
    title:
      "The Family Medicine Physician's Honest Guide to Going DPC",
    excerpt:
      "The hard part isn't the medicine. Here's the honest version of the financial model, legal landscape, and patient acquisition conversation.",
    readTime: "7 min read",
  },
  {
    slug: "vaccine-costs-pediatric-dpc",
    category: "Practice Finance",
    title:
      "Why Vaccine Costs Are the #1 Financial Blind Spot in Pediatric DPC Practices (And What to Do About It)",
    excerpt:
      "Vaccines are the most overlooked cost driver in pediatric DPC practices. Learn procurement strategy, VFC compliance, and membership pricing approaches.",
    readTime: "6 min read",
  },
];

export function BlogIndexPage() {
  useSEO({
    title: "Blog",
    description: "Expert insights on DPC practice finance, pediatric direct primary care, and physician entrepreneurship from Dr. Ekene Ajufo.",
    path: "/blog",
  });

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="pt-10 pb-8 md:pt-14 md:pb-10">
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

      {/* Post Cards */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-border/60 flex flex-col hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                    {post.category}
                  </span>
                  <h3
                    className="text-lg font-semibold text-navy mt-2 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-navy/50 mt-2 leading-relaxed flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-navy/40 flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                    <span className="text-sm font-medium text-navy/70 group-hover:text-navy flex items-center gap-1 transition-colors">
                      Read Post
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
