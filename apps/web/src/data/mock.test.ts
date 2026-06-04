import { describe, it, expect } from 'vitest'
import { currentUser, sidebarProjects, projects, navCounts } from './mock'

describe('mock data', () => {
  it('currentUser tiene la forma esperada', () => {
    expect(currentUser).toMatchObject({ id: expect.any(String), name: 'Lucía Pérez', role: 'Diseño' })
    expect(currentUser.email).toContain('@')
  })

  it('sidebarProjects tiene 4 entradas con id, nombre y color', () => {
    expect(sidebarProjects).toHaveLength(4)
    for (const p of sidebarProjects) {
      expect(p.id).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('projects tiene 6 entradas con progreso válido y miembros', () => {
    expect(projects).toHaveLength(6)
    for (const p of projects) {
      expect(p.progress).toBeGreaterThanOrEqual(0)
      expect(p.progress).toBeLessThanOrEqual(100)
      expect(p.members.length).toBeGreaterThan(0)
      expect(p.archived).toBe(false)
    }
  })

  it('los ids de proyecto son únicos', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('navCounts refleja el número de proyectos del sidebar', () => {
    expect(navCounts.projects).toBe(sidebarProjects.length)
    expect(navCounts.tasks).toBeGreaterThan(0)
  })
})
