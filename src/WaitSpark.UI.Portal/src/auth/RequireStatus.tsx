import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useMe } from '@/hooks/useMe'
import type { UserStatus } from '@/types/user'
import { STATUS_HOME } from '@/utils/routes'
import { MeGate } from './MeGate'

interface RequireStatusProps {
  allow: UserStatus[]
  children: ReactNode
}

/** Keeps a user on the pages that match their status, e.g. an Active user cannot open /onboarding/start. */
export function RequireStatus({ allow, children }: RequireStatusProps) {
  return (
    <MeGate>
      <StatusCheck allow={allow}>{children}</StatusCheck>
    </MeGate>
  )
}

function StatusCheck({ allow, children }: RequireStatusProps) {
  const { status } = useMe()
  if (!status) return null
  return allow.includes(status) ? children : <Navigate to={STATUS_HOME[status]} replace />
}
