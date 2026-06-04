import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { RadioCard } from './RadioCard'

describe('RadioCard', () => {
  it('expone rol radio con aria-checked según selected', () => {
    const { getByRole, rerender } = renderWithTheme(
      <RadioCard selected={false} onSelect={() => {}}>Equipo</RadioCard>
    )
    expect(getByRole('radio')).toHaveAttribute('aria-checked', 'false')
    rerender(<RadioCard selected onSelect={() => {}}>Equipo</RadioCard>)
    expect(getByRole('radio')).toHaveAttribute('aria-checked', 'true')
  })

  it('renderiza el contenido y dispara onSelect al pulsar', async () => {
    const onSelect = vi.fn()
    const { getByText } = renderWithTheme(
      <RadioCard selected={false} onSelect={onSelect}>Privado</RadioCard>
    )
    expect(getByText('Privado')).toBeInTheDocument()
    await userEvent.click(getByText('Privado'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
