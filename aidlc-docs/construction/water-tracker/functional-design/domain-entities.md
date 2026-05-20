# Domain Entities — Water Intake Tracker

## DayRecord
| Field | Type | Constraints | Description |
|---|---|---|---|
| `date` | `string` | YYYY-MM-DD, unique | Calendar day identifier |
| `intake` | `number` | ≥ 0, integer | Total ml consumed that day |
| `goal` | `number` | 1–5000, integer | Goal at time of recording (snapshot) |

## AppState
| Field | Type | Description |
|---|---|---|
| `goal` | `number` | Current daily goal (1–5000 ml) |
| `today` | `DayRecord` | Running record for today |
| `history` | `DayRecord[]` | Past days, max 30 entries, newest first |

## WaterAction (Reducer Actions)
| Action Type | Payload | Description |
|---|---|---|
| `ADD_INTAKE` | `amount: number` | Add ml to today's intake |
| `SET_GOAL` | `goal: number` | Update daily goal; also updates today.goal |
| `LOAD_STATE` | `state: AppState` | Replace full state (used on hydration) |
