import type { ReactNode } from 'react'
import { ButtonBase } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'

export type AddChipProps = {
  label: string
  icon?: ReactNode
  onClick?: () => void
}

// Chip de acción con borde punteado (p. ej. "Invitar" miembros).
export function AddChip ({ label, icon, onClick }: AddChipProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.5,
        py: 0.75,
        borderRadius: '9999px',
        border: `1px dashed ${T.n300}`,
        fontSize: 13,
        fontWeight: 500,
        color: T.n500,
        '&:hover': { background: T.n50, color: T.n700 },
      }}
    >
      {icon ?? <I.Plus size={14} />}
      {label}
    </ButtonBase>
  )
}
