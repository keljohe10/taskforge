import { describe, it, expect } from 'vitest'
import { TF_TOKENS, T } from './tokens'

describe('tokens', () => {
  it('expone T como alias de TF_TOKENS', () => {
    expect(T).toBe(TF_TOKENS)
  })

  it('define el color primario y el de IA', () => {
    expect(T.primary).toBe('#4F46E5')
    expect(T.ai).toBe('#8B5CF6')
  })

  it('tiene 8 swatches de proyecto, todos en formato hex', () => {
    expect(T.projectSwatches).toHaveLength(8)
    for (const c of T.projectSwatches) {
      expect(c).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('tiene 8 pares de colores de avatar (fondo, texto)', () => {
    expect(T.avatarColors).toHaveLength(8)
    for (const pair of T.avatarColors) {
      expect(pair).toHaveLength(2)
      expect(pair[0]).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(pair[1]).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('expone la escala de grises completa n0..n950', () => {
    expect(T.n0).toBe('#FFFFFF')
    expect(T.n950).toBe('#09090B')
  })
})
