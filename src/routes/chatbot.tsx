import { createFileRoute } from "@tanstack/react-router";
import { ToolRunner } from "@/components/tool-runner";
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
  component: () => <ToolRunner tool={tool} />,
});
