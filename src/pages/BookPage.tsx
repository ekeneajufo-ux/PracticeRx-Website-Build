import { useSEO } from "../hooks/useSEO";
import { useEffect } from "react";
import { Calendar, CheckCircle2, Clock, Video } from "lucide-react";

const GHL_BOOKING_ID = "zJJlFYvoh91wx0N63jM7";
const GHL_CALENDAR_SRC = `https://api.leadconnectorhq.com/widget/booking/${GHL_BOOKING_ID}`;

export function BookPage() {
  useSEO({
    title: "Book a Free Discovery Call",
    description: "Schedule a free 60-minute discovery call with Dr. Ekene Ajufo to discuss launching your DPC, concierge, or cash-based practice.",
    path: "/book",
  });

  // Load GHL embed script
  useEffect(() => {
    const existing = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Listen for GHL height resize messages
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === "HSFormCollected" ||
        event.data.type === "bookingFormCollected"
      ) {
        const iframe = document.getElementById(`msgsndr-calendar-${GHL_BOOKING_ID}`) as HTMLIFrameElement;
        if (iframe && event.data.value) {
          iframe.style.height = event.data.value + "px";
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
              60 minutes to explore whether DPC, concierge, or an alternative
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

              {/* GHL Calendar Widget */}
              <div className="rounded-xl border border-border/60 overflow-hidden bg-white">
                <iframe
                  id={`msgsndr-calendar-${GHL_BOOKING_ID}`}
                  src={GHL_CALENDAR_SRC}
                  style={{ width: "100%", height: "700px", border: "none", overflow: "hidden" }}
                  scrolling="no"
                  title="Book a Discovery Call with Dr. Ekene Ajufo"
                  loading="lazy"
                />
              </div>

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
                    { icon: Clock, label: "60-minute focused session" },
                    { icon: Video, label: "Video call" },
                    { icon: Calendar, label: "Instant confirmation email" },
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