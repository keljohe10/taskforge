import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../test/utils'
import { SelectField } from './SelectField'

const options = [
  { value: 'kanban', label: 'Tablero Kanban' },
  { value: 'list', label: 'Lista simple' },
]

describe('SelectField', () => {
  it('muestra la etiqueta de la opción seleccionada', () => {
    const { getByText } = renderWithTheme(
      <SelectField value='kanban' onChange={() => {}} options={options} />
    )
    expect(getByText('Tablero Kanban')).toBeInTheDocument()
  })

  it('abre el menú y selecciona otra opción', async () => {
    const onChange = vi.fn()
    const { getByRole, findByRole } = renderWithTheme(
      <SelectField value='kanban' onChange={onChange} options={options} />
    )
    await userEvent.click(getByRole('combobox'))
    await userEvent.click(await findByRole('option', { name: 'Lista simple' }))
    expect(onChange).toHaveBeenCalledWith('list')
  })
})
