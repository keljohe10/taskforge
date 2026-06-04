import { useState } from 'react'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { T } from '../theme/tokens'
import { SidebarContent } from './SidebarContent'
import type { LayoutContext } from '../hooks/useLayout'

const DRAWER_WIDTH = 240

// Shell responsive de la aplicación.
// Desktop (≥ md): sidebar permanente. Mobile: drawer temporal con hamburguesa.
export function AppLayout () {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const ctx: LayoutContext = { openMobileNav: () => setMobileOpen(true) }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', background: T.n0 }}>
      {isDesktop
        ? (
          <Box component='nav' sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
            <SidebarContent />
          </Box>
          )
        : (
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, border: 'none' } }}
          >
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </Drawer>
          )}

      <Box
        component='main'
        sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Outlet context={ctx} />
      </Box>
    </Box>
  )
}
