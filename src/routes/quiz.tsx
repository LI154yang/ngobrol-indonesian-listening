import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Headphones } from "lucide-react";
import { Quiz } from "@/components/Quiz";
import { LearningShell } from "@/components/LearningShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "听力测验 — Ngobrol! 印尼语课堂" }, { name: "description", content: "用五道印尼语听力题检验问候、砍价和餐厅点餐表达，查看答案与解析。" }, { property: "og:title", content: "听力测验 — Ngobrol!" }, { property: "og:description", content: "听录音、选答案，检验日常印尼语听力。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: QuizPage,
});
function QuizPage() {
  return <LearningShell><main className="mx-auto max-w-3xl px-5 py-8 sm:px-8"><Button variant="link" asChild className="px-0"><Link to="/"><ArrowLeft />返回课程中心</Link></Button><p className="mt-7 flex items-center gap-2 text-sm text-accent"><Headphones className="h-4 w-4" />问候 · 砍价 · 点餐</p><h1 className="mt-3 font-display text-3xl font-bold">听力小测验</h1><div className="mt-8"><Quiz /></div></main></LearningShell>;
}
