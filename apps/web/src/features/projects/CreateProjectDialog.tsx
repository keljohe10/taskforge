import { useState } from 'react'
import { Box, Button, Dialog, DialogContent, IconButton, TextField, Typography } from '@mui/material'
import { T } from '../../theme/tokens'
import { I } from '../../icons'
import { IconBadge, Field, ColorSwatchPicker, RadioCard, SelectField, AvatarChip, AddChip, FeatureToggleCard } from '../../components'
import type { SelectOption } from '../../components'

const TEMPLATES: SelectOption[] = [
  { value: 'kanban', label: 'Tablero Kanban', icon: <I.Kanban size={14} /> },
  { value: 'list', label: 'Lista simple', icon: <I.List size={14} /> },
  { value: 'blank', label: 'Sin plantilla', icon: <I.Grid size={14} /> },
]

const TEMPLATE_HINTS: Record<string, string> = {
  kanban: 'Pendiente · En progreso · Hecha',
  list: 'Por hacer · Completada',
  blank: '—',
}

export type CreateProjectDialogProps = {
  open: boolean
  onClose: () => void
}

export function CreateProjectDialog ({ open, onClose }: CreateProjectDialogProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(T.projectSwatches[0])
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'team' | 'private'>('team')
  const [template, setTemplate] = useState('kanban')
  const [members, setMembers] = useState<string[]>(['Lucía Pérez', 'Mateo Ruiz'])
  const [aiEnabled, setAiEnabled] = useState(true)

  const handleClose = () => {
    setName('')
    setColor(T.projectSwatches[0])
    setDescription('')
    setVisibility('team')
    setTemplate('kanban')
    setMembers(['Lucía Pérez', 'Mateo Ruiz'])
    setAiEnabled(true)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      {/* Cabecera */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 2.5 }}>
        <IconBadge bg={color} size={36} radius={9}>
          <I.Folder size={18} color='#fff' />
        </IconBadge>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16, color: T.n900 }}>Crear proyecto</Typography>
          <Typography sx={{ fontSize: 13, color: T.n500 }}>Un espacio para organizar tareas con tu equipo.</Typography>
        </Box>
        <IconButton size='small' onClick={handleClose} aria-label='Cerrar'>
          <I.X size={16} />
        </IconButton>
      </Box>

      {/* Cuerpo */}
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Field label='Nombre del proyecto' htmlFor='cpd-name'>
          <TextField
            id='cpd-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoFocus
            placeholder='Ej. Lanzamiento app móvil'
          />
        </Field>

        <Field label='Color'>
          <ColorSwatchPicker value={color} onChange={setColor} />
        </Field>

        <Field label='Descripción' htmlFor='cpd-desc'>
          <TextField
            id='cpd-desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder='¿De qué trata este proyecto?'
          />
        </Field>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Field label='Visibilidad'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <RadioCard selected={visibility === 'team'} onSelect={() => setVisibility('team')} icon={<I.Users size={15} />}>
                Equipo
              </RadioCard>
              <RadioCard selected={visibility === 'private'} onSelect={() => setVisibility('private')} icon={<I.Lock size={15} />}>
                Privado
              </RadioCard>
            </Box>
          </Field>

          <Field label='Plantilla'>
            <SelectField
              value={template}
              onChange={setTemplate}
              options={TEMPLATES}
              startIcon={<I.Kanban size={14} />}
            />
            <Typography sx={{ fontSize: 12, color: T.n500, mt: 0.75 }}>
              {TEMPLATE_HINTS[template]}
            </Typography>
          </Field>
        </Box>

        <Field label='Miembros'>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {members.map((m) => <AvatarChip key={m} name={m} />)}
            <AddChip label='Invitar' icon={<I.Plus size={14} />} />
          </Box>
        </Field>

        <FeatureToggleCard
          icon={<I.Sparkles size={18} color='#fff' />}
          title='Generar tareas iniciales con IA'
          description='Claude propondrá un plan de tareas a partir del nombre y la descripción.'
          checked={aiEnabled}
          onChange={setAiEnabled}
        />
      </DialogContent>

      {/* Pie */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderTop: `1px solid ${T.n200}` }}>
        <Typography sx={{ fontSize: 13, color: T.n500 }}>
          {members.length} miembro{members.length !== 1 ? 's' : ''} · {visibility === 'team' ? 'Visible para el equipo' : 'Privado'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant='text' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' startIcon={<I.Plus size={14} />}>Crear proyecto</Button>
        </Box>
      </Box>
    </Dialog>
  )
}
