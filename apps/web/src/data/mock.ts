import type { Project, User } from '@taskforge/shared'

// Datos de demostración (sin backend). Reutiliza los tipos de @taskforge/shared
// y los extiende con un view-model de UI para lo que la pantalla necesita mostrar.

export type ProjectListItem = Project & {
  description: string
  /** Progreso 0–100. */
  progress: number
  /** Nombres de los miembros (para los avatares apilados). */
  members: string[]
  /** Color de acento del proyecto. */
  color: string
  /** Texto relativo de última actualización (ya formateado). */
  updatedAt: string
}

export const currentUser: User & { role: string } = {
  id: 'u-1',
  email: 'lucia.perez@taskforge.app',
  name: 'Lucía Pérez',
  role: 'Diseño',
}

// Proyectos listados en la sección "PROYECTOS" del sidebar.
export const sidebarProjects: Array<{ id: string, name: string, color: string }> = [
  { id: 'p-1', name: 'Rediseño onboarding', color: '#A78BFA' },
  { id: 'p-2', name: 'Mobile v2', color: '#34D399' },
  { id: 'p-3', name: 'API de facturación', color: '#FBBF24' },
  { id: 'p-4', name: 'Marketing Q2', color: '#60A5FA' },
]

// Catálogo completo de proyectos (para cuando se agreguen las cards).
export const projects: ProjectListItem[] = [
  {
    id: 'p-1',
    name: 'Rediseño onboarding',
    ownerId: 'u-1',
    archived: false,
    description: 'Simplificar el flujo para nuevos usuarios',
    progress: 64,
    members: ['Lucía Pérez', 'Mateo Ruiz', 'Sofía Díaz', 'Andrés Gil'],
    color: '#A78BFA',
    updatedAt: 'hace 2 h',
  },
  {
    id: 'p-2',
    name: 'Mobile v2',
    ownerId: 'u-2',
    archived: false,
    description: 'App iOS y Android rediseñada',
    progress: 32,
    members: ['Valentina Ríos', 'Andrés Gil', 'Sofía Díaz', 'Mateo Ruiz', 'Lucía Pérez', 'Bruno Campos'],
    color: '#34D399',
    updatedAt: 'hace 4 h',
  },
  {
    id: 'p-3',
    name: 'API de facturación',
    ownerId: 'u-3',
    archived: false,
    description: 'Endpoints Stripe + generación de PDF',
    progress: 8,
    members: ['Mateo Ruiz', 'Bruno Campos', 'Andrés Gil'],
    color: '#FBBF24',
    updatedAt: 'ayer',
  },
  {
    id: 'p-4',
    name: 'Marketing Q2',
    ownerId: 'u-4',
    archived: false,
    description: 'Plan de contenido para abril–junio',
    progress: 90,
    members: ['Sofía Díaz', 'Valentina Ríos'],
    color: '#60A5FA',
    updatedAt: 'hace 3 d',
  },
  {
    id: 'p-5',
    name: 'Investigación de usuarios',
    ownerId: 'u-1',
    archived: false,
    description: '12 entrevistas cualitativas',
    progress: 50,
    members: ['Lucía Pérez', 'Valentina Ríos', 'Bruno Campos'],
    color: '#F472B6',
    updatedAt: 'hace 1 sem',
  },
  {
    id: 'p-6',
    name: 'Infraestructura 2026',
    ownerId: 'u-3',
    archived: false,
    description: 'Migración a Kubernetes',
    progress: 20,
    members: ['Mateo Ruiz', 'Andrés Gil'],
    color: '#22D3EE',
    updatedAt: 'hace 2 sem',
  },
]

// Contadores mostrados como badges en la navegación.
export const navCounts = {
  projects: sidebarProjects.length,
  tasks: 12,
}

// Miembros disponibles para invitar al crear un proyecto.
export type TeamMember = { id: string; name: string }

export const teamMembers: TeamMember[] = [
  { id: 'u-1', name: 'Lucía Pérez' },
  { id: 'u-2', name: 'Mateo Ruiz' },
  { id: 'u-3', name: 'Sofía Díaz' },
  { id: 'u-4', name: 'Andrés Gil' },
]

// Plantillas predefinidas para nuevos proyectos.
export type ProjectTemplate = { value: string; label: string; hint: string }

export const projectTemplates: ProjectTemplate[] = [
  { value: 'kanban', label: 'Tablero Kanban', hint: 'Pendiente · En progreso · Hecha' },
  { value: 'scrum',  label: 'Scrum Sprint',   hint: 'Backlog · En curso · Revisión · Hecha' },
  { value: 'blank',  label: 'En blanco',       hint: 'Sin columnas predefinidas' },
]
