import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { theme } from '../theme/theme'
import { SidebarContent } from './SidebarContent'

function LocationDisplay () {
  return <div data-testid='loc'>{useLocation().pathname}</div>
}

function setup (onNavigate?: () => void, initial = '/projects') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path='*' element={<><SidebarContent onNavigate={onNavigate} /><LocationDisplay /></>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  )
}

describe('SidebarContent', () => {
  it('renderiza marca, navegación, proyectos y usuario', () => {
    setup()
    expect(screen.getByText('TaskForge')).toBeInTheDocument()
    expect(screen.getByText('Panel')).toBeInTheDocument()
    expect(screen.getByText('Mis tareas')).toBeInTheDocument()
    expect(screen.getByText('Lucía Pérez')).toBeInTheDocument()
    expect(screen.getByText('Mobile v2')).toBeInTheDocument()
  })

  it('marca como activo el item de la ruta actual', () => {
    setup(undefined, '/projects')
    // "Proyectos" aparece como item de nav y como título de sección; tomamos el botón.
    const proyectos = screen.getByRole('button', { name: /Proyectos/ })
    expect(proyectos).toHaveAttribute('aria-current', 'page')
  })

  it('navega y dispara onNavigate al pulsar un item', async () => {
    const onNavigate = vi.fn()
    setup(onNavigate, '/projects')
    await userEvent.click(screen.getByText('Panel'))
    expect(screen.getByTestId('loc')).toHaveTextContent('/panel')
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
