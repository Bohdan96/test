# Components — Water Intake Tracker

## Component Inventory

| Component | Type | Responsibility |
|---|---|---|
| `App` | Container | Root — wraps providers, renders layout |
| `ErrorBoundary` | Class | Global error catch, shows safe fallback UI |
| `Header` | Presentational | App title + current date display |
| `ProgressDisplay` | Presentational | SVG circular progress + % + ml/goal text |
| `CelebrationBanner` | Presentational | Goal-reached success banner with animation |
| `IntakeLogger` | Interactive | Preset buttons (250ml, 500ml) + custom ml input |
| `GoalSetting` | Interactive | Display + inline edit of daily goal |
| `HistoryView` | Presentational | Past 7/30 days list with mini progress bars |
| `WaterProvider` | Context Provider | Provides global state + dispatch via React Context |

## State Management
- **Pattern**: React Context + useReducer (no external libraries)
- **State location**: `WaterContext.tsx` — single source of truth
- **Persistence**: `storageService.ts` syncs state to localStorage on every change
