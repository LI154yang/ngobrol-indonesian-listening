import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Volume2 } from "lucide-react";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";
import { lessons } from "@/data/lessons";
import { speakIndonesian } from "@/lib/speech";

export const Route = createFileRoute("/words")({
  head: () => ({
    meta: [
      { title: "单词库 · Ngobrol! 印尼语听力课堂" },
      { name: "description", content: "汇总所有课程的印尼语单词，可搜索、点读发音。" },
      { property: "og:title", content: "单词库 · Ngobrol! 印尼语听力课堂" },
      { property: "og:description", content: "汇总所有课程的印尼语单词，可搜索、点读发音。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WordsPage,
});

function WordsPage() {
  const [query, setQuery] = useState("");
  const [lessonId, setLessonId] = useState<string>("all");

  const words = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons
      .filter(l => lessonId === "all" || l.id === lessonId)
      .flatMap(l => l.vocab.map(v => ({ ...v, lesson: l })))
      .filter(v => !q || v.word.toLowerCase().includes(q) || v.meaning.includes(q));
  }, [query, lessonId]);

  const total = lessons.reduce((n, l) => n + l.vocab.length, 0);

  return (
    <LearningShell>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h1 className="font-display text-4xl font-bold">单词库</h1>
        <p className="mt-2 text-muted-foreground">共 {total} 个单词，点击喇叭听发音。</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜索印尼语或中文…"
              aria-label="搜索单词"
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <select
            value={lessonId}
            onChange={e => setLessonId(e.target.value)}
            aria-label="按课程筛选"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">全部课程</option>
            {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
          </select>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {words.map(v => (
            <li key={`${v.lesson.id}-${v.word}`} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <Button variant="secondary" size="icon" onClick={() => speakIndonesian(v.word)} aria-label={`播放 ${v.word}`}>
                <Volume2 />
              </Button>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold">{v.word}</p>
                <p className="text-sm text-muted-foreground">{v.meaning}</p>
              </div>
              <Link to="/lessons/$lessonId" params={{ lessonId: v.lesson.id }} className="shrink-0 text-xs text-primary hover:underline">
                {v.lesson.title}
              </Link>
            </li>
          ))}
        </ul>
        {words.length === 0 && <p className="mt-8 text-center text-muted-foreground">没有找到匹配的单词。</p>}
      </main>
    </LearningShell>
  );
}
