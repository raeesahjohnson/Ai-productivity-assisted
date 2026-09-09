import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SLUGS = [
  "email-generator",
  "meeting-notes",
  "task-planner",
  "research-assistant",
  "chatbot",
] as const;

const RunToolInput = z.object({
  tool: z.enum(SLUGS),
  brief: z.string().min(1).max(12000),
});

const PROMPTS: Record<(typeof SLUGS)[number], string> = {
  "email-generator": [
    "You are a professional workplace email writer.",
    "Given a short brief, write one clear, polite, on-brand email.",
    "Include a subject line on the first line as 'Subject: ...', then the body.",
    "Keep it under 200 words, plain text, no markdown, no placeholders",
    "other than [Name] when a real name is unknown.",
  ].join(" "),
  "meeting-notes": [
    "You summarize workplace meeting notes or transcripts.",
    "Return plain text with these sections, each on its own line group:",
    "'Summary' (2-4 sentences), 'Key decisions' (dashed list),",
    "'Action items' (dashed list, each with owner and due date if mentioned),",
    "and 'Open questions' (dashed list, omit the section if none).",
    "No markdown symbols, no invented facts.",
  ].join(" "),
  "task-planner": [
    "You are a pragmatic task planner for busy professionals.",
    "From the described work, produce a plain-text plan with:",
    "'Today' (max 3 items), 'This week' (max 5 items), and 'Later'.",
    "Each item starts with a dash, is a concrete next action,",
    "and includes a rough time estimate in parentheses.",
    "Order items by priority. No markdown symbols.",
  ].join(" "),
  "research-assistant": [
    "You are a research assistant for workplace briefs.",
    "Answer in plain text with 'Overview' (short paragraph),",
    "'Key findings' (dashed list of 4-6 points),",
    "and 'Where to verify' (dashed list of source types or named organisations).",
    "Never fabricate statistics, links, or citations; if unsure, say what is uncertain.",
    "No markdown symbols.",
  ].join(" "),
  chatbot: [
    "You are a helpful workplace assistant answering employee questions.",
    "Answer directly and concisely in plain text, 1-3 short paragraphs.",
    "You do not have access to this company's internal policy documents,",
    "so give general best-practice guidance and clearly say when the employee",
    "should confirm the specifics with HR or their manager. No markdown symbols.",
  ].join(" "),
};

export const runTool = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RunToolInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this app.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: PROMPTS[data.tool],
        input: data.brief,
        stream: true,
        reasoning: { effort: "low", summary: "auto" },
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429) {
        throw new Error("Too many requests right now. Please try again in a moment.");
      }
      if (res.status === 402) {
        throw new Error("AI credits are exhausted. Please add credits to keep generating.");
      }
      throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 200)}`.trim());
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload) as {
            type?: string;
            delta?: string;
            response?: { output_text?: string };
          };
          if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
            text += event.delta;
          } else if (event.type === "response.completed" && !text) {
            text = event.response?.output_text ?? "";
          }
        } catch {
          // ignore keep-alive / non-JSON lines
        }
      }
    }

    return { text: text.trim() };
  });
