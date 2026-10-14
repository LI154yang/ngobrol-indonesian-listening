import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { lessons } from "@/data/lessons";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("connects every lesson to its own page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const lesson of lessons) {
      expect(router.matchRoutes(`/lessons/${lesson.id}`).at(-1)?.routeId).toBe("/lessons/$lessonId");
    }
  });

  it("connects the listening quiz", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/quiz").at(-1)?.routeId).toBe("/quiz");
  });
});
