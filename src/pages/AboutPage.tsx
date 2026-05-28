import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { CTABanner } from "../components/CTABanner";

const PRACTICES = [
  {
    tag: "Pediatrics",
    title: "Modernized a multi-provider pediatric practice",
    desc: "Led the operational and technology revamp of an established Florida pediatric group — refreshing the brand, replatforming the EHR workflow, modernizing scheduling and intake, and rebuilding the front-office playbook. Result: shorter visit cycles, cleaner documentation, and a team that finally enjoyed Mondays again.",
  },
  {
    tag: "Aesthetics",
    title: "Built a med spa from zero",
    desc: "Designed and launched a cash-pay medical spa end-to-end: service menu and pricing strategy, provider hiring, vendor stack, treatment protocols, marketing funnel, and member retention. The clinic was profitable in its first quarter.",
  },
  {
    tag: "Surgical",
    title: "Stood up a plastic surgery clinic",
    desc: "Partnered on a new plastic surgery practice — surgical workflow, pre/post-op pathways, consult-to-conversion process, and the financial model behind a high-ticket, reputation-driven specialty.",
  },
  {
    tag: "Advisory",
    title: "Worked with dozens of clinics and hospitals",
    desc: "Across inpatient, outpatient, urgent care, and newborn medicine — advising independent groups, hospital systems, and locums networks on workflow design, documentation quality, and the operations decisions that protect physician time.",
  },
  {
    tag: "Clinical AI",
    title: "Clinical AI consultant for the companies building it",
    desc: "Subject-matter expert for healthcare AI teams: clinical reasoning evaluation, annotation standards, training data quality, and safety review for pediatric and adult use cases. Stanford and ABAIM AI certified.",
  },
];

const CREDENTIALS = [
  "MD, Lewis Katz School of Medicine at Temple University",
  "Pediatrics residency, Cooper University Hospital",
  "Board-Certified Pediatrician (FAAP)",
  "Stanford AI in Healthcare — Certified",
  "ABAIM (American Board of AI in Medicine) — Certified",
  "7+ years across inpatient, outpatient, urgent care, newborn medicine",
];

export function AboutPage() {
  useSEO({
    title: "About Dr. Ekene Ajufo",
    description: "Meet Dr. Ekene Ajufo, board-certified pediatrician and founder of PracticeRx Consulting. Helping physicians build thriving cash-based practices.",
    path: "/about",
  });
  return (
    <div>
      {/* Header */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            About
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A physician, a founder, and a builder of{" "}
            <span className="italic text-gold">modern practices.</span>
          </h1>
          <p className="mt-5 text-navy/60 leading-relaxed">
            PracticeRx is led by Dr. Ekene Ajufo — a board-certified
            pediatrician who has spent the last decade quietly doing the work
            most consultants only talk about: launching practices, modernizing
            tired ones, and helping physicians design careers they actually want.
          </p>
        </div>
      </section>

      {/* Founder Bio */}
      <section className="py-8 md:py-10 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gold/20 to-cream">
              <img
                src="/clinic-patients.jpg"
                alt="Patients walking into a modern medical clinic"
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                The Founder
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Built by a physician who&apos;s{" "}
                <span className="italic">done it.</span>
              </h2>
              <p className="mt-5 text-navy/60 leading-relaxed">
                PracticeRx isn&apos;t theory. Every framework comes from years
                of running an independent practice and helping other physicians
                do the same — without sacrificing their families, their health,
                or their ideals.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Board-certified physician",
                  "Mentored physicians into independence",
                  "Founded cash-based practices",
                  "Clinical AI consultant: Stanford & ABAIM AI Certified",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="size-4 text-gold shrink-0" />
                    <span className="text-sm text-navy/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-10 md:py-14">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            The Story
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Trained in medicine.{" "}
            <span className="italic">Wired for operations.</span>
          </h2>
          <div className="mt-8 space-y-5 text-navy/60 leading-relaxed">
            <p>
              Dr. Ajufo grew up around independent medicine — the daughter of a
              pediatrician who ran his own practice in Ocala, Florida. She
              studied at the University of Florida, earned her MD at Temple
              University in Philadelphia, and completed her pediatrics residency
              at Cooper University Hospital in Camden, New Jersey.
            </p>
            <p>
              Seven-plus years of clinical work followed — inpatient, outpatient,
              urgent care, newborn medicine, hospital systems, and locums
              coverage across the country. Somewhere along the way it became
              obvious: the bottleneck on great medicine wasn&apos;t the medicine.
              It was the operating system around it.
            </p>
            <p>
              So she started building. A pediatric practice, modernized. A med
              spa, launched from nothing. A plastic surgery clinic, designed for
              a specialty with no margin for a sloppy patient experience. And in
              parallel, a second career as a clinical AI consultant — bringing a
              real clinician&apos;s standard to the systems being trained on our
              work.
            </p>
            <p>
              PracticeRx is the consolidation of all of it: a 90-day program
              that helps physicians launch independent practices the way they
              should have been built in the first place.
            </p>
          </div>
        </div>
      </section>

      {/* What She's Built */}
      <section className="py-8 md:py-10 bg-white">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            What She&apos;s Built
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Real practices.{" "}
            <span className="italic text-gold">Real outcomes.</span>
          </h2>
          <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
            Five distinct domains of operating experience — each one the source
            of frameworks now packaged inside PracticeRx.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {PRACTICES.map((p, i) => (
              <div
                key={i}
                className={`bg-cream rounded-xl border border-border/60 p-6 ${
                  i === PRACTICES.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-0.625rem)]" : ""
                }`}
              >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                  {p.tag}
                </span>
                <h3 className="text-base font-semibold text-navy mt-2">
                  {p.title}
                </h3>
                <p className="text-sm text-navy/50 mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Credentials
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Training &amp;
                <br />
                certifications.
              </h2>
              <p className="mt-4 text-navy/60 leading-relaxed">
                The clinical and technical foundation behind every PracticeRx
                engagement.
              </p>
            </div>

            <ul className="space-y-4">
              {CREDENTIALS.map((cred, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="size-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy/70">{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-4 md:py-6 bg-white">
        <div className="container max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6 block">
            Why PracticeRx Exists
          </span>
          <blockquote
            className="text-xl md:text-2xl font-medium text-navy leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;Independent practice should be the obvious choice for any
            physician who wants their{" "}
            <span className="italic text-gold">
              time, autonomy, and integrity
            </span>{" "}
            back. My job is to make the path obvious — and the first 90 days
            survivable.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-navy/50">
            — Dr. Ekene Ajufo, Founder
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center mt-8 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
          >
            Book a discovery call
          </Link>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
