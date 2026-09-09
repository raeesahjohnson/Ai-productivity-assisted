import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tool-page";
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
  component: () => <ToolPage tool={tool} />,
});
