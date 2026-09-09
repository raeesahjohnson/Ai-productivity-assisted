import { createFileRoute } from "@tanstack/react-router";
import { ToolRunner } from "@/components/tool-runner";
import { getTool } from "@/lib/tools";

const tool = getTool("task-planner");

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace Assistant" },
      {
        name: "description",
        content: "Prioritize your day and break projects down into clear next actions.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Prioritize your day and break projects down into clear next actions.",
      },
    ],
  }),
  component: () => <ToolRunner tool={tool} />,
});
