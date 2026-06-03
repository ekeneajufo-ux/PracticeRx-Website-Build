import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const GHL_GUIDE_LINK = "https://funnels.practicerxconsulting.com/freeguide-page";

export function LeadMagnetPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 45000); // show after 45s
    return () => clearTimeout(timer);
  }, [dismissed]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center pointer-events-none">
      <div className="pointer-events-auto relative bg-cream border border-gold/30 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <button
          onClick={() => { setOpen(false); setDismissed(true); }}
          className="absolute top-4 right-4 text-navy/40 hover:text-navy transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-2">Free Resource</p>
        <h3 className="font-heading text-2xl text-navy mb-2">Get the DPC Practice Launch Guide</h3>
        <p className="text-sm text-navy/60 mb-6">
          Everything you need to open your doors — phase-by-phase checklist, financial model, EMR guide, and membership agreement template.
        </p>
        <a
          href={GHL_GUIDE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3">
            Download Free Guide →
          </Button>
        </a>
      </div>
    </div>
  );
}
