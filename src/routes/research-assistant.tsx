import { createFileRoute } from "@tanstack/react-router";
import { ToolRunner } from "@/components/tool-runner";
import { getTool } from "@/lib/tools";

const tool = getTool("research-assistant");

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content: "Gather and cite sources for briefs and presentations quickly.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Gather and cite sources for briefs and presentations quickly.",
      },
    ],
  }),
  component: () => <ToolRunner tool={tool} />,
});
