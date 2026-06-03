import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <span
                  className="text-sm font-bold text-gold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  R
                </span>
              </div>
              <span
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Practice
              </span>
              <span
                className="text-lg font-semibold text-gold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Rx
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Helping physicians launch independent DPC and concierge practices
              in 90 days.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Find A Provider", href: "/find-a-provider" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <a
              href="mailto:info@practicerxconsulting.com"
              className="text-sm text-white/60 hover:text-gold transition-colors"
            >
              info@practicerxconsulting.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} PracticeRx. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://funnels.practicerxconsulting.com/privacypolicy-page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-white/20 text-xs">|</span>
            <a
              href="https://funnels.practicerxconsulting.com/terms-conditions-page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-gold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
