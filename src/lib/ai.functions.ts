import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GenerateEmailInput = z.object({
  brief: z.string().min(1).max(6000),
});

const SYSTEM_PROMPT = [
  "You are a professional workplace email writer.",
  "Given a short brief, write one clear, polite, on-brand email.",
  "Include a subject line on the first line as 'Subject: ...', then the body.",
  "Keep it concise (under 200 words), plain text, no markdown, no placeholders",
  "other than [Name] when a real name is unknown.",
].join(" ");

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateEmailInput.parse(input))
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
        instructions: SYSTEM_PROMPT,
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
      throw new Error(
        `AI request failed (${res.status}). ${detail.slice(0, 200)}`.trim(),
      );
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
