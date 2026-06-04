import type { ReactNode } from 'react'
import { Box, IconButton } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'

export type TopBarProps = {
  breadcrumbs: string[]
  actions?: ReactNode
  onMenuClick?: () => void
}

// Barra superior del área principal: hamburguesa (solo mobile), breadcrumb y acciones.
export function TopBar ({ breadcrumbs, actions, onMenuClick }: TopBarProps) {
  return (
    <Box
      component='header'
      sx={{
        height: 52,
        flexShrink: 0,
        borderBottom: `1px solid ${T.n200}`,
        background: T.n0,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: { xs: 2, md: 3 },
      }}
    >
      <IconButton
        onClick={onMenuClick}
        aria-label='Abrir navegación'
        sx={{ display: { md: 'none' }, color: T.n600, mr: -0.5 }}
      >
        <I.Menu size={20} />
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 14, minWidth: 0 }}>
        {breadcrumbs.map((b, i) => {
          const last = i === breadcrumbs.length - 1
          return (
            <Box key={b} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {i > 0 && <Box component='span' sx={{ color: T.n300 }}>/</Box>}
              <Box
                component='span'
                sx={{
                  color: last ? T.n900 : T.n500,
                  fontWeight: last ? 500 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {b}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box sx={{ flex: 1 }} />
      {actions && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{actions}</Box>}
    </Box>
  )
}
