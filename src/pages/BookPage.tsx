import { useSEO } from "../hooks/useSEO";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Video,
} from "lucide-react";
import { useState } from "react";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0TSo1bXisALH7Tnm-JjZOnomMBvd5DmWW78jgr2JIEpYeOpeM1pu0YsK6HsHoqqwxewefsjBTk?gv=true";
const CALENDAR_SHORT_URL = "https://calendar.app.google/MLbgWaZ5UZRoVb8c7";

export function BookPage() {
  useSEO({
    title: "Book a Free Discovery Call",
    description: "Schedule a free 30-minute discovery call with Dr. Ekene Ajufo to discuss launching your DPC, concierge, or cash-based practice.",
    path: "/book",
  });
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Book a Free <span className="text-gold">Discovery Call</span>
            </h1>
            <p className="text-gray-300 text-lg">
              30 minutes to explore whether DPC, concierge, or an alternative
              model is right for you — and map out your path to independence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Calendar embed */}
            <div className="lg:col-span-3">
              <h2
                className="text-xl font-semibold text-navy mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Select a Time That Works for You
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Choose a slot below and you'll receive a confirmation email with
                a Zoom link.
              </p>

              {/* Primary: direct link button (always works) */}
              <a
                href={CALENDAR_SHORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-5 flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors shadow-sm"
              >
                <Calendar className="size-4" />
                Open Scheduling Calendar
                <ExternalLink className="size-3.5" />
              </a>

              {/* Iframe embed (may not work in all environments) */}
              {!iframeError && (
                <div className="rounded-xl border border-border/60 overflow-hidden bg-white">
                  <iframe
                    src={CALENDAR_URL}
                    style={{ border: 0, width: "100%", height: "680px" }}
                    title="Book a Discovery Call with Dr. Ajufo"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allow="clipboard-write"
                    onError={() => setIframeError(true)}
                  />
                </div>
              )}

              {iframeError && (
                <div className="rounded-xl border border-border/60 bg-white p-12 text-center">
                  <Calendar className="size-10 text-gold mx-auto mb-4" />
                  <p className="text-navy/60 text-sm">
                    Calendar preview unavailable in this browser.
                  </p>
                  <p className="text-navy/60 text-sm mt-1">
                    Use the button above to open the scheduling page directly.
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-3 text-center">
                Having trouble?{" "}
                <a
                  href="/contact"
                  className="text-gold-dark hover:text-gold font-medium underline"
                >
                  Send us a message
                </a>{" "}
                and we&apos;ll find a time.
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl border bg-card">
                <h3
                  className="font-bold text-lg mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  What to Expect
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: "30-minute focused session" },
                    { icon: Video, label: "Video call" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <item.icon className="size-4 text-gold-dark" />
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border bg-card">
                <h3
                  className="font-bold text-lg mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  We&apos;ll Cover
                </h3>
                <ul className="space-y-3">
                  {[
                    "Understanding your goals",
                    "Best practice model for your situation",
                    "Specific next steps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-green-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-navy text-white">
                <p className="text-sm text-gray-300 italic leading-relaxed">
                  "I help physicians who are ready to stop practicing medicine on
                  someone else's terms. If you're here, you're already ahead of
                  90% of your peers."
                </p>
                <div className="mt-4">
                  <div className="font-semibold text-gold text-sm">
                    Dr. Ekene Ajufo, MD
                  </div>
                  <div className="text-xs text-gray-400">
                    Founder, PracticeRx Consulting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
