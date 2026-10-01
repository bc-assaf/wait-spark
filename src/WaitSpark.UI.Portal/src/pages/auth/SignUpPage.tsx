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

export default function SignUpPage() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emailError = submitted && !isValidEmail(email) ? 'Enter a valid email address' : undefined
  const passwordError =
    submitted && password.length < MIN_PASSWORD_LENGTH
      ? `At least ${MIN_PASSWORD_LENGTH} characters`
      : undefined
  const confirmError = submitted && confirm !== password ? 'Passwords do not match' : undefined

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setError(null)
    if (!isValidEmail(email) || password.length < MIN_PASSWORD_LENGTH || confirm !== password) return

    setBusy(true)
    try {
      const result = await signUp(email, password)
      if (result.alreadyRegistered) {
        setError('An account with this email already exists. Try signing in instead.')
      } else if (!result.signedIn) {
        navigate('/otp', { state: { email } })
        return
      }
      // else: confirmation is disabled and the user is signed in; PublicRoute redirects.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    }
    setBusy(false)
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
    <AuthLayout step={{ current: 1, total: 3 }}>
      <Stack component="form" spacing={3} noValidate onSubmit={handleSubmit}>
        <AuthHeading
          title="Welcome!"
          subtitle="Create your account to build your first waiting-room screen."
        />
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError ?? `At least ${MIN_PASSWORD_LENGTH} characters`}
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={!!confirmError}
          helperText={confirmError}
        />
        <Button type="submit" variant="contained" size="large" fullWidth loading={busy}>
          Sign up
        </Button>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link component={RouterLink} to="/signin">
            Sign In
          </Link>
        </Typography>
        <TermsNote />
      </Stack>
    </AuthLayout>
  )
}
