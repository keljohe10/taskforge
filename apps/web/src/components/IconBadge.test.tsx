import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { IconBadge } from './IconBadge'

describe('IconBadge', () => {
  it('renderiza el contenido (icono)', () => {
    const { getByTestId } = renderWithTheme(
      <IconBadge bg='#34D399'><span data-testid='ico' /></IconBadge>
    )
    expect(getByTestId('ico')).toBeInTheDocument()
  })

  it('aplica el tamaño solicitado', () => {
    const { container } = renderWithTheme(<IconBadge size={48}><span /></IconBadge>)
    expect(container.firstElementChild).toHaveStyle({ width: '48px', height: '48px' })
  })
})
