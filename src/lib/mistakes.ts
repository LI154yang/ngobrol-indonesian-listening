import { useSyncExternalStore } from "react";

export type MistakeKind = "dictation" | "quiz";

export interface Mistake {
  id: string;
  kind: MistakeKind;
  /** Indonesian text to replay */
  word: string;
  meaning: string;
  /** What the learner answered */
  yourAnswer: string;
  lessonId?: string;
  count: number;
  lastAt: number;
}

const KEY = "ngobrol-mistakes-v1";
const listeners = new Set<() => void>();
let cache: Mistake[] | null = null;
const EMPTY: Mistake[] = [];

function read(): Mistake[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    cache = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Mistake[];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: Mistake[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore quota errors */
  }
  listeners.forEach(l => l());
}

export function mergeMistake(list: Mistake[], entry: Omit<Mistake, "id" | "count" | "lastAt">, now: number): Mistake[] {
  const id = `${entry.kind}:${entry.word.toLowerCase()}`;
  const existing = list.find(m => m.id === id);
  if (existing) {
    return [{ ...existing, ...entry, count: existing.count + 1, lastAt: now }, ...list.filter(m => m.id !== id)];
  }
  return [{ ...entry, id, count: 1, lastAt: now }, ...list];
}

export function addMistake(entry: Omit<Mistake, "id" | "count" | "lastAt">) {
  write(mergeMistake(read(), entry, Date.now()));
}

export function removeMistake(id: string) {
  write(read().filter(m => m.id !== id));
}

export function clearMistakes() {
  write([]);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMistakes(): Mistake[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
