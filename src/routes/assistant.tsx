import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Square, Trash2, Volume2, VolumeX } from "lucide-react";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";
import { useMistakes } from "@/lib/mistakes";
import { isSfxOn, setSfxOn } from "@/lib/sfx";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI 学习助手 · Ngobrol! 印尼语听力课堂" },
      { name: "description", content: "让 AI 助手帮你总结课程重点、归纳词汇、根据错题制定复习计划。" },
      { property: "og:title", content: "AI 学习助手 · Ngobrol! 印尼语听力课堂" },
      { property: "og:description", content: "让 AI 助手帮你总结课程重点、归纳词汇、根据错题制定复习计划。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; content: string };
const SUGGESTIONS = ["帮我总结所有课程里最常用的 10 句话", "按主题整理我学过的词汇", "根据我的错题做一个 3 天复习计划", "出 5 道题考考我学过的内容"];

function AssistantPage() {
  const mistakes = useMistakes();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sfx, setSfx] = useState(true);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setSfx(isSfxOn()); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput(""); setError(""); setLoading(true);
    const ac = new AbortController(); abortRef.current = ac;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST", signal: ac.signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20), mistakes: mistakes.slice(0, 40).map(m => `${m.word}（${m.meaning}）`) }),
      });
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({})) as { error?: string };
        setError(d.error ?? "AI 暂时无法回应。");
        setMessages(history);
        return;
      }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setMessages(m => { const c = [...m]; const last = c[c.length - 1]!; c[c.length - 1] = { ...last, content: last.content + chunk }; return c; });
      }
    } catch (e) {
      if (!(e instanceof Error && e.name === "AbortError")) setError("网络出错，请稍后再试。");
    } finally { setLoading(false); abortRef.current = null; }
  }

  return <LearningShell>
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">AI 学习助手</h1>
          <p className="mt-2 text-sm text-muted-foreground">它知道本站全部课程、词汇和你的错题，可以帮你整合学过的内容。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setSfxOn(!sfx); setSfx(!sfx); }}>{sfx ? <Volume2 /> : <VolumeX />}按钮音效{sfx ? "开" : "关"}</Button>
          {messages.length > 0 && <Button variant="ghost" size="sm" onClick={() => { abortRef.current?.abort(); setMessages([]); }}><Trash2 />清空</Button>}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {messages.length === 0 && <div className="grid gap-3 sm:grid-cols-2">{SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)} className="rounded-lg border border-border bg-card p-4 text-left text-sm transition-colors hover:border-primary hover:text-primary">{s}</button>)}</div>}
        {messages.map((m, i) => m.role === "user"
          ? <div key={i} className="ml-auto max-w-[85%] rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground">{m.content}</div>
          : <div key={i} className="whitespace-pre-wrap text-sm leading-relaxed">{m.content || (loading && i === messages.length - 1 ? <span className="text-muted-foreground">助手正在整理…</span> : "")}</div>)}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div ref={endRef} />
      </div>

      <form className="mt-8 flex gap-2" onSubmit={e => { e.preventDefault(); send(input); }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} rows={2} maxLength={2000} placeholder="例如：帮我对比 mau 和 ingin 的用法" aria-label="向学习助手提问" className="min-w-0 flex-1 resize-none rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        {loading
          ? <Button type="button" variant="outline" className="h-auto" onClick={() => abortRef.current?.abort()}><Square />停止</Button>
          : <Button type="submit" className="h-auto" disabled={!input.trim()}><Send />发送</Button>}
      </form>
    </main>
  </LearningShell>;
}
