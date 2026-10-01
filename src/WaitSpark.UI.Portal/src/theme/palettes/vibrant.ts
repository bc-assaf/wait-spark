import type { ThemeOptions } from '@mui/material/styles'

/** Electric violet and hot pink on softly tinted surfaces. */
export const vibrantPalette: ThemeOptions['colorSchemes'] = {
  light: {
    palette: {
      primary: { main: '#6C4DFF', contrastText: '#FFFFFF' },
      secondary: { main: '#FF4D8D', contrastText: '#FFFFFF' },
      info: { main: '#12B5F5', contrastText: '#0B1F2A' },
      success: { main: '#10C98F', contrastText: '#052E22' },
      warning: { main: '#FFB020', contrastText: '#2E2000' },
      error: { main: '#FF4B4B', contrastText: '#FFFFFF' },
      background: { default: '#F7F5FF', paper: '#FFFFFF' },
      text: { primary: '#1B1535', secondary: '#5B5478' },
    },
  },
  dark: {
    palette: {
      primary: { main: '#A594FF', contrastText: '#180F45' },
      secondary: { main: '#FF80AD', contrastText: '#3D0A20' },
      info: { main: '#5CCFFA', contrastText: '#06202B' },
      success: { main: '#4FE3B4', contrastText: '#052E22' },
      warning: { main: '#FFCB5C', contrastText: '#2E2000' },
      error: { main: '#FF8080', contrastText: '#3D0A0A' },
      background: { default: '#0F0B1F', paper: '#1A1533' },
      text: { primary: '#F3F0FF', secondary: '#B5AED6' },
    },
  },
}
