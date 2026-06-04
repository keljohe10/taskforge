import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { I, IconFolder } from './index'

describe('icons', () => {
  it('renderiza un icono como svg con el tamaño dado', () => {
    const { container } = render(<IconFolder size={24} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('el mapa I expone los iconos usados por el diálogo', () => {
    for (const key of ['Folder', 'X', 'Check', 'Users', 'Lock', 'Kanban', 'ChevDown', 'Plus', 'Sparkles'] as const) {
      expect(I[key]).toBeTypeOf('function')
    }
  })

  it('reenvía className al svg (lo necesita MUI Select)', () => {
    const { container } = render(<I.ChevDown className='mui-select-icon' />)
    expect(container.querySelector('svg')).toHaveClass('mui-select-icon')
  })

  it('aplica el color como stroke', () => {
    const { container } = render(<I.Check color='#fff' />)
    expect(container.querySelector('svg')).toHaveAttribute('stroke', '#fff')
  })
})
