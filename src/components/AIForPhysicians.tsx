import { Stethoscope, FileText, Megaphone, Home } from "lucide-react";
import { Link } from "react-router-dom";

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
              appeals, AI tools are saving independent physicians 5–10 hours per
              week. Dr. Ajufo helps you identify exactly where AI fits into your
              clinical workflow and your personal life — and sets it up with you
              so it actually gets used.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://buy.stripe.com/4gM14mfpXcIPg3UdN16J206"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-md hover:shadow-lg w-fit"
              >
                Book the AI Workflow Audit — $497
              </a>
              <Link
                to="/subscriptions"
                className="text-sm font-medium text-navy/60 hover:text-gold transition-colors w-fit"
              >
                Or subscribe to the AI Workflow Digest — $39/mo →
              </Link>
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
                  "{uc.example}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
