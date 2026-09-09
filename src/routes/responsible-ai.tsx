import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Eye, Lock, UserCheck } from "lucide-react";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "How this workplace assistant handles privacy, human review, transparency and data security.",
      },
      { property: "og:title", content: "Responsible AI" },
      {
        property: "og:description",
        content: "Privacy, human review, transparency and data security principles.",
      },
    ],
  }),
  component: ResponsibleAI,
});

const principles = [
  {
    icon: UserCheck,
    title: "Human in the loop",
    body: "Every AI output is a draft. People review, edit and approve before anything is sent or shared.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "Tools state clearly when content is AI-generated and show which inputs were used.",
  },
  {
    icon: Lock,
    title: "Data protection",
    body: "Only the text you submit is processed. Nothing is used to train external models.",
  },
  {
    icon: ShieldCheck,
    title: "Fairness and safety",
    body: "Sensitive decisions about people are out of scope for this assistant.",
  },
];

function ResponsibleAI() {
  return (
    <div className="max-w-[900px] animate-fade-up px-5 py-6 sm:px-8">
      <h1 className="font-display text-2xl font-bold leading-tight tracking-tight">
        Responsible AI
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        The principles this assistant follows so teams can use AI at work with confidence.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="grid size-11 place-items-center rounded-lg bg-brand/10 text-brand">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 font-display font-semibold">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Review checklist</h2>
        <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
          <li>Check facts, names and figures before sending anything generated.</li>
          <li>Do not paste customer or employee personal data into the tools.</li>
          <li>Flag any output that looks biased, unsafe or plainly wrong.</li>
        </ul>
      </div>
    </div>
  );
}
