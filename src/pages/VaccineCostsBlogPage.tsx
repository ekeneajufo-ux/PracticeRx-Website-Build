import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

/* ─── GHL Funnel Link ─── */
const GUIDE_CHECKOUT_URL =
  "https://funnels.practicerxconsulting.com/vaccineguide-page";

/* ─── Guide CTA Block ─── */
function GuideCTA() {
  return (
    <div className="my-10 rounded-2xl overflow-hidden bg-navy p-8 md:p-10">
      <p
        className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
        style={{ color: "var(--color-gold)" }}
      >
        DIGITAL RESOURCE
      </p>
      <h3
        className="text-xl md:text-2xl font-semibold text-white mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        DPC Pediatric Vaccine Cost Management Guide
      </h3>
      <p className="text-white/60 text-sm italic mb-5">
        "The only financial guide written specifically for DPC pediatricians on
        managing vaccine costs."
      </p>
      <ul className="space-y-2 mb-6">
        {[
          "Age-band vaccine cost model (0–2, 3–6, 7–11, 12–18 years)",
          "GPO comparison table — 15–35% savings on acquisition costs",
          "VFC eligibility breakdown by practice structure",
          "All 4 membership design approaches with compliance implications",
          "Full operational audit checklist",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white">
            <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mb-5">
        <span
          className="text-2xl font-bold"
          style={{ color: "var(--color-gold)" }}
        >
          $399
        </span>
        <span className="text-white/50 text-sm ml-2">
          one-time · instant PDF download
        </span>
      </div>
      <a
        href={GUIDE_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110"
        style={{ backgroundColor: "#2DD4BF" }}
      >
        Get the Full Guide →
      </a>
      <p className="text-white/40 text-xs mt-3 italic">
        Written by Dr. Ekene Ajufo, MD · Practicing pediatrician · Instant
        download
      </p>
    </div>
  );
}

/* ─── Sticky Sidebar (Desktop) ─── */
function StickySidebar() {
  return (
    <div className="hidden xl:block w-[260px] shrink-0">
      <div className="sticky top-24">
        <div className="bg-navy rounded-xl p-5">
          <p
            className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
            style={{ color: "var(--color-gold)" }}
          >
            DIGITAL RESOURCE
          </p>
          <h4
            className="text-sm font-semibold text-white mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Vaccine Cost Management Guide
          </h4>
          <p
            className="text-lg font-bold mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            $399
          </p>
          <a
            href={GUIDE_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110"
            style={{ backgroundColor: "#2DD4BF" }}
          >
            Get the Guide
          </a>
        </div>
        <Link
          to="/book"
          className="block mt-4 text-center text-sm font-medium text-navy/60 hover:text-navy transition-colors"
        >
          Book a Discovery Call →
        </Link>
      </div>
    </div>
  );
}

/* ─── Author Bio Card ─── */
function AuthorBio() {
  return (
    <div className="mt-12 border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white">
      <img
        src="/dr-ajufo-circle.png"
        alt="Dr. Ekene Ajufo, MD"
        className="w-20 h-20 rounded-full object-cover shrink-0"
      />
      <div className="text-center sm:text-left">
        <h4
          className="text-lg font-semibold text-navy"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dr. Ekene Ajufo, MD
        </h4>
        <p className="text-sm text-navy/60 mt-1 leading-relaxed mb-3">
          Practicing pediatrician and founder of PracticeRx Consulting, a
          physician-led consulting firm helping DPC and cash-pay practices
          launch, grow, and run profitably. She works with physician owners
          across the country on practice finance, patient acquisition, and
          operational strategy.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium">
          <a
            href="https://practicerxconsulting.com"
            className="text-gold hover:text-gold-dark transition-colors inline-flex items-center gap-1"
          >
            <ExternalLink className="size-3.5" />
            practicerxconsulting.com
          </a>
          <Link
            to="/book"
            className="text-gold hover:text-gold-dark transition-colors"
          >
            Book a call →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export function VaccineCostsBlogPage() {
  const [publishDate] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

  useSEO({
    title: "Vaccine Costs in Pediatric DPC Practices — What Every Physician Needs to Know",
    description: "Vaccines are the most overlooked cost driver in pediatric DPC practices. Learn how DPC pediatricians can manage vaccine costs through smart procurement, VFC compliance, and membership pricing strategy.",
    path: "/blog/vaccine-costs-pediatric-dpc",
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
            "Why Vaccine Costs Are the #1 Financial Blind Spot in Pediatric DPC Practices",
          description:
            "Vaccines are the most overlooked cost driver in pediatric DPC practices. Learn how DPC pediatricians can manage vaccine costs through smart procurement, VFC compliance, and membership pricing strategy.",
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
            "https://practicerxconsulting.com/blog/vaccine-costs-pediatric-dpc",
          image:
            "https://practicerxconsulting.com/blog-cover-pediatric-dpc.jpg",
        }}
      />
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

      {/* Layout: Article + Sidebar */}
      <div className="container pb-16">
        <div className="flex gap-10 justify-center">
          {/* Main Article Column */}
          <article className="w-full max-w-[740px]">
            {/* Category Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Practice Finance
              </span>
              <span className="text-navy/20">·</span>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Pediatric DPC
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-navy leading-[1.15] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why Vaccine Costs Are the #1 Financial Blind Spot in Pediatric DPC
              Practices (And What to Do About It)
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
                  <span>{publishDate}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />6 min read
                  </span>
                </div>
              </div>
            </div>

            {/* ══════════════ Article Body ══════════════ */}
            <div className="article-body text-[16px] md:text-[17px] leading-[1.8] text-navy/80">
              {/* ── Opening ── */}
              <p>
                The DPC movement has transformed how thousands of physicians
                practice medicine. Fewer patients. More time. No insurance
                middlemen. It's a model that works — and for pediatricians, it
                works beautifully.
              </p>
              <p>
                Except for one thing almost nobody talks about.
              </p>
              <p>
                <strong>Vaccines.</strong>
              </p>
              <p>
                In a traditional insurance-based pediatric practice, vaccines are
                purchased, administered, billed, and (in theory) reimbursed. The
                system is imperfect, but there's a billing mechanism that at
                least partially offsets your acquisition costs.
              </p>
              <p>In a DPC practice, that mechanism is gone.</p>
              <p>
                And if you haven't built vaccine costs deliberately into your
                financial model, you may be quietly losing thousands of dollars
                every month without fully understanding why your margins don't
                add up.
              </p>

              {/* ── The Number That Will Surprise You ── */}
              <h2>The Number That Will Surprise You</h2>
              <p>
                The full childhood vaccine series from birth through 18 years,
                priced at private-sector rates, exceeds{" "}
                <strong>$4,000 per patient</strong> over that span.
              </p>
              <p>
                For a DPC pediatric practice with 300 patients — a reasonable
                panel for a solo DPC physician — total annual vaccine costs
                (acquisition plus administration overhead) commonly run between{" "}
                <strong>$18,000 and $45,000 per year</strong>.
              </p>
              <p>
                That's <strong>$1,500 to $3,750 per month</strong> coming out of
                your practice before you've paid rent, staff, or yourself.
              </p>
              <p>
                For most DPC physicians designing their membership price, this
                number never makes it into the spreadsheet. They estimate
                roughly, assume they're in the ballpark, and move on.
              </p>
              <p>
                <strong>They're not in the ballpark.</strong>
              </p>

              {/* ── The Three Mistakes ── */}
              <h2>
                The Three Mistakes DPC Pediatricians Make With Vaccines
              </h2>

              <h3>
                Mistake #1: Pricing membership without modeling vaccine cost by
                age band
              </h3>
              <p>
                Vaccine burden is not uniform across your patient panel. A
                practice heavy with infants and toddlers (ages 0–2) carries
                dramatically higher vaccine costs than a practice of mostly
                school-age children. An infant can require 20 or more vaccine
                doses in the first two years of life. A healthy 10-year-old
                might need two.
              </p>
              <p>
                If you set one membership price without segmenting by age, you
                are almost certainly subsidizing your youngest patients with
                revenue from your older ones — and not intentionally.
              </p>

              <h3>Mistake #2: Forgetting administration overhead</h3>
              <p>
                Every dose you administer costs more than the acquisition price.
                There's your time, your staff's time, needles and syringes and
                alcohol swabs and bandages, the refrigerator running 24/7, the
                temperature monitoring system, and the risk management overhead
                of maintaining a cold chain.
              </p>
              <p>
                That overhead is real. It runs{" "}
                <strong>$8 to $15 per dose</strong> when you account for it
                properly. At 300 doses a month, forgetting this line item is a{" "}
                <strong>$2,400 to $4,500 monthly error</strong>.
              </p>

              <h3>
                Mistake #3: Assuming VFC works the same way it did in your old
                practice
              </h3>
              <p>
                The Vaccines for Children (VFC) program provides free vaccines
                for Medicaid-enrolled, uninsured, and underinsured children.
                It's one of the most valuable programs in pediatric medicine.
              </p>
              <p>
                It's also one of the most misunderstood programs for DPC
                pediatricians.
              </p>
              <p>
                Whether your DPC practice can participate in VFC — and how —
                depends entirely on how your membership is structured, how your
                state interprets VFC rules, and whether you've had the right
                conversation with your state VFC coordinator.
              </p>
              <p>
                Some DPC practices are fully VFC-eligible. Others have
                inadvertently disqualified themselves without realizing it. A few
                are operating in a gray zone that could become a compliance
                problem.
              </p>
              <p>
                Getting this wrong has real consequences — both financial and
                regulatory.
              </p>

              {/* ── What Actually Works ── */}
              <h2>
                What Actually Works: Three Levers DPC Pediatricians Have
              </h2>

              <h3>Lever 1: Procurement Strategy</h3>
              <p>
                Most independent physicians purchase vaccines through a
                wholesale distributor at or near the full Wholesale Acquisition
                Cost (WAC). This is the most expensive way to buy vaccines.
              </p>
              <p>
                Group Purchasing Organizations (GPOs) — most of which are free
                to join — aggregate purchasing power across thousands of
                practices to negotiate manufacturer discounts of{" "}
                <strong>15 to 35 percent below WAC</strong>. For a practice
                spending $30,000 a year on vaccines, that's{" "}
                <strong>$4,500 to $10,500 back in your pocket</strong> annually
                from a single enrollment decision.
              </p>
              <p>
                There are also state public health purchasing programs,
                manufacturer direct programs, and regional buying cooperatives
                that most DPC pediatricians have never explored.
              </p>

              <h3>Lever 2: Membership Structure</h3>
              <p>
                How you structure vaccines within your DPC membership determines
                both your financial exposure and your regulatory compliance
                posture. There are four main structural approaches — each with
                different implications for your margins, your VFC eligibility,
                and your patient experience.
              </p>
              <p>
                The right structure for your practice depends on your patient
                panel composition, your market, and your financial goals. There
                is no universal answer — but there is a right answer for your
                specific situation.
              </p>

              <h3>Lever 3: Operational Controls</h3>
              <p>
                Vaccine wastage, cold chain failures, and inefficient
                administration workflows are all cost drivers that sit entirely
                within your control. Practices that track wastage rates,
                implement FIFO inventory systems, and invest in proper cold chain
                infrastructure consistently outperform those that don't — on
                both cost and compliance metrics.
              </p>

              {/* ── Why This Matters More for Pediatric DPC ── */}
              <h2>
                Why This Matters More for Pediatric DPC Than Any Other Specialty
              </h2>
              <p>
                Adult DPC physicians rarely think about vaccine costs. The adult
                immunization schedule is limited — an annual flu shot, maybe a
                shingles vaccine, a Tdap booster. Manageable, low-cost,
                low-complexity.
              </p>
              <p>
                Pediatric DPC is a different world. The ACIP childhood
                immunization schedule is one of the most complex and
                vaccine-dense schedules in medicine. Pediatric DPC physicians are
                dealing with a cost and compliance challenge that the broader DPC
                community has almost entirely failed to address in its
                literature, conferences, and training resources.
              </p>
              <p>That gap is part of why I wrote the guide below.</p>

              {/* ═══ CTA Placement 1 ═══ */}
              <GuideCTA />

              {/* ── If You Want to Go Deeper ── */}
              <h2>If You Want to Go Deeper</h2>
              <p>
                Everything in this post is an introduction to a topic that has
                significant depth — and significant financial consequence if you
                get it wrong.
              </p>
              <p>
                The{" "}
                <strong>DPC Pediatric Vaccine Cost Management Guide</strong>{" "}
                covers the full picture:
              </p>
              <ul>
                <li>
                  A complete vaccine budget framework with an{" "}
                  <strong>age-band cost model</strong> you can fill in for your
                  specific panel
                </li>
                <li>
                  A <strong>GPO comparison table</strong> with estimated
                  discounts for the major purchasing organizations serving
                  independent pediatric practices
                </li>
                <li>
                  A <strong>VFC eligibility breakdown</strong> by practice
                  structure — including what DPC practices can and cannot do
                  under federal and state rules
                </li>
                <li>
                  All{" "}
                  <strong>four membership design approaches</strong> laid out
                  side by side, with the financial and compliance implications of
                  each
                </li>
                <li>
                  <strong>Operational checklists</strong> for inventory
                  management, cold chain compliance, and staff efficiency
                </li>
                <li>
                  A ready-to-use{" "}
                  <strong>patient communication script</strong> for the vaccine
                  cost conversation
                </li>
                <li>
                  A full <strong>practice audit checklist</strong> you can use to
                  assess where your practice stands right now
                </li>
              </ul>

              {/* ── Closing ── */}
              <p className="mt-8 pt-6 border-t border-border/30">
                If you have questions about vaccine cost management in your
                specific practice, or if you're planning a DPC launch and want
                to make sure vaccines are built correctly into your financial
                model from day one — that is exactly the kind of work I do.
              </p>
              <p className="mt-4">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
                >
                  Book a Free 20-Minute Discovery Call →
                </Link>
              </p>

              {/* ═══ CTA Placement 2 ═══ */}
              <GuideCTA />
            </div>

            {/* Author Bio Card */}
            <AuthorBio />
          </article>

          {/* Sticky Sidebar */}
          <StickySidebar />
        </div>
      </div>
    </div>
  );
}
