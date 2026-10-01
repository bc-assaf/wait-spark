import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme } from '@mui/material/styles'
import { defaultPalette } from './palettes/default'
import { vibrantPalette } from './palettes/vibrant'

const palettes = { default: defaultPalette, vibrant: vibrantPalette }

/** The one-line palette switch: 'default' or 'vibrant'. */
const ACTIVE_PALETTE: keyof typeof palettes = 'vibrant'

/**
 * The single place to change palette, typography and spacing.
 * CSS variables + two color schemes give Light, Dark and Auto (follow system) modes.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: palettes[ACTIVE_PALETTE],
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})
