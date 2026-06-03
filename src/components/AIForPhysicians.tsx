import { Stethoscope, FileText, Megaphone, Home, Check } from "lucide-react";

const USE_CASES = [
  {
    icon: Stethoscope,
    label: "Clinical Documentation",
    example: "Draft notes, referrals & patient messages",
  },
  {
    icon: FileText,
    label: "Prior Auth & Admin",
    example: "Appeal denials in minutes, not hours",
  },
  {
    icon: Megaphone,
    label: "Practice Marketing",
    example: "Generate social posts, emails & campaigns",
  },
  {
    icon: Home,
    label: "Home & Personal Life",
    example: "Meal planning, travel, scheduling & more",
  },
];

const DIGEST_FEATURES = [
  "Weekly AI tool picks for physicians",
  "Prompt templates for clinical & admin tasks",
  "Workflow automations you can implement same-day",
  "Real-world case studies from independent practices",
];

export function AIForPhysicians() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column — text */}
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              AI For Physicians
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-semibold text-navy mt-3 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI is already changing how the best practices operate.{" "}
              <span className="italic text-gold">Is yours keeping up?</span>
            </h2>
            <p className="mt-5 text-navy/60 leading-relaxed">
              From ambient clinical documentation to automated prior auth
              appeals, AI tools are saving independent physicians 5&ndash;10 hours per
              week. The AI Workflow Digest delivers curated tools, prompt
              templates, and real-world workflows to your inbox every week
              &mdash; built specifically for physicians.
            </p>

            {/* Feature list */}
            <ul className="mt-6 space-y-2.5">
              {DIGEST_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="size-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm text-navy/70">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="https://funnels.practicerxconsulting.com/aiworkflowdigest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-md hover:shadow-lg"
              >
                Subscribe to the AI Workflow Digest &mdash; $39/mo
              </a>
            </div>
          </div>

          {/* Right column — 2x2 use-case grid */}
          <div className="grid grid-cols-2 gap-4">
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                className="bg-cream rounded-xl border border-border/40 p-5 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                  <uc.icon className="size-6 text-gold" />
                </div>
                <h3
                  className="text-sm font-semibold text-navy leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {uc.label}
                </h3>
                <p className="text-xs text-navy/45 mt-1.5 leading-relaxed italic">
                  &ldquo;{uc.example}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
