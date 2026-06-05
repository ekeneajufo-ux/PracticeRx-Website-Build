import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import blogData from "../../public/blog-data.json";

export function BlogIndexPage() {
  useSEO({
    title: "Blog",
    description: "Expert insights on DPC practice finance, pediatric direct primary care, and physician entrepreneurship from Dr. Ekene Ajufo.",
    path: "/blog",
  });

  const blogs = blogData.blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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
            {blogs.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-border/60 flex flex-col hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Cover Image */}
                {post.coverImageUrl && (
                  <div className="h-40 overflow-hidden bg-gray-200">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                    {post.tags?.[0] || "Article"}
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
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
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
