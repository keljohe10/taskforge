import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { T } from '../theme/tokens'

export type FieldProps = {
  label: ReactNode
  hint?: ReactNode
  htmlFor?: string
  children: ReactNode
}

// Campo de formulario etiquetado: label uppercase + control + hint opcional.
// Envuelve cualquier control (TextField, SelectField, RadioCard, etc.).
export function Field ({ label, hint, htmlFor, children }: FieldProps) {
  return (
    <Box>
      <Typography
        component='label'
        htmlFor={htmlFor}
        sx={{
          display: 'block',
          fontSize: 11,
          fontWeight: 600,
          color: T.n500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          mb: 1,
        }}
      >
        {label}
      </Typography>
      {children}
      {hint && (
        <Typography sx={{ fontSize: 12, color: T.n500, mt: 0.75 }}>{hint}</Typography>
      )}
    </Box>
  )
}
