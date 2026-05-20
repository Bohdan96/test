import { WaterProvider } from './context/WaterContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import CelebrationBanner from './components/CelebrationBanner';
import ProgressDisplay from './components/ProgressDisplay';
import IntakeLogger from './components/IntakeLogger';
import GoalSetting from './components/GoalSetting';
import HistoryView from './components/HistoryView';

export default function App() {
  return (
    <ErrorBoundary>
      <WaterProvider>
        <div className="min-h-screen bg-slate-950">
          <div className="max-w-md mx-auto px-4 py-8">
            <Header />
            <CelebrationBanner />
            <ProgressDisplay />
            <IntakeLogger />
            <GoalSetting />
            <HistoryView />
          </div>
        </div>
      </WaterProvider>
    </ErrorBoundary>
  );
}
