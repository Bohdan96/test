import { useWaterState } from '../context/WaterContext';
import { calcPercent } from '../utils/intakeUtils';

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressDisplay() {
  const { today } = useWaterState();
  const percent = calcPercent(today.intake, today.goal);
  const arcPercent = Math.min(percent, 100);
  const offset = CIRCUMFERENCE - (arcPercent / 100) * CIRCUMFERENCE;
  const isGoalMet = today.intake >= today.goal;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className="w-52 h-52 drop-shadow-sm"
          aria-label={`Прогрес: ${percent}%`}
          role="img"
        >
          <defs>
            <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="pgGradDone" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#1e293b"
            strokeWidth="14"
          />

          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={isGoalMet ? 'url(#pgGradDone)' : 'url(#pgGrad)'}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 0.7s ease-in-out, stroke 0.4s ease' }}
            data-testid="progress-arc"
          />

          {/* Percentage */}
          <text
            x="100"
            y="92"
            textAnchor="middle"
            fontSize="36"
            fontWeight="800"
            fill={isGoalMet ? '#10b981' : '#f1f5f9'}
            style={{ transition: 'fill 0.4s ease' }}
          >
            {percent}%
          </text>

          {/* ml / goal */}
          <text
            x="100"
            y="116"
            textAnchor="middle"
            fontSize="13"
            fill="#94a3b8"
          >
            {today.intake} / {today.goal} мл
          </text>
        </svg>
      </div>
    </div>
  );
}
