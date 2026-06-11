# Requisitos — Modal "Crear proyecto"

## Funcionalidad

### RF-1 Apertura del modal
El modal se abre al hacer clic en cualquier botón "Nuevo proyecto":
- Botón "Nuevo proyecto" en el TopBar de `ProjectsPage`.
- Botón "Nuevo proyecto" en el estado vacío (`ProjectsEmptyState`).

### RF-2 Cabecera del diálogo
- Icono del proyecto (carpeta) con fondo de color del proyecto seleccionado.
- Título: "Crear proyecto".
- Subtítulo: "Un espacio para organizar tareas con tu equipo."
- Botón ✕ para cerrar.

### RF-3 Contenido del formulario
El modal contiene los siguientes campos en este orden:

| Campo | Tipo | Obligatorio | Detalle |
|---|---|---|---|
| Nombre del proyecto | Texto libre | Sí | Label en mayúsculas. El botón "Crear proyecto" está deshabilitado si está vacío. |
| Color | Selector de swatches | No | Usa la paleta `T.projectSwatches`. El primer color es el valor por defecto. |
| Descripción | Texto multilínea | No | Describe el propósito del proyecto. |
| Visibilidad | RadioCard (2 opciones) | No | "Equipo" (seleccionado por defecto) y "Privado". Cada opción tiene icono. |
| Plantilla | SelectField | No | Lista de plantillas predefinidas (ej. "Tablero Kanban"). Muestra un hint con los estados de la plantilla seleccionada (ej. "Pendiente · En progreso · Hecha"). |
| Miembros | Lista de AvatarChip + AddChip | No | Muestra los miembros seleccionados como chips con avatar. AddChip "Invitar" al final. |
| Generar tareas con IA | FeatureToggleCard | No | Activado por defecto. Descripción: "Claude propondrá un plan de tareas a partir del nombre y la descripción." |

### RF-4 Pie del diálogo
Muestra un resumen dinámico del estado actual del formulario:
- Icono de personas + conteo de miembros seleccionados.
- Texto de visibilidad: "Visible para el equipo" o "Solo para ti".

### RF-5 Acción "Crear proyecto"
- El botón tiene prefijo "+" → "+ Crear proyecto".
- Está **deshabilitado** mientras el campo nombre esté vacío.
- Al hacer clic se llama a `onSubmit` con los datos del formulario y el modal se cierra.

### RF-6 Acción "Cancelar"
- Cierra el modal **sin llamar a `onSubmit`**.
- Hacer clic fuera del diálogo también lo cierra.

### RF-7 Reset del estado
Al cerrarse el modal (por cualquier vía), todos los campos vuelven a sus valores por defecto.

## Valores por defecto

| Campo | Valor por defecto |
|---|---|
| Nombre | vacío |
| Color | `T.projectSwatches[0]` (violeta) |
| Descripción | vacío |
| Visibilidad | `'team'` |
| Plantilla | `'kanban'` |
| Miembros | `[currentUser]` (el usuario actual) |
| IA | `true` |

## Fuera de alcance
- Sin llamadas a API ni persistencia de datos.
- Sin validaciones de negocio (longitud mínima, caracteres especiales, etc.).
- El botón "Invitar" del chip de miembros no abre ningún flujo (es decorativo en esta iteración).
