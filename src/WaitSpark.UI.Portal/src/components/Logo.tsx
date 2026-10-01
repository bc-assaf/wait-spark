import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import logoMark from '@/assets/auth/logo-mark.svg'

export function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Box component="img" src={logoMark} alt="" sx={{ width: 32, height: 32 }} />
      <Typography variant="h6" component="span">
        Wait Spark
      </Typography>
    </Box>
  )
}
