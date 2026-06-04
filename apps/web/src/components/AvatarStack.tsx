import { Box } from '@mui/material'
import { T } from '../theme/tokens'
import { UserAvatar } from './UserAvatar'

export type AvatarStackProps = {
  names: string[]
  size?: number
  max?: number
}

// Avatares solapados con indicador "+N" cuando se supera el máximo.
export function AvatarStack ({ names, size = 24, max = 3 }: AvatarStackProps) {
  const shown = names.slice(0, max)
  const extra = names.length - shown.length
  const overlap = -size * 0.33
  return (
    <Box sx={{ display: 'inline-flex' }}>
      {shown.map((n, i) => (
        <Box key={n + i} sx={{ ml: i === 0 ? 0 : `${overlap}px` }}>
          <UserAvatar name={n} size={size} ring />
        </Box>
      ))}
      {extra > 0 && (
        <Box
          sx={{
            ml: `${overlap}px`,
            width: size,
            height: size,
            borderRadius: '9999px',
            background: T.n100,
            color: T.n600,
            boxShadow: `0 0 0 2px ${T.n0}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: Math.round(size * 0.38),
            fontWeight: 600,
          }}
        >
          +{extra}
        </Box>
      )}
    </Box>
  )
}
