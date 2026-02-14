import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="p-4 w-full max-w-md mx-auto min-h-screen flex flex-col justify-center items-center"
          style={{ backgroundColor: 'var(--bg-color)' }}
        >
          <div
            className="rounded-xl shadow-md p-6 w-full flex flex-col items-center"
            style={{
              backgroundColor: 'var(--secondary-bg-color)',
              border: '1px solid rgba(128,128,128,0.2)',
            }}
          >
            <AlertTriangle size={64} className="mb-6" style={{ color: 'var(--destructive-text-color)' }} />
            <h2 className="text-xl font-medium text-center mb-4" style={{ color: 'var(--text-color)' }}>
              Ошибка приложения
            </h2>
            <p className="text-center mb-4 text-sm" style={{ color: 'var(--hint-color)' }}>
              {String(this.state.error?.message || 'Неизвестная ошибка')}
            </p>
            <button
              className="w-full rounded-xl p-3 flex items-center justify-center"
              style={{
                backgroundColor: 'var(--button-color)',
                color: 'white',
              }}
              onClick={() => window.location.reload()}
            >
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
