import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { supabase } from './supabase'

function throwIfError(error: Error | null): void {
  if (error) throw error
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // The listener also fires INITIAL_SESSION once the stored session is restored (and refreshed if expired).
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      signIn: async (email, password) => {
        throwIfError((await supabase.auth.signInWithPassword({ email, password })).error)
      },
      signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password })
        throwIfError(error)
        return {
          alreadyRegistered: data.user?.identities?.length === 0,
          signedIn: data.session !== null,
        }
      },
      signInWithGoogle: async () => {
        throwIfError(
          (
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: { redirectTo: `${window.location.origin}/` },
            })
          ).error,
        )
      },
      verifyOtp: async (email, token) => {
        throwIfError((await supabase.auth.verifyOtp({ email, token, type: 'signup' })).error)
      },
      resendOtp: async (email) => {
        throwIfError((await supabase.auth.resend({ type: 'signup', email })).error)
      },
      signOut: async () => {
        throwIfError((await supabase.auth.signOut()).error)
      },
    }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
