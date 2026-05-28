import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", sub: [
      { label: "Subscriptions", href: "/subscriptions" },
    ]},
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Free Guide", href: "/guide" },
    { label: "Contact", href: "/contact" },
    { label: "Find A Provider", href: "/find-a-provider" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm"
          : "bg-cream"
      }`}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
              <span
                className="text-sm font-bold text-gold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                R
              </span>
            </div>
            <span
              className="text-lg font-semibold tracking-tight text-navy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Practice
            </span>
            <span
              className="text-lg font-semibold tracking-tight text-gold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Rx
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.sub ? (
                <div
                  key={link.href}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* Label links to /services, hover opens dropdown */}
                  <div className="flex items-center gap-0.5">
                    <Link
                      to={link.href}
                      className={`text-sm font-medium transition-colors ${
                        isActive(link.href) || link.sub.some(s => isActive(s.href))
                          ? "text-navy"
                          : "text-navy/60 hover:text-navy"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <svg
                      className={`size-3 text-navy/50 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-white rounded-lg shadow-lg border border-border/50 py-1.5 min-w-[160px]">
                        {link.sub.map((subLink) => (
                          <Link
                            key={subLink.href}
                            to={subLink.href}
                            className={`block px-4 py-2 text-sm font-medium transition-colors ${
                              isActive(subLink.href)
                                ? "text-navy bg-cream"
                                : "text-navy/60 hover:text-navy hover:bg-cream/60"
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-navy"
                      : "text-navy/60 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-5 text-navy" />
            ) : (
              <Menu className="size-5 text-navy" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  to={link.href}
                  className={`block text-sm font-medium py-2.5 px-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-navy bg-navy/5"
                      : "text-navy/60 hover:text-navy hover:bg-navy/5"
                  }`}
                >
                  {link.label}
                </Link>
                {link.sub?.map((subLink) => (
                  <Link
                    key={subLink.href}
                    to={subLink.href}
                    className={`block text-sm font-medium py-2 px-6 rounded-lg transition-colors ${
                      isActive(subLink.href)
                        ? "text-navy bg-navy/5"
                        : "text-navy/50 hover:text-navy hover:bg-navy/5"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-3">
              <Link
                to="/book"
                className="block w-full text-center px-5 py-2.5 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
