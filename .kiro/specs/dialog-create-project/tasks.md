# Tareas — Modal "Crear proyecto"

## Completadas (v1)
- [x] Crear `apps/web/src/features/projects/CreateProjectDialog.tsx`
- [x] Crear `apps/web/src/features/projects/CreateProjectDialog.test.tsx`
- [x] Exportar `CreateProjectDialog`, `CreateProjectDialogProps` y `CreateProjectFormData` desde `src/components/index.ts`
- [x] Conectar botón "Nuevo proyecto" del TopBar en `ProjectsPage.tsx`
- [x] Conectar botón de `ProjectsEmptyState` con `onCreate` en `ProjectsPage.tsx`

## Pendientes (v2 — diseño screenshot)
- [x] Añadir `teamMembers`, `projectTemplates` y tipos `TeamMember`, `ProjectTemplate` a `src/data/mock.ts`
- [x] Añadir iconos `Lock` y `Folder` a `src/icons/index.tsx` si no existen
- [x] Actualizar `CreateProjectDialog.tsx`: cabecera con icono+subtítulo, campos Visibilidad, Plantilla y Miembros, pie de resumen, botón "+ Crear proyecto", IA activada por defecto
- [x] Actualizar `CreateProjectDialog.test.tsx` con los nuevos campos y comportamientos
- [x] Ejecutar tests (`pnpm vitest run`) y verificar que todos pasan
