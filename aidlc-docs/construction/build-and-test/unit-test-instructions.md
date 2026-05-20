# Unit Test Instructions — Water Intake Tracker

## Run All Unit Tests
```bash
npm test
```
Uses Vitest with JSDOM environment.

**Expected Output**: `3 test files passed, 33 tests passed`

## Test Files

| File | Tests | Coverage |
|---|---|---|
| `src/utils/intakeUtils.test.ts` | 17 | `calcPercent`, `validateAmount`, `formatMl` |
| `src/utils/dateUtils.test.ts` | 10 | `getTodayString`, `isNewDay`, `getDaysBetween`, `formatDisplayDate` |
| `src/services/storageService.test.ts` | 6 | `loadState`, `saveState`, error handling |

## Watch Mode (Development)
```bash
npm run test:watch
```

## Coverage Report
```bash
npm run test:coverage
```
Requires `@vitest/coverage-v8` — add if needed: `npm install -D @vitest/coverage-v8`

## Key Test Scenarios Covered

- `validateAmount`: boundary values (1, 5000), negatives, decimals, empty, non-numeric
- `calcPercent`: zero intake, 50%, 100%, over-goal capping, zero goal
- `getDaysBetween`: adjacent days, multi-day gaps, same day
- `loadState`: empty storage, valid data, corrupted JSON, invalid shape
- `saveState`: successful write, storage quota exceeded (no throw)
