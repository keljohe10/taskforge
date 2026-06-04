import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderInOutletContext } from '../../test/utils'
import { ProjectsPage } from './ProjectsPage'

describe('ProjectsPage', () => {
  it('renderiza el encabezado, las acciones y el estado vacío', () => {
    renderInOutletContext(<ProjectsPage />)
    expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeInTheDocument()
    expect(screen.getByText('Todos los espacios donde estás colaborando.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cuadrícula' })).toBeInTheDocument()
    expect(screen.getByText('Aún no hay proyectos')).toBeInTheDocument()
  })

  it('alterna la vista a Lista', async () => {
    renderInOutletContext(<ProjectsPage />)
    const lista = screen.getByRole('button', { name: 'Lista' })
    expect(lista).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(lista)
    expect(lista).toHaveAttribute('aria-pressed', 'true')
  })

  it('la hamburguesa usa openMobileNav del contexto del layout', async () => {
    const { ctx } = renderInOutletContext(<ProjectsPage />)
    await userEvent.click(screen.getByLabelText('Abrir navegación'))
    expect(ctx.openMobileNav).toHaveBeenCalledTimes(1)
  })
})
