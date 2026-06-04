import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { FeatureToggleCard } from './FeatureToggleCard'

describe('FeatureToggleCard', () => {
  it('renderiza título y descripción', () => {
    const { getByText } = renderWithTheme(
      <FeatureToggleCard
        icon={<span />}
        title='Generar tareas con IA'
        description='Claude propondrá un plan.'
        checked
        onChange={() => {}}
      />
    )
    expect(getByText('Generar tareas con IA')).toBeInTheDocument()
    expect(getByText('Claude propondrá un plan.')).toBeInTheDocument()
  })

  it('alterna el interruptor', async () => {
    const onChange = vi.fn()
    const { getByRole } = renderWithTheme(
      <FeatureToggleCard
        icon={<span />}
        title='IA'
        description='desc'
        checked={false}
        onChange={onChange}
      />
    )
    await userEvent.click(getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
