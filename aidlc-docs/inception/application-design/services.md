# Services — Water Intake Tracker

## storageService.ts
- `loadState(): AppState | null` — reads and parses localStorage; returns null on missing/corrupt data
- `saveState(state: AppState): void` — serialises and writes to localStorage; silently swallows write errors

## dateUtils.ts
- `getTodayString(): string` — returns YYYY-MM-DD for today (local time)
- `isNewDay(savedDate: string): boolean` — true if savedDate !== today
- `getDaysBetween(from: string, to: string): string[]` — list of dates (exclusive start, exclusive end) for backfilling missed days
- `formatDisplayDate(dateStr: string): string` — human-readable date (uk-UA locale)

## intakeUtils.ts
- `calcPercent(intake: number, goal: number): number` — integer 0–100 (capped)
- `validateAmount(value: string): number | null` — validates positive integer 1–5000; null on invalid
