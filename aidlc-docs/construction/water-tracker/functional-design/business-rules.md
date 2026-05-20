# Business Rules — Water Intake Tracker

## BR-01: Auto-Reset at Midnight
- On app load, compare `savedState.today.date` with `getTodayString()`
- If different: archive today → fill missed days with 0 intake → start new day with intake=0
- Missed days (gaps > 1 day) are backfilled with `{ intake: 0, goal: savedGoal }`
- History is trimmed to max 30 entries (oldest discarded)

## BR-02: Input Validation
- Any intake amount must be a positive integer, 1–5000 ml inclusive
- Daily goal must be a positive integer, 1–5000 ml inclusive
- Invalid inputs: show user-friendly Ukrainian error message; no technical details exposed

## BR-03: Goal Snapshot in History
- When a day is archived, its `goal` field is snapshotted from the active goal at that time
- Changing the goal today does NOT retroactively update history entries

## BR-04: Progress Calculation
- `percent = min(floor(intake / goal * 100), 100)`
- Progress bar caps at 100%; intake can exceed goal (over-hydration is OK)
- Display shows actual intake even when > goal

## BR-05: History Display
- Default: show last 7 days
- Toggle: show last 30 days
- Each entry shows: date, mini progress bar, `intake / goal мл`, ✅ if goal met

## BR-06: Storage Error Handling
- If localStorage is unavailable or corrupted: silently fall back to default state
- No error is shown to the user for storage failures (app still functions in-session)
- JSON parse errors are caught in try/catch; corrupt data resets to defaults
