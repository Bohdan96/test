import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadState, saveState } from './storageService';
import type { AppState } from '../types';

const VALID_STATE: AppState = {
  goal: 2000,
  today: { date: '2026-05-19', intake: 500, goal: 2000 },
  history: [],
};

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('loadState', () => {
  it('returns null when localStorage is empty', () => {
    expect(loadState()).toBeNull();
  });

  it('returns parsed state when valid data stored', () => {
    localStorage.setItem('water-tracker-v1', JSON.stringify(VALID_STATE));
    expect(loadState()).toEqual(VALID_STATE);
  });

  it('returns null for corrupted JSON', () => {
    localStorage.setItem('water-tracker-v1', '{invalid json}');
    expect(loadState()).toBeNull();
  });

  it('returns null for invalid shape', () => {
    localStorage.setItem('water-tracker-v1', JSON.stringify({ bad: 'data' }));
    expect(loadState()).toBeNull();
  });
});

describe('saveState', () => {
  it('saves state to localStorage', () => {
    saveState(VALID_STATE);
    const raw = localStorage.getItem('water-tracker-v1');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toEqual(VALID_STATE);
  });

  it('does not throw when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveState(VALID_STATE)).not.toThrow();
  });
});
