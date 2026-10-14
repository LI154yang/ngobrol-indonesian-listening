import { describe, it, expect } from "vitest";
import { mergeMistake } from "@/lib/mistakes";
describe("mistake bank", () => {
  it("counts repeated mistakes on the same word once", () => {
    const e = { kind: "dictation" as const, word: "Kunci", meaning: "钥匙", yourAnswer: "kunchi" };
    const list = mergeMistake(mergeMistake([], e, 1), { ...e, yourAnswer: "kuci" }, 2);
    expect(list).toHaveLength(1);
    expect(list[0]!.count).toBe(2);
    expect(list[0]!.yourAnswer).toBe("kuci");
  });
});
