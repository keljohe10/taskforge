import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { Switch } from './Switch'

describe('Switch', () => {
  it('refleja el estado checked', () => {
    const { getByRole } = renderWithTheme(<Switch checked onChange={() => {}} aria-label='ia' />)
    expect(getByRole('checkbox')).toBeChecked()
  })

  it('invoca onChange con el nuevo valor al pulsar', async () => {
    const onChange = vi.fn()
    const { getByRole } = renderWithTheme(<Switch checked={false} onChange={onChange} aria-label='ia' />)
    await userEvent.click(getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
