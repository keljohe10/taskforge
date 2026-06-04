import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { NavItem } from './NavItem'

describe('NavItem', () => {
  it('renderiza etiqueta y badge', () => {
    const { getByText } = renderWithTheme(
      <NavItem icon={<span />} label='Proyectos' badge={4} />
    )
    expect(getByText('Proyectos')).toBeInTheDocument()
    expect(getByText('4')).toBeInTheDocument()
  })

  it('marca aria-current cuando está activo', () => {
    const { getByRole } = renderWithTheme(<NavItem icon={<span />} label='Panel' active />)
    expect(getByRole('button')).toHaveAttribute('aria-current', 'page')
  })

  it('invoca onClick al pulsar', async () => {
    const onClick = vi.fn()
    const { getByText } = renderWithTheme(<NavItem icon={<span />} label='Actividad' onClick={onClick} />)
    await userEvent.click(getByText('Actividad'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no renderiza badge cuando no se pasa', () => {
    const { queryByText } = renderWithTheme(<NavItem icon={<span />} label='Solo' />)
    expect(queryByText('0')).not.toBeInTheDocument()
  })
})
