import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { useLayout } from './useLayout'

function Consumer () {
  const { openMobileNav } = useLayout()
  return <button onClick={openMobileNav}>abrir</button>
}

describe('useLayout', () => {
  it('devuelve el contexto del Outlet e invoca openMobileNav', async () => {
    const openMobileNav = vi.fn()
    render(
      <MemoryRouter initialEntries={['/x']}>
        <Routes>
          <Route element={<Outlet context={{ openMobileNav }} />}>
            <Route path='/x' element={<Consumer />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    await userEvent.click(screen.getByText('abrir'))
    expect(openMobileNav).toHaveBeenCalledTimes(1)
  })
})
