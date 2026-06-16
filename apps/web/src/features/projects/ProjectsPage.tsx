import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { T } from '../../theme/tokens'
import { I } from '../../icons'
import { ViewToggle } from '../../components'
import type { ProjectsView } from '../../components'
import { TopBar } from '../../layout/TopBar'
import { useLayout } from '../../hooks/useLayout'
import { ProjectsEmptyState } from './ProjectsEmptyState'
import { CreateProjectDialog } from './CreateProjectDialog'

// Página de Proyectos: chrome completo (top bar + cabecera + toggle) y estado vacío.
// Las cards aún no se implementan: el cuerpo muestra un placeholder.
export function ProjectsPage () {
  const { openMobileNav } = useLayout()
  const [view, setView] = useState<ProjectsView>('grid')
  const [dialogOpen, setDialogOpen] = useState(false)

  const actions = (
    <>
      <Button
        variant='text'
        startIcon={<I.Filter size={14} />}
        sx={{ color: T.n700, '&:hover': { background: T.n100 } }}
      >
        <Box component='span' sx={{ display: { xs: 'none', sm: 'inline' } }}>Filtros</Box>
      </Button>
      <Button variant='contained' startIcon={<I.Plus size={14} />} onClick={() => setDialogOpen(true)}>
        <Box component='span' sx={{ display: { xs: 'none', sm: 'inline' } }}>Nuevo proyecto</Box>
        <Box component='span' sx={{ display: { xs: 'inline', sm: 'none' } }}>Nuevo</Box>
      </Button>
    </>
  )

  return (
    <>
      <TopBar breadcrumbs={['Proyectos']} actions={actions} onMenuClick={openMobileNav} />

      <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2.5, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: { sm: 'flex-end' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant='h1' sx={{ fontSize: { xs: 26, md: 30 } }}>
              Proyectos
            </Typography>
            <Typography sx={{ fontSize: 14, color: T.n500, mt: 0.5 }}>
              Todos los espacios donde estás colaborando.
            </Typography>
          </Box>
          <ViewToggle value={view} onChange={setView} />
        </Box>

        <ProjectsEmptyState onCreate={() => setDialogOpen(true)} />
      </Box>

      <CreateProjectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
