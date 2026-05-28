import { Brain, MessageSquare, FileText, Shield } from "lucide-react";

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI-assisted charting",
    desc: "Cut documentation time by up to 70%.",
  },
  {
    icon: MessageSquare,
    title: "Smart patient comms",
    desc: "Triage, follow-ups, and intake — automated.",
  },
  {
    icon: FileText,
    title: "Protocol library",
    desc: "Evidence-based templates ready to go.",
  },
  {
    icon: Shield,
    title: "HIPAA-first stack",
    desc: "Curated tools that meet the bar by default.",
  },
];

export function AISection() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Modern Medicine
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Where medicine meets{" "}
              <span className="italic text-gold">
                artificial intelligence.
              </span>
            </h2>
            <p className="mt-5 text-navy/60 leading-relaxed">
              We help you adopt AI thoughtfully — so it gives you time back
              instead of adding noise. The right stack, configured for your
              workflow.
            </p>
          </div>

          {/* Right: feature list */}
          <div className="space-y-4">
            {AI_FEATURES.map((feat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border/60 p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0">
                  <feat.icon className="size-5 text-navy/60" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-navy/50 leading-relaxed mt-1">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
