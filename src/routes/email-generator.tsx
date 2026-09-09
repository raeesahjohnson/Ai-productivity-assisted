import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tool-page";
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
  component: () => <ToolPage tool={tool} />,
});
