import { describe, expect, it } from "vitest";

import { quizQuestions } from "@/data/lessons";
import { buildQuizRound, shuffle } from "@/lib/quiz";

// The quiz must stay challenging: every round reshuffles questions and
// options, and the answer index must always point at the right option.
describe("Quiz round builder", () => {
  it("keeps every question and every option exactly once", () => {
    const round = buildQuizRound();
    expect(round.length).toBe(quizQuestions.length);
    for (const q of round) {
      const source = quizQuestions.find(s => s.audio === q.audio);
      expect(source, `unknown question: ${q.question}`).toBeTruthy();
      expect([...q.options].sort()).toEqual([...source!.options].sort());
    }
  });

  it("always maps the answer index to the correct option text", () => {
    for (let run = 0; run < 20; run++) {
      for (const q of buildQuizRound()) {
        const source = quizQuestions.find(s => s.audio === q.audio)!;
        expect(q.options[q.answer]).toBe(source.options[source.answer]);
      }
    }
  });

  it("changes the order between rounds", () => {
    const first = buildQuizRound().map(q => q.question).join("|");
    const orders = new Set([first]);
    for (let run = 0; run < 10; run++) {
      orders.add(buildQuizRound().map(q => q.question).join("|"));
    }
    expect(orders.size).toBeGreaterThan(1);
  });

  it("shuffle does not mutate its input", () => {
    const input = [1, 2, 3, 4, 5];
    shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});
