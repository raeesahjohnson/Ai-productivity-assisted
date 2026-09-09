import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content: "Manage your profile, workspace defaults and AI preferences.",
      },
      { property: "og:title", content: "Settings" },
      {
        property: "og:description",
        content: "Manage your profile, workspace defaults and AI preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-[720px] animate-fade-up px-5 py-6 sm:px-8">
      <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Workspace preferences used across every AI tool.
      </p>

      <form
        className="mt-6 space-y-5 rounded-xl border border-border bg-card p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            defaultValue="Mara Ellison"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Work email
          </label>
          <input
            id="email"
            type="email"
            defaultValue="mara@company.com"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div>
          <label htmlFor="tone" className="text-sm font-medium">
            Default writing tone
          </label>
          <select
            id="tone"
            defaultValue="Professional"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-ring/20"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Concise</option>
          </select>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
          <input id="review" type="checkbox" defaultChecked className="mt-0.5 size-4" />
          <label htmlFor="review" className="text-sm">
            Always review AI drafts before sending
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Recommended for all workplace communication.
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-90"
          >
            Save changes
          </button>
          {saved && <span className="text-sm font-medium text-good">Preferences saved</span>}
        </div>
      </form>
    </div>
  );
}
