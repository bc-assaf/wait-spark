import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { MeProvider } from './MeProvider'
import { useAuth } from './useAuth'

/**
 * Layout route for every page that needs a signed-in user. It runs on direct navigation and refresh too:
 * it waits for the stored session to be restored, and redirects to /signin when there is none.
 */
export function ProtectedRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageSpinner />
  if (!session) return <Navigate to="/signin" replace state={{ from: location }} />

  return (
    <MeProvider key={session.user.id}>
      <Outlet />
    </MeProvider>
  )
}
