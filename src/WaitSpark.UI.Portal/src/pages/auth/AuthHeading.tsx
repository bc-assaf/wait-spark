import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface AuthHeadingProps {
  title: string
  subtitle?: string
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <Stack spacing="12px">
      <Typography variant="h3" component="h1" sx={{ fontSize: { xs: '2.25rem', sm: '3rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  )
}
