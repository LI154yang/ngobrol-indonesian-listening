import { describe, expect, it } from "vitest";

import { lessons } from "@/data/lessons";
import { courseDetails, courseGroups, type CourseGroup } from "@/data/course-catalog";

// Lesson content is the product: a lesson missing its catalog entry disappears
// from the course center, and a dialogue line without Chinese is unlearnable.
describe("Lesson catalog", () => {
  it("has unique lesson ids", () => {
    expect(new Set(lessons.map(l => l.id)).size).toBe(lessons.length);
  });

  it("gives every lesson a course center entry with a known category and an image", () => {
    for (const lesson of lessons) {
      const detail = courseDetails[lesson.id];
      expect(detail, `courseDetails missing for ${lesson.id}`).toBeTruthy();
      expect(courseGroups).toContain(detail!.category);
      expect(detail!.image.length).toBeGreaterThan(0);
    }
  });

  it("lists every lesson exactly once across the categories", () => {
    const categorized = lessons.filter(l => courseDetails[l.id]);
    expect(categorized.length).toBe(lessons.length);
    for (const group of courseGroups.slice(1)) {
      const inGroup = lessons.filter(l => courseDetails[l.id]?.category === (group as CourseGroup));
      expect(inGroup.length, `category ${group} has no lessons`).toBeGreaterThan(0);
    }
  });

  it("keeps every lesson teachable: dialogue, translation, vocab and a culture note", () => {
    for (const lesson of lessons) {
      expect(lesson.lines.length, `${lesson.id} has too few dialogue lines`).toBeGreaterThanOrEqual(5);
      expect(lesson.vocab.length, `${lesson.id} has too few vocab words`).toBeGreaterThanOrEqual(6);
      expect(lesson.cultureNote.length, `${lesson.id} has no culture note`).toBeGreaterThan(10);
      expect(new Set(lesson.vocab.map(v => v.word)).size, `${lesson.id} has duplicate vocab`).toBe(lesson.vocab.length);
      for (const line of lesson.lines) {
        expect(line.indonesian.trim().length).toBeGreaterThan(0);
        expect(line.chinese.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps dictation words free of punctuation a learner cannot type", () => {
    for (const lesson of lessons) {
      for (const word of lesson.vocab) {
        expect(word.word, `${lesson.id}: "${word.word}" is not dictation-friendly`).not.toMatch(/[()（）]/);
      }
    }
  });
});
