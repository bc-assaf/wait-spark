import { Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from '@/auth/AuthProvider'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { PublicRoute } from '@/auth/PublicRoute'
import { RequireStatus } from '@/auth/RequireStatus'
import { StartupRedirect } from '@/auth/StartupRedirect'
import OtpPage from '@/pages/auth/OtpPage'
import SignInPage from '@/pages/auth/SignInPage'
import SignUpPage from '@/pages/auth/SignUpPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
import TermsPage from '@/pages/legal/TermsPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import CompletedPage from '@/pages/onboarding/CompletedPage'
import ProgressPage from '@/pages/onboarding/ProgressPage'
import StartPage from '@/pages/onboarding/StartPage'
import { ROUTES } from '@/utils/routes'

/** Routes only; the caller provides the router and theme (see main.tsx). */
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Route>

        {/* Legal pages are open to everyone, signed in or not. */}
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.privacy} element={<PrivacyPage />} />

        {/* Everything else requires a signed-in user, including pages added later and unknown URLs. */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<StartupRedirect />} />
          <Route
            path="/onboarding/start"
            element={
              <RequireStatus allow={['New']}>
                <StartPage />
              </RequireStatus>
            }
          />
          <Route
            path="/onboarding/progress"
            element={
              <RequireStatus allow={['Onboarding']}>
                <ProgressPage />
              </RequireStatus>
            }
          />
          <Route
            path="/onboarding/completed"
            element={
              <RequireStatus allow={['Onboarding', 'Active']}>
                <CompletedPage />
              </RequireStatus>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireStatus allow={['Active']}>
                <DashboardPage />
              </RequireStatus>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
