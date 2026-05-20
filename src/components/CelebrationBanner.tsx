import { useEffect, useState } from 'react';
import { useWaterState } from '../context/WaterContext';

const DISMISS_AFTER_MS = 15_000;

export default function CelebrationBanner() {
  const { today } = useWaterState();
  const isGoalMet = today.intake >= today.goal;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isGoalMet) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), DISMISS_AFTER_MS);
    return () => clearTimeout(timer);
  }, [isGoalMet]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-5 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold text-center shadow-md animate-pulse"
    >
      🎉 Ціль досягнута! Чудова робота сьогодні!
    </div>
  );
}
