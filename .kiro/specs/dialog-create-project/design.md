# Diseño técnico — `CreateProjectDialog`

## Ubicación
`apps/web/src/features/projects/CreateProjectDialog.tsx`

## API del componente

```ts
type CreateProjectFormData = {
  name: string
  description: string
  color: string
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
const [name, setName]             = useState('')
const [description, setDescription] = useState('')
const [color, setColor]           = useState(T.projectSwatches[0])
const [aiSuggest, setAiSuggest]   = useState(false)
```

Todo el estado se resetea en `handleClose` (llamado tanto por "Cancelar" como tras el submit).

## Estructura JSX

```
Dialog (MUI, fullWidth, maxWidth="xs")
└── DialogTitle       — "Nuevo proyecto"
└── DialogContent
    └── Stack (spacing=2.5)
        ├── Field (label="Nombre")
        │   └── TextField (autoFocus, maxLength=60, onKeyDown Enter→submit)
        ├── Field (label="Descripción")
        │   └── TextField (multiline, minRows=2)
        ├── Field (label="Color")
        │   └── ColorSwatchPicker
        └── FeatureToggleCard (toggle de IA)
└── DialogActions
    ├── Button "Cancelar"  → handleClose
    └── Button "Crear proyecto" (variant=contained, disabled=!canSubmit) → handleSubmit
```

## Componentes reutilizados

| Componente | Origen |
|---|---|
| `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` | MUI |
| `TextField`, `Button`, `Stack` | MUI |
| `Field` | `src/components/Field.tsx` |
| `ColorSwatchPicker` | `src/components/ColorSwatchPicker.tsx` |
| `FeatureToggleCard` | `src/components/FeatureToggleCard.tsx` |
| `I.Sparkles` | `src/icons/index.tsx` |
| `T` (tokens) | `src/theme/tokens.ts` |

## Integración en `ProjectsPage`

`ProjectsPage` gestiona el estado de apertura:

```ts
const [dialogOpen, setDialogOpen] = useState(false)

// Botón TopBar
<Button onClick={() => setDialogOpen(true)}>Nuevo proyecto</Button>

// Estado vacío
<ProjectsEmptyState onCreate={() => setDialogOpen(true)} />

// Diálogo
<CreateProjectDialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  onSubmit={handleCreate}
/>
```

`handleCreate` recibe `CreateProjectFormData` y, por ahora, solo hace `console.log`. Cuando exista el backend, aquí se llamará al servicio correspondiente.

## Exportaciones

`CreateProjectDialog`, `CreateProjectDialogProps` y `CreateProjectFormData` se exportan desde `src/components/index.ts`.
