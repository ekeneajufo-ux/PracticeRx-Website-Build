import { useSEO } from "../hooks/useSEO";
import {
  CheckCircle,
  Calculator,
  Cpu,
  ScrollText,
  Download,
} from "lucide-react";
import { useState, useCallback } from "react";
import { TurnstileWidget } from "../components/TurnstileWidget";

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Phase-by-phase launch checklist",
    desc: "From entity formation to opening day — zero guesswork.",
  },
  {
    icon: Calculator,
    title: "Financial modeling template",
    desc: "Forecast members, revenue, and break-even with confidence.",
  },
  {
    icon: Cpu,
    title: "EMR & tech stack guide",
    desc: "The exact tools used by thriving independent practices.",
  },
  {
    icon: ScrollText,
    title: "Membership agreement template",
    desc: "Attorney-reviewed language ready to adapt for your state.",
  },
];

const SERVICE_OPTIONS = [
  "Practice Launch Consulting",
  "Marketing & Patient Acquisition",
  "Business Plan Development",
  "EMR & Tech Stack Setup",
  "Membership Pricing Strategy",
  "Other",
];

export function GuidePage() {
  useSEO({
    title: "Free DPC Launch Guide",
    description: "Download the free 90-Day DPC Launch Checklist. Step-by-step guide to launching your direct primary care or concierge practice.",
    path: "/guide",
  });
  // !! REPLACE with your GoHighLevel form action URL !!
  const GHL_GUIDE_ACTION = "YOUR_GHL_GUIDE_FORM_ACTION";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
  });

  const onCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  const onCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(GHL_GUIDE_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "guide-download", captchaToken }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="py-4 md:py-6">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left — Value prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-white text-xs font-medium text-navy/60 mb-6">
                <Download className="size-3.5" />
                Free download
              </div>
              <h1
                className="text-4xl md:text-5xl font-semibold text-navy leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The DPC Practice
                <br />
                <span className="italic text-gold">Launch Guide.</span>
              </h1>
              <p className="mt-5 text-navy/60 max-w-md leading-relaxed">
                The same playbook our consulting clients use to open thriving
                independent practices — distilled into one focused resource.
              </p>

              <div className="mt-10 space-y-6">
                {FEATURES.map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <feat.icon className="size-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-navy">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-navy/50 mt-0.5">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl border border-border/60 p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="size-12 text-gold mx-auto mb-4" />
                  <h3
                    className="text-2xl font-semibold text-navy"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Check your inbox!
                  </h3>
                  <p className="mt-3 text-navy/60">
                    We&apos;ve sent the guide to your email. Look for a message
                    from PracticeRx.
                  </p>
                </div>
              ) : (
                <>
                  <h2
                    className="text-xl font-semibold text-navy"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Get the guide
                  </h2>
                  <p className="text-sm text-navy/50 mt-1 mb-6">
                    Tell us where to send it.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Jane Doe"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@clinic.com"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Services Interested In{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={form.interest}
                        onChange={(e) =>
                          setForm({ ...form, interest: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                      >
                        <option value="">Select a service...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cloudflare Turnstile CAPTCHA */}
                    <TurnstileWidget
                      onVerify={onCaptchaVerify}
                      onExpire={onCaptchaExpire}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !captchaToken}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Me the Guide"}
                      {!isSubmitting && (
                        <svg
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      )}
                    </button>

                    <p className="text-center text-xs text-navy/40 mt-2">
                      We respect your inbox. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
