import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  DollarSign,
  Heart,
  LineChart,
  Lightbulb,
  Rocket,
  Shield,
  Star,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AssessmentPopup } from "@/components/AssessmentPopup";

const FREE_GUIDE_URL = "https://funnels.practicerxconsulting.com/freeguide-page";

function RotatingTestimonials() {
  const testimonials = [
    {
      quote:
        "Dr. Ajufo gave me the clarity and confidence to finally make the leap. Within 90 days, I had my DPC practice up and running with 40 founding members. Best decision I've ever made.",
      name: "Dr. Peter Andrews",
    },
    {
      quote:
        "The Practice Launch Package was worth every penny. The roadmap, the accountability, the strategic guidance — it cut my learning curve in half and saved me from costly mistakes.",
      name: "Dr. Pat Mandel",
    },
    {
      quote:
        "I was burning out seeing 30 patients a day. Dr. Ajufo helped me design a concierge model that doubled my income while cutting my patient load by 70%. I love medicine again.",
      name: "Dr. Lenard Phisel",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-navy text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* 5 Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-6 text-gold fill-gold" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-200 min-h-[120px] transition-opacity duration-500">
            "{t.quote}"
          </blockquote>
          <div>
            <div className="font-semibold text-gold">{t.name}</div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-gold w-6" : "bg-white/30"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const posts: Array<{_id: string; slug: string; title: string; excerpt: string; coverImageUrl?: string; tags: string[]; publishedAt: number}> = [];

  return (
    <div className="flex flex-col">
      <AssessmentPopup />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        {/* Hero background image */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="relative container py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold text-sm font-medium mb-6">
                <Stethoscope className="size-4" />
                For Physicians Ready to Go Independent
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Launch Your DPC or Concierge Practice{" "}
                <span className="text-gold">in 90 Days</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                I help physicians design, launch, and grow independent practices
                — with a roadmap, not guesswork. Own your time, income, and patient
                relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-base px-8"
                >
                  <Link to="/book">
                    Book a Free Discovery Call
                    <ArrowRight className="size-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-gray-500 text-white hover:bg-white/10 text-base"
                >
                  <a href={FREE_GUIDE_URL} target="_blank" rel="noopener noreferrer">
                    Get the Free DPC Launch Guide
                  </a>
                </Button>
              </div>
              {/* 3 Benefits of DPC/Concierge */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold" />
                  See Fewer Patients, Earn More
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold" />
                  No Insurance Hassles
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold" />
                  Own Your Practice & Schedule
                </div>
              </div>
            </div>
            {/* Hero image */}
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="Modern medical practice"
                className="rounded-2xl shadow-2xl border border-white/10 w-full object-cover max-h-[480px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "90", label: "Days to Launch", suffix: "" },
              { value: "80", label: "Fewer Patients Needed", suffix: "%" },
              { value: "96", label: "Patient Renewal Rate", suffix: "%" },
              { value: "2x", label: "Net Income Potential", suffix: "" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              The System is Broken. <span className="text-gold">You Don't Have to Be.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              You didn't go to medical school to fight with insurance companies,
              see 25+ patients a day, or spend your evenings doing documentation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "7-Minute Visits",
                description: "Not enough time to listen, examine, or educate. You're running a factory, not practicing medicine.",
              },
              {
                icon: LineChart,
                title: "60% Overhead",
                description: "Most of your revenue goes to billing staff, insurance credentialing, and administrative bloat.",
              },
              {
                icon: Heart,
                title: "Burnout Epidemic",
                description: "62% of physicians report burnout. Half wouldn't choose the same career path again.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border bg-card hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <item.icon className="size-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Services */}
      <section id="services" className="py-20 bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              A Clear Path to <span className="text-gold">Independence</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're exploring the idea or ready to launch, there's a
              package designed for your stage.
            </p>
          </div>

          {/* Top row - 3 services */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: Lightbulb,
                title: "Strategy Session",
                subtitle: "Explore the Model",
                description: "A focused 1-on-1 session to evaluate your DPC or concierge opportunity. We'll assess your market, model your financials, and create your initial roadmap.",
                features: ["Market analysis", "Financial modeling", "Personalized roadmap", "Q&A with a physician who's done it"],
              },
              {
                icon: Rocket,
                title: "Practice Launch Package",
                subtitle: "Build & Launch",
                description: "End-to-end support to go from idea to open doors in 90 days. Legal setup, pricing strategy, EMR selection, marketing, and your first 10 members.",
                features: ["LLC & compliance setup", "Pricing & membership design", "EMR & tech stack", "Launch marketing plan", "90-day accountability"],
                featured: true,
              },
              {
                icon: Shield,
                title: "Monthly Advisory",
                subtitle: "Grow & Scale",
                description: "Ongoing strategic partnership for physicians building momentum. Monthly calls, growth strategy, operational optimization, and direct access.",
                features: ["Monthly strategy calls", "Growth playbook", "Operations optimization", "Direct advisor access"],
              },
            ].map((service) => (
              <div
                key={service.title}
                className={`relative p-8 rounded-xl border ${
                  service.featured
                    ? "border-gold bg-navy text-white shadow-xl scale-[1.02]"
                    : "bg-background hover:border-gold/30"
                } transition-all`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-navy-dark text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    service.featured ? "bg-gold/20" : "bg-navy/5"
                  }`}
                >
                  <service.icon
                    className={`size-6 ${service.featured ? "text-gold" : "text-navy"}`}
                  />
                </div>
                <div className={`text-sm font-medium mb-1 ${service.featured ? "text-gold" : "text-gold-dark"}`}>
                  {service.subtitle}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={`mb-6 ${service.featured ? "text-gray-300" : "text-muted-foreground"}`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`size-4 mt-0.5 shrink-0 ${service.featured ? "text-gold" : "text-green-600"}`} />
                      <span className={service.featured ? "text-gray-200" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-8 ${
                    service.featured
                      ? "bg-gold hover:bg-gold-dark text-navy-dark font-semibold"
                      : "bg-navy hover:bg-navy-light"
                  }`}
                  asChild
                >
                  <Link to="/book">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom row - Business Coaching (with Business Review) */}
          <div className="max-w-lg mx-auto">
            <div className="relative p-8 rounded-xl border bg-background hover:border-gold/30 transition-all">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-navy/5">
                <TrendingUp className="size-6 text-navy" />
              </div>
              <div className="text-sm font-medium mb-1 text-gold-dark">
                1-on-1 Physician Coaching
              </div>
              <h3 className="text-xl font-bold mb-3">Business Coaching</h3>
              <p className="mb-6 text-muted-foreground">
                Personalized business coaching for physicians at any stage — whether you're launching, scaling, or pivoting. We work on your mindset, revenue strategy, operations, and leadership as a physician CEO.
              </p>
              <ul className="space-y-2">
                {[
                  "Bi-weekly 1-on-1 coaching calls",
                  "Revenue & growth strategy",
                  "Business review & performance analysis",
                  "Mindset & leadership development",
                  "Operations & systems optimization",
                  "Accountability & goal tracking",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 bg-navy hover:bg-navy-light" asChild>
                <Link to="/book">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Consulting Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
                <Brain className="size-4" />
                AI-Powered Consulting
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Where Medicine Meets{" "}
                <span className="text-gold">Artificial Intelligence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  AI isn't replacing physicians — it's amplifying the ones who know how to use it. As a Clinical AI Consultant with certifications from Stanford and ABAIM, I help practices integrate AI tools that save time, catch what rushed visits miss, and streamline operations.
                </p>
                <p>
                  From ambient AI documentation that eliminates after-hours charting, to pattern recognition that flags subtle health trends — the right AI stack transforms your practice.
                </p>
                <p className="font-medium text-foreground">
                  Every PracticeRx client gets AI integration guidance built into their launch plan. Because the future of independent medicine is AI-assisted.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: Brain, label: "Stanford AI Certified" },
                { icon: ClipboardCheck, label: "ABAIM AI Certified" },
                { icon: Stethoscope, label: "Clinical AI Consultant" },
                { icon: Target, label: "AI Practice Integration Strategy" },
              ].map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <cred.icon className="size-5 text-gold-dark" />
                  </div>
                  <span className="font-medium">{cred.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / Credentials */}
      <section id="about" className="py-20 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
                <Users className="size-4" />
                Your Consultant
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Built by a Physician Who's{" "}
                <span className="text-gold">Done It</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm Dr. Ekene Ajufo — a board-certified physician, practice
                  owner, clinical AI consultant, and healthcare entrepreneur.
                </p>
                <p>
                  I've been in the exam room, built a med spa, sourced equipment
                  internationally, and made the leap from employed physician to
                  independent business owner. I'm also Stanford and ABAIM AI certified, helping practices harness AI to work smarter.
                </p>
                <p>
                  PracticeRx Consulting exists because I got tired of watching
                  talented physicians stay stuck in a system that doesn't serve
                  them — or their patients.
                </p>
                <p className="font-medium text-foreground">
                  I compress the 18-month learning curve into 90 days. No
                  guesswork, no theory — just a proven roadmap from someone
                  who's walked it.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { icon: Stethoscope, label: "Board-Certified Physician" },
                { icon: Brain, label: "Stanford & ABAIM AI Certified" },
                { icon: Target, label: "DPC & Concierge Practice Launcher" },
                { icon: TrendingUp, label: "Med Spa & Multi-Service Builder" },
                { icon: DollarSign, label: "Physician Business Consultant" },
                { icon: Rocket, label: "International Equipment Sourcing" },
              ].map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-background"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <cred.icon className="size-5 text-gold-dark" />
                  </div>
                  <span className="font-medium">{cred.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              From Idea to Open Doors in{" "}
              <span className="text-gold">90 Days</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  description:
                    "We assess your goals, market, and readiness. You'll leave with clarity on whether DPC or concierge is right for you.",
                },
                {
                  step: "02",
                  title: "Design & Build",
                  description:
                    "We build your practice from the ground up — legal structure, pricing, tech stack, marketing, and AI integration.",
                },
                {
                  step: "03",
                  title: "Launch & Grow",
                  description:
                    "Open your doors with your first members lined up. Then scale with ongoing advisory support.",
                },
              ].map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="text-5xl font-bold text-gold/20 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              asChild
              className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-base px-8"
            >
              <Link to="/book">
                Start With a Free Discovery Call
                <ArrowRight className="size-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rotating Testimonials with Stars */}
      <RotatingTestimonials />

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is Direct Primary Care (DPC)?",
                  a: "DPC is a model where patients pay a monthly membership fee directly to their doctor — no insurance middleman. You see fewer patients, spend more time per visit, and run a simpler, more profitable business.",
                },
                {
                  q: "Can I start a DPC practice while still employed?",
                  a: "Absolutely. Most physicians start building their DPC practice evenings and weekends while keeping their current position. Our 90-day roadmap is designed for this exact situation.",
                },
                {
                  q: "How many patients do I need to make DPC work?",
                  a: "Most solo DPC practices become financially viable at 200-300 members. At $75/month with 400 families, you're looking at $360,000/year with dramatically lower overhead than traditional practice.",
                },
                {
                  q: "Is DPC only for primary care?",
                  a: "DPC started in primary care, but the model is expanding. Family medicine, internal medicine, and many other specialties are finding success with membership-based models.",
                },
                {
                  q: "Do I need a lot of capital to start?",
                  a: "No. A DPC practice can launch for $2,000–$5,000. You don't need a fancy office, expensive equipment, or a billing department. That's one of the biggest advantages of the model.",
                },
                {
                  q: "How does AI fit into my practice?",
                  a: "AI tools like ambient documentation, pattern recognition, and automated workflows can dramatically reduce admin burden. As a Stanford and ABAIM certified AI consultant, Dr. Ajufo helps integrate the right AI tools into every practice launch.",
                },
                {
                  q: "What makes PracticeRx different from other consultants?",
                  a: "Dr. Ajufo is a practicing physician who has actually built what she teaches. She's launched practices, built a med spa, is AI-certified, and has sourced equipment internationally. This isn't theory — it's experience compressed into a 90-day roadmap.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-xl border bg-card hover:border-gold/30 transition-colors"
                >
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-gold ml-4 group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {posts && posts.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Latest Insights
              </h2>
              <Button variant="ghost" asChild>
                <Link to="/blog" className="text-gold-dark hover:text-gold">
                  View All
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="p-6 rounded-xl border bg-background hover:border-gold/30 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold-dark font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-sm font-medium text-gold-dark flex items-center gap-1">
                      Read More <ArrowRight className="size-3" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-navy text-white">
        <div className="container text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Practice Medicine on{" "}
            <span className="text-gold">Your Terms?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a free discovery call. We'll assess your goals, model your
            financials, and map out your 90-day path to independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold text-base px-8"
            >
              <Link to="/book">
                Book Your Free Discovery Call
                <Calendar className="size-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-gray-500 text-white hover:bg-white/10 text-base"
            >
              <a href={FREE_GUIDE_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="size-5 mr-2" />
                Download Free DPC Guide
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy-dark text-gray-400 border-t border-white/5">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  Practice
                </span>
                <span className="text-xl font-bold text-gold" style={{ fontFamily: "var(--font-heading)" }}>
                  Rx
                </span>
                <span className="text-sm text-gray-500 ml-2">Consulting</span>
              </div>
              <p className="text-sm max-w-md leading-relaxed">
                Helping physicians design, launch, and grow independent DPC and
                concierge practices. Built by a physician who's done it — with AI-powered strategy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <nav className="space-y-2 text-sm">
                <a href="/#services" className="block hover:text-gold transition-colors">Services</a>
                <a href="/#about" className="block hover:text-gold transition-colors">About</a>
                <Link to="/blog" className="block hover:text-gold transition-colors">Blog</Link>
                <Link to="/resources" className="block hover:text-gold transition-colors">Free Resources</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Get Started
              </h4>
              <nav className="space-y-2 text-sm">
                <Link to="/book" className="block hover:text-gold transition-colors">Book a Discovery Call</Link>
                <a href={FREE_GUIDE_URL} target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors">DPC Launch Guide</a>
                <a href="https://www.linkedin.com/in/drajufo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 text-sm text-center text-gray-500">
            © {new Date().getFullYear()} PracticeRx Consulting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
