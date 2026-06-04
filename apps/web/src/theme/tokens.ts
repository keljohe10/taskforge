// Design tokens portados del prototipo taskForge-ui.
// Fuente única de verdad para colores, radios, sombras y fuentes.
// El theme de MUI (theme.ts) se construye a partir de estos valores.

export const TF_TOKENS = {
  primary: '#4F46E5',
  primaryHover: '#4338CA',
  primarySoft: '#EEF2FF',
  ai: '#8B5CF6',
  aiHover: '#7C3AED',
  aiSoft: '#F5F3FF',
  success: '#10B981',
  successSoft: '#ECFDF5',
  warning: '#F59E0B',
  warningSoft: '#FFFBEB',
  danger: '#EF4444',
  dangerSoft: '#FEF2F2',

  n0: '#FFFFFF',
  n50: '#FAFAFA',
  n100: '#F4F4F5',
  n200: '#E4E4E7',
  n300: '#D4D4D8',
  n400: '#A1A1AA',
  n500: '#71717A',
  n600: '#52525B',
  n700: '#3F3F46',
  n800: '#27272A',
  n900: '#18181B',
  n950: '#09090B',

  r6: 6,
  r10: 10,
  r14: 14,
  rFull: 9999,

  sh1: '0 1px 2px rgba(16,24,40,0.04), 0 1px 1px rgba(16,24,40,0.03)',
  sh2: '0 4px 12px rgba(16,24,40,0.06), 0 2px 4px rgba(16,24,40,0.04)',

  fontUi: '"Inter", ui-sans-serif, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  // Paleta de acentos para proyectos (selector de color del diálogo de creación).
  projectSwatches: [
    '#A78BFA', '#34D399', '#FBBF24', '#60A5FA', '#F472B6', '#22D3EE', '#FB923C', '#818CF8',
  ] as string[],

  // Paleta de avatares (8 pares fondo/texto) para color determinístico por nombre.
  avatarColors: [
    ['#F87171', '#7F1D1D'],
    ['#FB923C', '#7C2D12'],
    ['#FBBF24', '#78350F'],
    ['#34D399', '#064E3B'],
    ['#22D3EE', '#164E63'],
    ['#60A5FA', '#1E3A8A'],
    ['#A78BFA', '#4C1D95'],
    ['#F472B6', '#831843'],
  ] as Array<[string, string]>,
} as const

export type TfTokens = typeof TF_TOKENS
export const T = TF_TOKENS
