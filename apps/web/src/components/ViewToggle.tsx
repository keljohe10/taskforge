import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { I } from '../icons'

export type ProjectsView = 'grid' | 'list'

export type ViewToggleProps = {
  value: ProjectsView
  onChange: (value: ProjectsView) => void
}

// Conmutador Cuadrícula / Lista (segmented control).
export function ViewToggle ({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size='small'
      value={value}
      onChange={(_, next: ProjectsView | null) => {
        if (next) onChange(next)
      }}
      aria-label='Vista de proyectos'
    >
      <ToggleButton value='grid' aria-label='Cuadrícula'>
        <I.Grid size={14} />
        Cuadrícula
      </ToggleButton>
      <ToggleButton value='list' aria-label='Lista'>
        <I.List size={14} />
        Lista
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
