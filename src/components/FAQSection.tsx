import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What exactly is DPC?",
    answer:
      "Direct Primary Care (DPC) is a practice model where patients pay a monthly membership fee directly to their physician — no insurance billing, no middlemen. You provide unlimited access, longer visits, and better care while earning more per patient with less overhead.",
  },
  {
    question: "Do I need a business background?",
    answer:
      "Not at all. Most of our clients are clinicians with zero business experience. The PracticeRx program gives you the legal templates, financial models, and operational playbooks so you can focus on the medicine. We handle the business strategy.",
  },
  {
    question: "How much capital do I need to start?",
    answer:
      "Most DPC practices launch with $30K–$75K in startup capital, depending on your market, lease, and equipment needs. We help you build a financial model specific to your situation and identify ways to reduce upfront costs.",
  },
  {
    question: "Will I really be open in 90 days?",
    answer:
      "Yes — if you're committed and follow the program. Our 12-week structure is designed around realistic timelines for entity formation, credentialing, space setup, and marketing. Most clients see their first patients within 90 days of starting.",
  },
  {
    question: "What if I'm still employed?",
    answer:
      "Many of our clients start the program while still employed. We'll help you plan your transition, navigate non-competes, and build your practice on the side until you're ready to make the leap. There's no pressure to quit before you're ready.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14">
      <div className="container max-w-2xl">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Questions
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-navy mt-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Frequently asked.
          </h2>
        </div>

        <div className="space-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-border/60">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-base font-medium text-navy pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-5 text-navy/40 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="pb-5 pr-8">
                  <p className="text-sm text-navy/60 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
