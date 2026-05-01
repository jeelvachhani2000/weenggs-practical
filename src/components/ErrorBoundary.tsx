import { Component, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────
interface Props {
  children: ReactNode;
  fallback?: ReactNode; // optional custom fallback UI
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// ─── Class (required by React for error boundaries) ───────────────
class ErrorBoundaryClass extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // In production: send to Sentry/Datadog
    console.warn("ErrorBoundary caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
            <p className="text-5xl mb-4">⚠️</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              {this.state.error?.message}
            </p>
            <button
              onClick={this.handleReset}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Functional Wrapper (use this everywhere in your app) ─────────
const ErrorBoundary = ({ children, fallback }: Props) => {
  return (
    <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>
  );
};

export default ErrorBoundary;
