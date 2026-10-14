import { quizQuestions } from "@/data/lessons";

export interface ShuffledQuestion {
  question: string;
  audio: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** Fisher–Yates shuffle, returns a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/**
 * Build a fresh quiz round: question order and option order are both
 * shuffled, and each question's answer index is remapped to its new spot.
 */
export function buildQuizRound(): ShuffledQuestion[] {
  return shuffle(quizQuestions).map(q => {
    const order = shuffle(q.options.map((_, i) => i));
    return {
      question: q.question,
      audio: q.audio,
      explanation: q.explanation,
      options: order.map(i => q.options[i]!),
      answer: order.indexOf(q.answer),
    };
  });
}
