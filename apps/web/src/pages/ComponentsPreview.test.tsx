import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../test/utils'
import { ComponentsPreview } from './ComponentsPreview'

// Smoke test de la galería temporal de desarrollo.
describe('ComponentsPreview', () => {
  it('renderiza el aviso temporal y las secciones de componentes', () => {
    const { getByText, getAllByText } = renderWithTheme(<ComponentsPreview />)
    expect(getByText(/Vista temporal de desarrollo/)).toBeInTheDocument()
    expect(getByText('Field + TextField')).toBeInTheDocument()
    expect(getByText('FeatureToggleCard')).toBeInTheDocument()
    // El bloque IA aparece (título dentro del FeatureToggleCard).
    expect(getAllByText(/Generar tareas iniciales con IA/).length).toBeGreaterThanOrEqual(1)
  })
})
