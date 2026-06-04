import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { AddChip } from './AddChip'

describe('AddChip', () => {
  it('renderiza la etiqueta', () => {
    const { getByText } = renderWithTheme(<AddChip label='Invitar' />)
    expect(getByText('Invitar')).toBeInTheDocument()
  })

  it('invoca onClick al pulsar', async () => {
    const onClick = vi.fn()
    const { getByText } = renderWithTheme(<AddChip label='Invitar' onClick={onClick} />)
    await userEvent.click(getByText('Invitar'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
