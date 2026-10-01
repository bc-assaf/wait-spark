import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '@/api'
import type { MeResponse, UserStatus } from '@/types/user'
import { MeContext, type MeContextValue } from './MeContext'

/** Loads `POST /api/v1/me/account` once for the signed-in user and shares it with the route guards. */
export function MeProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<MeResponse | null>(null)
  const [status, setStatus] = useState<UserStatus | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    api
      .getAccount()
      .then((result) => {
        if (cancelled) return
        if (result.user.status === 'None') throw new Error('Account has no status')
        setMe(result)
        setStatus(result.user.status)
        setError(null)
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)))
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  const refresh = useCallback(() => {
    setMe(null)
    setStatus(null)
    setError(null)
    setAttempt((n) => n + 1)
  }, [])

  const value = useMemo<MeContextValue>(
    () => ({ me, status, loading: me === null && error === null, error, refresh }),
    [me, status, error, refresh],
  )

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>
}
