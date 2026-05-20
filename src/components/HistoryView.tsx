import { useState } from 'react';
import { useWaterState } from '../context/WaterContext';
import { calcPercent } from '../utils/intakeUtils';
import { formatDisplayDate } from '../utils/dateUtils';

const SHORT_LIMIT = 7;
const LONG_LIMIT = 30;

export default function HistoryView() {
  const { history } = useWaterState();
  const [showAll, setShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const displayed = showAll
    ? history.slice(0, LONG_LIMIT)
    : history.slice(0, SHORT_LIMIT);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/40 mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        data-testid="history-collapse-btn"
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-700/20 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Історія
        </span>
        <span
          className="text-slate-600 text-[10px] transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          ▼
        </span>
      </button>

      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '9999px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-4 pb-3">
          {displayed.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-3">
              Ще немає записів. Починай пити воду! 💧
            </p>
          ) : (
            <ul className="space-y-2">
              {displayed.map((day) => {
                const pct = calcPercent(day.intake, day.goal);
                const goalMet = day.intake >= day.goal;
                return (
                  <li
                    key={day.date}
                    data-testid={`history-day-${day.date}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[11px] text-slate-400 capitalize w-16 shrink-0">
                      {formatDisplayDate(day.date)}
                    </span>
                    <div className="flex-1 bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          goalMet
                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                            : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 w-16 text-right shrink-0">
                      {day.intake} мл{goalMet && ' ✅'}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {history.length > SHORT_LIMIT && (
            <button
              onClick={() => setShowAll((v) => !v)}
              data-testid="history-toggle-btn"
              className="mt-3 w-full text-center text-[11px] text-slate-500 hover:text-cyan-400 font-medium transition-colors"
            >
              {showAll
                ? '▲ Менше'
                : `▼ Ще ${Math.min(history.length, LONG_LIMIT) - SHORT_LIMIT} днів`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
