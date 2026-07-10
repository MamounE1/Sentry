import { clearAuth, getToken } from '../lib/authStorage'

// Event other parts of the app can listen for to react to an expired/invalid session.
export const AUTH_LOGOUT_EVENT = 'auth:logout'

// fetch wrapper that attaches the bearer token and treats an auth failure
// (expired/invalid token) as a forced logout.
export async function authorizedFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = getToken()
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401 || res.status === 403) {
    clearAuth()
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
  }

  return res
}
