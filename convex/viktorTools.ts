/**
 * Viktor Tools - Call any Viktor SDK function from your Convex app.
 */
import { v } from "convex/values";
import { action } from "./_generated/server";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

async function callTool<T>(role: string, args: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: PROJECT_NAME,
      project_secret: PROJECT_SECRET,
      role,
      arguments: args,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error ?? "Tool call failed");
  }
  // API returns { success, result: { response_role, result: <actual_data>, error } }
  const wrapper = json.result;
  if (wrapper.error) {
    throw new Error(wrapper.error);
  }
  return wrapper.result as T;
}

export const quickAiSearch = action({
  args: { query: v.string() },
  returns: v.string(),
  handler: async (_ctx, { query }) => {
    const result = await callTool<{ search_response: string }>("quick_ai_search", {
      search_question: query,
    });
    return result.search_response;
  },
});

export const generateImage = action({
  args: {
    prompt: v.string(),
    aspectRatio: v.optional(
      v.union(
        v.literal("1:1"),
        v.literal("16:9"),
        v.literal("9:16"),
        v.literal("4:3"),
        v.literal("3:2"),
      ),
    ),
  },
  returns: v.string(),
  handler: async (_ctx, { prompt, aspectRatio }) => {
    const result = await callTool<{ response_text: string }>("text2im", {
      prompt,
      aspect_ratio: aspectRatio ?? "1:1",
    });
    return result.response_text;
  },
});

// AI Chatbot - powered by Claude via Viktor's AI gateway
export const chat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
  },
  returns: v.string(),
  handler: async (_ctx, { messages }) => {
    const systemPrompt = `You are the PracticeRx Consulting AI assistant — a knowledgeable, warm, and direct advisor for physicians exploring Direct Primary Care (DPC), concierge medicine, and independent practice models.

Your role:
- Answer questions about DPC, concierge medicine, cash-pay practice models, and physician entrepreneurship
- Help physicians understand the financial, legal, and operational aspects of going independent
- Share relevant insights about AI in healthcare, practice management, and business fundamentals
- Guide visitors toward booking a discovery call with Dr. Ekene Ajufo when appropriate

About PracticeRx Consulting:
- Founded by Dr. Ekene Ajufo, MD — a board-certified physician, practice owner, clinical AI consultant, and healthcare entrepreneur
- Stanford AI Certified and ABAIM AI Certified
- Helps physicians design, launch, and grow independent DPC and concierge practices in 90 days
- Services: Strategy Sessions, Practice Launch Packages, Monthly Advisory, Business Coaching (includes Business Review)
- Works across primary care specialties

Key facts you can share:
- DPC physicians can earn more seeing 80% fewer patients ($75/mo x 400 families = $360K/year)
- 91% of DPC physicians would choose DPC again vs 49% in traditional practice
- A DPC practice can launch for $2,000-$5,000 in startup costs
- The 90-day launch roadmap covers: legal setup, pricing, tech stack, marketing, first members

Tone: Confident clinician voice. Direct and warm. No corporate speak. Be concise — 2-3 short paragraphs max unless asked for detail.

If someone asks about pricing, say they should book a discovery call for personalized information.
If someone asks something outside your scope, be honest about limitations and suggest they book a call.`;

    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    const conversationContext = messages.slice(-6).map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n");

    try {
      const result = await callTool<{ reply: string }>("ai_structured_output", {
        prompt: `${systemPrompt}\n\nRecent conversation:\n${conversationContext}\n\nGenerate the next assistant reply. Be helpful and direct. 2-3 paragraphs max.`,
        output_schema: {
          type: "object",
          properties: {
            reply: { type: "string", description: "The assistant response to the user" },
          },
          required: ["reply"],
        },
        intelligence_level: "balanced",
      });
      return result.reply;
    } catch (e) {
      console.error("AI chat primary failed:", e);
      // Fallback: use quick_ai_search for a simpler response
      try {
        const searchResult = await callTool<{ search_response: string }>("quick_ai_search", {
          search_question: `PracticeRx DPC concierge medicine physician practice: ${lastUserMessage?.content ?? "general info"}`,
        });
        return searchResult.search_response;
      } catch (e2) {
        console.error("AI chat fallback failed:", e2);
        return "I appreciate your question! For the most helpful and personalized answer, I'd recommend booking a free discovery call with Dr. Ajufo. You can do that right here on the site — just click 'Book a Discovery Call' in the menu. He'll be able to address your specific situation directly.";
      }
    }
  },
});
