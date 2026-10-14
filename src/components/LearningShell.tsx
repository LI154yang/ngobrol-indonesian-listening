import { Link } from "@tanstack/react-router";
import { Headphones, ArrowUpRight, BookOpen, NotebookPen, BookText, Bot } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function LearningShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <nav aria-label="主导航" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2 text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">N</span>
            <span className="font-display text-xl font-bold">Ngobrol!</span>
          </Link>
          <div className="flex items-center flex-wrap justify-end gap-1 sm:gap-3">
            <Button variant="ghost" asChild><Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-secondary text-primary" }}>课程中心</Link></Button>
            <Button variant="ghost" asChild><Link to="/stories" activeProps={{ className: "bg-secondary text-primary" }}><BookText />故事阅读</Link></Button>
            <Button variant="ghost" asChild><Link to="/quiz" activeProps={{ className: "bg-secondary text-primary" }}><Headphones />听力测验</Link></Button>
            <Button variant="ghost" asChild><Link to="/words" activeProps={{ className: "bg-secondary text-primary" }}><BookOpen />单词库</Link></Button>
            <Button variant="ghost" asChild><Link to="/mistakes" activeProps={{ className: "bg-secondary text-primary" }}><NotebookPen />错题库</Link></Button>
            <Button variant="ghost" asChild><Link to="/assistant" activeProps={{ className: "bg-secondary text-primary" }}><Bot />学习助手</Link></Button>
          </div>
        </nav>
      </header>
      {children}
      <footer className="mt-12 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <div><p className="font-display font-bold">Ngobrol! · 印尼语听力课堂</p><p className="mt-1 text-xs text-muted-foreground">Selamat belajar! 学习愉快</p></div>
          <Button variant="link" asChild><Link to="/">所有课程 <ArrowUpRight /></Link></Button>
        </div>
      </footer>
    </div>
  );
}