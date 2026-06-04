import { Box, ButtonBase } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'

export type ColorSwatchPickerProps = {
  value: string
  onChange: (color: string) => void
  colors?: string[]
}

// Selector de color: fila de swatches; el activo muestra check + ring.
export function ColorSwatchPicker ({
  value,
  onChange,
  colors = T.projectSwatches,
}: ColorSwatchPickerProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
      {colors.map((c) => {
        const selected = c === value
        return (
          <ButtonBase
            key={c}
            onClick={() => onChange(c)}
            aria-label={`Color ${c}`}
            aria-pressed={selected}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '9px',
              background: c,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: selected ? `0 0 0 2px ${T.n0}, 0 0 0 4px ${c}` : 'none',
            }}
          >
            {selected && <I.Check size={15} color='#fff' stroke={2.6} />}
          </ButtonBase>
        )
      })}
    </Box>
  )
}
