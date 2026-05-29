import { CheckCircle, Mail } from "lucide-react";
import { useState, useCallback } from "react";
import { useSEO } from "../hooks/useSEO";
import { TurnstileWidget } from "../components/TurnstileWidget";

const GHL_FORM_ACTION = "YOUR_GHL_FORM_ACTION_URL";

export function ContactPage() {
  useSEO({ title: "Contact Us", description: "Book a free 20-minute discovery call with Dr. Ekene Ajufo to explore launching your DPC or concierge practice. Get personalized guidance on your next step.", path: "/contact" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", specialty: "", message: "" });
  const onCaptchaVerify = useCallback((t: string) => { setCaptchaToken(t); }, []);
  const onCaptchaExpire = useCallback(() => { setCaptchaToken(null); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) { alert("Please complete the CAPTCHA verification."); return; }
    setIsSubmitting(true);
    try {
      await fetch(GHL_FORM_ACTION, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "contact", captchaToken }) });
      setSubmitted(true);
    } catch { alert("Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
  };
  return (
    <div>
      <section className="py-4 md:py-6">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Contact</span>
              <h1 className="text-4xl md:text-5xl font-semibold text-navy mt-3 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Let&apos;s talk about your <span className="italic text-gold">practice.</span>
              </h1>
              <p className="mt-5 text-navy/60 max-w-md leading-relaxed">Tell us a bit about where you are and what you&apos;re trying to build. We&apos;ll reach out within one business day.</p>
              <div className="mt-8 flex items-center gap-2 text-sm text-navy/60">
                <Mail className="size-4" />
                <a href="mailto:info@practicerxconsulting.com" className="hover:text-gold transition-colors">info@practicerxconsulting.com</a>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border/60 p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="size-12 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Request received!</h3>
                  <p className="mt-3 text-navy/60">We&apos;ll reach out within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-navy mb-1.5">Name <span className="text-red-400">*</span></label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition" /></div>
                    <div><label className="block text-sm font-medium text-navy mb-1.5">Email <span className="text-red-400">*</span></label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-navy mb-1.5">Specialty <span className="text-red-400">*</span></label><input type="text" placeholder="e.g. Family medicine" required value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition" /></div>
                  <div><label className="block text-sm font-medium text-navy mb-1.5">What are you working on? <span className="text-red-400">*</span></label><textarea rows={5} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-border/80 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition resize-y" /></div>
                  <TurnstileWidget onVerify={onCaptchaVerify} onExpire={onCaptchaExpire} />
                  <button type="submit" disabled={isSubmitting || !captchaToken} className="w-full px-6 py-3 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{isSubmitting ? "Sending..." : "Book a Discovery Call"}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
