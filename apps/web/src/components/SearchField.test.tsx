import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { SearchField } from './SearchField'

describe('SearchField', () => {
  it('muestra el placeholder por defecto y el atajo ⌘K', () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(<SearchField />)
    expect(getByPlaceholderText('Buscar…')).toBeInTheDocument()
    expect(getByText('⌘K')).toBeInTheDocument()
  })

  it('acepta un placeholder personalizado', () => {
    const { getByPlaceholderText } = renderWithTheme(<SearchField placeholder='Filtrar proyectos' />)
    expect(getByPlaceholderText('Filtrar proyectos')).toBeInTheDocument()
  })
})
