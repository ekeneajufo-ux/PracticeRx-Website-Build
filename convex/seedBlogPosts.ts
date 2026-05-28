import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const seed = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Check if posts already exist
    const existing = await ctx.db.query("blogPosts").first();
    if (existing) return null;

    const posts = [
      {
        title: "The DPC Math Most Doctors Never Run",
        slug: "dpc-math-doctors-never-run",
        excerpt: "DPC physicians earn more while seeing 80% fewer patients. Here's the math that changes everything.",
        content: `The average insurance-based pediatrician sees 20–30 kids a day. The average DPC pediatrician sees 6–10.

And yet — DPC physicians report higher income, lower overhead, and dramatically better outcomes.

**Here's the math most doctors never run:**

$75/month × 400 families = $360,000/year.

No billing department. No claim denials. No prior authorizations. Your overhead drops from 60% to 20-30% because you're not employing a team of people whose only job is fighting with insurance companies.

## The Real Numbers

Let's break this down further:

- **Traditional pediatric practice:** 25 patients/day × 250 days = 6,250 visits/year. At $85/visit average (after insurance adjustments), that's $531,250 gross — but 60-65% goes to overhead. Net: ~$190,000.

- **DPC pediatric practice:** 400 families × $75/month = $360,000 gross. With 25-30% overhead, net: ~$260,000. Seeing 8 patients a day instead of 25.

The math isn't even close.

## Why It Works

DPC eliminates the three biggest cost centers in traditional practice:

1. **Billing staff** — You don't need them. No claims, no denials, no collections.
2. **Insurance credentialing** — Gone. You accept patients, not insurance panels.
3. **Administrative overhead** — Reduced by 50-70%.

## The Quality Argument

When you see 8 patients a day instead of 25, something remarkable happens. You actually practice medicine the way you were trained to. You have time to:

- Listen to the full story
- Examine thoroughly
- Educate parents properly
- Follow up personally

Your patients get better care. Your renewal rates hit 96%. And you remember why you went to medical school.

## Getting Started

The biggest barrier isn't the model — it's the mindset. Most physicians have been trained to believe that more patients equals more income. DPC flips that equation entirely.

If you're ready to run the numbers for your own practice, I'd love to help. That's exactly what we do at PracticeRx Consulting — we help physicians design, launch, and grow DPC practices in 90 days or less.`,
        tags: ["DPC", "Practice Finance", "Getting Started"],
        published: true,
        publishedAt: Date.now() - 86400000 * 3,
        seoTitle: "DPC Math: Why Direct Primary Care Physicians Earn More Seeing Fewer Patients",
        seoDescription: "DPC physicians earn more while seeing 80% fewer patients. Here's the financial breakdown that's changing pediatric medicine.",
      },
      {
        title: "Medical School Taught You Medicine. Nobody Taught You How to Own It.",
        slug: "medical-school-business-education-gap",
        excerpt: "We spend 11+ years learning to diagnose, treat, and save lives. Zero hours on building a practice. That's a problem.",
        content: `We spend 11+ years learning to diagnose, treat, and save lives. Zero hours on building a practice. Zero on pricing. Zero on patient acquisition.

Then we wonder why 62% of physicians report burnout and most feel trapped in a system they didn't design.

## The Missing Curriculum

Think about what medical education covers:

- Anatomy, physiology, pathology — yes
- Pharmacology, diagnostics, procedures — absolutely
- Business formation, pricing strategy, marketing — nothing
- Revenue modeling, patient acquisition, operations — silence

We produce some of the most educated, capable professionals in the world and send them into a marketplace they don't understand.

## What Physicians Already Have

Here's what I believe: every physician who wants independence already has the hardest skills.

- **Clinical judgment** — built over thousands of patient encounters
- **Patient trust** — the foundation of every successful practice
- **Work ethic** — the kind that would break most people
- **Problem-solving ability** — you literally save lives for a living

What they're missing is a business roadmap. Not an MBA — a practical, step-by-step framework for turning clinical excellence into a sustainable business.

## The 90-Day Path

That's exactly what I built PracticeRx Consulting to provide. I'm a pediatrician. I've launched practices, built a med spa, sourced equipment from three continents, and walked the path from employed physician to independent business owner.

**Days 1–30: Foundation**
- LLC, EIN, malpractice insurance, bank account
- Total cost: $2,000–$5,000
- Can be done evenings and weekends

**Days 31–60: Build**
- One-page website, scheduling system, membership agreement
- Set your prices and choose your EMR
- Start telling your network

**Days 61–90: Launch**
- 20 personal conversations
- 5 free discovery calls
- Goal: 10 founding members

It's not easy. But it's simpler than most physicians think. And it's infinitely better than spending another decade on the insurance treadmill wondering "what if."

## The Real Question

Should business fundamentals be a required part of medical training? I think so. Until they are, physicians need a different path to learn these skills.

That's where I come in.`,
        tags: ["Physician Entrepreneurship", "Medical Education", "Getting Started"],
        published: true,
        publishedAt: Date.now() - 86400000 * 2,
        seoTitle: "Why Medical Schools Don't Teach Business — And What Physicians Can Do About It",
        seoDescription: "62% of physicians report burnout. The missing piece isn't more clinical training — it's business education. Here's the gap and how to close it.",
      },
      {
        title: "How AI Is Catching What Rushed Visits Miss in Pediatrics",
        slug: "ai-catching-what-rushed-visits-miss",
        excerpt: "A 9-year-old came in for a routine well visit. The AI flagged something I almost missed — a subtle deceleration in growth velocity over 18 months.",
        content: `A 9-year-old came in for a "routine" well visit.

Mom said everything was fine. Growth chart looked normal. The visit was supposed to take 10 minutes.

But the AI flagged something I almost missed — a subtle deceleration in his growth velocity over 18 months. Not enough to alarm anyone visit-by-visit. But the pattern was there.

We ran labs. Caught a thyroid issue early. Started treatment before it affected his development.

**In a 28-patient day, I would've glanced at the chart and moved on.**

## The Real Role of AI in Pediatrics

That's the part of AI in pediatrics nobody talks about. It's not replacing doctors. It's catching the things we miss when we're running on fumes.

The best AI tools don't make you faster. They make you more thorough.

### Pattern Recognition at Scale

AI excels at exactly the kind of analysis that suffers under time pressure:

- **Growth velocity trends** — not just current percentile, but rate of change over time
- **Developmental milestone patterns** — flagging subtle delays across multiple domains
- **Medication interaction checks** — comprehensive screening that takes seconds
- **Symptom pattern matching** — connecting dots across multiple visits

### Where DPC + AI Becomes Powerful

In a DPC model where I see 8 kids a day, I actually have time to look at what the AI surfaces. That combination — technology plus time — is the future of medicine.

In traditional practice, even if AI flags something, you might not have the 15 minutes to investigate it. You're already behind schedule. The next patient is waiting. The flag gets filed away.

In DPC, that flag becomes a conversation. A lab order. An early intervention.

## Ambient AI Documentation

The other game-changer is ambient AI documentation. Tools that listen during the visit, capture the conversation, and draft the note. I review, edit, and sign.

My after-clinic documentation dropped from 2 hours to 20 minutes. But the bigger win? During visits, I'm actually present. I make eye contact. I notice body language. I listen without thinking about what to type later.

AI didn't make me a better doctor. It gave me the space to be the doctor I already was.

## The Bottom Line

The question isn't whether AI will change pediatrics. It already is. The question is whether you'll have the practice model that lets you use it properly.

In a 7-minute insurance visit, AI is a band-aid on a broken system. In a DPC practice with 30-minute visits, it's a superpower.`,
        tags: ["AI in Healthcare", "Pediatrics", "Technology"],
        published: true,
        publishedAt: Date.now() - 86400000,
        seoTitle: "AI in Pediatrics: How Technology Catches What Rushed Visits Miss",
        seoDescription: "A pediatrician shares how AI tools are catching subtle patterns in children's health — but only when doctors have time to act on them.",
      },
    ];

    for (const post of posts) {
      await ctx.db.insert("blogPosts", post);
    }
    return null;
  },
});
