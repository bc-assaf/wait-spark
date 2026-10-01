import type { ReactNode } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { useMe } from '@/hooks/useMe'

/** Renders children once `POST /api/v1/me/account` has loaded; shows a spinner meanwhile and a retry on failure. */
export function MeGate({ children }: { children: ReactNode }) {
  const { status, loading, error, refresh } = useMe()

  if (loading) return <FullPageSpinner />
  if (error || !status) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refresh}>
              Retry
            </Button>
          }
        >
          We couldn't load your account. Please try again.
        </Alert>
      </Box>
    )
  }
  return children
}
