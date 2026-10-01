import { useState, type FormEvent } from 'react'
import { Link as RouterLink, Navigate, useLocation } from 'react-router'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/auth/useAuth'
import { OtpInput } from '@/components/OtpInput'
import { useCountdown } from '@/hooks/useCountdown'
import { AuthLayout } from '@/layouts/AuthLayout'
import { formatCountdown } from '@/utils/format'

/** Primary color at the given opacity percentage, following the active color scheme. */
const tint = (percent: number) =>
  `color-mix(in srgb, var(--mui-palette-primary-main) ${percent}%, transparent)`

const CODE_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 60

export default function OtpPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email
  // Without an email (e.g. a refresh dropped the router state) there is nothing to verify.
  if (!email) return <Navigate to="/signup" replace />
  return <OtpForm email={email} />
}

function OtpForm({ email }: { email: string }) {
  const { verifyOtp, resendOtp } = useAuth()
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resent, setResent] = useState(false)
  const { remaining, restart } = useCountdown(RESEND_COOLDOWN_SECONDS)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (code.length !== CODE_LENGTH) return
    setBusy(true)
    setError(null)
    try {
      await verifyOtp(email, code)
      // PublicRoute redirects once the session is set.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
      setCode('')
      setBusy(false)
    }
  }

  async function handleResend() {
    setError(null)
    setResent(false)
    try {
      await resendOtp(email)
      setResent(true)
      restart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not resend the code')
    }
  }

  return (
    <AuthLayout step={{ current: 1, total: 3 }} signedInAs={email}>
      <Stack component="form" spacing="28px" noValidate onSubmit={handleSubmit}>
        <Link
          component={RouterLink}
          to="/signup"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, typography: 'body2' }}
        >
          <Box component="span" sx={{ fontSize: 18, fontWeight: 400 }}>
            ←
          </Box>
          Back
        </Link>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '16px',
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: tint(12),
          }}
        >
          <EmailOutlined fontSize="large" />
        </Box>
        <Stack spacing="12px">
          <Typography variant="h3" component="h1" sx={{ fontSize: { xs: '2.25rem', sm: '3rem' } }}>
            Check your email
          </Typography>
          <Typography color="text.secondary">
            We sent a 6-digit code to{' '}
            <Box component="strong" sx={{ color: 'text.primary' }}>
              {email}
            </Box>
            . Enter it below to verify your account.
          </Typography>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        {resent && <Alert severity="success">We sent you a new code.</Alert>}
        <OtpInput value={code} onChange={setCode} length={CODE_LENGTH} disabled={busy} autoFocus />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          loading={busy}
          disabled={code.length !== CODE_LENGTH}
        >
          Verify Email
        </Button>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Didn’t get it? Check spam, or{' '}
            {remaining > 0 ? (
              <Box component="span" sx={{ color: 'text.disabled' }}>
                resend code in {formatCountdown(remaining)}
              </Box>
            ) : (
              <Link component="button" type="button" onClick={handleResend} sx={{ verticalAlign: 'baseline' }}>
                resend code
              </Link>
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wrong email?{' '}
            <Link component={RouterLink} to="/signup">
              Change it
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </AuthLayout>
  )
}
