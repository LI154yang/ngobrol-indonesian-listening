let ctx: AudioContext | null = null;
const KEY = "ngobrol-sfx-off";

export function isSfxOn() {
  return typeof window !== "undefined" && localStorage.getItem(KEY) !== "1";
}
export function setSfxOn(on: boolean) {
  localStorage.setItem(KEY, on ? "0" : "1");
}

/** Short soft "tick" built with Web Audio — no files to download. */
export function playClick(kind: "tap" | "nav" = "tap") {
  if (!isSfxOn()) return;
  try {
    ctx ??= new AudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(kind === "nav" ? 520 : 880, t);
    osc.frequency.exponentialRampToValueAtTime(kind === "nav" ? 780 : 560, t + 0.08);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  } catch { /* audio unavailable */ }
}

export function installClickSounds() {
  const handler = (e: PointerEvent) => {
    const el = (e.target as HTMLElement | null)?.closest("button, a, [role=button]");
    if (!el || (el as HTMLButtonElement).disabled) return;
    playClick(el.tagName === "A" ? "nav" : "tap");
  };
  document.addEventListener("pointerdown", handler);
  return () => document.removeEventListener("pointerdown", handler);
}
