import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search, Headphones, BookOpen } from "lucide-react";
import { lessons } from "@/data/lessons";
import { courseDetails, courseGroups, type CourseGroup } from "@/data/course-catalog";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "课程中心 — Ngobrol! 印尼语听力课堂" },
    { name: "description", content: "十二门生活情景课程：从打招呼、点餐、砍价到打车、换钱、看病与 WhatsApp 约人，逐句听力、中文翻译与文化贴士。" },
    { property: "og:title", content: "课程中心 — Ngobrol!" },
    { property: "og:description", content: "十二门生活情景课程，中文翻译、逐句听力与文化贴士。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CourseCenter,
});

function CourseCenter() {
  const [category, setCategory] = useState<CourseGroup>("全部课程");
  const [search, setSearch] = useState("");
  const wordTotal = lessons.reduce((n, l) => n + l.vocab.length, 0);
  const levelTotal = new Set(lessons.map(l => l.level)).size;
  const filtered = lessons.filter((lesson) =>
    (category === "全部课程" || courseDetails[lesson.id]?.category === category) &&
    `${lesson.title} ${lesson.subtitle} ${lesson.scene} ${lesson.vocab.map(v => v.word).join(" ")}`.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <LearningShell>
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="flex flex-wrap items-end justify-between gap-6 border-b border-border py-10 sm:py-12">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-accent"><Headphones className="h-4 w-4" /> BAHASA INDONESIA · 印尼语</p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Ngobrol! 课程中心</h1>
            <p className="mt-3 text-muted-foreground">从第一声 Halo，到自在聊生活。</p>
          </div>
          <div className="flex gap-7 text-sm"><div><p className="font-display text-3xl font-bold">{String(lessons.length).padStart(2, "0")}</p><p className="mt-1 text-muted-foreground">情景课程</p></div><div className="border-l border-border pl-7"><p className="font-display text-3xl font-bold">{String(levelTotal).padStart(2, "0")}</p><p className="mt-1 text-muted-foreground">学习阶段</p></div><div className="border-l border-border pl-7"><p className="font-display text-3xl font-bold">{wordTotal}</p><p className="mt-1 text-muted-foreground">实用单词</p></div></div>
        </section>
        <section className="py-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
            <div role="group" aria-label="课程分类" className="flex flex-wrap gap-2">
              {courseGroups.map(group => <Button key={group} variant={category === group ? "default" : "ghost"} aria-pressed={category === group} onClick={() => setCategory(group)}>{group}</Button>)}
            </div>
            <label className="flex w-full items-center gap-2 rounded-md border border-input bg-card px-3 sm:w-64">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input aria-label="搜索课程" placeholder="搜索课程或词汇" value={search} onChange={e => setSearch(e.target.value)} className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none" />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(lesson => {
              const detail = courseDetails[lesson.id];
              if (!detail) return null;
              return <Link key={lesson.id} to="/lessons/$lessonId" params={{ lessonId: lesson.id }} className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={detail.image} alt={lesson.scene} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                  <span className="absolute left-4 top-4 rounded-md bg-card px-2.5 py-1 text-xs font-semibold text-card-foreground">{lesson.level}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{detail.category}</span><span>{lesson.lines.length} 句对话</span></div>
                  <h2 className="mt-3 font-display text-xl font-bold">{lesson.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{lesson.subtitle}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-primary"><span>进入课程</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </Link>;
            })}
          </div>
          {filtered.length === 0 && <div className="py-16 text-center"><BookOpen className="mx-auto h-8 w-8 text-muted-foreground" /><h2 className="mt-4 font-semibold">没有找到匹配的课程</h2><Button variant="link" onClick={() => { setSearch(""); setCategory("全部课程"); }}>查看全部课程</Button></div>}
        </section>
        <section className="flex flex-wrap items-center justify-between gap-5 border-y border-border py-7">
          <div><h2 className="font-display text-xl font-bold">听懂了多少？</h2><p className="mt-2 text-sm text-muted-foreground">问候、砍价与点餐 · 5 道听力题</p></div>
          <Button variant="secondary" size="lg" asChild><Link to="/quiz"><Headphones />开始听力测验<ArrowRight /></Link></Button>
        </section>
      </main>
    </LearningShell>
  );
}
