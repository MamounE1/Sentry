import { API_BASE } from '../lib/config'

export interface AuthResult {
  token: string
  email: string
}

async function postAuth(path: 'signup' | 'login', email: string, password: string): Promise<AuthResult> {
  const res = await fetch(`${API_BASE}/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    let message = 'Something went wrong. Please try again.'
    if (res.status === 409) message = 'That email is already registered.'
    else if (res.status === 401) message = 'Invalid email or password.'
    else if (res.status === 400) message = 'Enter a valid email and a password of at least 8 characters.'
    throw new Error(message)
  }

  return res.json()
}

export function signupRequest(email: string, password: string) {
  return postAuth('signup', email, password)
}

export function loginRequest(email: string, password: string) {
  return postAuth('login', email, password)
}
