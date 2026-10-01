import { createContext } from 'react'
import type { MeResponse, UserStatus } from '@/types/user'

export interface MeContextValue {
  me: MeResponse | null
  /** The user's status, once loaded. */
  status: UserStatus | null
  loading: boolean
  error: Error | null
  refresh: () => void
}

export const MeContext = createContext<MeContextValue | null>(null)
