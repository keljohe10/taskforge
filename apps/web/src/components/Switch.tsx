import { Switch as MuiSwitch } from '@mui/material'
import { T } from '../theme/tokens'

export type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  'aria-label'?: string
}

// Toggle compacto (~32×18) sobre MUI Switch, alineado al prototipo.
export function Switch ({ checked, onChange, 'aria-label': ariaLabel }: SwitchProps) {
  return (
    <MuiSwitch
      checked={checked}
      onChange={(_, value) => onChange(value)}
      inputProps={{ 'aria-label': ariaLabel }}
      disableRipple
      sx={{
        width: 32,
        height: 18,
        padding: 0,
        display: 'flex',
        '& .MuiSwitch-switchBase': {
          padding: '2px',
          '&.Mui-checked': {
            transform: 'translateX(14px)',
            color: '#fff',
            '& + .MuiSwitch-track': { opacity: 1, backgroundColor: T.primary },
          },
        },
        '& .MuiSwitch-thumb': {
          width: 14,
          height: 14,
          boxShadow: '0 1px 2px rgba(16,24,40,0.1)',
        },
        '& .MuiSwitch-track': {
          borderRadius: '9999px',
          backgroundColor: T.n300,
          opacity: 1,
        },
      }}
    />
  )
}
