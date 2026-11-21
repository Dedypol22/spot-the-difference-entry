let audioCtx = null;
let muted = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq, type, duration, volume = 0.1) {
  if (muted || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export const AUDIO = {
  init: initAudio,
  toggleMute: () => { muted = !muted; return muted; },
  isMuted: () => muted,

  find: () => {
    playTone(523.25, 'sine', 0.2); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.3), 100); // E5
  },

  wrong: () => {
    playTone(150, 'sawtooth', 0.3, 0.05);
  },

  hint: () => {
    playTone(880, 'triangle', 0.5, 0.05);
  },

  fanfare: () => {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      setTimeout(() => playTone(f, 'square', 0.4, 0.03), i * 150);
    });
  },

  click: () => {
    playTone(1000, 'sine', 0.05, 0.02);
  }
};
