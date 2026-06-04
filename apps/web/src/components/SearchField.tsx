import { Box, InputBase } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'

// Campo de búsqueda del sidebar, con atajo ⌘K decorativo.
export function SearchField ({ placeholder = 'Buscar…' }: { placeholder?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        height: 36,
        px: 1.25,
        borderRadius: '8px',
        background: T.n0,
        border: `1px solid ${T.n200}`,
        color: T.n500,
      }}
    >
      <I.Search size={15} />
      <InputBase
        placeholder={placeholder}
        sx={{ flex: 1, fontSize: 13, color: T.n900 }}
        inputProps={{ 'aria-label': 'Buscar' }}
      />
      <Box
        component='span'
        sx={{
          fontFamily: T.fontMono,
          fontSize: 11,
          px: 0.625,
          py: '1px',
          borderRadius: '4px',
          background: T.n100,
          color: T.n500,
        }}
      >
        ⌘K
      </Box>
    </Box>
  )
}
