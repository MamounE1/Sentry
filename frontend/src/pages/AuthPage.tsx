import { useState } from 'react'
import { LogoMark } from '../components/LogoMark'

interface AuthPageProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSignup: (email: string, password: string) => Promise<void>
}

type Mode = 'login' | 'signup'

const inputClasses =
  'mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-navy-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-navy-300'

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = email.trim().length > 0 && password.length >= 8

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setPassword('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    setError(null)
    try {
      if (mode === 'login') {
        await onLogin(email.trim(), password)
      } else {
        await onSignup(email.trim(), password)
      }
      // On success, useAuth flips isAuthenticated and App swaps this page for the dashboard.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <LogoMark className="h-6 w-6 text-navy-800 dark:text-navy-300" />
          <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sentry</span>
        </div>

        <h1 className="mt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {mode === 'login'
            ? 'Enter your details to access your portfolio.'
            : 'Sign up to start saving your stocks.'}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">Password</label>
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={inputClasses}
            />
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-navy-300 dark:text-navy-900 dark:hover:bg-navy-100"
          >
            {isSubmitting
              ? mode === 'login'
                ? 'Signing in…'
                : 'Creating account…'
              : mode === 'login'
                ? 'Sign in'
                : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
            className="font-medium text-navy-800 hover:underline dark:text-navy-300"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
