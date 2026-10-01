import type { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/auth/useAuth'
import { Logo } from '@/components/Logo'

interface AppLayoutProps {
  title: string
  children?: ReactNode
}

/** Shell for signed-in pages: top bar with sign out, page title and content. */
export function AppLayout({ title, children }: AppLayoutProps) {
  const { signOut } = useAuth()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo />
          <Button onClick={() => void signOut()}>Sign out</Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  )
}
