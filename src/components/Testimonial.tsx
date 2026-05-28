import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    quote:
      "PracticeRx gave me the clarity and confidence to finally make the leap. 90 days in, my DPC practice is at 40 founding members and growing.",
    name: "Dr. Maya Patel",
    role: "Family Medicine, Austin TX",
  },
  {
    quote:
      "I'd been talking about going independent for three years. The PracticeRx playbook compressed all of that into a clear 12-week sprint.",
    name: "Dr. Marcus Bell",
    role: "Internal Medicine, Charlotte NC",
  },
  {
    quote:
      "The financial model alone paid for the program ten times over. I knew my break-even number before I ever signed a lease.",
    name: "Dr. Priya Shah",
    role: "Pediatrics, Seattle WA",
  },
  {
    quote:
      "From EMR selection to membership pricing, every decision had a framework behind it. No more guessing, no more 2 a.m. spirals.",
    name: "Dr. Ethan Caldwell",
    role: "Family Medicine, Nashville TN",
  },
  {
    quote:
      "The AI tools cut my charting time in half. I actually finish notes the same day now — something I hadn't done in years.",
    name: "Dr. Sofia Reyes",
    role: "Concierge Medicine, Miami FL",
  },
  {
    quote:
      "I left employed practice on a Friday and opened my doors 11 weeks later. The hand-holding through licensing and contracting was invaluable.",
    name: "Dr. James O'Connor",
    role: "Internal Medicine, Denver CO",
  },
  {
    quote:
      "What I valued most was honesty. They told me what wouldn't work in my market and saved me from an expensive mistake.",
    name: "Dr. Hannah Liu",
    role: "Family Medicine, Portland OR",
  },
  {
    quote:
      "I went from 22 patients a day in a broken system to 8 patients a day who actually get my full attention. My patients notice.",
    name: "Dr. Andre Williams",
    role: "DPC, Atlanta GA",
  },
  {
    quote:
      "The membership agreement template and compliance guidance alone would have cost me $6k with an attorney. This program is a steal.",
    name: "Dr. Rachel Kim",
    role: "Concierge Medicine, Boston MA",
  },
  {
    quote:
      "I'm a solo physician with two kids and no business background. PracticeRx made it feel doable — and now I run a practice I love.",
    name: "Dr. Olivia Thornton",
    role: "Family Medicine, Salt Lake City UT",
  },
  {
    quote:
      "My overhead went from 62% to under 20%. No billing department, no prior auths, no middlemen. Just me and my patients.",
    name: "Dr. Tasha Robinson",
    role: "DPC, Houston TX",
  },
  {
    quote:
      "The patient acquisition playbook had me at 80 members before I even finished buildout. I had a waitlist on day one.",
    name: "Dr. David Nguyen",
    role: "Family Medicine, Minneapolis MN",
  },
  {
    quote:
      "I was burned out and ready to leave medicine entirely. PracticeRx helped me fall back in love with it — on my own terms.",
    name: "Dr. Amara Okafor",
    role: "Pediatrics, Raleigh NC",
  },
  {
    quote:
      "The monthly advisory calls keep me sharp. It's like having a chief medical officer and a CFO on speed dial.",
    name: "Dr. Ryan Mitchell",
    role: "Concierge Medicine, Scottsdale AZ",
  },
  {
    quote:
      "I tried two other consulting firms before PracticeRx. The difference is night and day — they've actually done this themselves.",
    name: "Dr. Lauren Chen",
    role: "Internal Medicine, San Francisco CA",
  },
];

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const current = reviews[index];

  return (
    <section className="py-[50px] bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-0 opacity-30">
        <div className="absolute -top-40 -left-20 size-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 size-[500px] rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="flex justify-center gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>

        <div key={index} className="animate-fade-in">
          <p
            className="mt-6 text-2xl md:text-3xl leading-snug text-balance min-h-[6rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="mt-6 text-sm text-white/70">
            {current.name} · {current.role}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="size-10 inline-flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="size-10 inline-flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
