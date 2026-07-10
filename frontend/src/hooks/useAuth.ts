import { useCallback, useEffect, useState } from 'react'
import { loginRequest, signupRequest } from '../api/auth'
import { AUTH_LOGOUT_EVENT } from '../api/client'
import { clearAuth, getStoredAuth, setAuth, type StoredAuth } from '../lib/authStorage'

export function useAuth() {
  const [auth, setAuthState] = useState<StoredAuth | null>(getStoredAuth)

  // React to a forced logout triggered by an expired/invalid token (see authorizedFetch).
  useEffect(() => {
    function handleLogout() {
      setAuthState(null)
    }
    window.addEventListener(AUTH_LOGOUT_EVENT, handleLogout)
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleLogout)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email, password)
    setAuth(result.token, result.email)
    setAuthState({ token: result.token, email: result.email })
  }, [])

  const signup = useCallback(async (email: string, password: string) => {
    const result = await signupRequest(email, password)
    setAuth(result.token, result.email)
    setAuthState({ token: result.token, email: result.email })
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setAuthState(null)
  }, [])

  return {
    email: auth?.email ?? null,
    isAuthenticated: auth !== null,
    login,
    signup,
    logout,
  }
}
