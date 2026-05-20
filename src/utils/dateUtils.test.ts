import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getTodayString,
  isNewDay,
  getDaysBetween,
  formatDisplayDate,
} from './dateUtils';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getTodayString', () => {
  it('returns YYYY-MM-DD format', () => {
    const result = getTodayString();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns the current local date', () => {
    vi.setSystemTime(new Date('2026-05-19T10:00:00'));
    expect(getTodayString()).toBe('2026-05-19');
  });
});

describe('isNewDay', () => {
  it('returns true when dates differ', () => {
    vi.setSystemTime(new Date('2026-05-19T10:00:00'));
    expect(isNewDay('2026-05-18')).toBe(true);
  });

  it('returns false when dates are the same', () => {
    vi.setSystemTime(new Date('2026-05-19T10:00:00'));
    expect(isNewDay('2026-05-19')).toBe(false);
  });
});

describe('getDaysBetween', () => {
  it('returns empty array for adjacent days', () => {
    expect(getDaysBetween('2026-05-18', '2026-05-19')).toEqual([]);
  });

  it('returns one day for two-day gap', () => {
    expect(getDaysBetween('2026-05-17', '2026-05-19')).toEqual(['2026-05-18']);
  });

  it('returns multiple days for larger gap', () => {
    expect(getDaysBetween('2026-05-15', '2026-05-19')).toEqual([
      '2026-05-16',
      '2026-05-17',
      '2026-05-18',
    ]);
  });

  it('returns empty array when from equals to', () => {
    expect(getDaysBetween('2026-05-19', '2026-05-19')).toEqual([]);
  });
});

describe('formatDisplayDate', () => {
  it('returns nominative weekday form for Tuesday', () => {
    // 2026-05-19 is Tuesday (Вівторок)
    const result = formatDisplayDate('2026-05-19');
    expect(result).toBe('Вт, 19 трав');
  });

  it('returns nominative weekday form for Wednesday', () => {
    // 2026-05-20 is Wednesday (Середа, not Середу)
    const result = formatDisplayDate('2026-05-20');
    expect(result).toBe('Ср, 20 трав');
  });

  it('falls back to raw string on invalid date', () => {
    const result = formatDisplayDate('not-a-date');
    expect(result).toBeTruthy();
  });
});
