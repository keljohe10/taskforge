import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { AvatarStack } from './AvatarStack'

const names = ['Ana Lopez', 'Beto Ruiz', 'Caro Diaz', 'Dani Eco', 'Eva Frank']

describe('AvatarStack', () => {
  it('muestra hasta `max` avatares y un contador +N para el resto', () => {
    const { getByText, queryByText } = renderWithTheme(<AvatarStack names={names} max={3} />)
    expect(getByText('AL')).toBeInTheDocument()
    expect(getByText('CD')).toBeInTheDocument()
    expect(getByText('+2')).toBeInTheDocument()
    // El 5º nombre no se renderiza como avatar.
    expect(queryByText('EF')).not.toBeInTheDocument()
  })

  it('no muestra contador cuando caben todos', () => {
    const { queryByText } = renderWithTheme(<AvatarStack names={['Ana Lopez', 'Beto Ruiz']} max={3} />)
    expect(queryByText(/^\+/)).not.toBeInTheDocument()
  })
})
