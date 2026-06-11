# Requisitos — Modal "Crear proyecto"

## Funcionalidad

### RF-1 Apertura del modal
El modal se abre al hacer clic en cualquier botón "Nuevo proyecto":
- Botón "Nuevo proyecto" en el TopBar de `ProjectsPage`.
- Botón "Nuevo proyecto" en el estado vacío (`ProjectsEmptyState`).

### RF-2 Contenido del formulario
El modal contiene los siguientes campos:

| Campo | Tipo | Obligatorio | Detalle |
|---|---|---|---|
| Nombre | Texto libre | Sí | Máximo 60 caracteres. El botón "Crear proyecto" está deshabilitado si está vacío. |
| Descripción | Texto multilínea | No | Describe el propósito del proyecto. |
| Color | Selector de swatches | No | Usa la paleta `T.projectSwatches`. El primer color es el valor por defecto. |
| Sugerir tareas con IA | Toggle | No | Apagado por defecto. Indica si se generarán tareas iniciales con Claude. |

### RF-3 Acción "Crear proyecto"
- El botón "Crear proyecto" está **deshabilitado** mientras el campo nombre esté vacío.
- Al hacer clic (o pulsar `Enter` en el campo nombre) se llama a `onSubmit` con los datos del formulario y el modal se cierra.

### RF-4 Acción "Cancelar"
- El botón "Cancelar" cierra el modal **sin llamar a `onSubmit`**.
- Hacer clic fuera del diálogo también lo cierra.

### RF-5 Reset del estado
Al cerrarse el modal (por cualquier vía), todos los campos vuelven a sus valores por defecto para la próxima apertura.

## Fuera de alcance
- Sin llamadas a API ni persistencia de datos.
- Sin validaciones de negocio (longitud mínima, caracteres especiales, etc.).
- Sin invitación de miembros (se añadirá en una iteración posterior).
