import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { Field } from './Field'

describe('Field', () => {
  it('renderiza la etiqueta, el hint y los hijos', () => {
    const { getByText } = renderWithTheme(
      <Field label='Nombre del proyecto' hint='Máximo 60 caracteres'>
        <input aria-label='campo' />
      </Field>
    )
    expect(getByText('Nombre del proyecto')).toBeInTheDocument()
    expect(getByText('Máximo 60 caracteres')).toBeInTheDocument()
  })

  it('asocia la etiqueta con el control vía htmlFor', () => {
    const { getByLabelText } = renderWithTheme(
      <Field label='Color' htmlFor='color-input'>
        <input id='color-input' />
      </Field>
    )
    expect(getByLabelText('Color')).toBeInTheDocument()
  })

  it('omite el hint cuando no se pasa', () => {
    const { queryByText } = renderWithTheme(
      <Field label='Solo'>
        <input aria-label='x' />
      </Field>
    )
    expect(queryByText('Máximo')).not.toBeInTheDocument()
  })
})
