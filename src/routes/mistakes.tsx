import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Volume2, Check } from "lucide-react";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";
import { lessons } from "@/data/lessons";
import { speakIndonesian } from "@/lib/speech";
import { clearMistakes, removeMistake, useMistakes } from "@/lib/mistakes";

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "错题库 · Ngobrol! 印尼语听力课堂" },
      { name: "description", content: "自动收集听写和听力测验中的错题，随时复习。" },
      { property: "og:title", content: "错题库 · Ngobrol! 印尼语听力课堂" },
      { property: "og:description", content: "自动收集听写和听力测验中的错题，随时复习。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MistakesPage,
});

function MistakesPage() {
  const mistakes = useMistakes();

  return (
    <LearningShell>
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold">错题库</h1>
            <p className="mt-2 text-muted-foreground">听写和测验中答错的内容会自动收录在这里（保存在本设备）。</p>
          </div>
          {mistakes.length > 0 && (
            <Button variant="outline" onClick={() => { if (confirm("确定清空所有错题？")) clearMistakes(); }}>
              <Trash2 /> 清空
            </Button>
          )}
        </div>

        {mistakes.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">还没有错题，太棒了！去课程里练习听写或做听力测验吧。</p>
            <Button className="mt-4" asChild><Link to="/">去课程中心</Link></Button>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {mistakes.map(m => {
              const lesson = lessons.find(l => l.id === m.lessonId);
              return (
                <li key={m.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Button variant="secondary" size="icon" onClick={() => speakIndonesian(m.word)} aria-label={`播放 ${m.word}`}>
                    <Volume2 />
                  </Button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                        {m.kind === "dictation" ? "听写" : "听力测验"}
                      </span>
                      <p className="font-display text-lg font-semibold">{m.word}</p>
                      <span className="text-sm text-muted-foreground">{m.meaning}</span>
                    </div>
                    <p className="mt-1 text-sm text-destructive">你的答案：{m.yourAnswer || "（空）"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      错 {m.count} 次
                      {lesson && <> · <Link to="/lessons/$lessonId" params={{ lessonId: lesson.id }} className="text-primary hover:underline">{lesson.title}</Link></>}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeMistake(m.id)} title="已掌握，移出错题库">
                    <Check /> 已掌握
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </LearningShell>
  );
}
