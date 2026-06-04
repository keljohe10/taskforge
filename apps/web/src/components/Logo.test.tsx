import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renderiza un svg', () => {
    const { container } = renderWithTheme(<Logo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('respeta el tamaño solicitado', () => {
    const { container } = renderWithTheme(<Logo size={40} />)
    const box = container.firstElementChild as HTMLElement
    expect(box).toHaveStyle({ width: '40px', height: '40px' })
  })
})
