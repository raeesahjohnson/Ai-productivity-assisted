import {
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export type ToolStatus = "Ready" | "Beta";

export type Tool = {
  slug: string;
  to: string;
  name: string;
  description: string;
  icon: LucideIcon;
  status: ToolStatus;
  inputLabel: string;
  inputPlaceholder: string;
  actionLabel: string;
};

export const tools: Tool[] = [
  {
    slug: "email-generator",
    to: "/email-generator",
    name: "Smart Email Generator",
    description: "Draft clear, on-brand emails in seconds from a short brief.",
    icon: Mail,
    status: "Ready",
    inputLabel: "What should this email say?",
    inputPlaceholder: "Follow up with the client about the Q3 planning meeting…",
    actionLabel: "Generate email",
  },
  {
    slug: "meeting-notes",
    to: "/meeting-notes",
    name: "Meeting Notes Summarizer",
    description: "Turn long transcripts into action items and key decisions.",
    icon: NotebookPen,
    status: "Ready",
    inputLabel: "Paste your meeting notes or transcript",
    inputPlaceholder: "Design review, 58 minutes. Attendees…",
    actionLabel: "Summarize notes",
  },
  {
    slug: "task-planner",
    to: "/task-planner",
    name: "AI Task Planner",
    description: "Prioritize your day and break projects into next actions.",
    icon: ListChecks,
    status: "Beta",
    inputLabel: "What are you working on?",
    inputPlaceholder: "Launch the new onboarding flow by the end of the month…",
    actionLabel: "Build plan",
  },
  {
    slug: "research-assistant",
    to: "/research-assistant",
    name: "AI Research Assistant",
    description: "Gather and cite sources for briefs and presentations fast.",
    icon: Search,
    status: "Ready",
    inputLabel: "What do you need researched?",
    inputPlaceholder: "Remote work productivity trends in 2026…",
    actionLabel: "Start research",
  },
  {
    slug: "chatbot",
    to: "/chatbot",
    name: "AI Workplace Chatbot",
    description: "Ask about policy, processes, or your workspace in plain words.",
    icon: MessageSquare,
    status: "Beta",
    inputLabel: "Ask a workplace question",
    inputPlaceholder: "How many leave days carry over to next year?",
    actionLabel: "Ask assistant",
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug)!;
