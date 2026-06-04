import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { T } from '../theme/tokens'
import { IconBadge } from './IconBadge'
import { Switch } from './Switch'

export type FeatureToggleCardProps = {
  icon: ReactNode
  title: ReactNode
  description: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  /** Color de acento del icono. Por defecto, el morado de IA. */
  accent?: string
  /** Fondo suave de la tarjeta. Por defecto, el soft de IA. */
  accentSoft?: string
}

// Tarjeta de feature con interruptor (p. ej. "Generar tareas iniciales con IA").
export function FeatureToggleCard ({
  icon,
  title,
  description,
  checked,
  onChange,
  accent = T.ai,
  accentSoft = T.aiSoft,
}: FeatureToggleCardProps) {
  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${accentSoft}, ${T.n0})`,
        border: `1px solid ${accentSoft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 1.75,
      }}
    >
      <IconBadge bg={accent} size={36} radius={9}>{icon}</IconBadge>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: T.n900 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, color: T.n600 }}>{description}</Typography>
      </Box>
      <Switch checked={checked} onChange={onChange} aria-label='Activar función' />
    </Box>
  )
}
