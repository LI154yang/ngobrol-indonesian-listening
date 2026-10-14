import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Volume2, Play, Square, Eye, EyeOff, HelpCircle } from "lucide-react";
import { stories } from "@/data/stories";
import { LearningShell } from "@/components/LearningShell";
import { PracticeQuiz } from "@/components/PracticeQuiz";
import { Button } from "@/components/ui/button";
import { speakIndonesian, stopSpeaking } from "@/lib/speech";
import { shuffle } from "@/lib/quiz";
import { shuffleOptions } from "@/lib/practice";

export const Route = createFileRoute("/stories/$storyId")({
  loader: ({ params }) => {
    const story = stories.find(s => s.id === params.storyId);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.story.title} — Ngobrol! 印尼语故事` : "故事未找到 — Ngobrol!";
    const description = loaderData ? `${loaderData.story.summary} 逐段朗读、中文对照与阅读理解。` : "返回故事列表。";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] };
  },
  component: StoryPage,
  notFoundComponent: () => <LearningShell><div className="py-20 text-center"><h1 className="text-2xl font-bold">没有找到这个故事</h1><Button asChild className="mt-6"><Link to="/stories">返回故事列表</Link></Button></div></LearningShell>,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const [showZh, setShowZh] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  useEffect(() => () => stopSpeaking(), [story.id]);

  const playOne = (i: number) => {
    setPlayingAll(false);
    if (active === i) { stopSpeaking(); setActive(null); return; }
    if (speakIndonesian(story.paragraphs[i]!.indonesian, { onEnd: () => setActive(null) })) setActive(i);
  };
  const playAll = () => {
    if (playingAll) { stopSpeaking(); setPlayingAll(false); setActive(null); return; }
    setPlayingAll(true);
    const step = (i: number) => {
      const p = story.paragraphs[i];
      if (!p) { setPlayingAll(false); setActive(null); return; }
      setActive(i);
      speakIndonesian(p.indonesian, { rate: 0.85, onEnd: () => setTimeout(() => step(i + 1), 600) });
    };
    step(0);
  };

  return <LearningShell><main className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
    <Button variant="link" asChild className="px-0"><Link to="/stories"><ArrowLeft />全部故事</Link></Button>
    <p className="mt-6 text-sm text-accent">{story.level} · {story.paragraphs.length} 段</p>
    <h1 className="mt-2 font-display text-3xl font-bold">{story.title}</h1>
    <p className="italic text-muted-foreground">{story.titleId}</p>
    <div className="mt-6 flex flex-wrap gap-2">
      <Button onClick={playAll}>{playingAll ? <><Square />停止朗读</> : <><Play />朗读全文</>}</Button>
      <Button variant="outline" onClick={() => setShowZh(v => !v)}>{showZh ? <><EyeOff />隐藏中文</> : <><Eye />显示中文</>}</Button>
    </div>
    <article className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
      {story.paragraphs.map((p, i) => <div key={i} className={`flex gap-4 p-5 ${active === i ? "bg-secondary/70" : ""}`}>
        <Button size="icon" variant={active === i ? "default" : "secondary"} aria-label={`朗读第 ${i + 1} 段`} onClick={() => playOne(i)}><Volume2 /></Button>
        <div><p className="leading-relaxed">{p.indonesian}</p>{showZh && <p className="mt-1 text-sm text-muted-foreground">{p.chinese}</p>}</div>
      </div>)}
    </article>
    <h2 className="mt-10 font-display text-xl font-bold">故事生词</h2>
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">{story.vocab.map(v => <li key={v.word} className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-2"><span><b className="text-sm">{v.word}</b> <span className="text-xs text-muted-foreground">{v.meaning}</span></span><Button size="icon" variant="ghost" aria-label={`播放：${v.word}`} onClick={() => speakIndonesian(v.word)}><Volume2 /></Button></li>)}</ul>
    <h2 className="mb-4 mt-10 flex items-center gap-2 font-display text-xl font-bold"><HelpCircle className="h-5 w-5 text-primary" />阅读理解</h2>
    <PracticeQuiz key={story.id} build={() => shuffle(story.questions).map(shuffleOptions)} />
  </main></LearningShell>;
}
