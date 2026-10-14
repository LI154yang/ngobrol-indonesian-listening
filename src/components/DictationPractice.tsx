import { useMemo, useState } from "react";
import { Check, RotateCcw, Volume2, X } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { speakIndonesian } from "@/lib/speech";
import { Button } from "@/components/ui/button";
import { addMistake } from "@/lib/mistakes";

type Result = "idle" | "correct" | "wrong";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[?!.,…'"’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function DictationPractice({ lesson }: { lesson: Lesson }) {
  const items = useMemo(() => lesson.vocab, [lesson]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result>("idle");
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const current = items[index];
  if (!current) return null;

  const play = () => {
    speakIndonesian(current.word);
  };

  const check = () => {
    if (result !== "idle" || !input.trim()) return;
    const ok = normalize(input) === normalize(current.word);
    setResult(ok ? "correct" : "wrong");
    setAttempted(value => value + 1);
    if (ok) setScore(value => value + 1);
    else addMistake({ kind: "dictation", word: current.word, meaning: current.meaning, yourAnswer: input.trim(), lessonId: lesson.id });
  };

  const next = () => {
    setIndex(value => (value + 1) % items.length);
    setInput("");
    setResult("idle");
  };

  const restart = () => {
    setIndex(0);
    setInput("");
    setResult("idle");
    setScore(0);
    setAttempted(0);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          第 {index + 1} / {items.length} 词 · 得分 {score} / {attempted}
        </p>
        <Button variant="ghost" size="sm" onClick={restart}>
          <RotateCcw /> 重新开始
        </Button>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        点击播放，听录音写出你听到的印尼语单词或短语：
      </p>

      <div className="mt-3 flex items-center gap-3">
        <Button variant="secondary" size="icon" onClick={play} aria-label="播放听写单词" title="播放">
          <Volume2 />
        </Button>
        <p className="text-sm text-muted-foreground">中文意思：{current.meaning}</p>
      </div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={event => {
          event.preventDefault();
          check();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
            if (result !== "idle") setResult("idle");
          }}
          placeholder="在这里输入你听到的内容…"
          aria-label="听写输入"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {result === "idle" ? (
          <Button type="submit" disabled={!input.trim()}>
            检查答案
          </Button>
        ) : (
          <Button type="button" onClick={next}>
            下一个
          </Button>
        )}
      </form>

      {result === "correct" && (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-accent">
          <Check className="h-4 w-4" /> 答对了！{current.word} = {current.meaning}
        </p>
      )}
      {result === "wrong" && (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-destructive">
          <X className="h-4 w-4" /> 正确答案是「{current.word}」（{current.meaning}）
        </p>
      )}
    </div>
  );
}
