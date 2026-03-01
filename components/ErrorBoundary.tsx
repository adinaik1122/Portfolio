import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryProps } from '../types/components';

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * 
 * Features:
 * - Logs error information to console
 * - Displays fallback UI when errors occur
 * - Prevents entire app from crashing
 * - Optional custom fallback component
 * 
 * @param children - Components to wrap with error boundary
 * @param fallback - Optional custom fallback UI
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
          <div className="max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="font-serif text-2xl text-neutral-900 mb-3">Something went wrong</h2>
            <p className="text-neutral-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
