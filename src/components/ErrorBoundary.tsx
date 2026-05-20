import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Errors are caught here; no sensitive data is logged to console in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-4">💧</div>
            <h1 className="text-xl font-bold text-slate-100 mb-2">
              Щось пішло не так
            </h1>
            <p className="text-slate-400 mb-6">
              Виникла непередбачена помилка. Спробуйте оновити сторінку.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Оновити сторінку
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
