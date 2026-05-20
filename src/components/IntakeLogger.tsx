import { useState } from 'react';
import { useWaterDispatch } from '../context/WaterContext';
import { validateAmount } from '../utils/intakeUtils';

function Drop({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 22" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M8 0C8 0 1 9 1 14a7 7 0 0 0 14 0C15 9 8 0 8 0z" />
    </svg>
  );
}

const PRESETS = [
  { amount: 250, label: 'Склянка', drops: 1, color: 'text-cyan-400',   dropColor: 'fill-cyan-400',   ring: 'focus-visible:ring-cyan-500',   active: 'hover:bg-cyan-500/10 hover:border-cyan-400/50'   },
  { amount: 500, label: 'Пляшка',  drops: 2, color: 'text-blue-400',   dropColor: 'fill-blue-400',   ring: 'focus-visible:ring-blue-500',   active: 'hover:bg-blue-500/10 hover:border-blue-400/50'   },
  { amount: 750, label: 'Велика',  drops: 3, color: 'text-violet-400', dropColor: 'fill-violet-400', ring: 'focus-visible:ring-violet-500', active: 'hover:bg-violet-500/10 hover:border-violet-400/50' },
] as const;

export default function IntakeLogger() {
  const dispatch = useWaterDispatch();
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');

  const handlePreset = (amount: number) => {
    dispatch({ type: 'ADD_INTAKE', amount });
  };

  const handleCustomAdd = () => {
    const amount = validateAmount(custom);
    if (amount === null) {
      setError('Введіть число від 1 до 5000 мл');
      return;
    }
    dispatch({ type: 'ADD_INTAKE', amount });
    setCustom('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCustomAdd();
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-700/50 p-4 mb-3">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Додати воду
      </h2>

      {/* Preset chips */}
      <div className="flex gap-2 mb-3">
        {PRESETS.map((p) => (
          <button
            key={p.amount}
            onClick={() => handlePreset(p.amount)}
            data-testid={`preset-btn-${p.amount}`}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border border-slate-700/60 bg-slate-700/30 ${p.active} active:scale-95 transition-all cursor-pointer focus-visible:outline-none ${p.ring} focus-visible:ring-2`}
          >
            <div className="flex gap-0.5 items-end h-5">
              {Array.from({ length: p.drops }).map((_, i) => (
                <Drop
                  key={i}
                  className={`${p.dropColor} opacity-90`}
                  style={{ width: `${10 + i * 2}px`, height: `${13 + i * 2}px` } as React.CSSProperties}
                />
              ))}
            </div>
            <span className={`text-sm font-bold leading-tight ${p.color}`}>{p.amount}</span>
            <span className="text-[10px] text-slate-500 leading-tight">мл</span>
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Своя кількість"
            min="1"
            max="5000"
            data-testid="custom-amount-input"
            className="w-full bg-slate-700/50 border border-slate-600/70 text-slate-200 placeholder-slate-500 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
            мл
          </span>
        </div>
        <button
          onClick={handleCustomAdd}
          data-testid="custom-amount-add-btn"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-xl text-sm whitespace-nowrap"
        >
          + Додати
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-2 text-xs text-red-400"
          data-testid="intake-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
