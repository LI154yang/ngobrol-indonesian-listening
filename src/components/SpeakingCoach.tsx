import { useEffect, useRef, useState } from "react";
import { shuffle } from "@/lib/quiz";
import { Sparkles, Square, RotateCcw } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { Button } from "@/components/ui/button";

export function SpeakingCoach({ lesson }: { lesson: Lesson }) {
  const base = lesson.lines.filter(l => l.speaker !== "你").map(l => `对方说：「${l.indonesian}」（${l.chinese}），你会怎么回答？`);
  const [prompts, setPrompts] = useState(base);
  useEffect(() => { setPrompts(shuffle(base)); }, [lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [promptIdx, setPromptIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const prompt = prompts[promptIdx] ?? `在「${lesson.scene}」这个情景里，用印尼语说一句话。`;

  async function submit() {
    if (!answer.trim() || loading) return;
    setLoading(true); setFeedback(""); setError("");
    const ac = new AbortController(); abortRef.current = ac;
    try {
      const res = await fetch("/api/coach", { method: "POST", signal: ac.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId: lesson.id, prompt, answer }) });
      if (!res.ok || !res.body) { const d = await res.json().catch(() => ({})) as { error?: string }; setError(d.error ?? "AI 暂时无法回应。"); return; }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      while (true) { const { value, done } = await reader.read(); if (done) break; setFeedback(f => f + dec.decode(value, { stream: true })); }
    } catch (e) {
      if (!(e instanceof Error && e.name === "AbortError")) setError("网络出错，请稍后再试。");
    } finally { setLoading(false); abortRef.current = null; }
  }

  return <div className="rounded-lg border border-border bg-card p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <p className="text-sm font-medium">{prompt}</p>
      {prompts.length > 1 && <Button variant="ghost" size="sm" onClick={() => { setPromptIdx((promptIdx + 1) % prompts.length); setFeedback(""); setError(""); }}><RotateCcw />换一题</Button>}
    </div>
    <textarea value={answer} onChange={e => setAnswer(e.target.value)} maxLength={500} rows={3} placeholder="用印尼语写下你的回答，例如：Saya mau ke stasiun, Pak." aria-label="你的印尼语回答" className="mt-4 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    <div className="mt-3 flex gap-2">
      <Button onClick={submit} disabled={loading || !answer.trim()}><Sparkles />{loading ? "AI 老师批改中…" : "让 AI 老师批改"}</Button>
      {loading && <Button variant="outline" onClick={() => abortRef.current?.abort()}><Square />停止</Button>}
    </div>
    {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
    {feedback && <div className="mt-5 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm leading-relaxed">{feedback}</div>}
  </div>;
}
