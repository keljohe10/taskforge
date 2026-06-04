import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { ViewToggle } from './ViewToggle'

describe('ViewToggle', () => {
  it('muestra ambas vistas y marca la activa', () => {
    const { getByRole } = renderWithTheme(<ViewToggle value='grid' onChange={() => {}} />)
    expect(getByRole('button', { name: 'Cuadrícula' })).toHaveAttribute('aria-pressed', 'true')
    expect(getByRole('button', { name: 'Lista' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('invoca onChange con el nuevo valor', async () => {
    const onChange = vi.fn()
    const { getByRole } = renderWithTheme(<ViewToggle value='grid' onChange={onChange} />)
    await userEvent.click(getByRole('button', { name: 'Lista' }))
    expect(onChange).toHaveBeenCalledWith('list')
  })

  it('no invoca onChange al re-seleccionar el valor activo', async () => {
    const onChange = vi.fn()
    const { getByRole } = renderWithTheme(<ViewToggle value='grid' onChange={onChange} />)
    await userEvent.click(getByRole('button', { name: 'Cuadrícula' }))
    expect(onChange).not.toHaveBeenCalled()
  })
})
