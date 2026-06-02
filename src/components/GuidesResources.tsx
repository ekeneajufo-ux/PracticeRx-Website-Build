import { Check, BookOpen } from "lucide-react";

const FM_DPC_CHECKOUT = "https://funnels.practicerxconsulting.com/familymedicinecompleteguide";
const VACCINE_CHECKOUT = "https://funnels.practicerxconsulting.com/vaccineguide-page";
const PSYCH_CHECKOUT = "https://funnels.practicerxconsulting.com/psychblueprint-page";

/* ─── Cover Mockup (SVG illustration) ─── */
function GuideCover({ title, color }: { title: string; color: string }) {
return (
<div className="w-full max-w-[280px] mx-auto">
<div
className="relative rounded-lg shadow-lg overflow-hidden"
style={{ aspectRatio: "3/4" }}
>
{/* Background */}
<div className="absolute inset-0 bg-navy" />
{/* Top accent bar */}
<div
className="absolute top-0 left-0 right-0 h-2"
style={{ backgroundColor: color }}
/>
{/* Content */}
<div className="relative h-full flex flex-col items-center justify-between p-6 text-center">
<div className="flex-1 flex flex-col items-center justify-center gap-4">
<div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
<BookOpen className="size-6 text-gold" />
</div>
<h4
className="text-white text-base font-semibold leading-snug max-w-[200px]"
style={{ fontFamily: "var(--font-heading)" }}
>
{title}
</h4>
<div className="w-10 h-0.5 bg-gold/60 rounded-full" />
</div>
{/* Logo area */}
<div className="mt-auto pt-4">
<img
src="/logo.png"
alt="PracticeRx"
className="h-6 opacity-60 mx-auto"
onError={(e) => {
(e.target as HTMLImageElement).style.display = "none";
}}
/>
<p className="text-white/40 text-[10px] mt-1 tracking-wider uppercase">
PracticeRx Consulting
</p>
</div>
</div>
</div>
</div>
);
}

interface GuideCard {
tag: string;
badge: string;
badgeColor: string;
name: string;
tagline: string;
description: string;
coverTitle: string;
coverAccent: string;
bullets: string[];
price: number;
checkoutUrl: string;
}

const GUIDES: GuideCard[] = [
{
tag: "Digital Guide",
badge: "Best for Pediatrics",
badgeColor: "bg-teal-50 text-teal-700",
name: "DPC Pediatric Vaccine Cost Management Guide",
tagline: "The financial blind spot most pediatric DPC practices miss",
description:
"The only financial guide written specifically for DPC pediatricians — covering procurement, VFC compliance, and membership pricing around vaccine costs.",
coverTitle: "Pediatric DPC\nVaccine Cost\nManagement Guide",
coverAccent: "#2DD4BF",
bullets: [
"Age-band vaccine cost model (0–2, 3–6, 7–11, 12–18 years)",
"GPO comparison table — 15–35% savings on acquisition costs",
"VFC eligibility breakdown by practice structure",
"All 4 membership design approaches with compliance implications",
"Operational checklists for inventory & cold chain compliance",
"Patient communication script for the vaccine cost conversation",
"Full practice audit checklist",
],
price: 399,
checkoutUrl: VACCINE_CHECKOUT,
},
{
tag: "Digital Guide",
badge: "Best for Family Medicine",
badgeColor: "bg-teal-50 text-teal-700",
name: "The Family Medicine Physician's Complete Guide to Launching a DPC Practice",
tagline: "From burnout to independent practice in 90 days",
description:
"The complete financial, legal, and operational roadmap for family medicine physicians making the transition to DPC — written by a physician who has done it.",
coverTitle: "Family Medicine\nDPC Launch\nGuide",
coverAccent: "#C6A35C",
bullets: [
"Break-even financial model — customizable for your specific numbers",
"DPC vs. concierge comparison — know which model fits your goals",
"EMR comparison table — 5 platforms rated for DPC family medicine",
"Entity structure guide — LLC vs. S-Corp with tax implications",
"Employer partnership playbook — the fastest patient acquisition channel",
"90-day phased launch roadmap with weekly milestones",
"Complete launch checklist — 50+ items across legal, financial, and marketing",
],
price: 399,
checkoutUrl: FM_DPC_CHECKOUT,
},
{
tag: "Digital Blueprint",
badge: "Best for Psychiatry",
badgeColor: "bg-purple-50 text-purple-700",
name: "Psychiatry Cash Practice Blueprint",
tagline: "The complete playbook for cash-based & DPC psychiatry",
description:
"Eight modules covering revenue modeling, state DPC law reference, patient services agreement templates, interventional psychiatry add-ons (ketamine, TMS, Spravato), fee schedule benchmarks, and patient acquisition playbooks — built specifically for psychiatrists.",
coverTitle: "Psychiatry\nCash Practice\nBlueprint",
coverAccent: "#534AB7",
bullets: [
"Revenue modeling spreadsheet — fee-for-service, membership, & hybrid",
"State-by-state DPC law reference for all 50 states",
"Patient services agreement template — psychiatry-specific",
"90-day practice launch roadmap with weekly milestones",
"Fee schedule benchmarks for every major psychiatric service",
"Interventional psychiatry add-on guide — ketamine, TMS, Spravato",
"Patient acquisition marketing playbook & KPI dashboard",
],
price: 499,
checkoutUrl: PSYCH_CHECKOUT,
},
];

function FeaturedGuideCard({ guide }: { guide: GuideCard }) {
return (
<div className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg transition-shadow">
<div className="grid md:grid-cols-[280px_1fr] gap-0">
{/* Left: Cover mockup */}
<div className="bg-cream/60 p-8 flex items-center justify-center">
<GuideCover title={guide.coverTitle} color={guide.coverAccent} />
</div>

{/* Right: Details */}
<div className="p-6 md:p-8 flex flex-col">
{/* Tag + Badge */}
<div className="flex items-center gap-2 mb-3">
<span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy/60">
{guide.tag}
</span>
<span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${guide.badgeColor}`}>
{guide.badge}
</span>
</div>

{/* Name */}
<h3
className="text-xl md:text-2xl font-semibold text-navy leading-snug"
style={{ fontFamily: "var(--font-heading)" }}
>
{guide.name}
</h3>
<p className="text-sm text-navy/50 italic mt-1">{guide.tagline}</p>
<p className="text-sm text-navy/60 mt-3 leading-relaxed">
{guide.description}
</p>

{/* Bullets */}
<ul className="mt-4 space-y-2 flex-1">
{guide.bullets.map((b, i) => (
<li key={i} className="flex items-start gap-2">
<Check className="size-3.5 text-gold mt-0.5 shrink-0" />
<span className="text-sm text-navy/65">{b}</span>
</li>
))}
</ul>

{/* Price + CTA */}
<div className="mt-6 pt-5 border-t border-border/40 flex flex-wrap items-end justify-between gap-4">
<div>
<p
className="text-3xl font-bold"
style={{
fontFamily: "var(--font-heading)",
color: "var(--color-gold)",
}}
>
${guide.price}
</p>
<p className="text-xs text-navy/40">one-time · instant PDF download</p>
</div>
<a
href={guide.checkoutUrl}
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110"
style={{ backgroundColor: "#2DD4BF" }}
>
Get the Guide →
</a>
</div>
<p className="text-xs text-navy/35 italic mt-3">
Written by Dr. Ekene Ajufo, MD · Practicing physician · Instant download
</p>
</div>
</div>
</div>
);
}

export function GuidesResources() {
return (
<section id="guides" className="py-10 md:py-14 bg-cream">
<div className="container">
{/* Header */}
<span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/40">
Guides &amp; Resources
</span>
<h2
className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mt-3 leading-tight"
style={{ fontFamily: "var(--font-heading)" }}
>
Deep-dive guides for{" "}
<span className="italic text-gold">serious physicians.</span>
</h2>
<p className="mt-4 text-navy/60 max-w-xl leading-relaxed">
Comprehensive, physician-written resources covering the financial,
legal, and operational details that matter most.
</p>

{/* Guide Cards */}
<div className="space-y-6 mt-8">
{GUIDES.map((guide, i) => (
<FeaturedGuideCard key={i} guide={guide} />
))}
</div>
</div>
</section>
);
}
