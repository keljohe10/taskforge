import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export type IconBadgeProps = {
  children: ReactNode
  /** Color de fondo del tile. */
  bg?: string
  /** Color del icono. */
  color?: string
  size?: number
  radius?: number
  sx?: SxProps<Theme>
}

// Tile redondeado con un icono centrado.
// Usado en cabeceras y tarjetas (p. ej. el cuadro de color del proyecto o el de IA).
export function IconBadge ({
  children,
  bg = '#4F46E5',
  color = '#FFFFFF',
  size = 36,
  radius = 10,
  sx,
}: IconBadgeProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${radius}px`,
        background: bg,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 120ms',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
