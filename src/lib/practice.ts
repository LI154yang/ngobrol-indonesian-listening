import type { Lesson } from "@/data/lessons";
import { lessons } from "@/data/lessons";
import { shuffle } from "@/lib/quiz";

export interface PracticeQuestion {
  prompt: string;
  audio?: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** Shuffle a question's options and remap its answer index. */
export function shuffleOptions(q: PracticeQuestion): PracticeQuestion {
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map(i => q.options[i]!), answer: order.indexOf(q.answer) };
}

function pickDistractors(correct: string, pool: string[], n: number): string[] {
  return shuffle([...new Set(pool)].filter(p => p !== correct)).slice(0, n);
}

/**
 * Build a fresh per-lesson quiz from the lesson's own dialogue and vocab, so
 * every visit draws different items in a different order.
 */
export function buildLessonQuiz(lesson: Lesson, count = 5): PracticeQuestion[] {
  const linePool = lessons.flatMap(l => l.lines.map(x => x.chinese));
  const ownLines = lesson.lines.map(x => x.chinese);
  const vocabPool = lessons.flatMap(l => l.vocab.map(v => v.meaning));
  const ownVocab = lesson.vocab.map(v => v.meaning);

  const lineQs: PracticeQuestion[] = lesson.lines.map(line => {
    const wrong = pickDistractors(line.chinese, ownLines, 2);
    const extra = pickDistractors(line.chinese, linePool.filter(p => !wrong.includes(p)), 3 - wrong.length);
    return { prompt: "听这句话，它是什么意思？", audio: line.indonesian, options: [line.chinese, ...wrong, ...extra], answer: 0, explanation: `「${line.indonesian}」= ${line.chinese}` };
  });
  const vocabQs: PracticeQuestion[] = lesson.vocab.map(v => {
    const wrong = pickDistractors(v.meaning, ownVocab, 3);
    const extra = pickDistractors(v.meaning, vocabPool.filter(p => !wrong.includes(p)), 3 - wrong.length);
    return { prompt: "听这个单词，选出中文意思。", audio: v.word, options: [v.meaning, ...wrong, ...extra], answer: 0, explanation: `${v.word} = ${v.meaning}` };
  });
  const half = Math.ceil(count / 2);
  const picked = [...shuffle(lineQs).slice(0, half), ...shuffle(vocabQs).slice(0, count - half)];
  return shuffle(picked).map(shuffleOptions);
}
