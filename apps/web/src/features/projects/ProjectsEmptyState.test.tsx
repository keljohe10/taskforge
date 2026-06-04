import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../../test/utils'
import { ProjectsEmptyState } from './ProjectsEmptyState'

describe('ProjectsEmptyState', () => {
  it('muestra el mensaje y el CTA', () => {
    const { getByText, getByRole } = renderWithTheme(<ProjectsEmptyState />)
    expect(getByText('Aún no hay proyectos')).toBeInTheDocument()
    expect(getByRole('button', { name: /Nuevo proyecto/ })).toBeInTheDocument()
  })

  it('invoca onCreate al pulsar el CTA', async () => {
    const onCreate = vi.fn()
    const { getByRole } = renderWithTheme(<ProjectsEmptyState onCreate={onCreate} />)
    await userEvent.click(getByRole('button', { name: /Nuevo proyecto/ }))
    expect(onCreate).toHaveBeenCalledTimes(1)
  })
})
