import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="bg-navy rounded-2xl px-8 py-8 md:px-16 md:py-10 text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to practice
            <br />
            medicine on{" "}
            <span className="italic text-gold">your terms?</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">
            Book a free 30-minute discovery call. We&apos;ll walk through your
            goals and tell you honestly whether independent practice is right
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
            >
              Book a Discovery Call
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="https://funnels.practicerxconsulting.com/freeguide-page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Download Free Launch Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
