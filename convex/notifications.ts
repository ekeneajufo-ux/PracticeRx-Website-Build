import { v } from "convex/values";
import { action } from "./_generated/server";

declare const process: { env: Record<string, string | undefined> };

const NOTIFY_EMAIL = "info@practicerxconsulting.com";

/**
 * Sends an email notification to the business when a form is submitted.
 * Uses the Viktor Spaces email API (same as auth OTP emails).
 */
export const notifyFormSubmission = action({
  args: {
    formType: v.string(), // "discovery_call", "guide_download", "contact"
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    specialty: v.optional(v.string()),
    practiceType: v.optional(v.string()),
    currentSituation: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  returns: v.boolean(),
  handler: async (_ctx, args) => {
    const apiUrl = process.env.VIKTOR_SPACES_API_URL;
    const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
    const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

    if (!apiUrl || !projectName || !projectSecret) {
      console.error("Viktor Spaces env vars not configured for notifications");
      return false;
    }

    // Build subject and content based on form type
    let subject: string;
    let heading: string;
    let detailRows: string[] = [];

    switch (args.formType) {
      case "discovery_call":
        subject = `New Discovery Call Request from ${args.name}`;
        heading = "🗓 New Discovery Call Request";
        break;
      case "guide_download":
        subject = `New Guide Download from ${args.name}`;
        heading = "📥 New DPC Launch Guide Download";
        break;
      case "contact":
        subject = `New Contact Form from ${args.name}`;
        heading = "📬 New Contact Form Submission";
        break;
      default:
        subject = `New Form Submission from ${args.name}`;
        heading = "📋 New Form Submission";
    }

    // Build detail rows
    detailRows.push(`<strong>Name:</strong> ${escapeHtml(args.name)}`);
    detailRows.push(`<strong>Email:</strong> <a href="mailto:${escapeHtml(args.email)}">${escapeHtml(args.email)}</a>`);
    if (args.phone) detailRows.push(`<strong>Phone:</strong> ${escapeHtml(args.phone)}`);
    if (args.specialty) detailRows.push(`<strong>Specialty:</strong> ${escapeHtml(args.specialty)}`);
    if (args.practiceType) detailRows.push(`<strong>Practice Type:</strong> ${escapeHtml(args.practiceType)}`);
    if (args.currentSituation) detailRows.push(`<strong>Current Stage:</strong> ${escapeHtml(args.currentSituation)}`);
    if (args.interest) detailRows.push(`<strong>Interest:</strong> ${escapeHtml(args.interest)}`);
    if (args.message) detailRows.push(`<strong>Message:</strong><br/>${escapeHtml(args.message).replace(/\n/g, "<br/>")}`);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="background: #1B2B4B; padding: 20px 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; color: #C6A35C; font-size: 20px;">${heading}</h1>
        </div>
        <div style="background: #FAF7F2; padding: 24px; border: 1px solid #e5e2dc; border-top: none; border-radius: 0 0 12px 12px;">
          ${detailRows.map((row) => `<p style="margin: 8px 0; color: #1B2B4B; font-size: 14px; line-height: 1.6;">${row}</p>`).join("")}
          <hr style="border: none; border-top: 1px solid #e5e2dc; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; margin: 0;">
            Submitted via <strong>practicerxconsulting.com</strong> · ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET
          </p>
        </div>
      </div>
    `;

    const textContent = [
      heading,
      "",
      `Name: ${args.name}`,
      `Email: ${args.email}`,
      args.phone ? `Phone: ${args.phone}` : null,
      args.specialty ? `Specialty: ${args.specialty}` : null,
      args.practiceType ? `Practice Type: ${args.practiceType}` : null,
      args.currentSituation ? `Current Stage: ${args.currentSituation}` : null,
      args.interest ? `Interest: ${args.interest}` : null,
      args.message ? `Message: ${args.message}` : null,
      "",
      `Submitted via practicerxconsulting.com`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(`${apiUrl}/api/viktor-spaces/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName,
          project_secret: projectSecret,
          to_email: NOTIFY_EMAIL,
          subject: `[PracticeRx] ${subject}`,
          html_content: htmlContent,
          text_content: textContent,
          email_type: "otp",
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Notification email failed: ${error}`);
        return false;
      }

      const result = (await response.json()) as { success: boolean; error?: string };
      if (!result.success) {
        console.error(`Notification email error: ${result.error}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Notification email exception:", error);
      return false;
    }
  },
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
