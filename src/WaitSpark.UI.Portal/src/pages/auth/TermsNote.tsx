import { Link as RouterLink } from 'react-router'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ROUTES } from '@/utils/routes'

export function TermsNote() {
  return (
    <Typography variant="body2" color="text.secondary">
      By continuing, you agree to the{' '}
      <Link component={RouterLink} to={ROUTES.terms} color="inherit">
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link component={RouterLink} to={ROUTES.privacy} color="inherit">
        Privacy Policy
      </Link>
      .
    </Typography>
  )
}
