import type { ReactNode } from 'react'
import { Box, MenuItem, Select } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'

export type SelectOption = {
  value: string
  label: string
  icon?: ReactNode
}

export type SelectFieldProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  startIcon?: ReactNode
}

// Campo de selección sobre MUI Select, con chevron e icono de adorno propios.
// Usado, p. ej., para elegir la plantilla del proyecto.
export function SelectField ({ value, onChange, options, startIcon }: SelectFieldProps) {
  const selected = options.find((o) => o.value === value)
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      IconComponent={(props) => <I.ChevDown size={14} color={T.n400} {...props} />}
      renderValue={() => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: T.n700 }}>
          {startIcon}
          <span>{selected?.label ?? ''}</span>
        </Box>
      )}
      sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center', minHeight: 'unset', py: 1.5 } }}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {o.icon}
            {o.label}
          </Box>
        </MenuItem>
      ))}
    </Select>
  )
}
