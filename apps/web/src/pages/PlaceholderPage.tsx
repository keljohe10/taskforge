import { Box, Typography } from '@mui/material'
import { T } from '../theme/tokens'
import { TopBar } from '../layout/TopBar'
import { useLayout } from '../hooks/useLayout'

// Página genérica para las secciones aún no implementadas (Panel, Mis tareas, Actividad).
export function PlaceholderPage ({ title }: { title: string }) {
  const { openMobileNav } = useLayout()
  return (
    <>
      <TopBar breadcrumbs={[title]} onMenuClick={openMobileNav} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 1,
          p: 4,
        }}
      >
        <Typography variant='h2' sx={{ fontSize: 22 }}>{title}</Typography>
        <Typography sx={{ fontSize: 14, color: T.n500 }}>Próximamente.</Typography>
      </Box>
    </>
  )
}
