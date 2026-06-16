# Tasks — dialog-create-project

- [x] **TASK-1 · Crear `CreateProjectDialog.tsx`**

  Crear el archivo `apps/web/src/features/projects/CreateProjectDialog.tsx` con el esqueleto del componente: `Dialog` de MUI, sus tres secciones (cabecera, `DialogContent`, pie) y los 7 `useState` del diseño. Sin contenido interior aún.

  - Requisitos: REQ-2, REQ-11.4
  - Criterio de hecho: el componente compila y acepta las props `open` / `onClose`.

- [x] **TASK-2 · Cabecera del modal**

  Implementar la cabecera dentro de `CreateProjectDialog`: `IconBadge` (bg derivado de `color`), título, subtítulo y botón de cierre `IconButton` con `I.X`.

  - Requisitos: REQ-2.1, REQ-2.2, REQ-4.3
  - Criterio de hecho: el badge cambia de color al cambiar el estado `color`; el botón × llama a `onClose`.

- [x] **TASK-3 · Campo "Nombre del proyecto"**

  Añadir al `DialogContent` el `Field` con label "NOMBRE DEL PROYECTO" y un `TextField` MUI con `autoFocus` y estado `name`.

  - Requisitos: REQ-3.1, REQ-3.2, REQ-3.3
  - Criterio de hecho: el campo recibe foco al abrir; el valor se refleja en `name`.

- [x] **TASK-4 · Selector de color**

  Añadir al `DialogContent` el `Field` con label "COLOR" y `ColorSwatchPicker` conectado al estado `color`.

  - Requisitos: REQ-4.1, REQ-4.2, REQ-4.4
  - Criterio de hecho: al cambiar swatch se actualiza `color` y, por tanto, el badge de TASK-2.

- [x] **TASK-5 · Campo "Descripción"**

  Añadir al `DialogContent` el `Field` con label "DESCRIPCIÓN" y un `TextField` MUI `multiline rows={3}` conectado al estado `description`.

  - Requisitos: REQ-5.1, REQ-5.2
  - Criterio de hecho: el campo acepta texto y lo almacena en `description`.

- [x] **TASK-6 · Selector de visibilidad**

  Añadir en la columna izquierda de la fila grid el `Field` con label "VISIBILIDAD" y dos `RadioCard` ("Equipo" con `I.Users`, "Privado" con `I.Lock`) conectados al estado `visibility`.

  - Requisitos: REQ-6.1, REQ-6.2, REQ-6.3, REQ-6.4
  - Criterio de hecho: solo un `RadioCard` puede estar seleccionado; el valor inicial es `"team"`.

- [x] **TASK-7 · Selector de plantilla**

  Añadir en la columna derecha de la fila grid el `Field` con label "PLANTILLA", el `SelectField` con las constantes `TEMPLATES` y `TEMPLATE_HINTS`, y el `Typography` de hint reactivo debajo.

  - Requisitos: REQ-7.1, REQ-7.2, REQ-7.3, REQ-7.4, REQ-7.5
  - Criterio de hecho: al cambiar plantilla, el hint muestra el texto correspondiente de `TEMPLATE_HINTS`.

- [x] **TASK-8 · Sección de miembros**

  Añadir al `DialogContent` el `Field` con label "MIEMBROS", los `AvatarChip` del estado `members` y el `AddChip` "Invitar" sin handler.

  - Requisitos: REQ-8.1, REQ-8.2, REQ-8.3, REQ-8.4, REQ-8.5
  - Criterio de hecho: se renderizan los 2 chips stub y el chip "Invitar"; no hay lógica de añadir.

- [x] **TASK-9 · Toggle de IA**

  Añadir al `DialogContent` el `FeatureToggleCard` con `I.Sparkles`, los textos definidos en el diseño y el estado `aiEnabled` (por defecto `true`).

  - Requisitos: REQ-9.1, REQ-9.2, REQ-9.3
  - Criterio de hecho: el toggle arranca activado y su estado cambia al pulsarlo.

- [x] **TASK-10 · Pie de página**

  Implementar el pie con el texto resumen reactivo (`members.length` + `visibility`) a la izquierda y los botones "Cancelar" (`variant="text"`, llama a `onClose`) y "+ Crear proyecto" (`variant="contained"`) a la derecha.

  - Requisitos: REQ-10.1, REQ-10.2, REQ-10.3, REQ-10.4
  - Criterio de hecho: el resumen cambia al seleccionar distinta visibilidad; "Cancelar" cierra el modal.

- [x] **TASK-11 · Reset del formulario al cerrar**

  Envolver `onClose` para que restaure los 7 estados a sus valores iniciales antes de llamar a la prop `onClose`.

  - Requisitos: REQ-11.4
  - Criterio de hecho: al reabrir el modal, todos los campos aparecen en su estado inicial.

- [x] **TASK-12 · Conectar el modal a la página `/projects`**

  En la página `/projects`, añadir `useState(false)` para `dialogOpen`, conectar el botón "+ Nuevo proyecto" a `setDialogOpen(true)` y renderizar `<CreateProjectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />`.

  - Requisitos: REQ-1.1, REQ-1.2, REQ-1.3
  - Criterio de hecho: el modal abre y cierra desde la página sin afectar a ningún otro punto de la UI.
