import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { useAuth } from './useAuth'

interface LocationState {
  from?: { pathname: string; search?: string }
}

/** Layout route for /signin, /signup and /otp: a signed-in user is sent on to where they belong. */
export function PublicRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageSpinner />
  if (session) {
    const from = (location.state as LocationState | null)?.from
    return <Navigate to={from ? `${from.pathname}${from.search ?? ''}` : '/'} replace />
  }
  return <Outlet />
}
