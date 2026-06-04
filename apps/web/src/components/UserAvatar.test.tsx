import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { UserAvatar, initials } from './UserAvatar'

describe('initials', () => {
  it('toma las iniciales de nombre y apellido', () => {
    expect(initials('Lucía Pérez')).toBe('LP')
  })

  it('limita a dos iniciales y las pasa a mayúsculas', () => {
    expect(initials('ana belen costa')).toBe('AB')
  })

  it('funciona con un solo nombre', () => {
    expect(initials('Madonna')).toBe('M')
  })
})

describe('UserAvatar', () => {
  it('renderiza las iniciales del nombre', () => {
    const { getByText } = renderWithTheme(<UserAvatar name='Sofía Díaz' />)
    expect(getByText('SD')).toBeInTheDocument()
  })

  it('asigna un color determinístico (mismo nombre, mismo fondo)', () => {
    const a = renderWithTheme(<UserAvatar name='Mateo Ruiz' />)
    const b = renderWithTheme(<UserAvatar name='Mateo Ruiz' />)
    const bgA = getComputedStyle(a.container.firstElementChild as HTMLElement).backgroundColor
    const bgB = getComputedStyle(b.container.firstElementChild as HTMLElement).backgroundColor
    expect(bgA).toBe(bgB)
    expect(bgA).not.toBe('')
  })

  it('reenvía className al contenedor', () => {
    const { container } = renderWithTheme(<UserAvatar name='X' className='chip-avatar' />)
    expect(container.firstElementChild).toHaveClass('chip-avatar')
  })
})
