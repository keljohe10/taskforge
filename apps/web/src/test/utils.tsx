import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { theme } from '../theme/theme'
import type { LayoutContext } from '../hooks/useLayout'

// Envuelve en el ThemeProvider real para que apliquen los overrides del tema.
export function renderWithTheme (ui: ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

// Envuelve en ThemeProvider + MemoryRouter.
export function renderWithRouter (
  ui: ReactNode,
  { initialEntries = ['/'] }: { initialEntries?: string[] } = {}
) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </ThemeProvider>
  )
}

// Monta `ui` como elemento de una ruta hija de un Outlet que provee el contexto del layout.
// Útil para páginas que consumen useLayout().
export function renderInOutletContext (
  ui: ReactElement,
  ctx: LayoutContext = { openMobileNav: vi.fn() }
) {
  const result = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/x']}>
        <Routes>
          <Route element={<Outlet context={ctx} />}>
            <Route path='/x' element={ui} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  )
  return { ...result, ctx }
}
