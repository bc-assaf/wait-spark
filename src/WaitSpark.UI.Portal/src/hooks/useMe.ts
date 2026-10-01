import { useContext } from 'react'
import { MeContext, type MeContextValue } from '@/auth/MeContext'

export function useMe(): MeContextValue {
  const value = useContext(MeContext)
  if (!value) throw new Error('useMe must be used inside <MeProvider>')
  return value
}
