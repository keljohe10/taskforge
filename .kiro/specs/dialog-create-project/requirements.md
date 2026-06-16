# Requirements — dialog-create-project

Modal de "Crear proyecto" que se abre desde la página `/projects`.
Alcance: **solo frontend, sin lógica de red ni persistencia.**

---

## REQ-1 · Apertura del modal

El botón "Nuevo proyecto" de la página `/projects` abre el diálogo `CreateProjectDialog`.

**Criterios de aceptación**
- 1.1 Al hacer clic en "+ Nuevo proyecto", el modal se vuelve visible (MUI `Dialog` con `open={true}`).
- 1.2 El fondo queda bloqueado con el overlay semitransparente estándar de MUI.
- 1.3 El modal no aparece en ningún otro punto de la UI (no hay otros disparadores).

---

## REQ-2 · Estructura y cabecera del modal

El modal tiene cabecera, cuerpo con scroll y pie de página fijo.

**Criterios de aceptación**
- 2.1 La cabecera muestra un `IconBadge` con el color actualmente seleccionado, el título "Crear proyecto" y el subtítulo "Un espacio para organizar tareas con tu equipo."
- 2.2 Hay un botón de cierre (×) en la esquina superior derecha de la cabecera.
- 2.3 El cuerpo es desplazable verticalmente si el contenido supera la altura visible.
- 2.4 El pie de página con los botones de acción permanece siempre visible, no hace scroll.

---

## REQ-3 · Campo "Nombre del proyecto"

Campo de texto libre, obligatorio visualmente.

**Criterios de aceptación**
- 3.1 Se renderiza con el componente `Field` (label: "NOMBRE DEL PROYECTO") envolviendo un `TextField` de MUI.
- 3.2 El campo tiene foco automático al abrir el modal.
- 3.3 El `TextField` acepta entrada libre; su valor se almacena en estado local del componente.
- 3.4 No hay validación activa en este sprint (sin mensajes de error).

---

## REQ-4 · Selector de color

Selector de color del proyecto.

**Criterios de aceptación**
- 4.1 Se renderiza con el componente `Field` (label: "COLOR") envolviendo `ColorSwatchPicker`.
- 4.2 `ColorSwatchPicker` muestra la paleta predeterminada (`T.projectSwatches`).
- 4.3 Al seleccionar un color, el `IconBadge` de la cabecera (REQ-2.1) se actualiza inmediatamente.
- 4.4 Hay siempre un color seleccionado por defecto al abrir el modal (primer swatch de la paleta).

---

## REQ-5 · Campo "Descripción"

Área de texto opcional.

**Criterios de aceptación**
- 5.1 Se renderiza con el componente `Field` (label: "DESCRIPCIÓN") envolviendo un `TextField` MUI multiline de 3 filas.
- 5.2 El valor se almacena en estado local del componente.

---

## REQ-6 · Selector de visibilidad

Control de visibilidad del proyecto: "Equipo" o "Privado".

**Criterios de aceptación**
- 6.1 Se renderiza con el componente `Field` (label: "VISIBILIDAD") con dos opciones usando `RadioCard`.
- 6.2 La opción "Equipo" usa el icono de usuarios; la opción "Privado" usa el icono de candado.
- 6.3 Solo puede haber una opción seleccionada a la vez.
- 6.4 "Equipo" está seleccionada por defecto al abrir el modal.

---

## REQ-7 · Selector de plantilla

Dropdown para elegir la plantilla inicial del proyecto.

**Criterios de aceptación**
- 7.1 Se renderiza con el componente `Field` (label: "PLANTILLA") envolviendo `SelectField`.
- 7.2 Las opciones son al menos: "Tablero Kanban", "Lista simple" y "Sin plantilla".
- 7.3 "Tablero Kanban" está seleccionado por defecto.
- 7.4 Debajo del `SelectField` se muestra un hint de texto con los estados de la plantilla activa (ej. "Pendiente · En progreso · Hecha").
- 7.5 El hint se actualiza al cambiar la plantilla seleccionada.

---

## REQ-8 · Sección de miembros

Lista de miembros invitados al proyecto.

**Criterios de aceptación**
- 8.1 Se renderiza con el componente `Field` (label: "MIEMBROS") con una fila de chips.
- 8.2 Cada miembro se representa con `AvatarChip` mostrando su nombre.
- 8.3 Al final de la fila hay un `AddChip` con la etiqueta "Invitar" y el icono `+`.
- 8.4 La lista se inicializa con datos stub (mínimo 2 miembros de ejemplo).
- 8.5 El clic en el `AddChip` no tiene lógica en este sprint.

---

## REQ-9 · Toggle "Generar tareas iniciales con IA"

Tarjeta de activación de la sugerencia de subtareas por IA.

**Criterios de aceptación**
- 9.1 Se renderiza el componente `FeatureToggleCard` con el icono de IA, título "Generar tareas iniciales con IA" y descripción "Claude propondrá un plan de tareas a partir del nombre y la descripción."
- 9.2 El toggle está activado (`checked={true}`) por defecto al abrir el modal.
- 9.3 El estado del toggle se almacena en estado local del componente.

---

## REQ-10 · Pie de página con resumen y acciones

Barra de acciones fija en la parte inferior del modal.

**Criterios de aceptación**
- 10.1 A la izquierda se muestra un texto resumen con el número de miembros y la visibilidad seleccionada (ej. "4 miembros · Visible para el equipo").
- 10.2 El texto del resumen se actualiza reactivamente al cambiar miembros (REQ-8) o visibilidad (REQ-6).
- 10.3 A la derecha hay un botón "Cancelar" (variante `text`) y un botón "+ Crear proyecto" (variante `contained`, color primary).
- 10.4 Ambos botones no tienen lógica de submit en este sprint; el botón "Cancelar" cierra el modal.

---

## REQ-11 · Cierre del modal

El modal puede cerrarse por tres vías.

**Criterios de aceptación**
- 11.1 Clic en el botón × de la cabecera cierra el modal.
- 11.2 Clic en el botón "Cancelar" del pie cierra el modal.
- 11.3 Clic en el overlay exterior cierra el modal.
- 11.4 Al cerrarse, el formulario se resetea al estado inicial para la próxima apertura.

---

## REQ-12 · Componentes reutilizados

El diálogo se construye exclusivamente con los componentes de `apps/web/src/components`.

**Criterios de aceptación**
- 12.1 Los siguientes componentes se usan sin modificarlos: `Field`, `IconBadge`, `ColorSwatchPicker`, `RadioCard`, `SelectField`, `AvatarChip`, `AddChip`, `FeatureToggleCard`, `Switch`.
- 12.2 No se crean nuevos componentes genéricos; solo el propio `CreateProjectDialog` como componente de feature.
- 12.3 No se duplica ningún tipo ya exportado desde `@taskforge/shared` o `apps/web/src/components`.
