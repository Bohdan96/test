import { describe, it, expect } from 'vitest';
import { calcPercent, validateAmount, formatMl } from './intakeUtils';

describe('calcPercent', () => {
  it('returns 0 when intake is 0', () => {
    expect(calcPercent(0, 2000)).toBe(0);
  });

  it('returns 50 for half goal', () => {
    expect(calcPercent(1000, 2000)).toBe(50);
  });

  it('returns 100 when goal is exactly met', () => {
    expect(calcPercent(2000, 2000)).toBe(100);
  });

  it('returns over 100 when intake exceeds goal', () => {
    expect(calcPercent(3000, 2000)).toBe(150);
  });

  it('returns 125 for 2500ml with 2000ml goal', () => {
    expect(calcPercent(2500, 2000)).toBe(125);
  });

  it('returns 0 for zero goal', () => {
    expect(calcPercent(500, 0)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calcPercent(1, 3)).toBe(33);
  });
});

describe('validateAmount', () => {
  it('accepts valid amount 250', () => {
    expect(validateAmount('250')).toBe(250);
  });

  it('accepts boundary minimum 1', () => {
    expect(validateAmount('1')).toBe(1);
  });

  it('accepts boundary maximum 5000', () => {
    expect(validateAmount('5000')).toBe(5000);
  });

  it('rejects 0', () => {
    expect(validateAmount('0')).toBeNull();
  });

  it('rejects negative values', () => {
    expect(validateAmount('-10')).toBeNull();
  });

  it('rejects value above 5000', () => {
    expect(validateAmount('5001')).toBeNull();
  });

  it('rejects empty string', () => {
    expect(validateAmount('')).toBeNull();
  });

  it('rejects non-numeric input', () => {
    expect(validateAmount('abc')).toBeNull();
  });

  it('rejects decimal input', () => {
    expect(validateAmount('1.5')).toBeNull();
  });

  it('rejects whitespace-only', () => {
    expect(validateAmount('   ')).toBeNull();
  });
});

describe('formatMl', () => {
  it('appends мл suffix', () => {
    expect(formatMl(250)).toBe('250 мл');
  });
});
