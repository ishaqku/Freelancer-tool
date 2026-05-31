import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl max-w-lg mx-auto mt-8">
          <h2 className="text-rose-800 font-semibold text-lg">Something went wrong</h2>
          <p className="text-rose-600 text-sm mt-2">{this.state.error?.message}</p>
          <button 
            className="mt-4 px-4 py-2 bg-rose-600 text-white font-medium rounded hover:bg-rose-700 text-sm"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
