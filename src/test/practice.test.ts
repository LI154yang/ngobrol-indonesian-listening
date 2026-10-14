import { describe, expect, it } from "vitest";
import { lessons } from "@/data/lessons";
import { stories } from "@/data/stories";
import { buildLessonQuiz } from "@/lib/practice";

describe("Per-lesson quiz", () => {
  it("builds 5 questions with 4 unique options and a correct answer from the lesson", () => {
    for (const lesson of lessons) {
      const qs = buildLessonQuiz(lesson);
      expect(qs.length).toBe(5);
      for (const q of qs) {
        expect(new Set(q.options).size).toBe(4);
        const own = [...lesson.lines.map(l => l.chinese), ...lesson.vocab.map(v => v.meaning)];
        expect(own).toContain(q.options[q.answer]);
      }
    }
  });
  it("draws different questions between visits", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10; i++) seen.add(buildLessonQuiz(lessons[0]!).map(q => q.audio).join("|"));
    expect(seen.size).toBeGreaterThan(1);
  });
});

describe("Stories", () => {
  it("are long enough and have comprehension questions", () => {
    expect(stories.length).toBeGreaterThanOrEqual(3);
    for (const s of stories) {
      expect(s.paragraphs.length).toBeGreaterThanOrEqual(8);
      expect(s.questions.length).toBeGreaterThanOrEqual(5);
    }
  });
});
