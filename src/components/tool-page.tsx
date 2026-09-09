import { useState } from "react";
import { Loader2, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import type { Tool } from "@/lib/tools";

type State = "idle" | "loading" | "done" | "error";

export function ToolPage({
  tool,
  generate,
}: {
  tool: Tool;
  generate?: (brief: string) => Promise<string>;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<State>("idle");
  const Icon = tool.icon;

  async function run() {
    if (!value.trim()) return;
    setState("loading");
    setError("");

    if (!generate) {
      setError(`The ${tool.name.toLowerCase()} will run here once its functionality is added.`);
      setState("error");
      return;
    }

    try {
      const text = await generate(value.trim());
      if (!text) {
        setError("No text came back. Please try again.");
        setState("error");
        return;
      }
      setResult(text);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
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
          onChange={(e) => setValue(e.target.value)}
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
            {state === "loading" ? "Generating…" : tool.actionLabel}
          </button>
          <button
            onClick={() => {
              setValue("");
              setResult("");
              setError("");
              setState("idle");
            }}
            className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-ink/5"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Result</h2>
          {result ? (
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold hover:bg-ink/5"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">Editable</span>
          )}
        </div>

        {state === "idle" && !result && (
          <div className="py-10 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-lg bg-ink/5 text-muted-foreground">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-sm font-medium">Nothing generated yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Add your input above and run the tool. Your result will appear here.
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

        {state !== "loading" && result && (
          <textarea
            aria-label="Generated result"
            rows={14}
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="mt-3 w-full resize-y whitespace-pre-wrap rounded-lg border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-ring/20"
          />
        )}

        {state === "error" && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-destructive">Couldn’t generate</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              {generate && (
                <button
                  onClick={run}
                  className="mt-3 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold hover:bg-ink/5"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
