import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { useSEO } from "../hooks/useSEO";

/* ─── Stripe Payment Link ─── */
const GUIDE_CHECKOUT_URL =
  "https://buy.stripe.com/5kQ9AS7Xv4cj2d4dN16J20c";

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
        Family Medicine Physician's Complete DPC Launch Guide
      </h3>
      <p className="text-white/60 text-sm italic mb-5">
        "The complete financial, legal, and operational roadmap for making the
        transition."
      </p>
      <ul className="space-y-2 mb-6">
        {[
          "Break-even model + 90-day launch roadmap",
          "EMR comparison + full tech stack blueprint",
          "Legal checklist + membership agreement guidance",
          "Employer partnership playbook",
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
        Written by Dr. Ekene Ajufo, MD · Practicing physician · Instant
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
            FM DPC Launch Guide
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
export function FamilyMedicineBlogPage() {
  const [publishDate] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

  useSEO({
    title: "Family Medicine DPC Transition Guide — What Every Physician Needs to Know",
    description: "Thinking about leaving your employed position for a DPC practice? Here's what family medicine physicians actually need to know about the financial model, legal landscape, and patient acquisition before making the leap.",
    path: "/blog/family-medicine-dpc-transition",
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
            "The Family Medicine Physician's Honest Guide to Going DPC",
          description:
            "What family medicine physicians actually need to know about the financial model, legal landscape, and patient acquisition before making the leap to DPC.",
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
            "https://practicerxconsulting.com/blog/family-medicine-dpc-transition",
          image:
            "https://practicerxconsulting.com/blog-cover-family-medicine-dpc.jpg",
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
                Family Medicine DPC
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-navy leading-[1.15] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The Family Medicine Physician's Honest Guide to Going DPC (What
              Nobody Tells You Before You Quit)
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
                    <Clock className="size-3" />7 min read
                  </span>
                </div>
              </div>
            </div>

            {/* ══════════════ Article Body ══════════════ */}
            <div className="article-body text-[16px] md:text-[17px] leading-[1.8] text-navy/80">
              {/* ── Opening ── */}
              <p>
                Every family medicine physician I talk to has the same story.
              </p>
              <p>
                You went into medicine to take care of people. Somewhere along
                the way, you ended up taking care of a system — answering to
                administrators, meeting RVU targets, seeing 25 patients a day in
                15-minute windows, and wondering why you feel burned out before
                lunch.
              </p>
              <p>
                Then someone mentions <strong>DPC</strong> — direct primary care
                — and for the first time in years, you feel something like hope.
                A membership-based practice. No insurance billing. Smaller
                panels. Real relationships. Time to actually practice medicine.
              </p>
              <p>
                The concept is simple. The execution is not.
              </p>
              <p>
                I consult with family medicine physicians making this transition
                every week. The ones who succeed and the ones who stall tend to
                diverge at the same handful of decision points — and almost none
                of them are clinical. They're financial, legal, and operational.
              </p>
              <p>
                This post is the honest version of that conversation.
              </p>

              {/* ── The Financial Model Nobody Shows You ── */}
              <h2>The Financial Model Nobody Shows You</h2>
              <p>
                The DPC math, at first glance, looks too good to be true.
                Charge $75–$150 per patient per month. Carry 400–600 patients.
                Gross between $360,000 and $1,080,000 a year.
              </p>
              <p>
                The problem is that the math gets presented without context.
              </p>
              <p>
                Your first year, you won't have 400 patients. You'll have 20.
                Then 40. Then, if you're doing things right, maybe 150 by month
                twelve. That's a{" "}
                <strong>$135,000 to $270,000 gross in year one</strong> — before
                rent, malpractice, EMR, staff, supplies, and your own salary.
              </p>
              <p>
                The break-even point for most solo family medicine DPC practices
                falls between <strong>150 and 250 patients</strong>, depending
                on your overhead structure. If you're lean — solo physician,
                virtual-first or small office, one MA — you can get there in 9
                to 14 months. If you're not lean, you'll burn through your
                runway before you hit it.
              </p>
              <p>
                The physicians who succeed are the ones who model this honestly
                before they leave. They know their monthly burn rate. They know
                how many patients they need to break even. They know how many
                months of personal savings they need to bridge the gap.
              </p>
              <p>
                <strong>
                  The ones who fail are the ones who skip the spreadsheet.
                </strong>
              </p>

              {/* ── The Legal Landscape ── */}
              <h2>
                The Legal Landscape: What You Actually Need Before Day One
              </h2>
              <p>
                There are physicians out there who've been planning their DPC
                launch for two years and still haven't formed an entity. There
                are others who incorporated last Tuesday and are seeing patients
                next Monday. Both approaches carry risk.
              </p>
              <p>
                Here's what you actually need to have in place before you take
                your first membership payment:
              </p>
              <ul>
                <li>
                  <strong>A business entity</strong> — LLC or S-Corp, depending
                  on your tax situation and state. The choice matters more than
                  most physicians realize. An S-Corp election can save you
                  $15,000 to $30,000 per year in self-employment taxes once
                  you're profitable — but it adds complexity and compliance
                  requirements that may not make sense in year one.
                </li>
                <li>
                  <strong>A membership agreement</strong> — This is not optional
                  and it is not a form you pull off the internet. Your membership
                  agreement defines the scope of your services, your refund
                  policy, your liability boundaries, and your termination terms.
                  It needs to be reviewed by a healthcare attorney in your state.
                </li>
                <li>
                  <strong>Malpractice insurance</strong> — DPC practices
                  typically qualify for lower premiums because you're not billing
                  insurance, but you still need coverage. Shop at least three
                  carriers.
                </li>
                <li>
                  <strong>NPI and DEA registration</strong> — You almost
                  certainly have these already. Make sure they're linked to your
                  new practice entity, not your previous employer.
                </li>
                <li>
                  <strong>State DPC statute awareness</strong> — Over 35 states
                  have DPC-specific legislation. What it covers varies
                  dramatically. In some states, DPC agreements are explicitly
                  excluded from insurance regulation. In others, the rules are
                  ambiguous. Know your state's position before you launch.
                </li>
              </ul>

              {/* ── DPC vs. Concierge ── */}
              <h2>DPC vs. Concierge: Which Model Actually Fits?</h2>
              <p>
                This is the question I get more than any other, and the answer is
                less straightforward than the internet makes it seem.
              </p>
              <p>
                <strong>DPC</strong> is a membership model where the patient
                pays a monthly fee for primary care services. No insurance is
                billed for the services covered under the membership. The model
                is designed for accessibility — monthly fees typically range from
                $50 to $200.
              </p>
              <p>
                <strong>Concierge medicine</strong> is a membership model where
                the patient pays a retainer fee — typically annual — for
                enhanced access and longer appointments. The physician usually
                still bills insurance for covered services. Retainer fees are
                higher — $1,500 to $5,000+ per year.
              </p>
              <p>
                For family medicine physicians, DPC is usually the better fit for
                three reasons:
              </p>
              <ul>
                <li>
                  <strong>No insurance billing infrastructure.</strong> You don't
                  need a biller, you don't need credentialing, and you don't need
                  to fight claim denials. Your overhead stays lower.
                </li>
                <li>
                  <strong>Broader patient accessibility.</strong> A $100/month
                  membership is accessible to a much wider population than a
                  $3,000 annual retainer. Your addressable market is larger.
                </li>
                <li>
                  <strong>Simpler operations.</strong> One revenue stream, one
                  billing model, one patient experience. Every layer of
                  complexity you add is a layer that can break.
                </li>
              </ul>
              <p>
                Concierge works well for physicians who want to serve a
                higher-income demographic, who enjoy comprehensive executive
                health workups, or who want to maintain insurance revenue as a
                secondary income stream. For most family medicine physicians
                coming out of employed practice, DPC is the cleaner transition.
              </p>

              {/* ── EMR & Tech Stack ── */}
              <h2>The EMR Decision: What Actually Works for DPC Family Medicine</h2>
              <p>
                Your EMR is the operational backbone of your practice. Choose
                wrong and you'll spend your first year fighting your software
                instead of growing your panel.
              </p>
              <p>
                The DPC EMR market has matured significantly. There are now
                platforms built specifically for DPC — with membership
                management, patient communication, and billing built in — that
                didn't exist five years ago.
              </p>
              <p>
                The five platforms I see most often in family medicine DPC
                practices are <strong>Atlas.md</strong>,{" "}
                <strong>Hint Health</strong>, <strong>Elation</strong>,{" "}
                <strong>DPC Frontier</strong>, and <strong>Practice Fusion</strong>.
                Each has different strengths depending on your practice model,
                your technical comfort level, and your budget.
              </p>
              <p>
                The mistake I see most often: choosing an EMR based on a demo
                rather than based on how it handles the specific workflows that
                will dominate your day. For family medicine DPC, those workflows
                are chronic disease management, medication management, same-day
                messaging, and membership billing. If your EMR doesn't handle
                those four things elegantly, you'll be building workarounds
                within the first month.
              </p>

              {/* ── Patient Acquisition ── */}
              <h2>
                Patient Acquisition: The Channel Most DPC Physicians Ignore
              </h2>
              <p>
                Ask most DPC physicians how they plan to get patients and you'll
                hear some combination of social media, word of mouth, and Google
                Ads.
              </p>
              <p>
                Those channels work. They're also slow and competitive.
              </p>
              <p>
                The fastest patient acquisition channel for family medicine DPC
                physicians — and the one almost nobody talks about — is{" "}
                <strong>employer partnerships</strong>.
              </p>
              <p>
                Small and mid-size employers (10–200 employees) are drowning in
                healthcare costs. Their premiums increase 8–12% annually. Their
                employees are frustrated with the quality of care they're
                receiving. And most of these employers have never heard of DPC.
              </p>
              <p>
                When you approach an employer and offer their employees
                unlimited primary care access for $75–$125 per member per month
                — with same-day appointments, 30-minute visits, and direct
                physician access — you're offering a solution to a problem
                they've been trying to solve for years.
              </p>
              <p>
                A single employer contract with 30 employees at $100/month is{" "}
                <strong>$36,000 in annual recurring revenue</strong> from one
                relationship. Land three of those contracts in your first six
                months and you've built a foundation that most DPC practices
                take 18 months to reach through consumer marketing alone.
              </p>
              <p>
                The playbook for employer outreach is straightforward: identify
                local businesses with 10–100 employees, reach the benefits
                decision-maker (usually the owner or HR director), present the
                cost comparison vs. their current plan, and offer a pilot
                program. Most physicians don't do this because it feels like
                sales. It's not. It's solving a problem for people who are
                actively looking for a solution.
              </p>

              {/* ═══ CTA Placement 1 ═══ */}
              <GuideCTA />

              {/* ── The 90-Day Timeline ── */}
              <h2>The 90-Day Timeline: What a Realistic Launch Looks Like</h2>
              <p>
                You don't need two years to launch a DPC practice. But you do
                need to be honest about what can be done in each phase.
              </p>
              <p>
                <strong>Days 1–30: Foundation.</strong> Entity formation. Bank
                account. EIN. Malpractice insurance. EMR selection and setup.
                Membership agreement drafted and reviewed. Pricing model
                finalized. This is the phase where most physicians stall — not
                because the tasks are hard, but because nobody tells them
                exactly what to do and in what order.
              </p>
              <p>
                <strong>Days 31–60: Build.</strong> Website live. Google Business
                Profile set up. Social media profiles active. Membership billing
                system configured. First employer outreach started. Patient
                communication templates created. If you're leasing space,
                negotiate and sign during this phase. If you're going
                virtual-first, your telehealth platform should be fully
                configured and tested.
              </p>
              <p>
                <strong>Days 61–90: Launch.</strong> Accept your first members.
                Begin seeing patients. Continue employer outreach. Refine your
                operations daily. Ask for referrals from every satisfied patient.
                Track your numbers weekly — new members, churn, revenue, and
                burn rate.
              </p>
              <p>
                The 90-day window is tight. It works if you have a clear
                checklist and you execute on it daily. It falls apart if you're
                making it up as you go.
              </p>

              {/* ── What Nobody Tells You ── */}
              <h2>What Nobody Tells You About the Transition</h2>
              <p>
                The hardest part of going DPC isn't the medicine. It isn't even
                the business. It's the psychological transition from employee to
                owner.
              </p>
              <p>
                You will have months where your income is lower than it was in
                your employed position. You will have weeks where you question
                every decision you've made. You will have patients who join and
                then cancel after two months. You will have family members who
                don't understand why you left a "stable" job.
              </p>
              <p>
                None of that means you're failing. All of it is normal.
              </p>
              <p>
                The physicians who make it through the transition are the ones
                who planned financially, built a support system (other DPC docs,
                a consultant, a spouse who understands the timeline), and
                committed to a minimum 18-month runway before evaluating whether
                the model is working.
              </p>
              <p>
                <strong>
                  DPC works for family medicine. The model is proven. The demand
                  is real. But the transition requires more preparation than
                  inspiration.
                </strong>
              </p>

              {/* ── Closing ── */}
              <p className="mt-8 pt-6 border-t border-border/30">
                If you're a family medicine physician considering the DPC
                transition — whether you're still employed and exploring, or
                you've already given notice and need a launch plan — I work with
                physicians at every stage of this process.
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
