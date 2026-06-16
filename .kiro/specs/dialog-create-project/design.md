# Design — dialog-create-project

## Árbol de componentes

```
CreateProjectDialog          (apps/web/src/features/projects/CreateProjectDialog.tsx)
├── Dialog [MUI, maxWidth="sm", fullWidth]
│   ├── DialogHeader          (sección interna, no componente separado)
│   │   ├── IconBadge         bg=colorActivo, size=36, radius=9
│   │   │   └── I.Folder      size=18, color="#fff"
│   │   ├── Box (título + subtítulo)
│   │   │   ├── Typography    "Crear proyecto"
│   │   │   └── Typography    "Un espacio para organizar tareas con tu equipo."
│   │   └── IconButton [MUI]  → cierra modal
│   │       └── I.X           size=16
│   ├── DialogContent [MUI, dividers]
│   │   ├── Field  label="NOMBRE DEL PROYECTO"
│   │   │   └── TextField [MUI, autoFocus, fullWidth]
│   │   ├── Field  label="COLOR"
│   │   │   └── ColorSwatchPicker  value=color  onChange=setColor
│   │   ├── Field  label="DESCRIPCIÓN"
│   │   │   └── TextField [MUI, multiline, rows=3, fullWidth]
│   │   ├── Box (fila de dos columnas)
│   │   │   ├── Field  label="VISIBILIDAD"
│   │   │   │   ├── RadioCard  selected=visibility==="team"   onSelect  icon=<I.Users>  "Equipo"
│   │   │   │   └── RadioCard  selected=visibility==="private" onSelect icon=<I.Lock>  "Privado"
│   │   │   └── Field  label="PLANTILLA"
│   │   │       ├── SelectField  value=template  onChange=setTemplate  options=TEMPLATES  startIcon=<I.Kanban>
│   │   │       └── Typography (hint)  "Pendiente · En progreso · Hecha"
│   │   ├── Field  label="MIEMBROS"
│   │   │   └── Box (fila flex wrap)
│   │   │       ├── AvatarChip  name="Lucía Pérez"
│   │   │       ├── AvatarChip  name="Mateo Ruiz"
│   │   │       └── AddChip    label="Invitar"  icon=<I.Plus>
│   │   └── FeatureToggleCard
│   │       icon=<I.Sparkles>  title="Generar tareas iniciales con IA"
│   │       description="Claude propondrá un plan de tareas a partir del nombre y la descripción."
│   │       checked=aiEnabled  onChange=setAiEnabled
│   └── DialogFooter          (sección interna)
│       ├── Typography  "{n} miembros · Visible para el {equipo|grupo privado}"
│       └── Box (botones)
│           ├── Button [MUI, variant="text"]       "Cancelar"   → onClose
│           └── Button [MUI, variant="contained"]  "+ Crear proyecto"
```

---

## Estado local del componente

```ts
// Todos los valores iniciales se restauran en onClose (REQ-11.4)
const [name,       setName]       = useState('')
const [color,      setColor]      = useState(T.projectSwatches[0])
const [description,setDescription]= useState('')
const [visibility, setVisibility] = useState<'team' | 'private'>('team')
const [template,   setTemplate]   = useState('kanban')
const [members,    setMembers]    = useState<string[]>(['Lucía Pérez', 'Mateo Ruiz'])
const [aiEnabled,  setAiEnabled]  = useState(true)
```

---

## Datos estáticos

```ts
// Plantillas disponibles en el SelectField
const TEMPLATES: SelectOption[] = [
  { value: 'kanban', label: 'Tablero Kanban', icon: <I.Kanban size={14} /> },
  { value: 'list',   label: 'Lista simple',   icon: <I.List   size={14} /> },
  { value: 'blank',  label: 'Sin plantilla',  icon: <I.Grid   size={14} /> },
]

// Hint de estados por plantilla
const TEMPLATE_HINTS: Record<string, string> = {
  kanban: 'Pendiente · En progreso · Hecha',
  list:   'Por hacer · Completada',
  blank:  '—',
}
```

---

## Props del componente

```ts
type CreateProjectDialogProps = {
  open: boolean
  onClose: () => void
}
```

---

## Layout del DialogContent

- `display: flex`, `flexDirection: column`, `gap: 3` entre secciones.
- La fila VISIBILIDAD / PLANTILLA usa `display: grid`, `gridTemplateColumns: 1fr 1fr`, `gap: 2`.
- `DialogContent` tiene `dividers` de MUI para la separación visual con cabecera y pie.

---

## Comportamiento derivado (sin estado adicional)

| Elemento | Derivado de |
|---|---|
| `bg` del `IconBadge` de cabecera | `color` |
| Texto resumen del pie | `members.length` + `visibility` |
| Hint de plantilla | `template` |
| `startIcon` del `SelectField` | siempre `<I.Kanban>` (estático, no cambia) |

---

## Ubicación del archivo

```
apps/web/src/features/projects/CreateProjectDialog.tsx
```

La página `/projects` importa y controla `open`/`onClose` con un `useState<boolean>` local.
