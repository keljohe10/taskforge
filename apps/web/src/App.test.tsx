import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from './test/utils'
import App from './App'

describe('App routing', () => {
  it('/projects muestra la página de Proyectos', () => {
    renderWithRouter(<App />, { initialEntries: ['/projects'] })
    expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeInTheDocument()
    expect(screen.getByText('Aún no hay proyectos')).toBeInTheDocument()
  })

  it('/ redirige a /projects', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] })
    expect(screen.getByText('Todos los espacios donde estás colaborando.')).toBeInTheDocument()
  })

  it('/panel muestra el placeholder', () => {
    renderWithRouter(<App />, { initialEntries: ['/panel'] })
    expect(screen.getByRole('heading', { name: 'Panel' })).toBeInTheDocument()
    expect(screen.getByText('Próximamente.')).toBeInTheDocument()
  })

  it('/dev/components muestra la galería temporal', () => {
    renderWithRouter(<App />, { initialEntries: ['/dev/components'] })
    expect(screen.getByText(/Vista temporal de desarrollo/)).toBeInTheDocument()
  })

  it('una ruta desconocida redirige a /projects', () => {
    renderWithRouter(<App />, { initialEntries: ['/no-existe'] })
    expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeInTheDocument()
  })
})
