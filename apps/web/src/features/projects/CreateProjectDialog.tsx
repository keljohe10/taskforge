import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { T } from '../../theme/tokens'
import { I } from '../../icons'
import {
  AddChip,
  AvatarChip,
  ColorSwatchPicker,
  FeatureToggleCard,
  Field,
  IconBadge,
  RadioCard,
  SelectField,
} from '../../components'
import { currentUser, teamMembers, projectTemplates } from '../../data/mock'
import type { SelectOption } from '../../components'

export type CreateProjectFormData = {
  name: string
  description: string
  color: string
  visibility: 'team' | 'private'
  template: string
  memberIds: string[]
  aiSuggest: boolean
}

export type CreateProjectDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateProjectFormData) => void
}

const DEFAULT_COLOR = T.projectSwatches[0]
const DEFAULT_MEMBERS = [currentUser.id]

const templateOptions: SelectOption[] = projectTemplates.map((t) => ({
  value: t.value,
  label: t.label,
  icon: <I.Kanban size={14} color={T.n500} />,
}))

export function CreateProjectDialog ({ open, onClose, onSubmit }: CreateProjectDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [visibility, setVisibility] = useState<'team' | 'private'>('team')
  const [template, setTemplate] = useState('kanban')
  const [memberIds, setMemberIds] = useState<string[]>(DEFAULT_MEMBERS)
  const [aiSuggest, setAiSuggest] = useState(true)

  const canSubmit = name.trim().length > 0
  const selectedTemplate = projectTemplates.find((t) => t.value === template)
  const selectedMembers = teamMembers.filter((m) => memberIds.includes(m.id))

  function handleSubmit () {
    if (!canSubmit) return
    onSubmit({ name: name.trim(), description: description.trim(), color, visibility, template, memberIds, aiSuggest })
    handleClose()
  }

  function handleClose () {
    onClose()
    setName('')
    setDescription('')
    setColor(DEFAULT_COLOR)
    setVisibility('team')
    setTemplate('kanban')
    setMemberIds(DEFAULT_MEMBERS)
    setAiSuggest(true)
  }

  function removeMember (id: string) {
    setMemberIds((prev) => prev.filter((m) => m !== id))
  }

  const footerText = visibility === 'team' ? 'Visible para el equipo' : 'Solo para ti'

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md' scroll='paper'>
      {/* Cabecera */}
      <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, pr: 6 }}>
        <IconBadge bg={color} size={40} radius={10}>
          <I.Folder size={20} color={T.n0} />
        </IconBadge>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3 }}>Crear proyecto</Typography>
          <Typography sx={{ fontSize: 13, color: T.n500, mt: 0.25 }}>
            Un espacio para organizar tareas con tu equipo.
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size='small'
          aria-label='Cerrar'
          sx={{ position: 'absolute', top: 12, right: 12, color: T.n400 }}
        >
          <I.X size={16} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 0.5 }}>
          {/* Nombre */}
          <Field label='Nombre del proyecto' htmlFor='cp-name'>
            <TextField
              id='cp-name'
              fullWidth
              autoFocus
              placeholder='Ej. Rediseño onboarding'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              inputProps={{ maxLength: 60 }}
            />
          </Field>

          {/* Color */}
          <Field label='Color'>
            <ColorSwatchPicker value={color} onChange={setColor} />
          </Field>

          {/* Descripción */}
          <Field label='Descripción' htmlFor='cp-desc'>
            <TextField
              id='cp-desc'
              fullWidth
              multiline
              minRows={2}
              placeholder='¿De qué trata este proyecto?'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          {/* Visibilidad + Plantilla */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Field label='Visibilidad'>
              <Stack spacing={1}>
                <RadioCard
                  selected={visibility === 'team'}
                  onSelect={() => setVisibility('team')}
                  icon={<I.Users size={15} />}
                >
                  Equipo
                </RadioCard>
                <RadioCard
                  selected={visibility === 'private'}
                  onSelect={() => setVisibility('private')}
                  icon={<I.Lock size={15} />}
                >
                  Privado
                </RadioCard>
              </Stack>
            </Field>

            <Field label='Plantilla'>
              <Stack spacing={0.75}>
                <SelectField
                  value={template}
                  onChange={setTemplate}
                  options={templateOptions}
                  startIcon={<I.Kanban size={14} color={T.n500} />}
                />
                {selectedTemplate && (
                  <Typography sx={{ fontSize: 12, color: T.n500 }}>
                    {selectedTemplate.hint}
                  </Typography>
                )}
              </Stack>
            </Field>
          </Box>

          {/* Miembros */}
          <Field label='Miembros'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              {selectedMembers.map((m) => (
                <AvatarChip
                  key={m.id}
                  name={m.name}
                  onDelete={memberIds.length > 1 ? () => removeMember(m.id) : undefined}
                />
              ))}
              <AddChip label='Invitar' />
            </Box>
          </Field>

          {/* IA */}
          <FeatureToggleCard
            icon={<I.Sparkles size={18} color={T.n0} />}
            title='Generar tareas iniciales con IA'
            description='Claude propondrá un plan de tareas a partir del nombre y la descripción.'
            checked={aiSuggest}
            onChange={setAiSuggest}
          />
        </Stack>
      </DialogContent>

      {/* Pie */}
      <DialogActions sx={{ px: 2.5, py: 1.5, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: T.n500, fontSize: 13 }}>
          <I.Users size={14} />
          <span>{selectedMembers.length} {selectedMembers.length === 1 ? 'miembro' : 'miembros'} · {footerText}</span>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant='text' onClick={handleClose} sx={{ color: T.n500 }}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleSubmit} disabled={!canSubmit} startIcon={<I.Plus size={14} />}>
            Crear proyecto
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
