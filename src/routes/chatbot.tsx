import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tool-page";
import { getTool } from "@/lib/tools";

const tool = getTool("chatbot");

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — AI Workplace Assistant" },
      {
        name: "description",
        content: "Ask about policy, processes, or your workspace in plain words.",
      },
      { property: "og:title", content: "AI Workplace Chatbot" },
      {
        property: "og:description",
        content: "Ask about policy, processes, or your workspace in plain words.",
      },
    ],
  }),
  component: () => <ToolPage tool={tool} />,
});
