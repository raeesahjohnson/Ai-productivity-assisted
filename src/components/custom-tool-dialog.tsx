import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, Check, Copy, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { runCustomTool } from "@/lib/ai.functions";

export function CustomToolDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const run = useServerFn(runCustomTool);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const canRun = title.trim().length > 0 && instructions.trim().length > 0 && !loading;

  async function submit() {
    if (!canRun) return;
    setLoading(true);
    setError("");
    try {
      const res = await run({
        data: { title: title.trim(), instructions: instructions.trim() },
      });
      if (!res.text) {
        setError("No text came back. Please try again.");
      } else {
        setResult(res.text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display">Build a custom tool</DialogTitle>
          <DialogDescription>
            Give your tool a title and describe what it should do. The AI runs it right away.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="custom-title" className="text-sm font-medium">
              Tool title
            </label>
            <input
              id="custom-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Client status update writer"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div>
            <label htmlFor="custom-instructions" className="text-sm font-medium">
              Instructions
            </label>
            <textarea
              id="custom-instructions"
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe what the tool should do, and paste any details it should work from."
              className="mt-2 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={submit}
              disabled={!canRun}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Running…" : "Run tool"}
            </button>
            <button
              onClick={() => {
                setTitle("");
                setInstructions("");
                setResult("");
                setError("");
              }}
              className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-ink/5"
            >
              Clear
            </button>
          </div>

          {loading && (
            <div className="space-y-2.5">
              <div className="h-3 w-full animate-pulse rounded bg-ink/8" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-ink/8" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-ink/8" />
            </div>
          )}

          {!loading && result && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-sm font-semibold">Result</h3>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold hover:bg-ink/5"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea
                aria-label="Custom tool result"
                rows={10}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="mt-2 w-full resize-y whitespace-pre-wrap rounded-lg border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-ring/20"
              />
            </div>
          )}

          {!loading && error && (
            <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <AlertCircle className="size-4 shrink-0 text-destructive" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-destructive">Couldn’t run the tool</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
