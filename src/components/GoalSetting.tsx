import { useState } from 'react';
import { useWaterState, useWaterDispatch } from '../context/WaterContext';
import { validateAmount } from '../utils/intakeUtils';

export default function GoalSetting() {
  const { goal } = useWaterState();
  const dispatch = useWaterDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const openEdit = () => {
    setValue(String(goal));
    setError('');
    setEditing(true);
  };

  const save = () => {
    const newGoal = validateAmount(value);
    if (newGoal === null) {
      setError('Введіть число від 1 до 5000 мл');
      return;
    }
    dispatch({ type: 'SET_GOAL', goal: newGoal });
    setEditing(false);
    setError('');
  };

  const cancel = () => {
    setEditing(false);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/40 px-4 py-2.5 mb-3">
      {editing ? (
        <div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-500 shrink-0">Ціль:</span>
            <div className="relative flex-1">
              <input
                type="number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                min="1"
                max="5000"
                data-testid="goal-input"
                className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                мл
              </span>
            </div>
            <button
              onClick={save}
              data-testid="goal-save-btn"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 active:scale-95 transition-all text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
            >
              Зберегти
            </button>
            <button
              onClick={cancel}
              data-testid="goal-cancel-btn"
              className="text-slate-500 hover:text-slate-300 transition-colors text-xs px-1"
            >
              ✕
            </button>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-red-400"
              data-testid="goal-error"
            >
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-500">Ціль:</span>
            <span className="text-sm font-bold text-slate-200" data-testid="goal-display">
              {goal}
            </span>
            <span className="text-xs text-slate-500">мл / день</span>
          </div>
          <button
            onClick={openEdit}
            data-testid="goal-edit-btn"
            className="text-slate-500 hover:text-cyan-400 text-xs transition-colors flex items-center gap-1"
          >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor" aria-hidden="true">
              <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z"/>
            </svg>
            Змінити
          </button>
        </div>
      )}
    </div>
  );
}
