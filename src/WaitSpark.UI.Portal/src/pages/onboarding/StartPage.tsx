import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LanguageIcon from '@mui/icons-material/Language'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { api } from '@/api'
import { useAuth } from '@/auth/useAuth'
import { useMe } from '@/hooks/useMe'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AuthHeading } from '@/pages/auth/AuthHeading'
import { normalizeWebsiteUrl } from '@/utils/format'
import { ROUTES } from '@/utils/routes'
import { SkeletonPreview } from './SkeletonPreview'

export default function StartPage() {
  const { me, refresh } = useMe()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [website, setWebsite] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const websiteError =
    submitted && normalizeWebsiteUrl(website) === null ? 'Enter a valid website address' : undefined

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setError(null)
    const url = normalizeWebsiteUrl(website)
    if (url === null) return

    const tenant = me?.user.tenants?.[0]
    if (!tenant) {
      setError('We could not find your business. Please sign out and sign in again.')
      return
    }

    setBusy(true)
    try {
      await api.startWebsiteJob(tenant.publicId, url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setBusy(false)
      return
    }
    // The job moved the user to Onboarding: reload the account so the route guard lets them through.
    refresh()
    navigate(ROUTES.onboardingProgress)
  }

  return (
    <AuthLayout
      step={{ current: 2, total: 3 }}
      signedInAs={me?.user.email}
      onSignOut={() => void signOut()}
      preview={<SkeletonPreview />}
    >
      <Stack component="form" spacing="24px" noValidate onSubmit={handleSubmit}>
        <AuthHeading
          title="Your Business Profile"
          subtitle="Add your website and we’ll automatically build a personalized waiting-room screen — a branded playlist and a trivia game made for your customers."
        />
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Website address"
          id="website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="www.example.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          disabled={busy}
          error={!!websiteError}
          helperText={websiteError ?? 'We’ll scan your site to discover your services, brand, images and key information.'}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            },
          }}
          fullWidth
        />
        {/* TODO: "I don't have a website" flow is not built yet. */}
        <Button disabled sx={{ alignSelf: 'flex-start' }}>
          I don’t have a website →
        </Button>
        <Button type="submit" variant="contained" size="large" fullWidth loading={busy} startIcon={<AutoAwesomeIcon />}>
          Build my screen
        </Button>
        <Typography variant="body2" color="text.secondary">
          Takes about a minute. You can edit everything afterwards.
        </Typography>
      </Stack>
    </AuthLayout>
  )
}
