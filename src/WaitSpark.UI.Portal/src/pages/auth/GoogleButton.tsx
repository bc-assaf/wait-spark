import Button from '@mui/material/Button'
import googleIcon from '@/assets/auth/google.svg'

interface GoogleButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function GoogleButton({ onClick, disabled }: GoogleButtonProps) {
  return (
    <Button
      variant="outlined"
      size="medium"
      fullWidth
      disabled={disabled}
      onClick={onClick}
      sx={(theme) => ({
        // Google branding: fixed light/dark button colors, independent of the app palette
        height: 40,
        maxWidth: 400,
        borderRadius: '20px',
        backgroundColor: '#FFFFFF',
        color: '#1F1F1F',
        borderColor: '#747775',
        '&:hover': { backgroundColor: '#F2F2F2', borderColor: '#747775' },
        ...theme.applyStyles('dark', {
          backgroundColor: '#131314',
          color: '#E3E3E3',
          borderColor: '#8E918F',
          '&:hover': { backgroundColor: '#1E1E1F', borderColor: '#8E918F' },
        }),
      })}
      startIcon={<img src={googleIcon} alt="" width={22} height={22} />}
    >
      Continue with Google
    </Button>
  )
}
