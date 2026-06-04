import { Box } from '@mui/material'
import { T } from '../theme/tokens'

// Logo de marca: cuadro con gradiente primary → ai y glifo "T".
export function Logo ({ size = 28 }: { size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${Math.round(size * 0.25)}px`,
        background: `linear-gradient(135deg, ${T.primary} 0%, ${T.ai} 100%)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        flexShrink: 0,
        boxShadow: `inset 0 -${Math.round(size * 0.08)}px ${Math.round(size * 0.18)}px rgba(0,0,0,0.18)`,
      }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M4 7h16M12 7v12' />
        <path d='M7 19h10' />
      </svg>
    </Box>
  )
}
