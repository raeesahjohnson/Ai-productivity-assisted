import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { getTool } from "@/lib/tools";
import { generateEmail } from "@/lib/ai.functions";

const tool = getTool("email-generator");

function EmailGeneratorPage() {
  const run = useServerFn(generateEmail);
  return (
    <ToolPage
      tool={tool}
      generate={async (brief) => {
        const result = await run({ data: { brief } });
        return result.text;
      }}
    />
  );
}

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
  component: EmailGeneratorPage,
});
