# Diseño técnico — `CreateProjectDialog` (v2)

## Ubicación
`apps/web/src/features/projects/CreateProjectDialog.tsx`

## Nuevos tipos en `mock.ts`

```ts
export type TeamMember = { id: string; name: string }

export const teamMembers: TeamMember[] = [
  { id: 'u-1', name: 'Lucía Pérez' },
  { id: 'u-2', name: 'Mateo Ruiz' },
  { id: 'u-3', name: 'Sofía Díaz' },
  { id: 'u-4', name: 'Andrés Gil' },
]

export type ProjectTemplate = { value: string; label: string; hint: string }

export const projectTemplates: ProjectTemplate[] = [
  { value: 'kanban', label: 'Tablero Kanban', hint: 'Pendiente · En progreso · Hecha' },
  { value: 'scrum',  label: 'Scrum Sprint',   hint: 'Backlog · En curso · Revisión · Hecha' },
  { value: 'blank',  label: 'En blanco',       hint: 'Sin columnas predefinidas' },
]
```

## API del componente

```ts
type CreateProjectFormData = {
  name: string
  description: string
  color: string
  visibility: 'team' | 'private'
  template: string
  memberIds: string[]
  aiSuggest: boolean
}

type CreateProjectDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateProjectFormData) => void
}
```

## Estado interno

```ts
const [name, setName]               = useState('')
const [description, setDescription] = useState('')
const [color, setColor]             = useState(T.projectSwatches[0])
const [visibility, setVisibility]   = useState<'team' | 'private'>('team')
const [template, setTemplate]       = useState('kanban')
const [memberIds, setMemberIds]     = useState<string[]>([currentUser.id])
const [aiSuggest, setAiSuggest]     = useState(true)
```

## Estructura JSX

```
Dialog (fullWidth, maxWidth='xs', scroll='paper')
└── DialogTitle
    └── Box (flex row, gap)
        ├── IconBadge (bg=color, icono Folder)   ← color dinámico
        └── Box
            ├── Typography "Crear proyecto"
            └── Typography "Un espacio para organizar tareas con tu equipo."
    └── IconButton ✕ → handleClose  (posición absoluta top-right)

└── DialogContent (dividers)
    └── Stack (spacing=2.5)
        ├── Field label="NOMBRE DEL PROYECTO" htmlFor="cp-name"
        │   └── TextField (autoFocus, maxLength=60)
        ├── Field label="COLOR"
        │   └── ColorSwatchPicker
        ├── Field label="DESCRIPCIÓN" htmlFor="cp-desc"
        │   └── TextField (multiline, minRows=2)
        ├── Box (grid 2 cols en sm, 1 col en xs)
        │   ├── Field label="VISIBILIDAD"
        │   │   └── Stack spacing=1
        │   │       ├── RadioCard selected={visibility==='team'}    icono=<I.Users>   "Equipo"
        │   │       └── RadioCard selected={visibility==='private'} icono=<I.Lock>    "Privado"
        │   └── Field label="PLANTILLA"
        │       └── Stack spacing=0.75
        │           ├── SelectField value=template options=templateOptions
        │           └── Typography hint (estados de la plantilla seleccionada)
        ├── Field label="MIEMBROS"
        │   └── Box (flex wrap, gap=1)
        │       ├── AvatarChip por cada memberId seleccionado
        │       └── AddChip "Invitar"
        └── FeatureToggleCard (IA, checked=aiSuggest)

└── DialogActions (sx justifyContent='space-between')
    ├── Box (resumen: icono Users + texto visibilidad/miembros)
    └── Box
        ├── Button "Cancelar"
        └── Button "+ Crear proyecto" (disabled=!canSubmit)
```

## Componentes reutilizados

| Componente | Origen |
|---|---|
| `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` | MUI |
| `TextField`, `Button`, `Stack`, `Box`, `IconButton`, `Typography` | MUI |
| `Field` | `src/components/Field.tsx` |
| `IconBadge` | `src/components/IconBadge.tsx` |
| `ColorSwatchPicker` | `src/components/ColorSwatchPicker.tsx` |
| `RadioCard` | `src/components/RadioCard.tsx` |
| `SelectField` | `src/components/SelectField.tsx` |
| `AvatarChip` | `src/components/AvatarChip.tsx` |
| `AddChip` | `src/components/AddChip.tsx` |
| `FeatureToggleCard` | `src/components/FeatureToggleCard.tsx` |
| `I.Folder`, `I.Users`, `I.Lock`, `I.Sparkles`, `I.X` | `src/icons/index.tsx` |
| `T` (tokens) | `src/theme/tokens.ts` |
| `teamMembers`, `projectTemplates`, `currentUser` | `src/data/mock.ts` |

## Integración en `ProjectsPage`
Sin cambios. `ProjectsPage` ya gestiona `dialogOpen`, `onClose` y `onSubmit`.
