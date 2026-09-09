import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutGrid,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  ShieldCheck,
  Settings,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = { to: string; label: string; icon: LucideIcon };

const workspaceNav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/email-generator", label: "Smart Email Generator", icon: Mail },
  { to: "/meeting-notes", label: "Meeting Notes Summarizer", icon: NotebookPen },
  { to: "/task-planner", label: "AI Task Planner", icon: ListChecks },
  { to: "/research-assistant", label: "AI Research Assistant", icon: Search },
  { to: "/chatbot", label: "AI Workplace Chatbot", icon: MessageSquare },
];

const systemNav: NavItem[] = [
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      activeOptions={{ exact: item.to === "/" }}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-ink/5"
      activeProps={{
        className: "bg-ink text-ink-foreground font-medium hover:bg-ink",
      }}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
      <span className="min-w-0 truncate">{item.label}</span>
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink font-display font-bold text-ink-foreground">
          A
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold leading-none">WorkOS AI</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Productivity Suite</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Workspace
        </p>
        {workspaceNav.map((item) => (
          <NavLink key={item.to} item={item} onNavigate={onNavigate} />
        ))}
        <p className="mb-2 px-3 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          System
        </p>
        {systemNav.map((item) => (
          <NavLink key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="rounded-xl bg-ink p-3.5 text-ink-foreground">
          <p className="font-display text-sm font-semibold">Pro plan</p>
          <p className="mt-1 text-[11px] text-ink-foreground/60">62% of monthly credits used</p>
          <div className="mt-2.5 h-1.5 rounded-full bg-ink-foreground/15">
            <div className="h-1.5 w-[62%] rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-sidebar shadow-xl">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink font-display text-sm font-bold text-ink-foreground">
              A
            </div>
            <span className="truncate font-display text-sm font-semibold">WorkOS AI</span>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-input"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
