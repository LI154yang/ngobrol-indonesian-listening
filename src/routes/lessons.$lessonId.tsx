import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Volume2, BookOpen, PenLine, Sparkles, Headphones } from "lucide-react";
import { lessons } from "@/data/lessons";
import { courseDetails } from "@/data/course-catalog";
import { DialoguePlayer } from "@/components/DialoguePlayer";
import { DictationPractice } from "@/components/DictationPractice";
import { PracticeQuiz } from "@/components/PracticeQuiz";
import { buildLessonQuiz } from "@/lib/practice";
import { SpeakingCoach } from "@/components/SpeakingCoach";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";
import { speakIndonesian } from "@/lib/speech";

export const Route = createFileRoute("/lessons/$lessonId")({
  loader: ({ params }) => {
    const lesson = lessons.find(item => item.id === params.lessonId);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.lesson.title} — Ngobrol! 印尼语情景课程` : "课程未找到 — Ngobrol!";
    const description = loaderData ? `${loaderData.lesson.subtitle}。印尼语逐句听力、中文翻译、实用词汇与文化贴士。` : "返回课程中心选择印尼语课程。";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: LessonPage,
  notFoundComponent: () => <LearningShell><div className="px-5 py-20 text-center"><h1 className="text-2xl font-bold">没有找到这门课程</h1><Button asChild className="mt-6"><Link to="/">返回课程中心</Link></Button></div></LearningShell>,
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const index = lessons.findIndex(item => item.id === lesson.id);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const detail = courseDetails[lesson.id];
  return <LearningShell>
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="py-6"><Button variant="link" asChild className="px-0"><Link to="/"><ArrowLeft />返回课程中心</Link></Button></div>
      <header className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-8">
        <div><p className="text-sm font-medium text-accent">第 {String(index + 1).padStart(2, "0")} 课 · {lesson.level} · {detail?.category}</p><h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{lesson.title}</h1><p className="mt-3 text-muted-foreground">{lesson.subtitle}</p></div>
        {detail && <img src={detail.image} alt={lesson.scene} width={1024} height={768} className="h-32 w-52 rounded-lg object-cover" />}
      </header>
      <div className="grid items-start gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0"><h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold"><BookOpen className="h-5 w-5 text-primary" />情景对话</h2><DialoguePlayer key={lesson.id} lesson={lesson} /><h2 className="mb-4 mt-10 flex items-center gap-2 font-display text-xl font-bold"><PenLine className="h-5 w-5 text-primary" />单词听写</h2><DictationPractice key={`dictation-${lesson.id}`} lesson={lesson} /><h2 className="mb-4 mt-10 flex items-center gap-2 font-display text-xl font-bold"><Headphones className="h-5 w-5 text-primary" />本课小测（每次题目不同）</h2><PracticeQuiz key={`quiz-${lesson.id}`} lessonId={lesson.id} build={() => buildLessonQuiz(lesson)} /><h2 className="mb-4 mt-10 flex items-center gap-2 font-display text-xl font-bold"><Sparkles className="h-5 w-5 text-primary" />AI 情景表达练习</h2><SpeakingCoach key={`coach-${lesson.id}`} lesson={lesson} /></section>
        <aside className="border-t border-border py-5 lg:border-t-0 lg:py-0"><h2 className="font-display text-xl font-bold">本课词汇</h2><ul className="mt-4 divide-y divide-border">{lesson.vocab.map(v => <li key={v.word} className="flex items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="break-words text-sm font-semibold">{v.word}</p><p className="mt-1 text-xs text-muted-foreground">{v.meaning}</p></div><Button variant="secondary" size="icon" title={`播放：${v.word}`} aria-label={`播放：${v.word}`} onClick={() => speakIndonesian(v.word)}><Volume2 /></Button></li>)}</ul><Button variant="outline" asChild className="mt-5 w-full"><Link to="/quiz">听力测验<ArrowRight /></Link></Button></aside>
      </div>
      <nav aria-label="课程切换" className="flex flex-wrap justify-between gap-4 border-t border-border py-6">
        {previous ? <Button variant="outline" asChild><Link to="/lessons/$lessonId" params={{ lessonId: previous.id }}><ArrowLeft />{previous.title}</Link></Button> : <Button variant="outline" asChild><Link to="/">全部课程</Link></Button>}
        {next ? <Button asChild><Link to="/lessons/$lessonId" params={{ lessonId: next.id }}>下一课：{next.title}<ArrowRight /></Link></Button> : <Button asChild><Link to="/quiz">开始听力测验<ArrowRight /></Link></Button>}
      </nav>
    </main>
  </LearningShell>;
}
