import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  BarChart2,
  MapPin,
  DollarSign,
  Compass,
  Lightbulb,
  ArrowRight,
  Clock,
  Shield,
  Star,
} from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { CTABanner } from "../components/CTABanner";
import { Testimonial } from "../components/Testimonial";

const GHL_AUDIT_FORM_ACTION = import.meta.env.VITE_GHL_AUDIT_FORM_ACTION ?? "";

const DELIVERABLES = [
  {
    icon: <BarChart2 className="size-5 text-gold" />,
    title: "Digital Presence Score",
    description:
      "Your Google listing, website, social media, and online reviews graded A–F with specific gaps called out.",
  },
  {
    icon: <MapPin className="size-5 text-gold" />,
    title: "Market Opportunity Score",
    description:
      "How saturated is DPC in your city? We map local competition and score your market on a 1–10 scale.",
  },
  {
    icon: <DollarSign className="size-5 text-gold" />,
    title: "Revenue Liberation Estimate",
    description:
      "A specialty-adjusted projection of what your practice could earn under a DPC or concierge model vs. insurance.",
  },
  {
    icon: <Compass className="size-5 text-gold" />,
    title: "Readiness Level",
    description:
      "Are you an Early Explorer, Runway Ready, or Launch-Ready? Your profile tells us where you are right now.",
  },
  {
    icon: <Lightbulb className="size-5 text-gold" />,
    title: "Top 3 Opportunities",
    description:
      "Personalized, actionable next steps based on your weakest scores — not generic advice.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Fill the 5-minute form",
    description:
      "Tell us your specialty, location, and biggest challenge. No financials, no documents, no homework.",
  },
  {
    number: "02",
    title: "We analyze your practice",
    description:
      "Our team researches your digital presence, local market, and revenue potential using public data.",
  },
  {
    number: "03",
    title: "Get your report in 24 hrs",
    description:
      "Your personalized Practice Freedom Audit lands in your inbox — with a clear picture of what's possible.",
  },
];

const FAQS = [
  {
    question: "Is this actually free?",
    answer:
      "Yes, completely. No credit card, no commitment. We offer this audit because physicians who see their own numbers are the ones who take action — and we'd rather earn your trust with value than a sales pitch.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Just the short form below — name, email, specialty, state, and a few quick questions. We do all the research ourselves using public data.",
  },
  {
    question: "What happens after I get my audit?",
    answer:
      "You'll have the option to book a free 15-minute results call with Dr. Ajufo to walk through your findings. There's no pressure to buy anything — though most physicians find the results spark a much bigger conversation.",
  },
  {
    question: "How is this different from a free discovery call?",
    answer:
      "A discovery call is a conversation. Your audit is a deliverable — a scored, personalized report about your specific practice. We do the work first so that if you ever do get on a call with us, every minute counts.",
  },
];

type FormState = {
  name: string;
  email: string;
  specialty: string;
  state: string;
  practiceType: string;
  yearsInPractice: string;
  biggestChallenge: string;
  timeline: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  specialty: "",
  state: "",
  practiceType: "",
  yearsInPractice: "",
  biggestChallenge: "",
  timeline: "",
};

function AuditForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCaptchaVerify = useCallback((t: string) => setCaptchaToken(t), []);
  const onCaptchaExpire = useCallback(() => setCaptchaToken(null), []);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }
    const required: (keyof FormState)[] = ["name", "email", "specialty", "state", "practiceType", "biggestChallenge", "timeline"];
    for (const field of required) {
      if (!form[field]) {
        alert("Please fill in all required fields.");
        return;
      }
    }
    setIsSubmitting(true);
    try {
      if (GHL_AUDIT_FORM_ACTION) {
        await fetch(GHL_AUDIT_FORM_ACTION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            source: "free_audit",
            captchaToken,
            interest: JSON.stringify({
              practiceType: form.practiceType,
              yearsInPractice: form.yearsInPractice,
              biggestChallenge: form.biggestChallenge,
              timeline: form.timeline,
            }),
          }),
        });
      }
      navigate("/thank-you?product=free-audit");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name <span className="text-red-400">*</span></label>
          <input type="text" required value={form.name} onChange={set("name")} placeholder="Dr. Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email <span className="text-red-400">*</span></label>
          <input type="email" required value={form.email} onChange={set("email")} placeholder="jane@clinic.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Specialty <span className="text-red-400">*</span></label>
          <input type="text" required value={form.specialty} onChange={set("specialty")} placeholder="e.g. Family Medicine" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>State <span className="text-red-400">*</span></label>
          <input type="text" required value={form.state} onChange={set("state")} placeholder="e.g. Texas" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Current practice type <span className="text-red-400">*</span></label>
        <select required value={form.practiceType} onChange={set("practiceType")} className={inputClass}>
          <option value="">Select one…</option>
          <option value="employed">Employed physician</option>
          <option value="solo">Solo practice</option>
          <option value="group">Group practice</option>
          <option value="locums">Locums / contractor</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Years in practice</label>
        <select value={form.yearsInPractice} onChange={set("yearsInPractice")} className={inputClass}>
          <option value="">Select one…</option>
          <option value="under5">Less than 5 years</option>
          <option value="5to10">5–10 years</option>
          <option value="10to20">10–20 years</option>
          <option value="over20">More than 20 years</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Biggest challenge right now <span className="text-red-400">*</span></label>
        <select required value={form.biggestChallenge} onChange={set("biggestChallenge")} className={inputClass}>
          <option value="">Select one…</option>
          <option value="burnout">Burnout / documentation overload</option>
          <option value="income">Income ceiling / insurance cuts</option>
          <option value="autonomy">Lack of clinical autonomy</option>
          <option value="worklife">Work-life balance</option>
          <option value="all">All of the above</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Timeline to go independent <span className="text-red-400">*</span></label>
        <select required value={form.timeline} onChange={set("timeline")} className={inputClass}>
          <option value="">Select one…</option>
          <option value="3months">Within 3 months</option>
          <option value="6months">Within 6 months</option>
          <option value="1year">Within 1 year</option>
          <option value="exploring">Just exploring for now</option>
        </select>
      </div>

      <TurnstileWidget onVerify={onCaptchaVerify} onExpire={onCaptchaExpire} />

      <button
        type="submit"
        disabled={isSubmitting || !captchaToken}
        className="w-full px-6 py-3.5 text-sm font-bold bg-gold text-navy rounded-lg hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? "Submitting…" : (
          <>
            Get My Free Audit
            <ArrowRight className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-navy/40 leading-relaxed">
        No credit card. No spam. Your audit is delivered within 24 hours.
      </p>
    </form>
  );
}

export function FreeAuditPage() {
  useSEO({
    title: "Free Practice Freedom Audit",
    description:
      "Get a personalized, data-driven audit of your practice — digital presence graded, market sized, revenue potential estimated — delivered to your inbox in 24 hours. No commitment, no credit card.",
    path: "/free-audit",
  });

  return (
    <div>
      {/* ── Hero ── */}
      <section className="pt-6 pb-10 md:pt-10 md:pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left */}
            <div className="md:pt-4">
              <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
                <Star className="size-3 text-gold fill-gold" />
                <span className="text-xs font-semibold text-gold">100% Free — No Credit Card</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-[3.6rem] font-semibold text-navy leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                See exactly what your{" "}
                <span className="italic text-gold">independent practice</span>{" "}
                could look like.
              </h1>

              <p className="mt-6 text-base md:text-lg text-navy/60 max-w-lg leading-relaxed">
                Fill a 5-minute form. In 24 hours, receive a personalized Practice Freedom Audit — your digital presence graded, your market sized, your revenue potential estimated. No commitment. No credit card.
              </p>

              {/* Trust signals */}
              <div className="mt-8 space-y-3">
                {[
                  { icon: <Clock className="size-4 text-gold" />, text: "Delivered within 24 hours" },
                  { icon: <Shield className="size-4 text-gold" />, text: "No sales call required to receive it" },
                  { icon: <CheckCircle className="size-4 text-gold" />, text: "Based on your specific practice, not templates" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium text-navy/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl border border-border/60 p-7 shadow-sm">
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                  Get your free audit
                </h2>
                <p className="text-sm text-navy/50 mt-1">Takes about 5 minutes. We do the rest.</p>
              </div>
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Receive ── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/40">
            Your Report
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Five things we analyze{" "}
            <span className="italic text-gold">for you.</span>
          </h2>
          <p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
            Everything in your audit is pulled from public data and your intake form — no documents, no financials, no extra work on your end.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {DELIVERABLES.map((item, i) => (
              <div
                key={i}
                className="bg-cream rounded-xl border border-border/50 p-5 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">{item.description}</p>
              </div>
            ))}

            {/* Bonus card */}
            <div className="bg-navy rounded-xl p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                <Star className="size-5 text-gold" />
              </div>
              <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Bonus: Results Call Invite
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                After your audit arrives, you'll have the option to book a free 15-minute call with Dr. Ajufo to walk through your findings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-10 md:py-14">
        <div className="container">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/40">
            The Process
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Simple as{" "}
            <span className="italic text-gold">three steps.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col gap-4">
                <div className="text-5xl font-bold text-gold/20" style={{ fontFamily: "var(--font-heading)" }}>
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-navy -mt-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">{step.description}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-10 size-5 text-navy/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonial />

      {/* ── FAQ ── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/40">
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Common questions,{" "}
            <span className="italic text-gold">answered.</span>
          </h2>
          <div className="mt-8 space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-border/50 pb-5">
                <h3 className="text-base font-semibold text-navy mb-2">{faq.question}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
