import { RHYTHM_PATTERNS, getStaffNoteFrequency, STAFF_POSITION_DATA } from './musicTheory';
import type { QuestionVisual, StaffPosition } from '../types';

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Context) {
    return null;
  }

  if (!audioContext) {
    audioContext = new Context();
  }

  return audioContext;
}

async function resumeAudioContext(context: AudioContext) {
  if (context.state === 'suspended') {
    await context.resume();
  }
}

export async function playNoteFrequency(frequency: number, duration = 0.65) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  await resumeAudioContext(context);

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

export async function playNoteSequence(frequencies: number[]) {
  for (const [index, frequency] of frequencies.entries()) {
    await new Promise((resolve) => {
      window.setTimeout(() => {
        void playNoteFrequency(frequency, 0.28);
        resolve(undefined);
      }, index * 220);
    });
  }
}

export async function playStaffPosition(position: StaffPosition) {
  return playNoteFrequency(getStaffNoteFrequency(position));
}

async function playClick(context: AudioContext, startAt: number, duration: number, frequency: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

export async function playRhythmPattern(patternId: keyof typeof RHYTHM_PATTERNS | string) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  await resumeAudioContext(context);
  const pattern = RHYTHM_PATTERNS[patternId as keyof typeof RHYTHM_PATTERNS];
  if (!pattern) {
    return;
  }

  const beat = 0.42;
  let cursor = context.currentTime + 0.04;
  pattern.symbols.forEach((symbol) => {
    if (symbol === 'quarter') {
      void playClick(context, cursor, 0.18, 440);
      cursor += beat;
      return;
    }
    if (symbol === 'rest') {
      cursor += beat;
      return;
    }
    if (symbol === 'eighth-pair') {
      void playClick(context, cursor, 0.12, 540);
      void playClick(context, cursor + beat / 2, 0.12, 540);
      cursor += beat;
    }
  });
}

export async function playVisualAudio(visual: QuestionVisual) {
  if (visual.kind === 'staff-note') {
    return playStaffPosition(visual.position);
  }
  if (visual.kind === 'staff-numbering') {
    const sequence = ['line1', 'line2', 'line3', 'line4', 'line5'].map((position) =>
      getStaffNoteFrequency(position as StaffPosition),
    );
    return playNoteSequence(sequence);
  }
  if (visual.kind === 'staff-sequence') {
    return playNoteSequence(
      visual.items.map((item) => getStaffNoteFrequency(item.position)),
    );
  }
  if (visual.kind === 'rhythm-pattern') {
    return playRhythmPattern(visual.patternId);
  }
  if (visual.kind === 'instrument-family') {
    const motif =
      visual.family === 'Brass'
        ? [392.0, 493.88, 587.33]
        : visual.family === 'Percussion'
          ? [261.63, 261.63, 329.63]
          : [329.63, 392.0, 440.0];
    return playNoteSequence(motif);
  }
  if (visual.kind === 'text') {
    return playNoteSequence([329.63, 392.0, 440.0]);
  }
}
