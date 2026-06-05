import { action } from "./_generated/server";
import { v } from "convex/values";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are an expert AI consultant for PracticeRx Consulting, specializing in direct primary care (DPC), cash-based medical practices, and practice transformation. 

Your expertise includes:
- DPC practice models and best practices
- Revenue optimization for independent practices
- Patient engagement and retention strategies
- Operational efficiency and automation
- Psychiatry and specialty-specific practice strategies
- Practice assessment and readiness

You provide insightful, practical advice based on best practices in the industry. Be conversational, helpful, and encourage visitors to learn more about PracticeRx's offerings. Naturally weave in the value of professional consulting when appropriate.

Keep responses concise (2-3 sentences typically), engaging, and actionable.`;

export const chatWithClaude = action({
  args: {
    message: v.string(),
    conversationHistory: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    const messages: ConversationMessage[] = [
      ...args.conversationHistory,
      {
        role: "user",
        content: args.message,
      },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Anthropic API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    const assistantMessage = data.content[0]?.text || "";

    return {
      content: assistantMessage,
    };
  },
});
