import { ArrowLeft, Clock } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

/* ─── Scoped styles for the specialty article components ─── */
const scopedStyles = `
  .spec-article .stat-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--color-navy);
    border: 1px solid var(--color-navy);
    border-radius: 14px;
    overflow: hidden;
    margin: 2.5rem 0;
  }
  .spec-article .stat-cell {
    background: var(--color-cream);
    padding: 1.5rem 1.25rem;
    text-align: center;
  }
  .spec-article .stat-num {
    font-family: var(--font-heading);
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--color-gold);
    line-height: 1;
    margin-bottom: 0.4rem;
  }
  .spec-article .stat-label {
    font-size: 0.79rem;
    color: var(--color-navy);
    opacity: 0.6;
    line-height: 1.4;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .spec-article .toc {
    background: var(--color-cream);
    border: 1px solid rgba(27,43,75,0.12);
    border-radius: 14px;
    padding: 1.5rem 1.75rem;
    margin: 2.5rem 0;
  }
  .spec-article .toc h3 {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-navy);
    opacity: 0.5;
    margin-bottom: 1rem;
  }
  .spec-article .toc ol { padding-left: 1.25rem; }
  .spec-article .toc ol li { margin-bottom: 0.45rem; }
  .spec-article .toc a { color: var(--color-gold); text-decoration: none; font-size: 0.9rem; }
  .spec-article .toc a:hover { text-decoration: underline; }
  .spec-article .inline-img {
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    margin: 2rem 0;
  }
  .spec-article .inline-img img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    object-position: top;
    display: block;
    border-radius: 14px;
  }
  .spec-article .inline-img.short img { height: 240px; }
  .spec-article .inline-img figcaption {
    font-size: 0.78rem;
    color: rgba(27,43,75,0.45);
    padding: 0.6rem 0 0;
    font-style: italic;
    letter-spacing: 0.02em;
  }
  .spec-article .img-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2rem 0;
  }
  .spec-article .img-pair figure { border-radius: 12px; overflow: hidden; }
  .spec-article .img-pair img { width: 100%; height: 220px; object-fit: cover; object-position: top; display: block; }
  .spec-article .specialty-card {
    border: 1px solid rgba(27,43,75,0.12);
    border-radius: 18px;
    overflow: hidden;
    margin: 2.25rem 0;
    background: #fff;
  }
  .spec-article .specialty-card-img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    object-position: top;
    display: block;
  }
  .spec-article .specialty-header {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.4rem 1.75rem 1.1rem;
    border-bottom: 1px solid rgba(27,43,75,0.10);
  }
  .spec-article .specialty-icon {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.9rem;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }
  .spec-article .specialty-name {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color-navy);
    margin: 0 0 0.2rem;
    line-height: 1.25;
  }
  .spec-article .model-tag {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.22rem 0.65rem;
    border-radius: 100px;
    margin-top: 0.2rem;
  }
  .spec-article .specialty-body { padding: 1.25rem 1.75rem 1.6rem; }
  .spec-article .specialty-body p { margin-bottom: 1rem; font-size: 0.97rem; }
  .spec-article .specialty-body p:last-of-type { margin-bottom: 0; }
  .spec-article .pill-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
  .spec-article .pill {
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.25rem 0.7rem;
    border-radius: 100px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .spec-article .callout {
    background: var(--color-cream);
    border-left: 4px solid var(--color-gold);
    border-radius: 0 12px 12px 0;
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: rgba(27,43,75,0.7);
    font-size: 1rem;
  }
  .spec-article .callout strong { color: var(--color-navy); font-style: normal; font-weight: 500; }
  .spec-article .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2rem 0;
  }
  .spec-article .comparison-col { background: var(--color-cream); border-radius: 12px; padding: 1.25rem 1.4rem; }
  .spec-article .comparison-col h4 {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(27,43,75,0.12);
  }
  .spec-article .comparison-col ul { list-style: none; padding: 0; }
  .spec-article .comparison-col ul li {
    font-size: 0.88rem;
    color: rgba(27,43,75,0.7);
    padding: 0.3rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.45;
  }
  .spec-article .comparison-col ul li::before { font-size: 0.7rem; margin-top: 0.25rem; flex-shrink: 0; }
  .spec-article .col-pro h4 { color: #2e7d32; }
  .spec-article .col-pro ul li::before { content: "✓"; color: #2e7d32; font-weight: 700; }
  .spec-article .col-con h4 { color: var(--color-gold); }
  .spec-article .col-con ul li::before { content: "→"; color: var(--color-gold); font-weight: 700; }
  .spec-article hr.section-rule { border: none; border-top: 1px solid rgba(27,43,75,0.12); margin: 3rem 0; }
  .spec-article .lead {
    font-family: var(--font-heading);
    font-size: 1.18rem;
    font-weight: 300;
    font-style: italic;
    color: rgba(27,43,75,0.7);
    line-height: 1.7;
    border-left: 3px solid var(--color-gold);
    padding-left: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .spec-article h2.section-title {
    font-family: var(--font-heading);
    font-size: 1.85rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-navy);
    margin: 3.5rem 0 1rem;
    line-height: 1.2;
  }
  @media (max-width: 640px) {
    .spec-article .stat-strip { grid-template-columns: 1fr; }
    .spec-article .comparison-grid { grid-template-columns: 1fr; }
    .spec-article .img-pair { grid-template-columns: 1fr; }
    .spec-article .specialty-card-img { height: 200px; }
    .spec-article .inline-img img { height: 220px; }
  }
`;

export function DpcSpecialtiesBlogPage() {
  useSEO({
    title: "Best Medical Specialties for Direct Primary Care & Cash-Based Practices",
    description: "Discover which medical specialties thrive in DPC and cash-based practice models. Learn why family medicine, pediatrics, psychiatry, dermatology, and more are primed for physician-owned, insurance-free practices.",
    path: "/blog/which-medical-specialties-are-best-for-dpc-cash-based-practices",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Which Medical Specialties Are Built for DPC & Cash-Based Practices?",
          description:
            "Discover which medical specialties thrive in DPC and cash-based practice models. Learn why family medicine, pediatrics, psychiatry, dermatology, and more are primed for physician-owned, insurance-free practices.",
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
          datePublished: "2026-05-12",
          mainEntityOfPage:
            "https://practicerxconsulting.com/blog/which-medical-specialties-are-best-for-dpc-cash-based-practices",
          image:
            "https://practicerxconsulting.com/blog-cover-family-medicine-specialty.jpg",
        }}
      />
      <style>{scopedStyles}</style>

      {/* Back link */}
      <div className="container pt-6 pb-2">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-navy/50 hover:text-navy transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>
      </div>

      <div className="container pb-16">
        <div className="flex gap-10 justify-center">
          {/* Main Article Column */}
          <article className="w-full max-w-[740px] spec-article">
            {/* Category Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Practice Strategy
              </span>
              <span className="text-navy/20">·</span>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Practice Growth
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-navy leading-[1.15] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Which Medical Specialties Are{" "}
              <em className="italic">Built</em> for DPC &amp; Cash-Based
              Practices?
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border/50">
              <img
                src="/dr-ajufo-circle.png"
                alt="Dr. Ekene Ajufo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-navy">
                  By Dr. Ekene Ajufo, MD{" "}
                  <span className="text-navy/40">|</span>{" "}
                  <span className="text-navy/60">PracticeRx Consulting</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-navy/40">
                  <span>May 12, 2026</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    12 min read
                  </span>
                </div>
              </div>
            </div>

            {/* ══════════════ Article Body ══════════════ */}
            <div className="article-body text-[16px] md:text-[17px] leading-[1.8] text-navy/80">
              <p className="lead">
                The direct primary care revolution isn't just for family medicine
                anymore. Across the country, physician owners in a growing list
                of specialties are shedding the insurance hamster wheel — and
                building practices that are more profitable, more personal, and
                far more sustainable.
              </p>

              {/* Hero inline image */}
              <figure className="inline-img">
                <img
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A diverse group of physicians collaborating in a modern clinical setting"
                  loading="lazy"
                />
                <figcaption>
                  Today's physician-owned practices look like the communities
                  they serve — and that diversity is a competitive advantage.
                </figcaption>
              </figure>

              <p>
                If you're a physician owner evaluating whether the DPC or
                cash-based model is right for you, the specialty you practice
                matters enormously. Some fields align almost perfectly with a
                membership or fee-for-service cash structure. Others require more
                creative packaging. And a few face genuine structural headwinds
                that make the transition harder — at least for now.
              </p>

              <p>
                This guide breaks down the specialties best positioned for
                success in the direct care space, the payment model that fits
                each one, and what you need to know before making the leap.
              </p>

              {/* Stats Strip */}
              <div className="stat-strip">
                <div className="stat-cell">
                  <div className="stat-num">$25K+</div>
                  <div className="stat-label">
                    Annual cost savings vs fee-for-service for a solo DPC
                    practice
                  </div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">55K</div>
                  <div className="stat-label">
                    Projected primary care physician shortage by 2034
                  </div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">$75–$150</div>
                  <div className="stat-label">
                    Median monthly DPC membership fee (per individual)
                  </div>
                </div>
              </div>

              {/* TOC */}
              <div className="toc">
                <h3>In this article</h3>
                <ol>
                  <li>
                    <a href="#why-it-matters">
                      Why specialty selection matters in cash-based medicine
                    </a>
                  </li>
                  <li>
                    <a href="#top-specialties">
                      The top specialties for DPC &amp; cash-based care
                    </a>
                  </li>
                  <li>
                    <a href="#payment-models">
                      Membership vs. fee-for-service: which model fits you?
                    </a>
                  </li>
                  <li>
                    <a href="#considerations">
                      Key factors before making the switch
                    </a>
                  </li>
                  <li>
                    <a href="#next-steps">Your next steps</a>
                  </li>
                </ol>
              </div>

              {/* ── WHY IT MATTERS ── */}
              <h2 className="section-title" id="why-it-matters">
                Why Specialty Selection Matters
              </h2>

              <p>
                The DPC and cash-pay model isn't a one-size-fits-all solution. It
                thrives where three conditions exist:{" "}
                <strong>
                  predictable, recurring patient relationships
                </strong>
                ;{" "}
                <strong>
                  services patients genuinely value enough to pay out-of-pocket
                </strong>
                ; and{" "}
                <strong>
                  a clinical scope that isn't entirely dependent on expensive
                  in-facility procedures covered by insurance
                </strong>
                .
              </p>

              <p>
                Specialties built around ongoing relationships, chronic disease
                management, preventive care, or elective and cosmetic services
                naturally check all three boxes. Highly procedural surgical
                fields face steeper friction — though innovative cash-pay surgery
                centers and direct specialty care (DSC) models are changing that
                calculus fast.
              </p>

              <figure className="inline-img short">
                <img
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A physician having a personal, engaged conversation with a patient — the cornerstone of DPC"
                  loading="lazy"
                />
                <figcaption>
                  The DPC relationship is built on unhurried time with patients —
                  something the insurance model rarely allows.
                </figcaption>
              </figure>

              <div className="callout">
                <strong>The core insight:</strong> The most successful cash-based
                physician owners pick a specialty that aligns with what patients
                are <em>already</em> willing to pay for directly — then remove
                the middleman.
              </div>

              <hr className="section-rule" />

              {/* ── TOP SPECIALTIES ── */}
              <h2 className="section-title" id="top-specialties">
                The Top Specialties for DPC &amp; Cash-Based Care
              </h2>

              {/* 1. FAMILY MEDICINE */}
              <div className="specialty-card" id="family-medicine">
                <img
                  className="specialty-card-img"
                  src="/blog-cover-family-medicine-specialty.jpg"
                  alt="A family medicine doctor consulting with an elderly patient in a warm clinic setting"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#EAF3DE", color: "#3B6D11" }}
                  >
                    FM
                  </div>
                  <div>
                    <h3 className="specialty-name">Family Medicine</h3>
                    <div
                      className="model-tag"
                      style={{ background: "#EAF3DE", color: "#3B6D11" }}
                    >
                      Best fit: Membership / DPC
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Family medicine is the original home of the DPC movement —
                    and for good reason. It checks every box: longitudinal
                    relationships, wide scope of acute and chronic care,
                    preventive medicine, and a patient panel that spans cradle to
                    grave. The administrative burden of insurance billing has hit
                    family physicians harder than almost any other specialty,
                    making the DPC escape hatch especially attractive.
                  </p>
                  <p>
                    A typical DPC family medicine panel runs 400–600 patients
                    (versus 2,000–3,000 in traditional insurance practices), with
                    monthly membership fees ranging from $75 to $150 per adult.
                    This dramatically changes the economics of patient
                    interaction — longer visits, same-day availability, and
                    direct physician messaging become genuine differentiators
                    rather than aspirational goals.
                  </p>
                  <p>
                    Family physicians in DPC models who operate in markets with
                    even modest affluence — or who serve employer groups and
                    self-insured businesses — routinely report strong financial
                    performance alongside dramatically reduced burnout.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#EAF3DE", color: "#3B6D11" }}
                    >
                      Membership model
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#EAF3DE", color: "#3B6D11" }}
                    >
                      Telehealth-friendly
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#EAF3DE", color: "#3B6D11" }}
                    >
                      Employer partnerships
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#EAF3DE", color: "#3B6D11" }}
                    >
                      Low overhead
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. PEDIATRICS */}
              <div className="specialty-card" id="pediatrics">
                <img
                  className="specialty-card-img"
                  src="/blog-cover-pediatrics-specialty.jpg"
                  alt="A pediatrician examining a smiling young child with a stethoscope in a bright pediatric clinic"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#EEEDFE", color: "#534AB7" }}
                  >
                    PD
                  </div>
                  <div>
                    <h3 className="specialty-name">Pediatrics</h3>
                    <div
                      className="model-tag"
                      style={{ background: "#EEEDFE", color: "#534AB7" }}
                    >
                      Best fit: Membership / DPC
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Pediatrics is one of the most underrated specialties for the
                    cash-based model. Parents — especially those in dual-income
                    households — place an extraordinarily high value on
                    immediate, personalized access to their child's physician. A
                    DPC pediatrician who answers texts on a Sunday afternoon and
                    offers same-day sick visits is providing something that
                    insurance-based practices structurally cannot replicate.
                  </p>
                  <p>
                    Pediatric DPC memberships typically price per family or per
                    child, with tiered structures that make it accessible across
                    income levels. The chronic care management component —
                    asthma, ADHD, allergies, behavioral health — adds
                    substantial membership value. Concierge pediatrics targeting
                    high-income families represents an even more premium version
                    of this model.
                  </p>
                  <p>
                    As a pediatrician building a cash-based practice, your
                    greatest marketing asset is the depth of the relationship you
                    build with families — something parents will pay a meaningful
                    premium to preserve.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#EEEDFE", color: "#534AB7" }}
                    >
                      Family membership tiers
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#EEEDFE", color: "#534AB7" }}
                    >
                      High parental willingness to pay
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#EEEDFE", color: "#534AB7" }}
                    >
                      Chronic care add-ons
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. INTERNAL MEDICINE */}
              <div className="specialty-card" id="internal-medicine">
                <img
                  className="specialty-card-img"
                  style={{ objectPosition: "center" }}
                  src="https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="A modern clinic waiting room with comfortable seating and reception desk"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#E1F5EE", color: "#0F6E56" }}
                  >
                    IM
                  </div>
                  <div>
                    <h3 className="specialty-name">Internal Medicine</h3>
                    <div
                      className="model-tag"
                      style={{ background: "#E1F5EE", color: "#0F6E56" }}
                    >
                      Best fit: Concierge / DPC
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Internal medicine physicians who transition to concierge or
                    direct primary care models can command membership fees
                    significantly above the family medicine average — often
                    $3,000–$10,000 annually — particularly when targeting an
                    affluent adult demographic managing complex chronic
                    conditions. The key is positioning: internists are the
                    specialists of primary care, and high-income patients with
                    multiple comorbidities will pay for that depth of expertise.
                  </p>
                  <p>
                    The concierge medicine model (sometimes called "retainer
                    medicine") fits internal medicine particularly well. Annual
                    retainer arrangements, comprehensive executive physicals, and
                    proactive wellness packages are all proven revenue streams.
                    In markets like Houston, this model can yield
                    $300,000–$400,000+ at a fraction of a traditional patient
                    panel size.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#E1F5EE", color: "#0F6E56" }}
                    >
                      High-ticket memberships
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#E1F5EE", color: "#0F6E56" }}
                    >
                      Executive health market
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#E1F5EE", color: "#0F6E56" }}
                    >
                      Concierge-ready
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. PSYCHIATRY */}
              <div className="specialty-card" id="psychiatry">
                <img
                  className="specialty-card-img"
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A psychiatrist or therapist in a calm, thoughtfully designed private practice office"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#FAEEDA", color: "#854F0B" }}
                  >
                    PS
                  </div>
                  <div>
                    <h3 className="specialty-name">
                      Psychiatry &amp; Mental Health
                    </h3>
                    <div
                      className="model-tag"
                      style={{ background: "#FAEEDA", color: "#854F0B" }}
                    >
                      Best fit: Fee-for-service / Subscription hybrid
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Psychiatry has undergone a remarkable transformation in the
                    cash-pay space. Insurance reimbursement for psychiatric
                    services has historically been poor relative to the
                    complexity of care provided, driving many psychiatrists to
                    opt out of insurance panels entirely — and patients have
                    followed. Out-of-pocket psychiatric care is among the most
                    accepted forms of self-pay medicine in America.
                  </p>
                  <p>
                    Cash-pay psychiatrists benefit from an enormous
                    demand-supply imbalance: wait times at insurance-accepting
                    practices commonly run 3–6 months, making same-week cash
                    access a genuinely compelling proposition. Interventional
                    psychiatry — adding TMS, ketamine infusion, or esketamine
                    (Spravato) — layers a high-margin procedural component onto
                    what is otherwise a purely cognitive specialty, significantly
                    boosting practice revenue.
                  </p>
                  <p>
                    Telehealth extends geographic reach without the overhead of
                    additional brick-and-mortar locations, making a lean,
                    high-margin solo or small group practice highly achievable.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#FAEEDA", color: "#854F0B" }}
                    >
                      Telehealth-native
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAEEDA", color: "#854F0B" }}
                    >
                      Ketamine / TMS add-ons
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAEEDA", color: "#854F0B" }}
                    >
                      Strong demand gap
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAEEDA", color: "#854F0B" }}
                    >
                      Low overhead
                    </span>
                  </div>
                  <div style={{ marginTop: "1.25rem" }}>
                    <Link
                      to="/blog/psychiatry-cash-based-dpc-practice-guide"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "#534AB7",
                        textDecoration: "none",
                      }}
                    >
                      Read the full psychiatry practice guide →
                    </Link>
                  </div>
                </div>
              </div>

              {/* 5. DERMATOLOGY */}
              <div className="specialty-card" id="dermatology">
                <img
                  className="specialty-card-img"
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A dermatologist examining a patient's skin in a modern, clean clinical space"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#FAECE7", color: "#993C1D" }}
                  >
                    DM
                  </div>
                  <div>
                    <h3 className="specialty-name">Dermatology</h3>
                    <div
                      className="model-tag"
                      style={{ background: "#FAECE7", color: "#993C1D" }}
                    >
                      Best fit: Fee-for-service / Hybrid
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Dermatology sits at the intersection of medical and cosmetic
                    care — a uniquely powerful position in the cash-pay
                    landscape. Insurance covers medically necessary skin
                    conditions, but the growth engine for cash-based dermatology
                    practices is cosmetic and elective services: Botox, filler,
                    laser treatments, chemical peels, and aesthetic body
                    procedures that patients actively seek out and pay for
                    directly without hesitation.
                  </p>
                  <p>
                    A hybrid model — accepting insurance for medical derm while
                    building a robust cosmetic cash side — is the most common and
                    financially rewarding approach. Many dermatologists find that
                    the cosmetic side, despite representing a minority of
                    appointment slots, generates the majority of practice
                    revenue.
                  </p>
                  <p>
                    Single-visit payment structures work particularly well in
                    dermatology, as many patient encounters are episodic rather
                    than ongoing. Clear, published pricing for cosmetic services
                    reduces friction and can be a powerful marketing asset.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#FAECE7", color: "#993C1D" }}
                    >
                      Cosmetic revenue stream
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAECE7", color: "#993C1D" }}
                    >
                      Elective procedures
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAECE7", color: "#993C1D" }}
                    >
                      Hybrid model
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FAECE7", color: "#993C1D" }}
                    >
                      Single-visit billing
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. SPORTS MEDICINE */}
              <div className="specialty-card" id="sports-medicine">
                <img
                  className="specialty-card-img"
                  style={{ objectPosition: "center" }}
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85&auto=format&fit=crop&crop=center"
                  alt="A sports medicine physician assessing an athlete's knee in a modern outpatient clinic"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#E6F1FB", color: "#185FA5" }}
                  >
                    SM
                  </div>
                  <div>
                    <h3 className="specialty-name">
                      Sports Medicine &amp; Orthopedics
                    </h3>
                    <div
                      className="model-tag"
                      style={{ background: "#E6F1FB", color: "#185FA5" }}
                    >
                      Best fit: Direct Specialty Care / Fee-for-service
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Sports medicine and orthopedic surgery are at the forefront
                    of the emerging "Direct Specialty Care" (DSC) movement — the
                    specialist equivalent of DPC. Employers and self-funded
                    health plans are increasingly willing to contract directly
                    with orthopedic surgeons for bundled episode pricing on
                    common procedures: hip replacements, knee replacements,
                    rotator cuff repairs, and ACL reconstructions.
                  </p>
                  <p>
                    For outpatient orthopedics and sports medicine specifically,
                    a cash-based model is extremely viable. Regenerative medicine
                    services — PRP injections, prolotherapy, stem cell therapies
                    — are not covered by insurance and represent strong cash
                    revenue. Concierge sports medicine serving athletes,
                    executives, and active adults is a growing niche with
                    exceptional willingness-to-pay.
                  </p>
                  <p>
                    The single-visit payment structure suits both fields well: a
                    patient pays a transparent, published price for an injection,
                    an operative procedure, or a comprehensive sports physical —
                    no surprise bills, no insurance negotiation.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#E6F1FB", color: "#185FA5" }}
                    >
                      Bundled episode pricing
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#E6F1FB", color: "#185FA5" }}
                    >
                      Regenerative medicine
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#E6F1FB", color: "#185FA5" }}
                    >
                      Direct employer contracts
                    </span>
                  </div>
                </div>
              </div>

              {/* 7. OB/GYN */}
              <div className="specialty-card" id="obgyn">
                <img
                  className="specialty-card-img"
                  src="/blog-cover-obgyn-specialty.jpg"
                  alt="An OB/GYN doctor consulting with a pregnant patient in a modern clinic with ultrasound monitor"
                  loading="lazy"
                />
                <div className="specialty-header">
                  <div
                    className="specialty-icon"
                    style={{ background: "#FBEAF0", color: "#993556" }}
                  >
                    OG
                  </div>
                  <div>
                    <h3 className="specialty-name">
                      OB/GYN &amp; Women's Health
                    </h3>
                    <div
                      className="model-tag"
                      style={{ background: "#FBEAF0", color: "#993556" }}
                    >
                      Best fit: Membership / Elective services
                    </div>
                  </div>
                </div>
                <div className="specialty-body">
                  <p>
                    Women's health represents one of the most compelling
                    opportunities in cash-based medicine. The combination of
                    preventive gynecology, hormone optimization (menopause, HRT,
                    BHRT), fertility counseling, sexual health, and aesthetic
                    procedures creates multiple distinct revenue streams — all
                    highly amenable to out-of-pocket payment.
                  </p>
                  <p>
                    Elective or concierge OB care is a growing model, especially
                    in urban markets, where patients pay a retainer for enhanced
                    prenatal access, guaranteed physician delivery, and
                    personalized postpartum support. On the GYN side,
                    membership-based annual wellness visits, point-of-care STI
                    testing, and cash-pay intrauterine procedures offer clean,
                    transparent pricing.
                  </p>
                  <p>
                    Hormone therapy clinics — standalone or bolted onto an
                    existing OB/GYN practice — are experiencing explosive growth
                    as a cash-pay service line, with extremely high patient
                    retention and recurring revenue potential.
                  </p>
                  <div className="pill-row">
                    <span
                      className="pill"
                      style={{ background: "#FBEAF0", color: "#993556" }}
                    >
                      Hormone therapy
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FBEAF0", color: "#993556" }}
                    >
                      Concierge maternity
                    </span>
                    <span
                      className="pill"
                      style={{ background: "#FBEAF0", color: "#993556" }}
                    >
                      Wellness memberships
                    </span>
                  </div>
                </div>
              </div>

              <div className="callout">
                <strong>The takeaway for specialists:</strong> The DPC label is
                primary care shorthand. If you're a specialist, think "Direct
                Specialty Care" — same principles, different panel. Transparent
                pricing, direct relationships, insurance-optional billing.
              </div>

              {/* Patient diversity image pair */}
              <div className="img-pair">
                <figure>
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=85&auto=format&fit=crop&crop=top"
                    alt="A physician reviewing a chart with a patient in a comfortable direct care clinic"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=85&auto=format&fit=crop&crop=top"
                    alt="Diverse patients in a modern waiting room of a direct primary care practice"
                    loading="lazy"
                  />
                </figure>
              </div>

              <hr className="section-rule" />

              {/* ── PAYMENT MODELS ── */}
              <h2 className="section-title" id="payment-models">
                Membership vs. Fee-for-Service: Which Model Fits Your Specialty?
              </h2>

              <p>
                The payment model you choose is just as important as the
                specialty you practice. Two structures dominate the cash-based
                space:
              </p>

              <div className="comparison-grid">
                <div className="comparison-col col-pro">
                  <h4>Membership / subscription model</h4>
                  <ul>
                    <li>Predictable monthly recurring revenue</li>
                    <li>Smaller, more manageable patient panels</li>
                    <li>Strong for ongoing chronic care and primary care</li>
                    <li>
                      Best for: family medicine, pediatrics, internal medicine,
                      OB/GYN wellness
                    </li>
                    <li>Encourages patient loyalty and lower churn</li>
                  </ul>
                </div>
                <div className="comparison-col col-con">
                  <h4>Fee-for-service (episodic) model</h4>
                  <ul>
                    <li>Simpler to launch — no panel-building required</li>
                    <li>
                      Ideal for irregular, episodic patient encounters
                    </li>
                    <li>
                      Best for: dermatology, orthopedics, psychiatry, surgery
                    </li>
                    <li>Revenue scales with volume, not panel size</li>
                    <li>
                      Works well alongside insurance for hybrid practices
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Many cash-based practices use a hybrid of both — a monthly
                membership for primary care access layered with fee-for-service
                charges for specific procedures, labs, or add-on services. This
                hybrid structure often produces the most stable revenue curve,
                especially in the early practice growth phase.
              </p>

              <hr className="section-rule" />

              {/* ── CONSIDERATIONS ── */}
              <h2 className="section-title" id="considerations">
                Key Factors to Evaluate Before You Make the Switch
              </h2>

              <figure className="inline-img short">
                <img
                  style={{ objectPosition: "center" }}
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=85&auto=format&fit=crop&crop=center"
                  alt="A physician owner reviewing practice strategy and financials at a desk"
                  loading="lazy"
                />
                <figcaption>
                  Market demographics, patient panel conversion, and financial
                  runway are the three variables that separate thriving DPC
                  practices from expensive experiments.
                </figcaption>
              </figure>

              <p>
                Specialty alignment is necessary but not sufficient. Before
                committing to a cash-based or DPC model, evaluate these critical
                variables:
              </p>

              <p>
                <strong>
                  Local demographics and market willingness to pay.
                </strong>{" "}
                The most beautifully designed cash practice will struggle in a
                market where disposable income is limited. DPC and concierge
                models perform strongest in mid-to-large metro areas with
                substantial professional-class populations. Houston, for
                example, is an exceptionally favorable market — large,
                economically diverse, with a growing cohort of small business
                owners and self-insured employers ideal for DPC partnerships.
              </p>

              <p>
                <strong>Your existing patient relationships.</strong> Physicians
                converting an existing panel to a cash-based model enjoy a
                significant head start — existing patients are already invested
                in the relationship. The conversion rate from a traditional
                panel to a DPC membership typically runs 20–40%, which is often
                enough to build a viable initial membership base.
              </p>

              <p>
                <strong>The ramp-up phase.</strong> It's worth being clear-eyed:
                roughly 42% of physicians transitioning to cash-pay models earn
                less in the first two to three years than they did as employed
                physicians. The math inverts over time, but you need runway.
                Sound financial planning before launch — not after — is the
                difference between a thriving practice and an expensive
                experiment.
              </p>

              <p>
                <strong>Practice overhead structure.</strong> Cash-based
                practices don't require large billing departments, but they do
                require exceptional patient experience and marketing
                infrastructure. Your conversion rates, retention rates, and
                referral velocity depend on the systems you build from day one.
              </p>

              <hr className="section-rule" />

              {/* ── NEXT STEPS ── */}
              <h2 className="section-title" id="next-steps">
                Ready to Build Your Cash-Based Practice?
              </h2>

              <p>
                The shift to direct care is one of the most significant
                decisions a physician owner will make. Getting the specialty
                positioning, patient acquisition strategy, and business model
                right before you launch — rather than figuring it out as you go
                — is the single highest-leverage investment you can make.
              </p>

              <p>
                At Practice Rx, we work exclusively with physician-owned DPC,
                concierge, and cash-based practices at every stage: from
                feasibility analysis and business plan development to patient
                acquisition marketing, practice space strategy, and growth
                consulting. We understand both the clinical and business
                realities of independent practice — because we've lived them.
              </p>

              {/* CTA BOX */}
              <div
                className="rounded-2xl overflow-hidden px-8 md:px-10 py-6 md:py-8 text-center my-10"
                style={{ backgroundColor: "var(--color-navy)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-semibold mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#ffffff", marginTop: 0 }}
                >
                  Let's build your practice together.
                </h2>
                <p className="mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)", marginTop: 0 }}>
                  Schedule a complimentary strategy call and find out exactly
                  what your specialty, market, and goals make possible in a
                  cash-based model.
                </p>
                <a
                  href="https://calendar.app.google/RaYMAcLTYvRfHB1B8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 text-sm font-bold text-navy rounded-lg transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-gold)" }}
                >
                  Book a Free Strategy Call →
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
