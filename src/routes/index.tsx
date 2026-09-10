import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, NotebookPen, ListChecks, Search, Plus } from "lucide-react";
import { CustomToolDialog } from "@/components/custom-tool-dialog";
import { tools } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Work smarter, save time, and simplify everyday workplace tasks with AI: email drafting, meeting summaries, task planning, research and chat.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Work smarter, save time, and simplify everyday workplace tasks with AI.",
      },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  { label: "Time saved", value: "38h 20m", note: "▲ 12% vs last week", tone: "good" },
  { label: "Tasks automated", value: "142", note: "▲ 9 this week", tone: "good" },
  { label: "AI responses", value: "1,204", note: "Avg 2.1s latency", tone: "muted" },
] as const;

const activity = [
  {
    icon: Check,
    tone: "good",
    title: "Email draft generated — “Q3 planning follow-up”",
    meta: "Smart Email Generator · 12 min ago",
    duration: "2.4s",
  },
  {
    icon: NotebookPen,
    tone: "brand",
    title: "Summarized 58-min design review into 6 action items",
    meta: "Meeting Notes Summarizer · 1h ago",
    duration: "8.1s",
  },
  {
    icon: ListChecks,
    tone: "warn",
    title: "Replanned sprint backlog · 14 tasks rescheduled",
    meta: "AI Task Planner · 3h ago",
    duration: "5.0s",
  },
  {
    icon: Search,
    tone: "accent",
    title: "Research brief compiled · 9 cited sources",
    meta: "AI Research Assistant · Yesterday",
    duration: "14s",
  },
] as const;

const toneBg: Record<string, string> = {
  good: "bg-good/10 text-good",
  brand: "bg-brand/10 text-brand",
  warn: "bg-warn/10 text-warn",
  accent: "bg-accent/10 text-accent",
};

function Dashboard() {
  const [customOpen, setCustomOpen] = useState(false);
  return (
    <div className="max-w-[1200px] px-5 py-6 sm:px-8">
      <div className="grid animate-fade-up grid-cols-[minmax(0,1fr)] gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">
            AI Workplace Productivity Assistant
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Work smarter, save time, and simplify everyday workplace tasks with AI.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-ink/5">
            Weekly report
          </button>
          <Link
            to="/task-planner"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90"
          >
            + New task
          </Link>
        </div>
      </div>

      <section className="mt-7 grid animate-fade-up grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{m.value}</p>
            <p
              className={`mt-1.5 text-[11px] ${m.tone === "good" ? "text-good" : "text-muted-foreground"}`}
            >
              {m.note}
            </p>
          </div>
        ))}
        <div className="rounded-xl bg-ink p-4 text-ink-foreground">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-foreground/50">
            Focus score
          </p>
          <p className="mt-2 font-display text-2xl font-bold">
            94<small className="text-base text-ink-foreground/50">/100</small>
          </p>
          <p className="mt-1.5 text-[11px] text-accent">Deep work 4.5h today</p>
        </div>
      </section>

      <div className="mb-3 mt-8 flex animate-fade-up items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Your AI toolkit</h2>
        <span className="text-sm font-medium text-brand">5 tools</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={tool.to}
              className="animate-fade-up rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-brand"
            >
              <div className="grid size-11 place-items-center rounded-lg bg-brand/10 text-brand">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display font-semibold">{tool.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-brand">Open tool →</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    tool.status === "Ready" ? "bg-good/10 text-good" : "bg-warn/10 text-warn"
                  }`}
                >
                  {tool.status}
                </span>
              </div>
            </Link>
          );
        })}

        <div
          role="button"
          tabIndex={0}
          onClick={() => setCustomOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCustomOpen(true);
            }
          }}
          className="flex animate-fade-up cursor-pointer flex-col items-start justify-center rounded-xl border-2 border-dashed border-input p-5 text-left transition hover:-translate-y-0.5 hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <div className="grid size-11 place-items-center rounded-lg bg-ink/5 text-muted-foreground">
            <Plus className="size-5" strokeWidth={1.75} />
          </div>
          <h3 className="mt-4 font-display font-semibold">Build a custom tool</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            No tool for your workflow yet? Describe it and the AI will run it for you.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCustomOpen(true);
            }}
            className="mt-4 rounded-lg border border-input px-3 py-1.5 text-xs font-semibold hover:bg-ink/5"
          >
            Create draft
          </button>
        </div>
      </div>

      <section className="mt-8 animate-fade-up">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent activity</h2>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
          {activity.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 px-4 py-3.5">
                <div className={`grid size-9 shrink-0 place-items-center rounded-lg ${toneBg[item.tone]}`}>
                  <Icon className="size-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {item.duration}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        WorkOS AI · Placeholder pages pending feature build
      </p>
    </div>
  );
}
