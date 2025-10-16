'use client'

import { useEffect } from 'react'
import { captureException } from '@/lib/monitoring'
import { log } from '@/lib/logger'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error for monitoring
    log.error('Global error boundary triggered', error, {
      digest: error.digest,
      stack: error.stack,
    })

    // Send to Sentry
    captureException(error, {
      tags: {
        component: 'GlobalErrorBoundary',
        digest: error.digest,
      },
    })
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-brand-primary rounded-2xl mx-auto flex items-center justify-center">
            <div className="text-white font-bold text-xl">VL</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-neutral-400 leading-relaxed">
            We apologize for the inconvenience. Our team has been notified and is working to resolve this issue.
          </p>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-neutral-800 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-400 mb-2">
              Error Details (Development)
            </h3>
            <div className="text-xs text-neutral-300 font-mono overflow-x-auto">
              <div className="mb-2">
                <strong>Message:</strong> {error.message}
              </div>
              {error.digest && (
                <div className="mb-2">
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-neutral-400">
                    Stack Trace
                  </summary>
                  <pre className="mt-2 text-xs overflow-x-auto whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-brand-primary hover:bg-brand-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            Try again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors"
          >
            Go to homepage
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-sm text-neutral-500">
            Need help?{' '}
            <a 
              href="/contact" 
              className="text-brand-primary hover:text-brand-primary-400 transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>

        {/* Error ID for support */}
        {error.digest && (
          <div className="mt-4">
            <p className="text-xs text-neutral-600">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
