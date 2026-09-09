import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { runTool } from "@/lib/ai.functions";
import type { Tool } from "@/lib/tools";

type Slug =
  | "email-generator"
  | "meeting-notes"
  | "task-planner"
  | "research-assistant"
  | "chatbot";

export function ToolRunner({ tool }: { tool: Tool }) {
  const run = useServerFn(runTool);
  return (
    <ToolPage
      tool={tool}
      generate={async (brief) => {
        const result = await run({ data: { tool: tool.slug as Slug, brief } });
        return result.text;
      }}
    />
  );
}
