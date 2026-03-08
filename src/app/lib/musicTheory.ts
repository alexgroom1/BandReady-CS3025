import type { StaffPosition } from '../types';

export const STAFF_LINES = [88, 116, 144, 172, 200] as const;

export const STAFF_POSITION_DATA: Record<
  StaffPosition,
  { y: number; note: string; label: string }
> = {
  line5: { y: 88, note: 'F', label: 'Line 5' },
  line4: { y: 116, note: 'D', label: 'Line 4' },
  line3: { y: 144, note: 'B', label: 'Line 3' },
  line2: { y: 172, note: 'G', label: 'Line 2' },
  line1: { y: 200, note: 'E', label: 'Line 1' },
  space4: { y: 102, note: 'E', label: 'Space 4' },
  space3: { y: 130, note: 'C', label: 'Space 3' },
  space2: { y: 158, note: 'A', label: 'Space 2' },
  space1: { y: 186, note: 'F', label: 'Space 1' },
};

export const RHYTHM_PATTERNS = {
  quarter_pair: {
    id: 'quarter_pair',
    title: 'Two quarter notes',
    symbols: ['quarter', 'quarter'],
    description: 'Two steady beats, one sound per beat.',
  },
  eighth_pair: {
    id: 'eighth_pair',
    title: 'Two eighth notes',
    symbols: ['eighth-pair'],
    description: 'Two faster sounds inside one beat.',
  },
  quarter_rest_quarter: {
    id: 'quarter_rest_quarter',
    title: 'Quarter note, rest, quarter note',
    symbols: ['quarter', 'rest', 'quarter'],
    description: 'Play, stay silent for one beat, then play again.',
  },
  mixed_pulse: {
    id: 'mixed_pulse',
    title: 'Quarter note plus eighth notes',
    symbols: ['quarter', 'eighth-pair', 'quarter'],
    description: 'Slow-fast-fast-slow across three beats.',
  },
} as const;

export const NOTE_FREQUENCIES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
};

export function getTrebleNoteForPosition(position: StaffPosition) {
  return STAFF_POSITION_DATA[position].note;
}

export function getStaffY(position: StaffPosition) {
  return STAFF_POSITION_DATA[position].y;
}

export function getStaffLabel(position: StaffPosition) {
  return STAFF_POSITION_DATA[position].label;
}

export function getStaffNoteFrequency(position: StaffPosition) {
  const note = `${getTrebleNoteForPosition(position)}4`;
  return NOTE_FREQUENCIES[note] ?? NOTE_FREQUENCIES.C4;
}
