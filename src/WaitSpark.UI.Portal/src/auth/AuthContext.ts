import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export interface SignUpResult {
  /** True when the address is already registered (Supabase hides this behind an empty identities list). */
  alreadyRegistered: boolean
  /** Set when email confirmation is disabled and the user is signed in right away. */
  signedIn: boolean
}

export interface AuthContextValue {
  session: Session | null
  /** True until the stored session has been restored. */
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<SignUpResult>
  signInWithGoogle: () => Promise<void>
  verifyOtp: (email: string, token: string) => Promise<void>
  resendOtp: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
