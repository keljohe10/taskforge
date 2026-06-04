import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { T } from '../theme/tokens'

function hashName (s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export function initials (name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export type UserAvatarProps = {
  name: string
  size?: number
  ring?: boolean
  sx?: SxProps<Theme>
  /** Reenviado al contenedor (necesario para integrarse con MUI Chip). */
  className?: string
}

// Avatar con color de fondo/texto determinístico a partir del nombre.
export function UserAvatar ({ name, size = 24, ring = false, sx, className }: UserAvatarProps) {
  const [bg, fg] = T.avatarColors[hashName(name) % T.avatarColors.length]
  return (
    <Box
      className={className}
      sx={{
        width: size,
        height: size,
        borderRadius: '9999px',
        flexShrink: 0,
        background: bg,
        color: fg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.42),
        fontWeight: 600,
        boxShadow: ring ? `0 0 0 2px ${T.n0}` : undefined,
        ...sx,
      }}
    >
      {initials(name)}
    </Box>
  )
}
