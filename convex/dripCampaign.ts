import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery, mutation } from "./_generated/server";
import { internal } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

/* ═══════════════════════════════════════════════════════════════
   DRIP EMAIL SEQUENCE — 6 emails, 7 days apart
   Tone: physician-to-physician, confident, warm, no corporate speak
   ═══════════════════════════════════════════════════════════════ */

const DRIP_EMAILS = [
  // ─── Email 1: Welcome (sent immediately on enrollment) ───
  {
    subject: "You just made the smartest move of your career",
    html: `
      <p>Hey {{NAME}},</p>
      <p>I want to be real with you — the fact that you're even looking into this puts you ahead of 90% of physicians still complaining in the break room.</p>
      <p>Most doctors spend a decade talking about going independent. You just took an actual step.</p>
      <p>Here's what PracticeRx brings to the table:</p>
      <ul>
        <li><strong>A proven 90-day launch roadmap</strong> — not theory, not "it depends." Actual steps.</li>
        <li><strong>Physician-to-physician guidance</strong> — I've done this. I'm still doing this. I'm not a consultant who's never run a practice.</li>
        <li><strong>AI-powered tools</strong> — to cut your admin overhead in half and let you focus on patients.</li>
        <li><strong>Real numbers</strong> — financial models, membership pricing frameworks, and break-even analysis.</li>
      </ul>
      <p>Over the next few weeks, I'll send you some of my best material — case studies, strategies, and a few things I wish someone had told me before I went independent.</p>
      <p>In the meantime, if you're ready to have a real conversation about your practice, <a href="https://practicerxconsulting.com/book">book a free discovery call here</a>.</p>
      <p>Talk soon,<br/><strong>Dr. Ekene Ajufo, MD, FAAP</strong><br/>Founder, PracticeRx Consulting</p>
    `,
  },

  // ─── Email 2: Case Study (Day 7) ───
  {
    subject: "How one pediatrician doubled her income in 6 months",
    html: `
      <p>Hey {{NAME}},</p>
      <p>Let me tell you about a physician I worked with — let's call her Dr. M.</p>
      <p>Dr. M was a pediatrician, 8 years in, employed by a hospital system. Seeing 28 patients a day. 15-minute visits. Spending more time fighting with insurance than talking to families.</p>
      <p>She was making $185K. Not bad on paper. But after taxes, student loans, and the creeping burnout? She was running on fumes.</p>
      <p><strong>Here's what happened in 90 days:</strong></p>
      <ul>
        <li>We mapped her ideal patient base — 400 families within a 15-mile radius</li>
        <li>Set her membership at $150/month for kids, $175/month for adults</li>
        <li>Built her tech stack for under $500/month (EMR, scheduling, payments, AI scribe)</li>
        <li>Launched with 47 members from her existing patient relationships</li>
      </ul>
      <p><strong>Six months in:</strong></p>
      <ul>
        <li>187 active members</li>
        <li>$28K/month recurring revenue</li>
        <li>30-minute visits, no insurance paperwork</li>
        <li>Home by 4:30 every day</li>
      </ul>
      <p>The math wasn't complicated. The system wasn't revolutionary. She just needed someone who'd done it before to walk her through it.</p>
      <p>That's what we do at PracticeRx.</p>
      <p>If you see yourself in Dr. M's story, <a href="https://practicerxconsulting.com/book">let's talk</a>.</p>
      <p>— Dr. Ajufo</p>
    `,
  },

  // ─── Email 3: 30% Off Offer (Day 14) ───
  {
    subject: "30% off any PracticeRx package — this week only",
    html: `
      <p>Hey {{NAME}},</p>
      <p>I don't run sales. I don't do gimmicks. But I do believe in momentum — and right now, you have it.</p>
      <p>You've been researching. You've been thinking. You downloaded the guide. That tells me you're serious.</p>
      <p>So here's what I want to do: <strong>30% off any PracticeRx package</strong> if you book a discovery call this week.</p>
      <ul>
        <li><strong>Strategy Session</strong> — normally $250 → <strong>$175</strong></li>
        <li><strong>Practice Launch (12-week program)</strong> — normally $3,500 → <strong>$2,450</strong></li>
        <li><strong>Monthly Advisory</strong> — normally $750/mo → <strong>$525/mo</strong></li>
      </ul>
      <p>No strings. No pressure. Just a conversation to see if we're a fit.</p>
      <p>This isn't about selling you something. It's about making sure the window of motivation you have right now doesn't close — because I've seen too many physicians wait another year, and another, and another.</p>
      <p><a href="https://practicerxconsulting.com/book"><strong>→ Book your free discovery call here</strong></a></p>
      <p>Let's build something,<br/><strong>Dr. Ajufo</strong></p>
    `,
  },

  // ─── Email 4: Common Mistakes (Day 21) ───
  {
    subject: "The 3 mistakes that kill DPC practices before they start",
    html: `
      <p>Hey {{NAME}},</p>
      <p>I've seen a lot of physicians try to go independent. The ones who fail almost always make the same three mistakes:</p>
      <p><strong>Mistake #1: Pricing too low.</strong><br/>
      You're a physician, not a budget clinic. If you price your membership at $50/month "to be accessible," you'll need 600+ members to break even. That's not a DPC practice — that's a volume mill with a different name. Price for value. Your patients will respect it.</p>
      <p><strong>Mistake #2: Waiting until everything is perfect.</strong><br/>
      You don't need a custom-built office, a $40K EMR, or a marketing agency on retainer. You need a business entity, a patient agreement, and 20 founding members. Everything else can come later.</p>
      <p><strong>Mistake #3: Going it alone.</strong><br/>
      Medicine trained us to be independent thinkers. But launching a business is different. The physicians who succeed fastest are the ones who get a guide — someone who's already navigated the legal, financial, and operational maze.</p>
      <p>That's exactly what PracticeRx exists for. Not to do it for you — but to make sure you don't waste months on things that should take days.</p>
      <p>If any of these hit close to home, <a href="https://practicerxconsulting.com/book">let's talk about your specific situation</a>.</p>
      <p>— Dr. Ajufo</p>
    `,
  },

  // ─── Email 5: AI in Independent Practice (Day 28) ───
  {
    subject: "How AI gives independent physicians an unfair advantage",
    html: `
      <p>Hey {{NAME}},</p>
      <p>Here's something most consultants won't tell you: the AI revolution isn't a threat to independent physicians. It's your biggest competitive advantage.</p>
      <p>Hospital systems are spending millions trying to integrate AI. Meanwhile, independent practices can adopt tools in a weekend that cut admin work by 60%.</p>
      <p><strong>What I'm seeing work right now:</strong></p>
      <ul>
        <li><strong>AI scribes</strong> — ambient documentation that writes your notes in real-time. No more charting at 10pm.</li>
        <li><strong>Automated scheduling + follow-up</strong> — patients book, get reminders, and receive care summaries without your staff touching it.</li>
        <li><strong>Revenue optimization</strong> — AI-powered analytics that show you exactly which services to add and when to raise prices.</li>
        <li><strong>Patient communication</strong> — HIPAA-compliant messaging that keeps your panel engaged between visits.</li>
      </ul>
      <p>The total cost? Under $300/month for most of this. That's less than one insurance claim is worth.</p>
      <p>As a Stanford AI-certified consultant, I help every PracticeRx client build a tech stack that makes them more efficient than practices 10x their size.</p>
      <p>Curious how this would work for your specialty? <a href="https://practicerxconsulting.com/book">Let's map it out</a>.</p>
      <p>— Dr. Ajufo</p>
    `,
  },

  // ─── Email 6: Final Nudge (Day 35) ───
  {
    subject: "Last chance: 30% off + a question for you",
    html: `
      <p>Hey {{NAME}},</p>
      <p>I want to ask you something honestly:</p>
      <p><strong>What's actually stopping you?</strong></p>
      <p>Is it the money? (Most DPC launches cost less than a used car.)<br/>
      Is it the risk? (You can launch while still employed — I'll show you how.)<br/>
      Is it the uncertainty? (That's literally what I exist to eliminate.)</p>
      <p>I've been where you are. I know what the internal debate sounds like. And I can tell you from the other side — the only regret my clients have is not doing it sooner.</p>
      <p>Your <strong>30% discount on any PracticeRx package</strong> is still available. But I'm closing this offer at the end of the week.</p>
      <ul>
        <li>Strategy Session → <strong>$175</strong> (normally $250)</li>
        <li>Practice Launch → <strong>$2,450</strong> (normally $3,500)</li>
        <li>Monthly Advisory → <strong>$525/mo</strong> (normally $750/mo)</li>
      </ul>
      <p><a href="https://practicerxconsulting.com/book"><strong>→ Book your free discovery call now</strong></a></p>
      <p>Whatever you decide, I'm rooting for you. Medicine needs more physicians who own their practice, their time, and their patient relationships.</p>
      <p>To your independence,<br/><strong>Dr. Ekene Ajufo, MD, FAAP</strong><br/>Founder, PracticeRx Consulting<br/><a href="https://practicerxconsulting.com">practicerxconsulting.com</a></p>
    `,
  },
];

const TOTAL_STEPS = DRIP_EMAILS.length;
const DRIP_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/* ─── Branded email wrapper ─── */
function wrapInBrandedTemplate(bodyHtml: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2;">
      <!-- Header -->
      <div style="background: #1B2B4B; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="width: 36px; height: 36px; background: rgba(198,163,92,0.2); border-radius: 50%; text-align: center; vertical-align: middle;">
            <span style="color: #C6A35C; font-weight: bold; font-size: 16px;">Rx</span>
          </td>
          <td style="padding-left: 12px;">
            <span style="color: #ffffff; font-weight: 600; font-size: 18px;">Practice</span><span style="color: #C6A35C; font-weight: 600; font-size: 18px;">Rx</span>
          </td>
        </tr></table>
      </div>
      <!-- Body -->
      <div style="background: #ffffff; padding: 32px; border-left: 1px solid #e5e2dc; border-right: 1px solid #e5e2dc; color: #1B2B4B; font-size: 15px; line-height: 1.7;">
        ${bodyHtml}
      </div>
      <!-- Footer -->
      <div style="background: #FAF7F2; padding: 20px 32px; border: 1px solid #e5e2dc; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="color: #999; font-size: 11px; margin: 0 0 8px 0;">
          PracticeRx Consulting · <a href="https://practicerxconsulting.com" style="color: #C6A35C;">practicerxconsulting.com</a>
        </p>
        <p style="color: #bbb; font-size: 10px; margin: 0;">
          You received this because you signed up at practicerxconsulting.com.
          <a href="mailto:info@practicerxconsulting.com?subject=Unsubscribe" style="color: #999;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC: Enroll a new lead in the drip campaign
   Called from form submissions (guide download, contact, etc.)
   ═══════════════════════════════════════════════════════════ */
export const enroll = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    source: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Don't double-enroll
    const existing = await ctx.db
      .query("dripEnrollments")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) return null;

    const now = Date.now();
    await ctx.db.insert("dripEnrollments", {
      email: args.email,
      name: args.name,
      source: args.source,
      enrolledAt: now,
      currentStep: 0,
      lastSentAt: now,
      status: "active",
    });

    // Schedule the welcome email to send immediately
    await ctx.scheduler.runAfter(0, internal.dripCampaign.sendDripEmail, {
      email: args.email,
      name: args.name,
      step: 0,
    });

    return null;
  },
});

/* ═══════════════════════════════════════════════════════════
   INTERNAL: Send a single drip email
   ═══════════════════════════════════════════════════════════ */
export const sendDripEmail = internalAction({
  args: {
    email: v.string(),
    name: v.string(),
    step: v.number(),
  },
  handler: async (_ctx, args) => {
    if (args.step < 0 || args.step >= TOTAL_STEPS) return;

    const template = DRIP_EMAILS[args.step];
    const firstName = args.name.split(" ")[0].replace(/^Dr\.?\s*/i, "").trim() || args.name;
    const displayName = args.name.startsWith("Dr") ? args.name.split(" ").slice(0, 2).join(" ") : `Dr. ${firstName}`;

    const personalizedHtml = template.html.replace(/\{\{NAME\}\}/g, displayName);
    const fullHtml = wrapInBrandedTemplate(personalizedHtml);

    // Strip HTML for text version
    const textContent = personalizedHtml
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li>/gi, "• ")
      .replace(/<\/li>/gi, "\n")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>[^<]*<\/a>/gi, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const apiUrl = process.env.VIKTOR_SPACES_API_URL;
    const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
    const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

    if (!apiUrl || !projectName || !projectSecret) {
      console.error("Viktor Spaces env vars not configured for drip emails");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/viktor-spaces/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName,
          project_secret: projectSecret,
          to_email: args.email,
          subject: template.subject,
          html_content: fullHtml,
          text_content: textContent,
          email_type: "otp",
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Drip email failed (step ${args.step} to ${args.email}): ${error}`);
        return;
      }

      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) {
        console.error(`Drip email error (step ${args.step}): ${result.error}`);
      } else {
        console.log(`Drip email sent: step ${args.step} to ${args.email}`);
      }
    } catch (error) {
      console.error(`Drip email exception (step ${args.step}):`, error);
    }
  },
});

/* ═══════════════════════════════════════════════════════════
   INTERNAL: Get all enrollments due for their next email
   ═══════════════════════════════════════════════════════════ */
export const getDueEnrollments = internalQuery({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const active = await ctx.db
      .query("dripEnrollments")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    // Filter to those where 7+ days have passed since last email
    // and they still have emails left to receive
    return active.filter((e) => {
      const daysSinceLast = (now - e.lastSentAt) / DRIP_INTERVAL_MS;
      const nextStep = e.currentStep + 1;
      return daysSinceLast >= 1 && nextStep < TOTAL_STEPS;
    });
  },
});

/* ═══════════════════════════════════════════════════════════
   INTERNAL: Advance an enrollment to the next step
   ═══════════════════════════════════════════════════════════ */
export const advanceEnrollment = internalMutation({
  args: {
    enrollmentId: v.id("dripEnrollments"),
    newStep: v.number(),
  },
  handler: async (ctx, args) => {
    const isComplete = args.newStep >= TOTAL_STEPS - 1;
    await ctx.db.patch(args.enrollmentId, {
      currentStep: args.newStep,
      lastSentAt: Date.now(),
      ...(isComplete
        ? { status: "completed", completedAt: Date.now() }
        : {}),
    });
  },
});

/* ═══════════════════════════════════════════════════════════
   INTERNAL: Process the drip queue (called by cron daily)
   ═══════════════════════════════════════════════════════════ */
export const processDripQueue = internalAction({
  args: {},
  handler: async (ctx) => {
    const due = await ctx.runQuery(internal.dripCampaign.getDueEnrollments);

    if (due.length === 0) {
      console.log("Drip queue: no emails due today.");
      return;
    }

    console.log(`Drip queue: ${due.length} email(s) to send.`);

    for (const enrollment of due) {
      const nextStep = enrollment.currentStep + 1;

      // Send the email
      await ctx.runAction(internal.dripCampaign.sendDripEmail, {
        email: enrollment.email,
        name: enrollment.name,
        step: nextStep,
      });

      // Advance the enrollment
      await ctx.runMutation(internal.dripCampaign.advanceEnrollment, {
        enrollmentId: enrollment._id,
        newStep: nextStep,
      });
    }

    console.log(`Drip queue: processed ${due.length} enrollment(s).`);
  },
});

/* ═══════════════════════════════════════════════════════════
   PUBLIC: Unsubscribe (for future use)
   ═══════════════════════════════════════════════════════════ */
export const unsubscribe = mutation({
  args: { email: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const enrollment = await ctx.db
      .query("dripEnrollments")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (enrollment) {
      await ctx.db.patch(enrollment._id, { status: "unsubscribed" });
    }
    return null;
  },
});
