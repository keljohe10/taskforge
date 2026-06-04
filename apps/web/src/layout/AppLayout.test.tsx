import { describe, it, expect, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { theme } from '../theme/theme'
import { AppLayout } from './AppLayout'

const originalMatchMedia = window.matchMedia

function mockMatchMedia (matches: (query: string) => boolean) {
  window.matchMedia = ((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

function renderLayout () {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/x']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/x' element={<div>contenido hijo</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  )
}

afterEach(() => {
  window.matchMedia = originalMatchMedia
})

describe('AppLayout', () => {
  it('renderiza el contenido de la ruta hija y el sidebar', () => {
    mockMatchMedia(() => false) // mobile
    renderLayout()
    expect(screen.getByText('contenido hijo')).toBeInTheDocument()
    // El sidebar (Drawer temporal con keepMounted) está montado.
    expect(screen.getByText('TaskForge')).toBeInTheDocument()
  })

  it('en escritorio monta el sidebar permanente (landmark nav)', () => {
    mockMatchMedia((q) => q.includes('min-width')) // desktop
    renderLayout()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('contenido hijo')).toBeInTheDocument()
  })
})
