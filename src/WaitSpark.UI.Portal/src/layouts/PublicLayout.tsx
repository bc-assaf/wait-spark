import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/auth/useAuth'
import { Logo } from '@/components/Logo'
import { EXTERNAL_LINKS, ROUTES } from '@/utils/routes'

const CURRENT_YEAR = new Date().getFullYear()

/** Shell for pages open to everyone: the top bar adapts to whether the user is signed in. */
export function PublicLayout({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 5 } }}>
          <Logo />
          {/* No button until the session is restored, so the wrong one never flashes. */}
          {!loading &&
            (session ? (
              <Button variant="contained" component={RouterLink} to={ROUTES.dashboard}>
                Home
              </Button>
            ) : (
              <Button variant="contained" component={RouterLink} to={ROUTES.signUp}>
                Start free trial
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 1,
          px: { xs: 2, sm: 5 },
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {CURRENT_YEAR}{' '}
          <Link href={EXTERNAL_LINKS.company} target="_blank" rel="noopener" color="inherit">
            Bolder Code
          </Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre' }}>
          <Link component={RouterLink} to={ROUTES.privacy} color="inherit">
            Privacy Policy
          </Link>
          {'  ·  '}
          <Link component={RouterLink} to={ROUTES.terms} color="inherit">
            Terms of Service
          </Link>
          {'  ·  '}
          <Link href={EXTERNAL_LINKS.help} target="_blank" rel="noopener" color="inherit">
            Help
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
