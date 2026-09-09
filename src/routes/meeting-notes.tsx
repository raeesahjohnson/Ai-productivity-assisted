import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/tool-page";
import { getTool } from "@/lib/tools";

const tool = getTool("meeting-notes");

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      {
        name: "description",
        content: "Turn long meeting transcripts into key decisions and clear action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Turn long meeting transcripts into key decisions and clear action items.",
      },
    ],
  }),
  component: () => <ToolPage tool={tool} />,
});
