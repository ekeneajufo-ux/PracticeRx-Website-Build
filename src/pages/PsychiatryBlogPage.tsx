import { ArrowLeft, Clock } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

const scopedStyles = `
  .psych-article {
    --ink: #1a1a18;
    --ink-mid: #4a4a44;
    --ink-light: #888780;
    --cream: #f7f5f0;
    --warm-white: #fdfcfa;
    --sage: #3B6D11;
    --sage-light: #EAF3DE;
    --sage-mid: #639922;
    --teal: #0F6E56;
    --purple: #534AB7;
    --purple-light: #EEEDFE;
    --rule: #d8d5cc;
    --serif: 'Fraunces', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }
  .psych-article .lead {
    font-family: var(--font-heading);
    font-size: 1.18rem;
    font-weight: 300;
    font-style: italic;
    color: var(--ink-mid);
    line-height: 1.7;
    border-left: 3px solid var(--purple);
    padding-left: 1.5rem;
    margin-bottom: 2.5rem;
  }
  .psych-article .inline-img {
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
    margin: 2rem 0;
  }
  .psych-article .inline-img img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    object-position: top;
    display: block;
    border-radius: 14px;
  }
  .psych-article .inline-img.short img { height: 240px; }
  .psych-article .inline-img figcaption {
    font-size: 0.78rem;
    color: var(--ink-light);
    padding: 0.6rem 0 0;
    font-style: italic;
    letter-spacing: 0.02em;
  }
  .psych-article .img-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2rem 0;
  }
  .psych-article .img-pair figure { border-radius: 12px; overflow: hidden; }
  .psych-article .img-pair img { width: 100%; height: 220px; object-fit: cover; object-position: top; display: block; }
  .psych-article .stat-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: 14px;
    overflow: hidden;
    margin: 2.5rem 0;
  }
  .psych-article .stat-cell {
    background: var(--warm-white);
    padding: 1.5rem 1.25rem;
    text-align: center;
  }
  .psych-article .stat-num {
    font-family: var(--font-heading);
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--purple);
    line-height: 1;
    margin-bottom: 0.4rem;
  }
  .psych-article .stat-label {
    font-size: 0.79rem;
    color: var(--ink-light);
    line-height: 1.4;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .psych-article .toc {
    background: var(--cream);
    border: 1px solid var(--rule);
    border-radius: 14px;
    padding: 1.5rem 1.75rem;
    margin: 2.5rem 0;
  }
  .psych-article .toc h3 {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 1rem;
  }
  .psych-article .toc ol { padding-left: 1.25rem; }
  .psych-article .toc ol li { margin-bottom: 0.45rem; }
  .psych-article .toc a { color: var(--purple); text-decoration: none; font-size: 0.9rem; }
  .psych-article .toc a:hover { text-decoration: underline; }
  .psych-article .section-title {
    font-family: var(--font-heading);
    font-size: 1.85rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 3.5rem 0 1rem;
    line-height: 1.2;
  }
  .psych-article .step-card {
    border: 1px solid var(--rule);
    border-radius: 18px;
    overflow: hidden;
    margin: 2.25rem 0;
    background: var(--warm-white);
  }
  .psych-article .step-card-img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    object-position: top;
    display: block;
  }
  .psych-article .step-header {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.4rem 1.75rem 1.1rem;
    border-bottom: 1px solid var(--rule);
  }
  .psych-article .step-number {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .psych-article .step-title {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 0.2rem;
    line-height: 1.25;
  }
  .psych-article .step-tag {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.22rem 0.65rem;
    border-radius: 100px;
    margin-top: 0.2rem;
  }
  .psych-article .step-body {
    padding: 1.25rem 1.75rem 1.6rem;
  }
  .psych-article .step-body p {
    margin-bottom: 1rem;
    font-size: 0.97rem;
  }
  .psych-article .step-body p:last-child { margin-bottom: 0; }
  .psych-article .pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;
  }
  .psych-article .pill {
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.25rem 0.7rem;
    border-radius: 100px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .psych-article .revenue-table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--rule);
  }
  .psych-article .revenue-table th {
    background: var(--ink);
    color: rgba(255,255,255,0.7);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.9rem 1.25rem;
    text-align: left;
  }
  .psych-article .revenue-table td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--rule);
    font-size: 0.92rem;
    color: var(--ink-mid);
    vertical-align: top;
  }
  .psych-article .revenue-table tr:last-child td { border-bottom: none; }
  .psych-article .revenue-table tr:nth-child(even) td { background: var(--cream); }
  .psych-article .revenue-highlight {
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--purple);
    font-size: 1rem;
  }
  .psych-article .callout {
    background: var(--cream);
    border-left: 4px solid var(--purple);
    border-radius: 0 12px 12px 0;
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--ink-mid);
    font-size: 1rem;
  }
  .psych-article .callout strong {
    color: var(--ink);
    font-style: normal;
    font-weight: 500;
  }
  .psych-article .checklist {
    background: var(--cream);
    border-radius: 14px;
    padding: 1.5rem 1.75rem;
    margin: 2rem 0;
  }
  .psych-article .checklist h4 {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--rule);
  }
  .psych-article .checklist ul {
    list-style: none;
    padding: 0;
    columns: 2;
    gap: 1.5rem;
  }
  .psych-article .checklist ul li {
    font-size: 0.88rem;
    color: var(--ink-mid);
    padding: 0.3rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    break-inside: avoid;
    line-height: 1.4;
  }
  .psych-article .checklist ul li::before {
    content: "✓";
    color: var(--purple);
    font-weight: 700;
    font-size: 0.75rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
  .psych-article .product-cta {
    border: 2px solid var(--purple);
    border-radius: 20px;
    overflow: hidden;
    margin: 3rem 0;
  }
  .psych-article .product-cta-top {
    background: var(--purple);
    padding: 1.25rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .psych-article .product-cta-top h3 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
  }
  .psych-article .product-badge {
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.28rem 0.85rem;
    border-radius: 100px;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .psych-article .product-cta-body {
    padding: 1.75rem 2rem;
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 2rem;
    align-items: center;
  }
  .psych-article .product-cta-body p {
    color: var(--ink-mid);
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0;
  }
  .psych-article .product-cta-body p strong { color: var(--ink); }
  .psych-article .product-cta-right { text-align: center; }
  .psych-article .product-price-wrap { margin-bottom: 1rem; }
  .psych-article .product-price {
    font-family: var(--font-heading);
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--purple);
    line-height: 1;
  }
  .psych-article .product-price-label {
    font-size: 0.72rem;
    color: var(--ink-light);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 0.25rem;
  }
  .psych-article .product-btn {
    display: block;
    background: var(--purple);
    color: #fff;
    font-size: 0.88rem;
    font-weight: 500;
    padding: 0.8rem 1.25rem;
    border-radius: 100px;
    text-decoration: none;
    text-align: center;
  }
  .psych-article .product-btn:hover { background: #3d3499; }
  .psych-article .product-features {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: var(--ink-light);
    line-height: 1.6;
  }
  .psych-article .section-rule {
    border: none;
    border-top: 1px solid var(--rule);
    margin: 3rem 0;
  }
  @media(max-width:640px) {
    .psych-article .stat-strip { grid-template-columns: 1fr; }
    .psych-article .img-pair { grid-template-columns: 1fr; }
    .psych-article .checklist ul { columns: 1; }
    .psych-article .product-cta-body { grid-template-columns: 1fr; }
    .psych-article .product-cta-right { text-align: left; }
  }
`;

const PRODUCT_PAGE = "/products/psychiatry-cash-practice-blueprint";

export function PsychiatryBlogPage() {
  useSEO({
    title: "How Psychiatrists Can Build a Thriving DPC & Cash-Based Practice",
    description: "A complete guide for psychiatrists launching a cash-based or DPC practice. Covers payment models, revenue streams, compliance, and a step-by-step launch playbook.",
    path: "/blog/psychiatry-cash-based-dpc-practice-guide",
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
            "How Psychiatrists Can Build a Thriving DPC & Cash-Based Practice",
          description:
            "A complete guide for psychiatrists launching a cash-based or DPC practice. Covers payment models, revenue streams, compliance, and a step-by-step launch playbook.",
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
          datePublished: "2026-05-13",
          mainEntityOfPage:
            "https://practicerxconsulting.com/blog/psychiatry-cash-based-dpc-practice-guide",
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=85&auto=format&fit=crop&crop=top",
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
          <article className="w-full max-w-[740px] psych-article">
            {/* Category Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Practice Strategy
              </span>
              <span className="text-navy/20">·</span>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Psychiatry
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-navy leading-[1.15] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How Psychiatrists Can Build a Thriving DPC &{" "}
              <em className="italic">Cash-Based</em> Practice
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
                  <span>May 13, 2026</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    14 min read
                  </span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="article-body text-[16px] md:text-[17px] leading-[1.8] text-navy/80">

              <p className="lead">
                Psychiatry is experiencing a paradox: the need for mental health care has never been greater, yet psychiatrists are burning out, opting out of insurance panels, and leaving employed positions at an accelerating rate. The cash-based model is not a workaround for psychiatry — it is the natural endpoint of where the specialty is already heading.
              </p>

              <figure className="inline-img">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A psychiatrist in a calm, modern private practice office having an unhurried conversation with a patient"
                  loading="lazy"
                />
                <figcaption>Unhurried, relationship-centered care is the cornerstone of great psychiatry — and the cash-based model is the only structure that truly protects it.</figcaption>
              </figure>

              <p>The numbers make the case plainly. Insurance reimbursement for psychiatric services has historically lagged behind the complexity of care provided. Prior authorizations for medications can take days. Insurance panels are closed or credentialing is delayed by months. Meanwhile, patients wait 3 to 6 months for a first appointment at an insurance-accepting practice — if they can find one at all.</p>

              <p>A cash-based or direct specialty care psychiatry practice eliminates every one of those bottlenecks. In its place, you get same-week access, transparent pricing, no coding battles, and a patient relationship unconstrained by 15-minute billing units. And with the rise of interventional psychiatry — ketamine, TMS, Spravato — the financial upside of going cash has never been more compelling.</p>

              <div className="stat-strip">
                <div className="stat-cell">
                  <div className="stat-num">3–6 mo</div>
                  <div className="stat-label">Average wait time at insurance-accepting psychiatry practices nationwide</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">$780M</div>
                  <div className="stat-label">Spravato revenue in just 9 months of 2024 — up 56% year-over-year</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">63%</div>
                  <div className="stat-label">Treatment-resistant depression patients who responded to TMS therapy</div>
                </div>
              </div>

              <div className="toc">
                <h3>In this article</h3>
                <ol>
                  <li><a href="#why-psychiatry">Why psychiatry is uniquely built for the cash-based model</a></li>
                  <li><a href="#payment-models">Choosing the right payment structure for your practice</a></li>
                  <li><a href="#revenue-streams">High-margin cash revenue streams to layer into your practice</a></li>
                  <li><a href="#step-by-step">Step-by-step: building your cash-based psychiatry practice</a></li>
                  <li><a href="#blueprint">The Psychiatry Cash Practice Blueprint</a></li>
                  <li><a href="#next-steps">Your next step</a></li>
                </ol>
              </div>

              {/* WHY PSYCHIATRY */}
              <h2 className="section-title" id="why-psychiatry">Why Psychiatry Is Uniquely Built for the Cash-Based Model</h2>

              <p>Not every specialty makes an easy transition to cash. Psychiatry does — better than almost any other specialty outside of primary care. Here is why:</p>

              <p><strong>Patients already expect to pay out of pocket.</strong> Unlike surgery or hospital care, psychiatric patients have a long-established cultural acceptance of self-pay. Many have been paying out-of-network rates for years. A transparent flat fee is not a foreign concept — it is often a relief.</p>

              <p><strong>The demand-supply gap is enormous.</strong> The U.S. faces a severe shortage of psychiatrists. In most metro areas, the wait for an insurance-accepting psychiatrist is measured in months, not days. Cash-based practices offering same-week or even same-day access offer a genuinely differentiated service that patients will pay for.</p>

              <p><strong>Overhead is inherently low.</strong> Psychiatric care is largely cognitive — it does not require expensive procedure suites, large inventories, or extensive nursing staff. A solo psychiatrist in a well-designed office or hybrid telehealth model can run a high-revenue practice with minimal overhead. The math works in your favor from day one.</p>

              <p><strong>Telehealth extends your reach without adding overhead.</strong> Psychiatric care is uniquely well-suited to telehealth delivery. A cash-based psychiatry practice can serve patients across an entire state from a single physical location — or from home — dramatically expanding the addressable market without adding square footage or staff.</p>

              <p><strong>Insurance is already leaving anyway.</strong> Many psychiatrists have quietly been out-of-network for years, operating on a de facto cash basis while patients submit claims themselves via superbill. Going formally cash-based simply formalizes what is already happening and removes the last vestige of administrative overhead.</p>

              <div className="callout">
                <strong>The psychiatric advantage:</strong> Unlike most specialties, psychiatry's core clinical tool is the relationship itself. That relationship is maximized in a cash model — and it is exactly what patients will pay a premium to access.
              </div>

              <figure className="inline-img short">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=85&auto=format&fit=crop&crop=top"
                  alt="A diverse group of patients in a welcoming, modern mental health clinic waiting area"
                  loading="lazy"
                />
                <figcaption>Cash-based psychiatric practices attract patients who are motivated, engaged, and ready to invest in their mental health — a fundamentally different dynamic than the insurance panel.</figcaption>
              </figure>

              <hr className="section-rule" />

              {/* PAYMENT MODELS */}
              <h2 className="section-title" id="payment-models">Choosing the Right Payment Structure</h2>

              <p>Cash-based psychiatry practices operate primarily on two payment structures, and many successful practices use a hybrid of both:</p>

              <div className="step-card">
                <div className="step-header">
                  <div className="step-number" style={{ background: "#EEEDFE", color: "#534AB7" }}>01</div>
                  <div>
                    <h3 className="step-title">Fee-for-service (episodic billing)</h3>
                    <span className="step-tag" style={{ background: "#EEEDFE", color: "#534AB7" }}>Most common for psychiatry</span>
                  </div>
                </div>
                <div className="step-body">
                  <p>Patients pay a flat, published fee per visit — initial evaluations, medication management sessions, and therapy sessions are each priced transparently. This is the dominant model for outpatient psychiatry and works exceptionally well because psychiatric encounters are variable in frequency and don't always require the same ongoing cadence as primary care.</p>
                  <p>Typical fee-for-service ranges: initial psychiatric evaluation $300–$500, follow-up medication management $150–$250 per session, psychotherapy $175–$300 per session. At these rates, a solo psychiatrist seeing 15–20 patients per day can generate $600,000–$900,000 annually with minimal overhead and no insurance billing staff.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>Transparent pricing</span>
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>No membership required</span>
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>Superbill for patient reimbursement</span>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <div className="step-header">
                  <div className="step-number" style={{ background: "#EAF3DE", color: "#3B6D11" }}>02</div>
                  <div>
                    <h3 className="step-title">Monthly membership / retainer model</h3>
                    <span className="step-tag" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Best for chronic management patients</span>
                  </div>
                </div>
                <div className="step-body">
                  <p>A monthly membership covers a defined set of services — unlimited messaging, monthly check-in visits, prescription refills, care coordination — for a flat recurring fee. This model works exceptionally well for patients in stable maintenance phases: those managing ADHD, mood disorders, or anxiety long-term who value the convenience of continuous, unrestricted access to their psychiatrist.</p>
                  <p>Membership tiers typically range from $150–$350 per month. A panel of just 200 monthly members at $200 per month generates $40,000 in predictable monthly recurring revenue — before any fee-for-service visits, procedures, or add-on services. This recurring base dramatically de-risks the practice and enables confident reinvestment in growth.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Predictable recurring revenue</span>
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>High patient retention</span>
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Reduced no-shows</span>
                  </div>
                </div>
              </div>

              <hr className="section-rule" />

              {/* REVENUE STREAMS */}
              <h2 className="section-title" id="revenue-streams">High-Margin Cash Revenue Streams to Layer Into Your Practice</h2>

              <p>The foundational fee-for-service or membership model is just the beginning. The most financially successful cash-based psychiatry practices layer in one or more of the following high-margin service lines — all of which are structurally suited to cash payment:</p>

              <div className="img-pair">
                <figure>
                  <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=85&auto=format&fit=crop&crop=top" alt="A modern interventional psychiatry suite with IV infusion equipment in a clean, clinical setting" loading="lazy" />
                </figure>
                <figure>
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85&auto=format&fit=crop&crop=top" alt="A TMS device in a psychiatric clinic, representing interventional psychiatry revenue" loading="lazy" />
                </figure>
              </div>

              <table className="revenue-table">
                <thead>
                  <tr>
                    <th>Revenue Stream</th>
                    <th>Payment Model</th>
                    <th>Revenue Potential</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>IV Ketamine Infusions</strong></td>
                    <td>Cash-pay (almost always)</td>
                    <td><span className="revenue-highlight">$500–$800/infusion</span></td>
                    <td>Typically 6-session induction series; high patient demand for treatment-resistant depression</td>
                  </tr>
                  <tr>
                    <td><strong>Spravato (Esketamine)</strong></td>
                    <td>Insurance-covered + copay</td>
                    <td><span className="revenue-highlight">Strong reimbursement</span></td>
                    <td>FDA-approved, growing rapidly — pairs well with hybrid practices; J&amp;J reported $780M in 9 months of 2024</td>
                  </tr>
                  <tr>
                    <td><strong>TMS Therapy</strong></td>
                    <td>Cash-pay or insurance hybrid</td>
                    <td><span className="revenue-highlight">$200–$400/session</span></td>
                    <td>30–36 sessions per course; 63% response rate in treatment-resistant depression; low marginal cost per session after equipment purchase</td>
                  </tr>
                  <tr>
                    <td><strong>ADHD Comprehensive Evaluation</strong></td>
                    <td>Cash fee-for-service</td>
                    <td><span className="revenue-highlight">$800–$1,500/package</span></td>
                    <td>High demand, chronic shortage of evaluators; pairs naturally with ongoing medication management membership</td>
                  </tr>
                  <tr>
                    <td><strong>Medication Management Telehealth</strong></td>
                    <td>Cash membership or per-visit</td>
                    <td><span className="revenue-highlight">$150–$250/session</span></td>
                    <td>Extends reach statewide; low overhead; high session volume possible with optimized scheduling</td>
                  </tr>
                  <tr>
                    <td><strong>Executive Mental Health Program</strong></td>
                    <td>Annual retainer</td>
                    <td><span className="revenue-highlight">$5,000–$15,000/yr</span></td>
                    <td>Concierge psychiatry for executives and high-net-worth individuals; same-day access, priority scheduling, comprehensive annual mental health review</td>
                  </tr>
                </tbody>
              </table>

              <p>The most financially powerful model combines a core fee-for-service or membership practice with one interventional modality — typically either ketamine infusions or TMS. The interventional service draws new patients who would not otherwise seek routine psychiatric care, and a meaningful percentage of those patients convert to ongoing medication management membership.</p>

              <hr className="section-rule" />

              {/* STEP BY STEP */}
              <h2 className="section-title" id="step-by-step">Step-by-Step: Building Your Cash-Based Psychiatry Practice</h2>

              <div className="step-card">
                <img className="step-card-img" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&auto=format&fit=crop&crop=top" alt="A physician owner reviewing business strategy documents and financial projections at a clean desk" loading="lazy" />
                <div className="step-header">
                  <div className="step-number" style={{ background: "#EEEDFE", color: "#534AB7" }}>01</div>
                  <div>
                    <h3 className="step-title">Define your model and financial targets before anything else</h3>
                  </div>
                </div>
                <div className="step-body">
                  <p>Before you sign a lease or buy equipment, get rigorous about numbers. How many patients do you need to cover your overhead and hit your income target? What mix of fee-for-service, membership, and procedural revenue will you pursue? What is your ramp-up timeline — and what is your financial cushion if it takes longer?</p>
                  <p>Map out three scenarios: conservative (50% of target panel in 12 months), base (75% in 12 months), and optimistic (100% in 9 months). Your practice decisions — space size, staffing, equipment — should be sized to your conservative scenario so you have runway to reach the base case without financial stress.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>Revenue modeling</span>
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>Overhead mapping</span>
                    <span className="pill" style={{ background: "#EEEDFE", color: "#534AB7" }}>Ramp-up timeline</span>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <img className="step-card-img" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop&crop=top" alt="A diverse physician reviewing legal documents and compliance paperwork for a new practice" loading="lazy" />
                <div className="step-header">
                  <div className="step-number" style={{ background: "#FAEEDA", color: "#854F0B" }}>02</div>
                  <div>
                    <h3 className="step-title">Nail the legal and compliance foundation</h3>
                  </div>
                </div>
                <div className="step-body">
                  <p>Cash-based psychiatry practices must comply with state insurance laws — specifically whether your state classifies DPC-style arrangements as insurance contracts requiring licensure. Most states have enacted DPC-friendly carve-outs; confirm your state's current status before launching a membership model.</p>
                  <p>If you plan to offer ketamine infusions, confirm your state's prescribing requirements and REMS obligations for any esketamine (Spravato) program. Establish a proper professional corporation or PLLC structure appropriate for your state, and work with a healthcare attorney to draft your patient services agreement — this is the contract that defines the scope of your cash-pay arrangement and protects both you and your patients.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#FAEEDA", color: "#854F0B" }}>State DPC law review</span>
                    <span className="pill" style={{ background: "#FAEEDA", color: "#854F0B" }}>Entity structure</span>
                    <span className="pill" style={{ background: "#FAEEDA", color: "#854F0B" }}>Patient services agreement</span>
                    <span className="pill" style={{ background: "#FAEEDA", color: "#854F0B" }}>DEA / REMS compliance</span>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <img className="step-card-img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&auto=format&fit=crop&crop=top" alt="A modern, welcoming psychiatric practice space with warm lighting and comfortable furnishings" loading="lazy" />
                <div className="step-header">
                  <div className="step-number" style={{ background: "#EAF3DE", color: "#3B6D11" }}>03</div>
                  <div>
                    <h3 className="step-title">Design your space and technology stack for cash efficiency</h3>
                  </div>
                </div>
                <div className="step-body">
                  <p>Your practice space should reflect the premium, personalized experience you are selling. A cash-paying patient is choosing you over a 3-month wait at a crowded clinic — your environment should signal that choice was the right one from the moment they walk in. Boutique aesthetics, a calm atmosphere, and genuine privacy go a long way.</p>
                  <p>Your technology stack should be built for cash. Choose an EHR designed for cash-pay practices — options like Osmind (built specifically for interventional psychiatry), Elation, or Simple Practice for therapy-integrated models. Avoid legacy insurance-billing EHRs that will add friction to your cash workflow. Integrate a patient portal, automated appointment scheduling, and a frictionless payment processor from day one.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Cash-native EHR</span>
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Automated scheduling</span>
                    <span className="pill" style={{ background: "#EAF3DE", color: "#3B6D11" }}>Boutique patient experience</span>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <img className="step-card-img" src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=85&auto=format&fit=crop&crop=top" alt="A physician using a laptop to manage digital marketing and online presence for a private practice" loading="lazy" />
                <div className="step-header">
                  <div className="step-number" style={{ background: "#E6F1FB", color: "#185FA5" }}>04</div>
                  <div>
                    <h3 className="step-title">Build a patient acquisition engine — not just a website</h3>
                  </div>
                </div>
                <div className="step-body">
                  <p>Cash-based psychiatry practices live and die by patient acquisition. Unlike insurance-based practices that can rely on panel referrals from payers, you are building demand from scratch. This requires a deliberate, multi-channel marketing strategy from before your doors open — not after.</p>
                  <p>Your Google Business Profile is your most powerful free asset: optimized, review-rich local profiles drive the majority of new patient inquiries for cash psychiatric practices. Layer in a well-designed website with clear service pages and transparent pricing, active SEO targeting local psychiatric search terms, and a referral strategy targeting PCPs, therapists, and employee assistance programs in your community. For interventional services, targeted social media and patient community marketing dramatically accelerates adoption.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#E6F1FB", color: "#185FA5" }}>Google Business Profile</span>
                    <span className="pill" style={{ background: "#E6F1FB", color: "#185FA5" }}>Local SEO</span>
                    <span className="pill" style={{ background: "#E6F1FB", color: "#185FA5" }}>PCP referral network</span>
                    <span className="pill" style={{ background: "#E6F1FB", color: "#185FA5" }}>Therapist partnerships</span>
                  </div>
                </div>
              </div>

              <div className="step-card">
                <img className="step-card-img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop&crop=top" alt="A physician reviewing financial growth charts for a growing private practice" loading="lazy" />
                <div className="step-header">
                  <div className="step-number" style={{ background: "#FAECE7", color: "#993C1D" }}>05</div>
                  <div>
                    <h3 className="step-title">Track the metrics that actually matter and optimize relentlessly</h3>
                  </div>
                </div>
                <div className="step-body">
                  <p>Cash-based practice success is driven by a small number of high-leverage metrics. Know these numbers cold: new patient acquisition cost, conversion rate from inquiry to scheduled appointment, show rate, retention rate at 3 months and 12 months, average revenue per patient per month, and referral source attribution. These six metrics tell you everything you need to know about the health of your practice and where to focus your energy.</p>
                  <p>Review them monthly. Build a simple dashboard. Identify your highest-performing acquisition channel and double investment there. Identify your worst retention cohort and fix the experience gap that is causing churn. Most cash practices leave significant revenue on the table not from insufficient patients, but from preventable early drop-off.</p>
                  <div className="pill-row">
                    <span className="pill" style={{ background: "#FAECE7", color: "#993C1D" }}>Monthly KPI review</span>
                    <span className="pill" style={{ background: "#FAECE7", color: "#993C1D" }}>Retention optimization</span>
                    <span className="pill" style={{ background: "#FAECE7", color: "#993C1D" }}>Acquisition channel tracking</span>
                  </div>
                </div>
              </div>

              <div className="callout">
                <strong>The bottom line:</strong> A solo cash-based psychiatrist with 250 fee-for-service patients averaging $175 per session and two sessions per month generates $1.05 million in gross revenue annually. With lean overhead of $200,000–$250,000, that is $800,000+ in physician income — without a single insurance contract, prior authorization, or billing denial.
              </div>

              {/* LAUNCH CHECKLIST */}
              <div className="checklist">
                <h4>Pre-launch checklist for your cash psychiatry practice</h4>
                <ul>
                  <li>Business entity formed (PLLC or PC)</li>
                  <li>State DPC law confirmed — membership model compliant</li>
                  <li>Patient services agreement drafted and reviewed</li>
                  <li>Cash-native EHR selected and configured</li>
                  <li>Payment processor integrated (Stripe, Square, or equivalent)</li>
                  <li>Transparent fee schedule published on website</li>
                  <li>Google Business Profile created and optimized</li>
                  <li>Website live with service pages and booking link</li>
                  <li>DEA registration current (and REMS if offering Spravato)</li>
                  <li>Malpractice policy updated for cash-pay model</li>
                  <li>Referral outreach to 20+ local PCPs and therapists</li>
                  <li>Financial runway confirmed for 12-month ramp-up</li>
                </ul>
              </div>

              <hr className="section-rule" />

              {/* DIGITAL PRODUCT CTA */}
              <h2 className="section-title" id="blueprint">The Psychiatry Cash Practice Blueprint</h2>

              <p>Everything in this guide is the 10,000-foot view. The Practice Rx Psychiatry Cash Practice Blueprint goes deep — giving you the exact templates, financial models, legal frameworks, and marketing playbooks you need to launch or transition your psychiatry practice to a cash-based model with confidence.</p>

              <div className="product-cta">
                <div className="product-cta-top">
                  <h3>Psychiatry Cash Practice Blueprint</h3>
                  <span className="product-badge">Digital Download — Instant Access</span>
                </div>
                <div className="product-cta-body">
                  <div>
                    <p>A comprehensive, physician-built playbook designed specifically for psychiatrists building or transitioning to a cash-based or DPC practice model. Includes <strong>revenue modeling templates</strong>, a <strong>state-by-state DPC law reference</strong>, a <strong>patient services agreement template</strong>, a <strong>90-day launch roadmap</strong>, <strong>fee schedule benchmarks</strong>, <strong>interventional psychiatry add-on guide</strong> (ketamine, TMS, Spravato), and a <strong>patient acquisition marketing playbook</strong> tailored for psychiatric practices.</p>
                  </div>
                  <div className="product-cta-right">
                    <div className="product-price-wrap">
                      <div className="product-price">$499</div>
                      <div className="product-price-label">One-time purchase</div>
                    </div>
                    <a href={PRODUCT_PAGE} className="product-btn">Get the Blueprint →</a>
                    <div className="product-features">Instant PDF download<br />Lifetime access + free updates</div>
                  </div>
                </div>
              </div>

              <hr className="section-rule" />

              {/* FINAL CTA */}
              <h2 className="section-title" id="next-steps">Ready to Build Your Cash-Based Psychiatry Practice?</h2>

              <p>The framework is here. The demand is there. The missing ingredient is a clear plan built for your specific market, your specialty, and your goals — not a generic template.</p>

              <p>At Practice Rx, we work exclusively with physician-owned practices at every stage of the cash-based transition: from financial modeling and business plan development to patient acquisition strategy, space design, and ongoing growth consulting. We have helped physicians in psychiatry and across specialties build practices that are more financially rewarding, more clinically fulfilling, and dramatically more sustainable.</p>

              {/* CTA BOX */}
              <div
                className="rounded-2xl overflow-hidden p-8 md:p-10 text-center my-10"
                style={{ backgroundColor: "var(--color-navy)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Let's build your practice together.
                </h2>
                <p className="text-white/60 mb-6 max-w-md mx-auto mt-0">
                  Schedule a complimentary strategy call and walk away with a clear picture of what's possible for your cash-based psychiatry practice.
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
