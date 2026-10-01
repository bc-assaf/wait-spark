import { useState, type FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/auth/useAuth'
import { PasswordField } from '@/components/PasswordField'
import { AuthLayout } from '@/layouts/AuthLayout'
import { isValidEmail, MIN_PASSWORD_LENGTH } from '@/utils/format'
import { AuthHeading } from './AuthHeading'
import { GoogleButton } from './GoogleButton'
import { OrDivider } from './OrDivider'
import { TermsNote } from './TermsNote'

export default function SignInPage() {
  const { signIn, signInWithGoogle, resendOtp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emailError = submitted && !isValidEmail(email) ? 'Enter a valid email address' : undefined
  const passwordError =
    submitted && password.length < MIN_PASSWORD_LENGTH
      ? `At least ${MIN_PASSWORD_LENGTH} characters`
      : undefined

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setError(null)
    if (!isValidEmail(email) || password.length < MIN_PASSWORD_LENGTH) return

    setBusy(true)
    try {
      await signIn(email, password)
      // PublicRoute redirects once the session is set.
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 'email_not_confirmed') {
        // Signed up but never verified: send a fresh code and continue on the OTP page.
        try {
          await resendOtp(email)
        } catch {
          // The OTP page offers a resend button if this failed.
        }
        navigate('/otp', { state: { email } })
        return
      }
      setError(err instanceof Error ? err.message : 'Sign in failed')
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign in failed')
    }
  }

  return (
    <AuthLayout>
      <Stack component="form" spacing={3} noValidate onSubmit={handleSubmit}>
        <AuthHeading title="Welcome!" subtitle="Sign in to manage your waiting-room screen." />
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleButton onClick={handleGoogle} disabled={busy} />
        </Box>
        <OrDivider />
        <TextField
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
        />
        <PasswordField
          label="Password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError ?? `At least ${MIN_PASSWORD_LENGTH} characters`}
        />
        <Button type="submit" variant="contained" size="large" fullWidth loading={busy}>
          Sign In
        </Button>
        <Typography variant="body2" color="text.secondary">
          New to Wait Spark?{' '}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
        <TermsNote />
      </Stack>
    </AuthLayout>
  )
}
