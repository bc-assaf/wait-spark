import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Logo } from '@/components/Logo'
import { EXTERNAL_LINKS, ROUTES } from '@/utils/routes'
import { DisplayPreview } from './DisplayPreview'

const CURRENT_YEAR = new Date().getFullYear()

interface AuthLayoutProps {
  /** Shows "Step n of total" and the progress bars in the top bar. */
  step?: { current: number; total: number }
  /** Email shown in the footer's "Signed in as" slot, with a link back to sign up. */
  signedInAs?: string
  /** Called by the footer's "Sign out" link; without it the link goes back to sign up. */
  onSignOut?: () => void
  /** Right-hand panel; defaults to the sample display. */
  preview?: ReactNode
  children: ReactNode
}

function Stepper({ current, total }: { current: number; total: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 13 }}>
        Step {current} of {total}
      </Typography>
      <Box sx={{ display: 'flex', gap: '6px' }} role="presentation">
        {Array.from({ length: total }, (_, i) => (
          <Box
            key={i}
            sx={{
              width: 28,
              height: 4,
              borderRadius: '2px',
              bgcolor: i < current ? 'primary.main' : 'action.disabledBackground',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

/** Two-column shell for the public auth pages: form on the left, product preview on the right. */
export function AuthLayout({ step, signedInAs, onSignOut, preview, children }: AuthLayoutProps) {
  const companyLink = (
    <Link href={EXTERNAL_LINKS.company} target="_blank" rel="noopener" color="inherit">
      Bolder Code
    </Link>
  )
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '752fr 688fr' },
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', p: { xs: 2, sm: 5 }, gap: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Logo />
          {step && <Stepper {...step} />}
        </Box>

        <Box sx={{ width: '100%', maxWidth: 520 }}>{children}</Box>

        <Box
          component="footer"
          sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%' }}
        >
          {signedInAs ? (
            <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', gap: '6px' }}>
              <span>Signed in as {signedInAs}</span>
              <span>·</span>
              {onSignOut ? (
                <Link component="button" type="button" onClick={onSignOut} color="text.secondary" sx={{ font: 'inherit' }}>
                  Sign out
                </Link>
              ) : (
                <Link component={RouterLink} to="/signup" color="text.secondary">
                  Sign out
                </Link>
              )}
            </Typography>
          ) : (
            <Typography variant="caption" color="text.disabled">
              © {CURRENT_YEAR} {companyLink}
            </Typography>
          )}
          <Typography variant="caption" color="text.disabled" sx={{ whiteSpace: 'pre' }}>
            {signedInAs && (
              <>
                © {CURRENT_YEAR} {companyLink}
                {'  ·  '}
              </>
            )}
            <Link href={EXTERNAL_LINKS.help} target="_blank" rel="noopener" color="inherit">
              Help
            </Link>
            {'  ·  '}
            <Link component={RouterLink} to={ROUTES.privacy} color="inherit">
              Privacy
            </Link>
          </Typography>
        </Box>
      </Box>
      {preview ?? <DisplayPreview />}
    </Box>
  )
}
