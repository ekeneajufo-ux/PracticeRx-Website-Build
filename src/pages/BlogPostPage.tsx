import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

/* ─── Article hero images & CTA config ─── */
const ARTICLE_CONFIG: Record<
  string,
  { heroImage: string; inlineImage?: string; inlineAlt?: string; ctaTitle: string; ctaDesc: string; ctaButton: string; ctaLink: string }
> = {
  "pricing-your-dpc-membership": {
    heroImage: "/pricing-hero.jpg",
    inlineImage: "/doctor-laptop.jpg",
    inlineAlt: "Physician planning practice finances at her desk",
    ctaTitle: "Need a financial model for your specialty and market?",
    ctaDesc: "A strategy session walks you through the numbers — panel size, pricing, breakeven, and growth — so you can launch with clarity.",
    ctaButton: "Book a strategy call →",
    ctaLink: "/contact",
  },
  "choosing-an-ai-scribe-in-2025": {
    heroImage: "/scribe-hero.jpg",
    inlineImage: "/scribe-consult.jpg",
    inlineAlt: "Doctor and patient during a consultation",
    ctaTitle: "Building a DPC or concierge practice?",
    ctaDesc: "A strategy session can save you months of trial and error on your tech stack — including the right documentation tools for your workflow.",
    ctaButton: "Start an evaluation →",
    ctaLink: "/contact",
  },
  "90-day-dpc-launch-checklist": {
    heroImage: "/launch-hero.jpg",
    inlineImage: "/launch-clinic.jpg",
    inlineAlt: "Modern DPC clinic exam room ready for patients",
    ctaTitle: "Want this customized for your market?",
    ctaDesc: "A strategy session walks you through this checklist tailored to your specialty, your area, and your goal to launch in 90 days.",
    ctaButton: "Book a discovery call →",
    ctaLink: "/contact",
  },
};

/* ─── Default CTA for automated posts ─── */
const DEFAULT_CTA = {
  ctaTitle: "Ready to launch your independent practice?",
  ctaDesc: "A strategy session walks you through the numbers, timeline, and action plan — customized for your specialty and market.",
  ctaButton: "Book a discovery call →",
  ctaLink: "/contact",
};

/* ─── Markdown renderer ─── */
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;
  let inOl = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Images: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<div class="my-6 rounded-2xl overflow-hidden"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="w-full h-auto max-h-[400px] object-cover rounded-2xl" loading="lazy" /></div>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h3>${formatInline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h2>${formatInline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("# ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      html.push(`<h1>${formatInline(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (inOl) { html.push("</ol>"); inOl = false; }
      if (!inList) { html.push("<ul>"); inList = true; }
      html.push(`<li>${formatInline(trimmed.slice(2))}</li>`);
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (!inOl) { html.push("<ol>"); inOl = true; }
      html.push(`<li>${formatInline(trimmed.replace(/^\d+\.\s/, ""))}</li>`);
    } else if (trimmed === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inOl) { html.push("</ol>"); inOl = false; }
      // Check for inline images within a paragraph
      const inlineImgContent = formatInlineImages(formatInline(trimmed));
      html.push(`<p>${inlineImgContent}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  if (inOl) html.push("</ol>");

  return html.join("\n");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold hover:text-gold-dark underline">$1</a>');
}

function formatInlineImages(text: string): string {
  return text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="inline-block max-h-64 rounded-lg my-2" loading="lazy" />'
  );
}

/* ─── Blog Post Page ─── */
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  // Dynamic blog posts via Convex removed — use static page components instead
  const post = null as null | { seoTitle?: string; title: string; seoDescription?: string; excerpt?: string; coverImageUrl?: string; publishedAt: number; slug: string; content: string; tags?: string[] };
  const config = slug ? ARTICLE_CONFIG[slug] : undefined;

  useSEO({
    title: post ? (post.seoTitle || post.title) : undefined,
    description: post ? (post.seoDescription || post.excerpt) : undefined,
    path: slug ? `/blog/${slug}` : "/blog",
    ogImage: post?.coverImageUrl || undefined,
  });

  if (post === undefined) {
    return (
      <div className="container py-20">
        <div className="max-w-3xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-cream rounded w-3/4" />
          <div className="h-4 bg-cream rounded w-1/2" />
          <div className="h-4 bg-cream rounded" />
          <div className="h-4 bg-cream rounded" />
          <div className="h-4 bg-cream rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="container py-10 text-center">
        <h1
          className="text-2xl font-semibold text-navy mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Post Not Found
        </h1>
        <p className="text-navy/50 mb-6">
          This article doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/resources"
          className="text-gold hover:text-gold-dark font-medium"
        >
          ← Back to Resources
        </Link>
      </div>
    );
  }

  // Determine hero image: hardcoded config > coverImageUrl from DB
  const heroImage = config?.heroImage || post.coverImageUrl;
  // CTA: hardcoded config > default
  const cta = config || DEFAULT_CTA;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.seoDescription || post.excerpt,
          author: {
            "@type": "Person",
            name: "Dr. Ekene Ajufo",
            url: "https://www.linkedin.com/in/drajufo",
          },
          publisher: {
            "@type": "Organization",
            name: "PracticeRx Consulting",
            url: "https://practicerxconsulting.com",
          },
          datePublished: post.publishedAt
            ? new Date(post.publishedAt).toISOString().split("T")[0]
            : undefined,
          mainEntityOfPage: `https://practicerxconsulting.com/blog/${post.slug}`,
          image: heroImage || undefined,
        }}
      />
      {/* Back link */}
      <div className="container pt-6">
        <Link
          to="/resources"
          className="inline-flex items-center gap-1 text-sm text-navy/50 hover:text-navy transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Resources
        </Link>
      </div>

      {/* Hero image */}
      {heroImage && (
        <div className="container mt-6">
          <div className="rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <img
              src={heroImage}
              alt={post.title}
              className="w-full h-[240px] md:h-[360px] object-cover"
            />
          </div>
        </div>
      )}

      <article className="py-4 md:py-6">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title.replace(/\.$/, "")}<span className="italic text-gold">.</span>
            </h1>

            {/* Subtitle / excerpt */}
            <p className="text-base md:text-lg text-navy/60 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Content — split mid-article to insert inline image for legacy posts */}
            {(() => {
              const fullHtml = renderMarkdown(post.content);
              if (!config?.inlineImage) {
                return (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: fullHtml }}
                  />
                );
              }
              // Split roughly at the midpoint on a block-level tag boundary
              const tags = fullHtml.split(/(?=<(?:h[1-3]|p|ul|ol|div))/);
              const mid = Math.ceil(tags.length / 2);
              const firstHalf = tags.slice(0, mid).join("");
              const secondHalf = tags.slice(mid).join("");
              return (
                <>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: firstHalf }}
                  />
                  <div className="my-8 rounded-2xl overflow-hidden">
                    <img
                      src={config.inlineImage}
                      alt={config.inlineAlt || ""}
                      className="w-full h-[240px] md:h-[320px] object-cover"
                    />
                  </div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: secondHalf }}
                  />
                </>
              );
            })()}

            {/* Article CTA box */}
            <div className="mt-6 bg-gold/10 border border-gold/20 rounded-xl p-8 text-center">
              <h3
                className="text-xl md:text-2xl font-semibold text-navy mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {cta.ctaTitle}
              </h3>
              <p className="text-sm text-navy/60 leading-relaxed mb-6 max-w-lg mx-auto">
                {cta.ctaDesc}
              </p>
              <Link
                to={cta.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
              >
                {cta.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <div className="container max-w-3xl mx-auto pb-8">
        <div className="border-t border-border/50 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-navy/50">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {(post.tags?.length ?? 0) > 0 && (
                <span className="flex items-center gap-1">
                  <Tag className="size-3" />
                  {post.tags?.join(", ")}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-navy/70">
              Dr. Ekene Ajufo, MD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
