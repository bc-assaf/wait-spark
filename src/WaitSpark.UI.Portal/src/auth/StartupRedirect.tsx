import { Navigate } from 'react-router'
import { useMe } from '@/hooks/useMe'
import { STATUS_HOME } from '@/utils/routes'
import { MeGate } from './MeGate'

/** `/`: sends the signed-in user to the page for their status (New, Onboarding, Active). */
export function StartupRedirect() {
  return (
    <MeGate>
      <Redirect />
    </MeGate>
  )
}

function Redirect() {
  const { status } = useMe()
  return status ? <Navigate to={STATUS_HOME[status]} replace /> : null
}
