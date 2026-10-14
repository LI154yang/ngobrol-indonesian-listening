import { createFileRoute, Link } from "@tanstack/react-router";
import { BookText, ArrowRight } from "lucide-react";
import { stories } from "@/data/stories";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/stories/")({
  head: () => ({ meta: [{ title: "故事阅读 — Ngobrol! 印尼语课堂" }, { name: "description", content: "长篇印尼语故事：逐段朗读、中文对照、生词和阅读理解练习。" }, { property: "og:title", content: "印尼语故事阅读 — Ngobrol!" }, { property: "og:description", content: "读完整的印尼语故事，边听边练。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: StoriesPage,
});

function StoriesPage() {
  return <LearningShell><main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
    <p className="flex items-center gap-2 text-sm text-accent"><BookText className="h-4 w-4" />长篇阅读</p>
    <h1 className="mt-3 font-display text-3xl font-bold">故事课程</h1>
    <p className="mt-2 text-muted-foreground">比对话更长的完整故事，可以逐段听、对照中文，读完做阅读理解。</p>
    <ul className="mt-8 grid gap-4">
      {stories.map((s, i) => <li key={s.id} className="rounded-lg border border-border bg-card p-6">
        <p className="text-xs font-medium text-accent">故事 {String(i + 1).padStart(2, "0")} · {s.level} · {s.paragraphs.length} 段</p>
        <h2 className="mt-2 font-display text-xl font-bold">{s.title}</h2>
        <p className="text-sm italic text-muted-foreground">{s.titleId}</p>
        <p className="mt-2 text-sm">{s.summary}</p>
        <Button asChild className="mt-4"><Link to="/stories/$storyId" params={{ storyId: s.id }}>开始阅读<ArrowRight /></Link></Button>
      </li>)}
    </ul>
  </main></LearningShell>;
}
