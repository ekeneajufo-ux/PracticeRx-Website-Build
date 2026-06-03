import { Check } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

const scopedStyles = `
  .psych-product {
    --ink: #1a1a18;
    --ink-mid: #4a4a44;
    --ink-light: #888780;
    --cream: #f7f5f0;
    --warm-white: #fdfcfa;
    --sage: #3B6D11;
    --sage-light: #EAF3DE;
    --sage-mid: #639922;
    --purple: #534AB7;
    --purple-light: #EEEDFE;
    --purple-dark: #3d3499;
    --rule: #d8d5cc;
  }

  /* PRODUCT HERO */
  .psych-product .product-hero {
    background: var(--purple);
    padding: 5rem 2rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .psych-product .product-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 0%, rgba(255,255,255,0.07) 0%, transparent 70%);
  }
  .psych-product .product-hero-content { position: relative; z-index: 1; }
  .psych-product .hero-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.25);
    padding: 0.35rem 0.9rem;
    border-radius: 100px;
    margin-bottom: 1.75rem;
  }
  .psych-product .product-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
    max-width: 720px;
    margin: 0 auto 1.25rem;
  }
  .psych-product .product-hero h1 em { font-style: italic; color: #c4b6f7; }
  .psych-product .product-hero-sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.75);
    max-width: 540px;
    margin: 0 auto 3rem;
    font-weight: 300;
    line-height: 1.65;
  }
  .psych-product .hero-price-row {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 16px;
    padding: 1.25rem 2rem;
    margin-bottom: 2rem;
  }
  .psych-product .hero-price {
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }
  .psych-product .hero-price-meta { text-align: left; }
  .psych-product .hero-price-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .psych-product .hero-price-sub {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
  }
  .psych-product .buy-btn-hero {
    display: inline-block;
    background: #fff;
    color: var(--purple);
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem 2.5rem;
    border-radius: 100px;
    text-decoration: none;
    letter-spacing: 0.02em;
  }
  .psych-product .buy-btn-hero:hover { background: #f0ecff; }
  .psych-product .hero-trust {
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.04em;
  }

  /* TWO COL LAYOUT */
  .psych-product .page-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }
  .psych-product .two-col {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 3rem;
    align-items: start;
  }
  .psych-product p {
    margin-bottom: 1.4rem;
    color: var(--ink-mid);
    line-height: 1.8;
  }
  .psych-product p strong { color: var(--ink); font-weight: 500; }
  .psych-product h2 {
    font-family: var(--font-heading);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 1rem;
    letter-spacing: -0.015em;
    line-height: 1.2;
  }
  .psych-product h3 {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 0.5rem;
    line-height: 1.3;
  }

  /* MODULE LIST */
  .psych-product .module-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }
  .psych-product .module-list li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--rule);
  }
  .psych-product .module-list li:last-child { border-bottom: none; }
  .psych-product .module-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--purple);
    flex-shrink: 0;
  }
  .psych-product .module-text h4 {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 0.2rem;
  }
  .psych-product .module-text p {
    font-size: 0.85rem;
    color: var(--ink-mid);
    margin: 0;
    line-height: 1.5;
  }

  /* STICKY BUY CARD */
  .psych-product .buy-card {
    background: var(--warm-white);
    border: 2px solid var(--purple);
    border-radius: 20px;
    padding: 2rem;
    position: sticky;
    top: 90px;
  }
  .psych-product .buy-card-price {
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 700;
    color: var(--purple);
    line-height: 1;
    margin-bottom: 0.25rem;
  }
  .psych-product .buy-card-label {
    font-size: 0.75rem;
    color: var(--ink-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.5rem;
  }
  .psych-product .buy-btn {
    display: block;
    background: var(--purple);
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem 1.5rem;
    border-radius: 100px;
    text-decoration: none;
    text-align: center;
    margin-bottom: 1rem;
  }
  .psych-product .buy-btn:hover { background: var(--purple-dark); }
  .psych-product .buy-card-trust {
    font-size: 0.78rem;
    color: var(--ink-light);
    text-align: center;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .psych-product .buy-card-includes {
    border-top: 1px solid var(--rule);
    padding-top: 1.25rem;
  }
  .psych-product .buy-card-includes h4 {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 0.75rem;
  }
  .psych-product .include-list {
    list-style: none;
    padding: 0;
  }
  .psych-product .include-list li {
    font-size: 0.83rem;
    color: var(--ink-mid);
    padding: 0.3rem 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.4;
  }
  .psych-product .include-list li::before {
    content: "✓";
    color: var(--purple);
    font-weight: 700;
    font-size: 0.72rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  /* AUDIENCE GRID */
  .psych-product .audience-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .psych-product .audience-card {
    background: var(--cream);
    border-radius: 14px;
    padding: 1.25rem 1.4rem;
  }
  .psych-product .audience-card h4 {
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }
  .psych-product .audience-card p {
    font-size: 0.85rem;
    color: var(--ink-mid);
    margin: 0;
    line-height: 1.5;
  }

  /* TESTIMONIAL */
  .psych-product .testimonial {
    background: var(--purple-light);
    border-radius: 16px;
    padding: 1.75rem 2rem;
    margin: 2.5rem 0;
    border-left: 4px solid var(--purple);
  }
  .psych-product .testimonial p {
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-style: italic;
    color: var(--ink-mid);
    margin-bottom: 0.75rem;
  }
  .psych-product .testimonial cite {
    font-size: 0.82rem;
    color: var(--ink-light);
    font-style: normal;
    font-weight: 500;
  }

  .psych-product .rule {
    border: none;
    border-top: 1px solid var(--rule);
    margin: 3rem 0;
  }

  /* CONSULTING MINI CTA */
  .psych-product .consulting-cta {
    margin-top: 1.5rem;
    background: var(--cream);
    border-radius: 14px;
    padding: 1.25rem 1.4rem;
    border: 1px solid var(--rule);
  }
  .psych-product .consulting-cta p {
    font-size: 0.88rem;
    color: var(--ink-mid);
    margin-bottom: 0.75rem;
    line-height: 1.55;
  }
  .psych-product .consulting-cta-btn {
    display: block;
    background: var(--ink);
    color: #fff;
    font-size: 0.83rem;
    font-weight: 500;
    padding: 0.7rem 1.25rem;
    border-radius: 100px;
    text-decoration: none;
    text-align: center;
  }

  /* PURCHASE SUCCESS BANNER */
  .psych-product .success-banner {
    background: #EAF3DE;
    border: 1px solid #3B6D11;
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .psych-product .success-banner p {
    margin: 0;
    color: #3B6D11;
    font-weight: 500;
    font-size: 0.95rem;
  }

  @media(max-width: 720px) {
    .psych-product .two-col { grid-template-columns: 1fr; }
    .psych-product .buy-card { position: static; }
    .psych-product .audience-grid { grid-template-columns: 1fr; }
  }
`;

const CHECKOUT_LINK = "https://funnels.practicerxconsulting.com/psychblueprint";

export function PsychiatryProductPage() {
  useSEO({
    title: "Psychiatry Cash Practice Blueprint",
    description: "The complete playbook to launch a profitable cash-based psychiatry practice. Pricing models, legal setup, patient acquisition, and more.",
    path: "/products/psychiatry-cash-practice-blueprint",
  });
  const [searchParams] = useSearchParams();
  const purchased = searchParams.get("purchased") === "true";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-cream min-h-screen psych-product">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "The Psychiatry Cash Practice Blueprint",
          description:
            "The complete physician-built playbook for launching or transitioning your psychiatry practice to a cash-based or DPC model. Templates, financial models, legal frameworks, and marketing playbooks included.",
          url: "https://practicerxconsulting.com/products/psychiatry-cash-practice-blueprint",
          image:
            "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=900&q=85&auto=format&fit=crop&crop=top",
          brand: {
            "@type": "Organization",
            name: "PracticeRx Consulting",
          },
          offers: {
            "@type": "Offer",
            price: "499.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://practicerxconsulting.com/products/psychiatry-cash-practice-blueprint",
          },
        }}
      />
      <style>{scopedStyles}</style>

      {/* PRODUCT HERO */}
      <section className="product-hero">
        <div className="product-hero-content">
          <div className="hero-eyebrow">Digital Product &mdash; Immediate Download</div>
          <h1>The Psychiatry Cash Practice <em>Blueprint</em></h1>
          <p className="product-hero-sub">
            The complete physician-built playbook for launching or transitioning your psychiatry practice to a cash-based or DPC model. Templates, financial models, legal frameworks, and marketing playbooks included.
          </p>
          <div className="hero-price-row">
            <div className="hero-price">$499</div>
            <div className="hero-price-meta">
              <div className="hero-price-label">One-time purchase</div>
              <div className="hero-price-sub">Instant PDF download &middot; Lifetime access</div>
            </div>
          </div>
          <br />
          <a href={CHECKOUT_LINK} className="buy-btn-hero" target="_blank" rel="noopener noreferrer">
            Get the Blueprint Now &rarr;
          </a>
          <div className="hero-trust">Instant access &middot; PDF format &middot; Physician-authored &middot; No subscription</div>
        </div>
      </section>

      <div className="page-wrap">

        {/* Purchase Success Banner */}
        {purchased && (
          <div className="success-banner">
            <Check className="size-5 text-[#3B6D11] flex-shrink-0" />
            <p>Thank you for your purchase! Check your email for the download link. If you have any questions, don&apos;t hesitate to reach out.</p>
          </div>
        )}

        <div className="two-col">
          {/* LEFT COLUMN: Content */}
          <div>
            {/* PRODUCT IMAGE */}
            <figure style={{ borderRadius: 14, overflow: "hidden", marginBottom: "2.5rem" }}>
              <img
                src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=900&q=85&auto=format&fit=crop&crop=top"
                alt="A psychiatrist reviewing a comprehensive practice strategy guide at their desk"
                loading="lazy"
                style={{ width: "100%", height: 320, objectFit: "cover", display: "block", objectPosition: "top" }}
              />
            </figure>

            <h2>Stop leaving money &mdash; and your sanity &mdash; on the table</h2>
            <p>You spent years mastering the most complex, nuanced specialty in medicine. Insurance companies repay that expertise with low reimbursement rates, closed panels, prior authorization battles for medications, and a system that makes meaningful patient care structurally impossible.</p>
            <p>The cash-based model is not a niche workaround. For psychiatry specifically, it is the most financially rational, clinically fulfilling, and professionally sustainable way to practice. This Blueprint gives you the exact blueprint to get there &mdash; not theory, not inspiration, but the actual operational tools you need to execute.</p>

            <hr className="rule" />

            <h2>What&apos;s inside the Blueprint</h2>
            <p>Eight comprehensive modules, each with templates, worksheets, and physician-written guidance:</p>

            <ul className="module-list">
              <li>
                <div className="module-icon">01</div>
                <div className="module-text">
                  <h4>Revenue Modeling &amp; Financial Projections</h4>
                  <p>Pre-built Excel/Google Sheets models for fee-for-service, membership, and hybrid revenue. Input your market, panel size, and fee structure &mdash; outputs projected annual revenue, overhead breakeven, and physician income. Three scenario modeling (conservative, base, optimistic).</p>
                </div>
              </li>
              <li>
                <div className="module-icon">02</div>
                <div className="module-text">
                  <h4>State-by-State DPC Law Reference</h4>
                  <p>A curated, physician-reviewed reference covering DPC and direct specialty care legal requirements across all 50 states. Know exactly what your state requires before you structure your membership model &mdash; no expensive attorney research required for the initial framework.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">03</div>
                <div className="module-text">
                  <h4>Patient Services Agreement Template</h4>
                  <p>An attorney-reviewed, psychiatry-specific patient services agreement template ready for your legal counsel to finalize. Covers scope of services, fee structure, cancellation terms, and the critical insurance opt-out provisions that protect your cash model legally.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">04</div>
                <div className="module-text">
                  <h4>90-Day Practice Launch Roadmap</h4>
                  <p>A week-by-week action plan from decision to open doors. Entity formation, compliance review, space selection, technology setup, pre-launch marketing, and first-patient onboarding &mdash; all sequenced and prioritized so nothing falls through the cracks.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">05</div>
                <div className="module-text">
                  <h4>Fee Schedule Benchmarks &amp; Pricing Guide</h4>
                  <p>Market-researched fee benchmarks for every major psychiatric service: initial evaluations, medication management, therapy sessions, ADHD evaluations, ketamine infusions, TMS sessions, executive mental health programs, and telehealth visits. Know what the market bears in your region before you set your prices.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">06</div>
                <div className="module-text">
                  <h4>Interventional Psychiatry Add-On Guide</h4>
                  <p>A complete operational guide to adding ketamine infusions, TMS therapy, or Spravato to your cash practice. Covers equipment considerations, staffing models, compliance requirements, pricing strategy, and patient marketing &mdash; for each modality separately.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">07</div>
                <div className="module-text">
                  <h4>Patient Acquisition Marketing Playbook</h4>
                  <p>The exact marketing strategy used by successful cash psychiatric practices: Google Business Profile optimization, local SEO keyword strategy, referral network development targeting PCPs and therapists, website conversion essentials, and social media strategy for interventional services.</p>
                </div>
              </li>
              <li>
                <div className="module-icon">08</div>
                <div className="module-text">
                  <h4>KPI Dashboard Template &amp; Growth Tracking</h4>
                  <p>A pre-built practice metrics dashboard covering the six metrics that determine cash practice success: acquisition cost, inquiry-to-appointment conversion, show rate, 3-month and 12-month retention, revenue per patient, and referral source attribution. Plug in your numbers monthly and know exactly where to focus.</p>
                </div>
              </li>
            </ul>

            <hr className="rule" />

            <h2>Who this Blueprint is built for</h2>
            <div className="audience-grid">
              <div className="audience-card">
                <h4>Employed psychiatrists ready to leave</h4>
                <p>You know the system is broken. You want out. This Blueprint gives you the financial clarity and operational plan to make the move with confidence.</p>
              </div>
              <div className="audience-card">
                <h4>Psychiatrists already partially out-of-network</h4>
                <p>You&apos;re informally cash-based but operating without a real business structure. This formalizes and optimizes what you&apos;re already doing.</p>
              </div>
              <div className="audience-card">
                <h4>New attendings building from scratch</h4>
                <p>Why start with insurance and extract yourself later? Build cash-first from day one and avoid the panel credentialing trap entirely.</p>
              </div>
              <div className="audience-card">
                <h4>Psychiatrists adding interventional services</h4>
                <p>Adding ketamine, TMS, or Spravato to an existing practice? The Interventional Add-On module tells you exactly how to structure it for cash.</p>
              </div>
            </div>

            <div className="testimonial">
              <p>&ldquo;The revenue modeling template alone was worth the investment. I plugged in my market numbers and immediately understood exactly what panel size I needed at what fee to hit my income target. That single piece of clarity unblocked months of indecision.&rdquo;</p>
              <cite>&mdash; Psychiatrist, solo practice owner (Houston, TX)</cite>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Buy Card */}
          <div>
            <div className="buy-card">
              <div className="buy-card-price">$499</div>
              <div className="buy-card-label">One-time purchase &middot; No subscription</div>
              <a href={CHECKOUT_LINK} className="buy-btn" target="_blank" rel="noopener noreferrer">
                Get Instant Access &rarr;
              </a>
              <div className="buy-card-trust">
                Secure checkout<br />
                PDF delivered instantly by email<br />
                30-day satisfaction guarantee
              </div>
              <div className="buy-card-includes">
                <h4>What&apos;s included</h4>
                <ul className="include-list">
                  <li>Revenue modeling spreadsheet</li>
                  <li>State DPC law reference (all 50 states)</li>
                  <li>Patient services agreement template</li>
                  <li>90-day launch roadmap</li>
                  <li>Fee schedule benchmarks</li>
                  <li>Interventional psychiatry add-on guide</li>
                  <li>Patient acquisition marketing playbook</li>
                  <li>KPI dashboard template</li>
                  <li>Lifetime access + free updates</li>
                </ul>
              </div>
            </div>

            {/* Mini consulting CTA */}
            <div className="consulting-cta">
              <p><strong style={{ color: "var(--ink)" }}>Need more than a blueprint?</strong> Book a 1:1 strategy call with Practice Rx and get a custom plan built for your specific market, specialty, and goals.</p>
              <a href="https://calendar.app.google/RaYMAcLTYvRfHB1B8" className="consulting-cta-btn" target="_blank" rel="noopener noreferrer">
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div
          className="rounded-2xl overflow-hidden relative p-8 md:p-10 text-center my-10"
          style={{ backgroundColor: "var(--color-navy)" }}
        >
          <div className="relative z-10">
            <h2
              className="text-2xl md:text-[1.8rem] font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your cash-based psychiatry practice starts here.
            </h2>
            <p className="text-white/60 mb-6">
              One purchase. Eight modules. Everything you need to stop waiting and start building.
            </p>
            <a
              href={CHECKOUT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 text-sm font-bold text-navy rounded-lg transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--color-gold)" }}
            >
              Get the Blueprint &mdash; $499 &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
