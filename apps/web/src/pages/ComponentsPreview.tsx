import { useState } from 'react'
import type { ReactNode } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { T } from '../theme/tokens'
import { I } from '../icons'
import {
  AddChip,
  AvatarChip,
  ColorSwatchPicker,
  FeatureToggleCard,
  Field,
  IconBadge,
  RadioCard,
  SelectField,
  Switch,
} from '../components'

// ⚠️ Vista temporal de desarrollo — galería de los componentes del design system.
// Eliminar este archivo y su ruta en App.tsx al construir el diálogo "Crear proyecto".

function Section ({ title, children }: { title: string, children: ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: T.n500, mb: 1.5 }}>{title}</Typography>
      <Box sx={{ p: 2.5, border: `1px solid ${T.n200}`, borderRadius: '12px', background: T.n0 }}>
        {children}
      </Box>
    </Box>
  )
}

export function ComponentsPreview () {
  const [name, setName] = useState('Lanzamiento app móvil')
  const [description, setDescription] = useState('Coordinar diseño, desarrollo y QA.')
  const [color, setColor] = useState('#34D399')
  const [visibility, setVisibility] = useState<'team' | 'private'>('team')
  const [template, setTemplate] = useState('kanban')
  const [ai, setAi] = useState(true)
  const [on, setOn] = useState(false)

  const members = ['Lucía Pérez', 'Mateo Ruiz', 'Sofía Díaz', 'Andrés Gil']

  return (
    <Box sx={{ minHeight: '100vh', background: T.n50, py: 5 }}>
      <Box sx={{ maxWidth: 720, mx: 'auto', px: 2 }}>
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: '10px',
            background: T.warningSoft,
            border: `1px solid ${T.warning}`,
            color: T.n800,
            fontSize: 13,
          }}
        >
          Vista temporal de desarrollo (<code>/dev/components</code>). Eliminar al construir el diálogo.
        </Box>

        <Section title='Field + TextField'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Field label='Nombre del proyecto' htmlFor='pv-name'>
              <TextField
                id='pv-name'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label='Descripción' htmlFor='pv-desc'>
              <TextField
                id='pv-desc'
                fullWidth
                multiline
                minRows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </Box>
        </Section>

        <Section title='ColorSwatchPicker'>
          <ColorSwatchPicker value={color} onChange={setColor} />
        </Section>

        <Section title='IconBadge'>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconBadge bg={color}><I.Folder size={18} /></IconBadge>
            <IconBadge bg={T.ai}><I.Sparkles size={18} /></IconBadge>
            <IconBadge bg={T.primary} radius={9}><I.Kanban size={18} /></IconBadge>
          </Box>
        </Section>

        <Section title='RadioCard (visibilidad)'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <RadioCard
              selected={visibility === 'team'}
              onSelect={() => setVisibility('team')}
              icon={<I.Users size={15} color={T.primary} />}
            >
              Equipo
            </RadioCard>
            <RadioCard
              selected={visibility === 'private'}
              onSelect={() => setVisibility('private')}
              icon={<I.Lock size={15} color={T.n500} />}
            >
              Privado
            </RadioCard>
          </Box>
        </Section>

        <Section title='SelectField (plantilla)'>
          <Field label='Plantilla' hint='Pendiente · En progreso · Hecha'>
            <SelectField
              value={template}
              onChange={setTemplate}
              startIcon={<I.Kanban size={15} color={T.n500} />}
              options={[
                { value: 'kanban', label: 'Tablero Kanban', icon: <I.Kanban size={15} color={T.n500} /> },
                { value: 'list', label: 'Lista simple', icon: <I.List size={15} color={T.n500} /> },
              ]}
            />
          </Field>
        </Section>

        <Section title='AvatarChip + AddChip'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
            {members.map((m) => <AvatarChip key={m} name={m} />)}
            <AddChip label='Invitar' />
          </Box>
        </Section>

        <Section title='Switch'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Switch checked={on} onChange={setOn} aria-label='Demo' />
            <Typography sx={{ fontSize: 13, color: T.n600 }}>{on ? 'Activado' : 'Desactivado'}</Typography>
          </Box>
        </Section>

        <Section title='FeatureToggleCard'>
          <FeatureToggleCard
            icon={<I.Sparkles size={18} />}
            title='Generar tareas iniciales con IA'
            description='Claude propondrá un plan de tareas a partir del nombre y la descripción.'
            checked={ai}
            onChange={setAi}
          />
        </Section>

        <Section title='Button (MUI, vía tema)'>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant='text' sx={{ color: T.n700 }}>Cancelar</Button>
            <Button variant='contained' startIcon={<I.Plus size={14} />}>Crear proyecto</Button>
          </Box>
        </Section>
      </Box>
    </Box>
  )
}
