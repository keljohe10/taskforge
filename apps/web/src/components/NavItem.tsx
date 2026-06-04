import type { ReactNode } from 'react'
import { Box, ButtonBase } from '@mui/material'
import { T } from '../theme/tokens'

export type NavItemProps = {
  icon: ReactNode
  label: string
  badge?: string | number
  active?: boolean
  onClick?: () => void
}

// Item de navegación del sidebar: icono + etiqueta + badge opcional.
// Presentacional: el estado activo y la navegación los decide el contenedor.
export function NavItem ({ icon, label, badge, active = false, onClick }: NavItemProps) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1.25,
        py: 0.875,
        borderRadius: '6px',
        justifyContent: 'flex-start',
        textAlign: 'left',
        background: active ? T.n100 : 'transparent',
        color: active ? T.n900 : T.n600,
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        '&:hover': { background: active ? T.n100 : T.n50 },
      }}
    >
      <Box component='span' sx={{ display: 'inline-flex', color: active ? T.primary : T.n500 }}>
        {icon}
      </Box>
      <Box component='span' sx={{ flex: 1 }}>{label}</Box>
      {badge != null && (
        <Box
          component='span'
          sx={{
            fontSize: 11,
            px: 0.75,
            py: '1px',
            borderRadius: '9999px',
            background: T.n200,
            color: T.n600,
            fontWeight: 500,
          }}
        >
          {badge}
        </Box>
      )}
    </ButtonBase>
  )
}
