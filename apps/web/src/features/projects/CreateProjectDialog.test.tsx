import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/utils'
import { CreateProjectDialog } from './CreateProjectDialog'

function render (props?: Partial<Parameters<typeof CreateProjectDialog>[0]>) {
  const onClose = vi.fn()
  const onSubmit = vi.fn()
  renderWithTheme(
    <CreateProjectDialog
      open={props?.open ?? true}
      onClose={props?.onClose ?? onClose}
      onSubmit={props?.onSubmit ?? onSubmit}
    />
  )
  return { onClose, onSubmit }
}

describe('CreateProjectDialog', () => {
  it('renderiza el título y los controles principales', () => {
    render()
    expect(screen.getByText('Nuevo proyecto')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
  })

  it('el botón "Crear proyecto" está deshabilitado con nombre vacío', () => {
    render()
    expect(screen.getByRole('button', { name: 'Crear proyecto' })).toBeDisabled()
  })

  it('el botón "Crear proyecto" se habilita al escribir un nombre', () => {
    render()
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Mi proyecto' } })
    expect(screen.getByRole('button', { name: 'Crear proyecto' })).toBeEnabled()
  })

  it('llama a onSubmit con los datos correctos', () => {
    const { onSubmit } = render()
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Mi proyecto' } })
    fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Descripción test' } })
    fireEvent.click(screen.getByRole('button', { name: 'Crear proyecto' }))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Mi proyecto', description: 'Descripción test' })
    )
  })

  it('llama a onClose y resetea el formulario al cancelar', () => {
    const { onClose } = render()
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'X' } })
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('no renderiza nada cuando open=false', () => {
    render({ open: false })
    expect(screen.queryByText('Nuevo proyecto')).not.toBeInTheDocument()
  })

  it('envía con Enter en el campo nombre', () => {
    const { onSubmit } = render()
    const input = screen.getByLabelText('Nombre')
    fireEvent.change(input, { target: { value: 'Teclado' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Teclado' }))
  })
})
