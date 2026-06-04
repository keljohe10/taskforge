import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderInOutletContext } from '../test/utils'
import { PlaceholderPage } from './PlaceholderPage'

describe('PlaceholderPage', () => {
  it('renderiza el título y el aviso de próximamente', () => {
    renderInOutletContext(<PlaceholderPage title='Panel' />)
    expect(screen.getByRole('heading', { name: 'Panel' })).toBeInTheDocument()
    expect(screen.getByText('Próximamente.')).toBeInTheDocument()
  })

  it('muestra el título también en el breadcrumb', () => {
    renderInOutletContext(<PlaceholderPage title='Actividad' />)
    expect(screen.getAllByText('Actividad').length).toBeGreaterThanOrEqual(1)
  })
})
