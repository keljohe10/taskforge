import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { AvatarChip } from './AvatarChip'

describe('AvatarChip', () => {
  it('muestra el primer nombre del miembro', () => {
    const { getByText } = renderWithTheme(<AvatarChip name='Lucía Pérez' />)
    expect(getByText('Lucía')).toBeInTheDocument()
  })

  it('no muestra botón de eliminar sin onDelete', () => {
    const { container } = renderWithTheme(<AvatarChip name='Mateo Ruiz' />)
    expect(container.querySelector('.MuiChip-deleteIcon')).toBeNull()
  })

  it('invoca onDelete al pulsar el botón de eliminar', async () => {
    const onDelete = vi.fn()
    const { container } = renderWithTheme(<AvatarChip name='Sofía Díaz' onDelete={onDelete} />)
    const del = container.querySelector('.MuiChip-deleteIcon') as HTMLElement
    expect(del).not.toBeNull()
    await userEvent.click(del)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
