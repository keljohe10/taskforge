import { createTheme } from '@mui/material/styles'
import { T } from './tokens'

// Theme de MUI construido a partir de los design tokens de taskForge-ui.
// Mantiene el look del prototipo (CSS puro) pero expresado vía MUI, para que
// todos los componentes (Button, Chip, Drawer, etc.) hereden la misma identidad.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: T.primary,
      dark: T.primaryHover,
      light: T.primarySoft,
      contrastText: '#FFFFFF',
    },
    success: { main: T.success, light: T.successSoft, contrastText: '#FFFFFF' },
    warning: { main: T.warning, light: T.warningSoft, contrastText: '#FFFFFF' },
    error: { main: T.danger, light: T.dangerSoft, contrastText: '#FFFFFF' },
    grey: {
      50: T.n50,
      100: T.n100,
      200: T.n200,
      300: T.n300,
      400: T.n400,
      500: T.n500,
      600: T.n600,
      700: T.n700,
      800: T.n800,
      900: T.n900,
    },
    background: { default: T.n0, paper: T.n0 },
    text: { primary: T.n900, secondary: T.n500 },
    divider: T.n200,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: T.fontUi,
    button: { textTransform: 'none', fontWeight: 500 },
    h1: { fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h2: { fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25 },
    h3: { fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.35 },
    body1: { fontSize: 14, lineHeight: 1.5 },
    body2: { fontSize: 13, lineHeight: 1.5 },
    caption: { fontSize: 12, lineHeight: 1.5 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFeatureSettings: '"cv11", "ss01", "ss03"',
          WebkitFontSmoothing: 'antialiased',
          letterSpacing: '-0.005em',
          backgroundColor: T.n0,
        },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-thumb': {
          background: T.n200,
          borderRadius: T.rFull,
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, whiteSpace: 'nowrap' },
        sizeSmall: { height: 32, paddingLeft: 12, paddingRight: 12 },
        sizeMedium: { height: 36 },
        containedPrimary: { boxShadow: T.sh1 },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 13,
          border: `1px solid ${T.n200}`,
          color: T.n500,
          gap: 6,
          '&.Mui-selected': {
            backgroundColor: T.n0,
            color: T.n900,
            boxShadow: T.sh1,
          },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: 14,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: T.n200 },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: T.n300 },
          '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(79,70,229,0.12)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: T.primary,
            borderWidth: 1,
          },
        },
        input: { padding: '12px 14px' },
        multiline: { padding: 0 },
      },
    },
    MuiRadio: {
      defaultProps: { color: 'primary', size: 'small' },
      styleOverrides: { root: { color: T.n300, '&.Mui-checked': { color: T.primary } } },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: T.rFull, fontSize: 13, fontWeight: 500 },
        outlined: { borderColor: T.n200, color: T.n700 },
      },
    },
    MuiMenuItem: { styleOverrides: { root: { fontSize: 14 } } },
  },
})
