import { CheckCircle, Mail, Calendar, Download } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function getProductMessage(product: string | null) {
  if (product === "fm-dpc-guide") {
    return {
      heading: "Your guide is on its way!",
      message:
        "Your Family Medicine DPC Launch Guide is on its way! Check your inbox — your download link will arrive within the next few minutes.",
      showCallCard: false,
      icon: <Download className="size-10 text-green-600" />,
    };
  }
  if (product === "vaccine-guide") {
    return {
      heading: "Your guide is on its way!",
      message:
        "Your DPC Pediatric Vaccine Cost Management Guide is on its way! Check your inbox — your download link will arrive within the next few minutes.",
      showCallCard: false,
      icon: <Download className="size-10 text-green-600" />,
    };
  }
  // Default: diagnostic/product purchase
  return {
    heading: "Thank you for your purchase!",
    message:
      "You'll receive a confirmation email at the address you provided within the next few minutes. Please check your spam folder if you don't see it.",
    showCallCard: true,
    icon: <CheckCircle className="size-10 text-green-600" />,
  };
}

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product");
  const { heading, message, showCallCard, icon } = getProductMessage(product);

  useEffect(() => {
    // Load GHL booking widget script
    const script = document.createElement("script");
    script.src = "https://www.practicerxconsulting.com/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8">
              {icon}
            </div>

            {/* Heading */}
            <h1
              className="text-3xl md:text-4xl font-semibold text-navy leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {heading.split("!")[0]}
              {heading.includes("!") && (
                <>
                  {" "}
                  <span className="italic text-gold">
                    {heading.includes("purchase") ? "purchase!" : "on its way!"}
                  </span>
                </>
              )}
            </h1>

            {/* Message */}
            <p className="mt-6 text-navy/60 text-lg leading-relaxed max-w-lg mx-auto">
              {message}
            </p>

            {/* Questions line for guide purchases */}
            {!showCallCard && (
              <p className="mt-4 text-navy/60 text-lg leading-relaxed max-w-lg mx-auto">
                Questions? Email us at{" "}
                <a
                  href="mailto:info@practicerxconsulting.com"
                  className="font-semibold text-navy hover:text-gold transition-colors"
                >
                  info@practicerxconsulting.com
                </a>
                .
              </p>
            )}

            {showCallCard && (
              <p className="mt-4 text-navy/60 text-lg leading-relaxed max-w-lg mx-auto">
                We will be in touch within{" "}
                <span className="font-semibold text-navy">1 business day</span>{" "}
                to schedule your included call.
              </p>
            )}

            {/* Info cards */}
            <div
              className={`grid ${showCallCard ? "sm:grid-cols-2" : "sm:grid-cols-1"} gap-4 mt-10 max-w-md mx-auto`}
            >
              <div className="flex items-center gap-3 bg-white rounded-xl border border-border/60 p-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-navy">
                    Check your email
                  </p>
                  <p className="text-xs text-navy/50">
                    {showCallCard
                      ? "Confirmation on its way"
                      : "Download link on its way"}
                  </p>
                </div>
              </div>
              {showCallCard && (
                <div className="flex items-center gap-3 bg-white rounded-xl border border-border/60 p-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Calendar className="size-5 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-navy">
                      Call scheduling
                    </p>
                    <p className="text-xs text-navy/50">
                      Within 1 business day
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* GHL Booking Calendar */}
            {showCallCard && (
              <div className="mt-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-navy mb-6">
                  Schedule a Kick Off Call
                </h2>
                <iframe
                  src="https://www.practicerxconsulting.com/widget/booking/IzDYuXLlWCrKUe5a5ZTa"
                  style={{
                    width: "100%",
                    height: "600px",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  title="Schedule a Kick Off Call"
                />
              </div>
            )}

            {/* Back link */}
            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}