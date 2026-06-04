import { describe, it, expect } from 'vitest'
import { theme } from './theme'
import { T } from './tokens'

describe('theme', () => {
  it('usa modo claro', () => {
    expect(theme.palette.mode).toBe('light')
  })

  it('mapea el color primario desde los tokens', () => {
    expect(theme.palette.primary.main).toBe(T.primary)
    expect(theme.palette.primary.dark).toBe(T.primaryHover)
  })

  it('mapea la escala de grises desde los tokens', () => {
    expect(theme.palette.grey[50]).toBe(T.n50)
    expect(theme.palette.grey[900]).toBe(T.n900)
  })

  it('usa Inter como fuente y radio base 8', () => {
    expect(theme.typography.fontFamily).toContain('Inter')
    expect(theme.shape.borderRadius).toBe(8)
  })

  it('los botones no usan mayúsculas automáticas', () => {
    expect(theme.components?.MuiButton).toBeDefined()
    expect(theme.typography.button.textTransform).toBe('none')
  })

  it('registra overrides para los componentes del diálogo', () => {
    expect(theme.components?.MuiOutlinedInput).toBeDefined()
    expect(theme.components?.MuiRadio).toBeDefined()
    expect(theme.components?.MuiChip).toBeDefined()
  })
})
