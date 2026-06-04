import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  it('renderiza los breadcrumbs y las acciones', () => {
    const { getByText } = renderWithTheme(
      <TopBar breadcrumbs={['Proyectos']} actions={<button>Nuevo</button>} />
    )
    expect(getByText('Proyectos')).toBeInTheDocument()
    expect(getByText('Nuevo')).toBeInTheDocument()
  })

  it('invoca onMenuClick al pulsar la hamburguesa', async () => {
    const onMenuClick = vi.fn()
    const { getByLabelText } = renderWithTheme(
      <TopBar breadcrumbs={['Proyectos']} onMenuClick={onMenuClick} />
    )
    await userEvent.click(getByLabelText('Abrir navegación'))
    expect(onMenuClick).toHaveBeenCalledTimes(1)
  })

  it('renderiza múltiples breadcrumbs con separadores', () => {
    const { getByText, getAllByText } = renderWithTheme(
      <TopBar breadcrumbs={['Proyectos', 'Detalle']} />
    )
    expect(getByText('Detalle')).toBeInTheDocument()
    expect(getAllByText('/').length).toBe(1)
  })
})
