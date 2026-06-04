import { useOutletContext } from 'react-router-dom'

export type LayoutContext = {
  /** Abre el drawer de navegación en mobile. */
  openMobileNav: () => void
}

// Hook para que las páginas accedan al contexto del layout (p. ej. la hamburguesa).
export function useLayout (): LayoutContext {
  return useOutletContext<LayoutContext>()
}
