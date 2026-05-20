export interface DayRecord {
  date: string;
  intake: number;
  goal: number;
}

export interface AppState {
  goal: number;
  today: DayRecord;
  history: DayRecord[];
}

export type WaterAction =
  | { type: 'ADD_INTAKE'; amount: number }
  | { type: 'SET_GOAL'; goal: number }
  | { type: 'LOAD_STATE'; state: AppState };
