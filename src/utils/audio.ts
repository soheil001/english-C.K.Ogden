// Web Speech API and custom Audio file utility

export function speakEnglish(text: string, rate: number = 0.88) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const englishVoice =
    voices.find(
      (v) =>
        (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Siri') ||
          v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Extensible play audio function supporting future custom MP3 audio files per word
export function playWordPronunciation(word: string, audioUrl?: string, onEnd?: () => void) {
  if (audioUrl) {
    try {
      const audio = new Audio(audioUrl);
      if (onEnd) {
        audio.onended = onEnd;
      }
      audio.play().catch(() => {
        // Fallback to Web Speech API if audio file fails to load
        speakEnglish(word);
        if (onEnd) setTimeout(onEnd, 900);
      });
      return;
    } catch {
      speakEnglish(word);
      if (onEnd) setTimeout(onEnd, 900);
      return;
    }
  }

  // Native Web Speech API
  speakEnglish(word);
  if (onEnd) {
    setTimeout(onEnd, 900);
  }
}

// Subtle Web Audio chime
export function playChime(success: boolean = true) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (success) {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // ignore
  }
}
