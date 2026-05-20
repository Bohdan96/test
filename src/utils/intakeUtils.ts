const MIN_AMOUNT = 1;
const MAX_AMOUNT = 5000;

export function calcPercent(intake: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.round((intake / goal) * 100);
}

export function validateAmount(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const num = parseInt(trimmed, 10);
  if (!Number.isInteger(num)) return null;
  if (num < MIN_AMOUNT || num > MAX_AMOUNT) return null;
  if (String(num) !== trimmed) return null;
  return num;
}

export function formatMl(ml: number): string {
  return `${ml} мл`;
}
