import type { ReactNode } from 'react'
import { ButtonBase, Radio } from '@mui/material'
import { T } from '../theme/tokens'

export type RadioCardProps = {
  selected: boolean
  onSelect: () => void
  icon?: ReactNode
  children: ReactNode
}

// Opción seleccionable tipo tarjeta (radio + icono + etiqueta).
// La tarjeta entera es el control; el Radio se muestra de forma presentacional.
export function RadioCard ({ selected, onSelect, icon, children }: RadioCardProps) {
  return (
    <ButtonBase
      role='radio'
      aria-checked={selected}
      onClick={onSelect}
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        gap: 1.25,
        px: 1.5,
        py: 1.25,
        borderRadius: '10px',
        border: `1px solid ${selected ? T.primary : T.n200}`,
        background: selected ? T.primarySoft : 'transparent',
        transition: 'background 120ms, border-color 120ms',
      }}
    >
      <Radio
        checked={selected}
        tabIndex={-1}
        inputProps={{ tabIndex: -1, 'aria-hidden': true }}
        sx={{ p: 0, pointerEvents: 'none' }}
      />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 500, color: T.n900 }}>
        {icon}
        {children}
      </span>
    </ButtonBase>
  )
}
