import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Play, Square, Volume2, Lightbulb, Users } from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { speakIndonesian, stopSpeaking, isSpeechSupported } from "@/lib/speech";

export function DialoguePlayer({ lesson }: { lesson: Lesson }) {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [supported, setSupported] = useState(false);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setSupported(isSpeechSupported());
    return () => stopSpeaking();
  }, [lesson.id]);

  const playLine = (index: number) => {
    if (activeLine === index) {
      stopSpeaking();
      setActiveLine(null);
      return;
    }
    setPlayingAll(false);
    const line = lesson.lines[index];
    if (!line) return;
    const ok = speakIndonesian(line.indonesian, {
      onEnd: () => setActiveLine(null),
    });
    if (ok) setActiveLine(index);
  };

  const playAll = () => {
    if (playingAll) {
      cancelRef.current?.();
      cancelRef.current = null;
      stopSpeaking();
      setPlayingAll(false);
      setActiveLine(null);
      return;
    }
    setPlayingAll(true);
    let cancelled = false;
    cancelRef.current = () => {
      cancelled = true;
    };
    let i = 0;
    const next = () => {
      if (cancelled || i >= lesson.lines.length) {
        setPlayingAll(false);
        setActiveLine(null);
        return;
      }
      const current = i;
      setActiveLine(current);
      const line = lesson.lines[current];
      if (!line) return;
      speakIndonesian(line.indonesian, {
        rate: 0.85,
        onEnd: () => {
          i += 1;
          setTimeout(next, 500);
        },
      });
    };
    next();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          <Users className="h-4 w-4" />
          <span>{lesson.scene}</span>
        </div>
        <Button
          onClick={playAll}
          disabled={!supported}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            playingAll
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          } ${playingAll ? "animate-pulse-ring" : ""}`}
        >
          {playingAll ? (
            <>
              <Square className="h-4 w-4" /> 停止播放
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> 播放整段对话
            </>
          )}
        </Button>
      </div>

      <div className="divide-y divide-border">
        {lesson.lines.map((line, i) => {
          const isActive = activeLine === i;
          return (
            <div
              key={i}
              className={`flex gap-4 px-6 py-4 transition-colors ${
                isActive ? "bg-secondary/70" : ""
              }`}
            >
              <Button
                onClick={() => playLine(i)}
                disabled={!supported}
                aria-label={`播放：${line.indonesian}`}
                className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <div className="min-w-0">
                <div className="text-xs font-semibold tracking-wide text-accent">
                  {line.speaker}
                </div>
                <p className="mt-0.5 font-medium text-card-foreground">
                  {line.indonesian}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {line.chinese}
                </p>
                {line.tip && (
                  <p className="mt-1.5 inline-flex items-start gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                    <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" />
                    {line.tip}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border bg-accent/5 px-6 py-5">
        <div className="flex items-start gap-2.5">
          <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
            文化贴士
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {lesson.cultureNote}
          </p>
        </div>
      </div>
    </div>
  );
}
