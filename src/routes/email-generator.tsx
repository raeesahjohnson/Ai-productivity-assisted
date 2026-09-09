import { createFileRoute } from "@tanstack/react-router";
import { ToolRunner } from "@/components/tool-runner";
import { getTool } from "@/lib/tools";

const tool = getTool("email-generator");

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content: "Draft clear, on-brand workplace emails in seconds from a short brief.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Draft clear, on-brand workplace emails in seconds from a short brief.",
      },
    ],
  }),
  component: () => <ToolRunner tool={tool} />,
});
