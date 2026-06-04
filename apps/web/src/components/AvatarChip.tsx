import { Chip } from '@mui/material'
import { T } from '../theme/tokens'
import { UserAvatar } from './UserAvatar'

export type AvatarChipProps = {
  name: string
  /** Si se define, muestra el botón de eliminar y lo invoca al pulsarlo. */
  onDelete?: () => void
}

// Chip de miembro: avatar con iniciales + primer nombre.
export function AvatarChip ({ name, onDelete }: AvatarChipProps) {
  const firstName = name.split(' ')[0]
  return (
    <Chip
      variant='outlined'
      avatar={<UserAvatar name={name} size={22} />}
      label={firstName}
      onDelete={onDelete}
      sx={{
        height: 30,
        pl: '4px',
        color: T.n700,
        '& .MuiChip-avatar': { width: 22, height: 22, ml: 0 },
      }}
    />
  )
}
