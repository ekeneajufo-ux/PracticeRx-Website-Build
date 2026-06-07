import { useState, useMemo, useCallback, Suspense, lazy } from "react";
import { useSEO } from "../hooks/useSEO";
import { Search, MapPin, ChevronLeft, ChevronRight, Building2, Filter, ExternalLink } from "lucide-react";
import { PROVIDERS, STATES, STATE_NAMES, decodeUrl, type Provider } from "../data/providers";
import { Link } from "react-router-dom";

// USMap temporarily removed due to react-simple-maps dependency conflict
// Can be re-added with alternative mapping library (Leaflet, Mapbox, etc.)

const PER_PAGE = 24;

export function FindAProviderPage() {
  useSEO({
    title: "Find a DPC Provider",
    description: "Search our directory of 750+ direct primary care providers across 45 states. Find a DPC practice near you.",
    path: "/find-a-provider",
  });
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [page, setPage] = useState(1);

  // Filter providers
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PROVIDERS.filter((p) => {
      if (stateFilter && p.state !== stateFilter) return false;
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.zip.includes(q) ||
          p.address.toLowerCase().includes(q) ||
          STATE_NAMES[p.state]?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, stateFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // State counts for dropdown + map
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PROVIDERS.forEach((p) => {
      counts[p.state] = (counts[p.state] || 0) + 1;
    });
    return counts;
  }, []);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleStateFilter = useCallback((val: string) => {
    setStateFilter(val);
    setPage(1);
  }, []);

  const handleMapStateSelect = useCallback((abbr: string) => {
    setStateFilter(abbr);
    setPage(1);
    // Scroll to results on mobile
    const el = document.getElementById("provider-results");
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-navy-light/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold/80 mb-4">
              <MapPin className="size-3.5" />
              Provider Directory
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find a Direct Primary Care{" "}
              <span className="italic text-gold">Provider</span>
            </h1>
            <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Explore {PROVIDERS.length.toLocaleString()} DPC practices across {STATES.length} states.
              Search by name, city, state, or zip code to find a provider near you.
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L48 52C96 44 192 28 288 20C384 12 480 12 576 16C672 20 768 28 864 32C960 36 1056 36 1152 32C1248 28 1344 20 1392 16L1440 12V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>

      {/* Search + Filter Bar (moved up since map is removed) */}
      <section id="provider-results" className="bg-cream pt-6 pb-6 sticky top-16 z-40 border-b border-navy/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-navy/30" />
                <input
                  type="text"
                  placeholder="Search by name, city, zip code..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-navy/10 rounded-xl text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all"
                />
              </div>

              {/* State Filter */}
              <div className="relative sm:w-56">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-navy/30 pointer-events-none" />
                <select
                  value={stateFilter}
                  onChange={(e) => handleStateFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-white border border-navy/10 rounded-xl text-sm text-navy appearance-none focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all cursor-pointer"
                >
                  <option value="">All States</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {STATE_NAMES[s] || s} ({stateCounts[s]})
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-navy/30 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Result count */}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-navy/50">
                {filtered.length === PROVIDERS.length ? (
                  <>Showing all <span className="font-semibold text-navy/70">{PROVIDERS.length.toLocaleString()}</span> providers</>
                ) : (
                  <><span className="font-semibold text-navy/70">{filtered.length.toLocaleString()}</span> provider{filtered.length !== 1 ? "s" : ""} found</>
                )}
              </p>
              {(search || stateFilter) && (
                <button
                  onClick={() => { setSearch(""); setStateFilter(""); setPage(1); }}
                  className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Provider Grid */}
      <section className="bg-cream py-8 md:py-12">
        <div className="container">
          {paged.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paged.map((provider, idx) => (
                  <ProviderCard key={`${provider.name}-${provider.zip}-${idx}`} provider={provider} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, safePage - 1))}
                    disabled={safePage <= 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-navy/70 bg-white border border-navy/10 rounded-lg hover:bg-navy/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="size-4" />
                    Prev
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers(safePage, totalPages).map((p, i) =>
                      p === "..." ? (
                        <span key={`dots-${i}`} className="px-2 text-navy/30">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p as number)}
                          className={`size-9 rounded-lg text-sm font-medium transition-all ${
                            p === safePage
                              ? "bg-navy text-white"
                              : "text-navy/60 hover:bg-navy/5"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                    disabled={safePage >= totalPages}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-navy/70 bg-white border border-navy/10 rounded-lg hover:bg-navy/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="size-7 text-navy/30" />
              </div>
              <h3
                className="text-xl font-semibold text-navy mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                No providers found
              </h3>
              <p className="text-navy/50 text-sm">
                Try a different search term or adjust your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-semibold text-navy leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Want to start your own DPC practice?
            </h2>
            <p className="mt-3 text-navy/60 leading-relaxed">
              PracticeRx helps physicians launch independent, cash-based practices
              in 90 days. From concept to doors open — we handle the playbook.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-navy border border-navy/15 rounded-lg hover:bg-navy/5 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Provider Card with anti-scrape website link ── */
function ProviderCard({ provider }: { provider: Provider }) {
  const handleVisitWebsite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (provider.w) {
        const url = decodeUrl(provider.w);
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [provider.w]
  );

  return (
    <div className="group bg-white rounded-xl border border-navy/[0.06] p-5 hover:shadow-md hover:border-gold/20 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 w-9 h-9 rounded-lg bg-navy/[0.04] flex items-center justify-center group-hover:bg-gold/10 transition-colors">
          <Building2 className="size-4 text-navy/40 group-hover:text-gold transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2">
            {provider.name}
          </h3>
          <p className="mt-1.5 text-xs text-navy/50 leading-relaxed">
            {provider.address}
            <br />
            {provider.city}, {provider.state} {provider.zip}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-navy/[0.04] text-navy/50 rounded-md">
              {provider.state}
            </span>
            {provider.w && (
              <a
                href="#"
                onClick={handleVisitWebsite}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-gold hover:text-gold-dark transition-colors"
                rel="nofollow noopener"
              >
                Visit Website
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pagination helper ── */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}
