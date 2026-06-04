import { Box, Button, Typography } from '@mui/material'
import { T } from '../../theme/tokens'
import { I } from '../../icons'

// Estado vacío de la página de Proyectos.
// Placeholder visible donde más adelante se renderizará la cuadrícula de cards.
export function ProjectsEmptyState ({ onCreate }: { onCreate?: () => void }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 320,
        border: `1px dashed ${T.n200}`,
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 1,
        px: 3,
        py: 6,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '14px',
          background: T.primarySoft,
          color: T.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <I.Folder size={26} />
      </Box>
      <Typography variant='h3' sx={{ fontSize: 18, fontWeight: 600 }}>
        Aún no hay proyectos
      </Typography>
      <Typography sx={{ fontSize: 14, color: T.n500, maxWidth: 340 }}>
        Crea tu primer proyecto para empezar a organizar el trabajo y colaborar con tu equipo.
      </Typography>
      <Button
        variant='contained'
        onClick={onCreate}
        startIcon={<I.Plus size={16} />}
        sx={{ mt: 2 }}
      >
        Nuevo proyecto
      </Button>
    </Box>
  )
}
