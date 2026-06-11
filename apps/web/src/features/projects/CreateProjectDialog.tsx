import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { T } from '../../theme/tokens'
import { I } from '../../icons'
import {
  ColorSwatchPicker,
  FeatureToggleCard,
  Field,
} from '../../components'

export type CreateProjectFormData = {
  name: string
  description: string
  color: string
  aiSuggest: boolean
}

export type CreateProjectDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateProjectFormData) => void
}

const DEFAULT_COLOR = T.projectSwatches[0]

export function CreateProjectDialog ({ open, onClose, onSubmit }: CreateProjectDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [aiSuggest, setAiSuggest] = useState(false)

  const canSubmit = name.trim().length > 0

  function handleSubmit () {
    if (!canSubmit) return
    onSubmit({ name: name.trim(), description: description.trim(), color, aiSuggest })
    handleClose()
  }

  function handleClose () {
    onClose()
    setName('')
    setDescription('')
    setColor(DEFAULT_COLOR)
    setAiSuggest(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <DialogTitle sx={{ pb: 1 }}>Nuevo proyecto</DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 0.5 }}>
          <Field label='Nombre' htmlFor='cp-name'>
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

          <Field label='Color'>
            <ColorSwatchPicker value={color} onChange={setColor} />
          </Field>

          <FeatureToggleCard
            icon={<I.Sparkles size={18} color={T.n0} />}
            title='Sugerir tareas iniciales con IA'
            description='Claude generará 3–5 tareas al crear el proyecto.'
            checked={aiSuggest}
            onChange={setAiSuggest}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button variant='text' onClick={handleClose} sx={{ color: T.n500 }}>
          Cancelar
        </Button>
        <Button variant='contained' onClick={handleSubmit} disabled={!canSubmit}>
          Crear proyecto
        </Button>
      </DialogActions>
    </Dialog>
  )
}
