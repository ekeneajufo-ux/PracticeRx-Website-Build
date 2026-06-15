import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function AssessmentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;

      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      // Trigger at 5% scroll instead of 20% for easier testing
      if (scrollPercent >= 5) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleStartAssessment = () => {
    window.location.href = "https://funnels.practicerxconsulting.com/practiceaudit";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-90 max-w-[450px] bg-white rounded-xl shadow-2xl z-50 transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X className="size-6" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
            Get Your Free Practice Roadmap
          </h2>

          {/* Subheadline */}
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            A personalized diagnosis in under 3 minutes. No credit card. No fluff.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleStartAssessment}
            className="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Start Your Assessment
          </button>
        </div>
      </div>
    </>
  );
}
