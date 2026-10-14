import { useEffect, useState } from "react";
import { Volume2, CheckCircle2, XCircle, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakIndonesian } from "@/lib/speech";
import { addMistake } from "@/lib/mistakes";
import type { PracticeQuestion } from "@/lib/practice";

/** Generic quiz: pick → submit → feedback → next. `build` is called for each new round. */
export function PracticeQuiz({ build, lessonId }: { build: () => PracticeQuestion[]; lessonId?: string }) {
  const [round, setRound] = useState<PracticeQuestion[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const restart = () => { setRound(build()); setCurrent(0); setSelected(null); setSubmitted(false); setScore(0); setFinished(false); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { restart(); }, []);

  if (!round) return <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">正在出题…</div>;
  const q = round[current];
  if (!q) return null;

  const submit = () => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    if (selected === q.answer) setScore(s => s + 1);
    else addMistake({ kind: "quiz", word: q.audio ?? q.prompt, meaning: q.options[q.answer] ?? "", yourAnswer: q.options[selected] ?? "", ...(lessonId ? { lessonId } : {}) });
  };
  const next = () => {
    if (current + 1 >= round.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); setSubmitted(false); }
  };

  if (finished) return <div className="rounded-lg border border-border bg-card p-8 text-center">
    <p className="font-display text-4xl font-bold text-primary">{score} / {round.length}</p>
    <p className="mt-2 text-sm text-muted-foreground">{score === round.length ? "全对！Hebat！" : "答错的题已记入错题库。"}</p>
    <Button onClick={restart} className="mt-5"><RotateCcw />换一组新题</Button>
  </div>;

  return <div className="rounded-lg border border-border bg-card p-6">
    <div className="flex justify-between text-sm text-muted-foreground"><span>第 {current + 1} / {round.length} 题</span><span>得分：{score}</span></div>
    <p className="mt-4 font-semibold">{q.prompt}</p>
    {q.audio && <Button variant="secondary" className="mt-3" onClick={() => speakIndonesian(q.audio!)}><Volume2 />播放</Button>}
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {q.options.map((opt, i) => {
        const ok = submitted && i === q.answer;
        const bad = submitted && selected === i && i !== q.answer;
        const picked = !submitted && selected === i;
        return <Button key={i} variant="outline" disabled={submitted} onClick={() => setSelected(i)}
          className={`h-auto justify-between whitespace-normal py-3 text-left ${ok ? "border-accent bg-accent/10" : bad ? "border-destructive bg-destructive/10" : picked ? "border-primary bg-secondary" : ""}`}>
          {opt}{ok && <CheckCircle2 className="text-accent" />}{bad && <XCircle className="text-destructive" />}
        </Button>;
      })}
    </div>
    {!submitted ? <Button className="mt-5" disabled={selected === null} onClick={submit}><Send />提交答案</Button> : <>
      <div className="mt-5 rounded-md bg-secondary p-3 text-sm">{q.explanation}</div>
      <Button className="mt-4" onClick={next}>{current + 1 >= round.length ? "查看成绩" : "下一题"}</Button>
    </>}
  </div>;
}
