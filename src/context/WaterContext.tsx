import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from 'react';
import type { AppState, WaterAction, DayRecord } from '../types';
import { loadState, saveState } from '../services/storageService';
import { getTodayString, isNewDay, getDaysBetween } from '../utils/dateUtils';

const DEFAULT_GOAL = 2000;
const MAX_HISTORY = 30;

function buildInitialState(): AppState {
  const today = getTodayString();
  const saved = loadState();

  if (!saved) {
    return {
      goal: DEFAULT_GOAL,
      today: { date: today, intake: 0, goal: DEFAULT_GOAL },
      history: [],
    };
  }

  if (isNewDay(saved.today.date)) {
    const missedDates = getDaysBetween(saved.today.date, today);
    const missedDays: DayRecord[] = missedDates.map((date) => ({
      date,
      intake: 0,
      goal: saved.goal,
    }));
    const newHistory = [saved.today, ...missedDays, ...saved.history].slice(
      0,
      MAX_HISTORY,
    );
    return {
      goal: saved.goal,
      today: { date: today, intake: 0, goal: saved.goal },
      history: newHistory,
    };
  }

  return saved;
}

function reducer(state: AppState, action: WaterAction): AppState {
  switch (action.type) {
    case 'ADD_INTAKE':
      return {
        ...state,
        today: { ...state.today, intake: state.today.intake + action.amount },
      };
    case 'SET_GOAL':
      return {
        ...state,
        goal: action.goal,
        today: { ...state.today, goal: action.goal },
      };
    case 'LOAD_STATE':
      return action.state;
  }
}

const WaterStateCtx = createContext<AppState | null>(null);
const WaterDispatchCtx = createContext<Dispatch<WaterAction> | null>(null);

export function WaterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <WaterStateCtx value={state}>
      <WaterDispatchCtx value={dispatch}>{children}</WaterDispatchCtx>
    </WaterStateCtx>
  );
}

export function useWaterState(): AppState {
  const ctx = useContext(WaterStateCtx);
  if (!ctx) throw new Error('useWaterState must be used within WaterProvider');
  return ctx;
}

export function useWaterDispatch(): Dispatch<WaterAction> {
  const ctx = useContext(WaterDispatchCtx);
  if (!ctx)
    throw new Error('useWaterDispatch must be used within WaterProvider');
  return ctx;
}
