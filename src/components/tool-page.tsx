import { useState } from "react";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { Tool } from "@/lib/tools";

type State = "idle" | "loading" | "error";

export function ToolPage({ tool }: { tool: Tool }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>("idle");
  const Icon = tool.icon;

  function run() {
    setState("loading");
    window.setTimeout(() => setState("error"), 900);
  }

  return (
    <div className="max-w-[900px] animate-fade-up px-5 py-6 sm:px-8">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
          <Icon className="size-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
              {tool.name}
            </h1>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                tool.status === "Ready" ? "bg-good/10 text-good" : "bg-warn/10 text-warn"
              }`}
            >
              {tool.status}
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <label htmlFor="tool-input" className="text-sm font-medium">
          {tool.inputLabel}
        </label>
        <textarea
          id="tool-input"
          rows={6}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setState("idle");
          }}
          placeholder={tool.inputPlaceholder}
          className="mt-2 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/20"
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={run}
            disabled={!value.trim() || state === "loading"}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {state === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {tool.actionLabel}
          </button>
          <button
            onClick={() => {
              setValue("");
              setState("idle");
            }}
            className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-ink/5"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Result</h2>
          <span className="text-xs text-muted-foreground">Preview</span>
        </div>

        {state === "idle" && (
          <div className="py-10 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-lg bg-ink/5 text-muted-foreground">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-sm font-medium">Nothing generated yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Add your input above and run the tool. Results will appear here once the AI is
              connected.
            </p>
          </div>
        )}

        {state === "loading" && (
          <div className="mt-4 space-y-2.5">
            <div className="h-3 w-full animate-pulse rounded bg-ink/8" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-ink/8" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-ink/8" />
          </div>
        )}

        {state === "error" && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-destructive">AI is not connected yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This is a placeholder page. The {tool.name.toLowerCase()} will run here once its
                functionality is added.
              </p>
              <button
                onClick={run}
                className="mt-3 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold hover:bg-ink/5"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
