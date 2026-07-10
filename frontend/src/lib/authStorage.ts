const TOKEN_KEY = 'sentry-token'
const EMAIL_KEY = 'sentry-email'

export interface StoredAuth {
  token: string
  email: string
}

export function getStoredAuth(): StoredAuth | null {
  const token = localStorage.getItem(TOKEN_KEY)
  const email = localStorage.getItem(EMAIL_KEY)
  return token && email ? { token, email } : null
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAuth(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(EMAIL_KEY, email)
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EMAIL_KEY)
}
