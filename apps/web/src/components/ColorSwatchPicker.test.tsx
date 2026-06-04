import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { ColorSwatchPicker } from './ColorSwatchPicker'

const colors = ['#A78BFA', '#34D399', '#FBBF24']

describe('ColorSwatchPicker', () => {
  it('renderiza un botón por color', () => {
    const { getAllByRole } = renderWithTheme(
      <ColorSwatchPicker value='#A78BFA' onChange={() => {}} colors={colors} />
    )
    expect(getAllByRole('button')).toHaveLength(3)
  })

  it('marca aria-pressed en el color seleccionado', () => {
    const { getByRole } = renderWithTheme(
      <ColorSwatchPicker value='#34D399' onChange={() => {}} colors={colors} />
    )
    expect(getByRole('button', { name: 'Color #34D399' })).toHaveAttribute('aria-pressed', 'true')
    expect(getByRole('button', { name: 'Color #A78BFA' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('invoca onChange con el color elegido', async () => {
    const onChange = vi.fn()
    const { getByRole } = renderWithTheme(
      <ColorSwatchPicker value='#A78BFA' onChange={onChange} colors={colors} />
    )
    await userEvent.click(getByRole('button', { name: 'Color #FBBF24' }))
    expect(onChange).toHaveBeenCalledWith('#FBBF24')
  })
})
