let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakIndonesian(
  text: string,
  options?: { rate?: number; onEnd?: () => void }
): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = options?.rate ?? 0.85;

  const voices = window.speechSynthesis.getVoices();
  const idVoice =
    voices.find((v) => v.lang.toLowerCase().startsWith("id")) ??
    voices.find((v) => v.lang.toLowerCase().includes("id"));
  if (idVoice) utterance.voice = idVoice;

  utterance.onend = () => {
    // Ignore callbacks from utterances that were cancelled/replaced,
    // otherwise a stopped "play all" keeps scheduling the next line.
    if (currentUtterance !== utterance) return;
    currentUtterance = null;
    options?.onEnd?.();
  };
  utterance.onerror = () => {
    if (currentUtterance !== utterance) return;
    currentUtterance = null;
    options?.onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
