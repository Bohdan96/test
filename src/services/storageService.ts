import type { AppState } from '../types';

const STORAGE_KEY = 'water-tracker-v1';

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isValidAppState(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded or unavailable — app continues in-session without persistence
  }
}

function isValidAppState(value: unknown): value is AppState {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.goal === 'number' &&
    isDayRecord(v.today) &&
    Array.isArray(v.history)
  );
}

function isDayRecord(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.date === 'string' &&
    typeof v.intake === 'number' &&
    typeof v.goal === 'number'
  );
}
