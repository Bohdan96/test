import { getTodayString, formatFullDate } from '../utils/dateUtils';

export default function Header() {
  const todayLabel = formatFullDate(getTodayString());

  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-4xl">💧</span>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
          Water Tracker
        </h1>
      </div>
      <p className="text-slate-400 text-sm capitalize">{todayLabel}</p>
    </header>
  );
}
