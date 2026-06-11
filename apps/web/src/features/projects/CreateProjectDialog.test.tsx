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
  it('renderiza título, subtítulo y controles principales', () => {
    render()
    expect(screen.getByRole('heading', { name: /Crear proyecto/i })).toBeInTheDocument()
    expect(screen.getByText('Un espacio para organizar tareas con tu equipo.')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre del proyecto')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
  })

  it('el botón "Crear proyecto" está deshabilitado con nombre vacío', () => {
    render()
    expect(screen.getByRole('button', { name: /Crear proyecto/i })).toBeDisabled()
  })

  it('el botón "Crear proyecto" se habilita al escribir un nombre', () => {
    render()
    fireEvent.change(screen.getByLabelText('Nombre del proyecto'), { target: { value: 'Mi proyecto' } })
    expect(screen.getByRole('button', { name: /Crear proyecto/i })).toBeEnabled()
  })

  it('llama a onSubmit con los datos correctos incluyendo nuevos campos', () => {
    const { onSubmit } = render()
    fireEvent.change(screen.getByLabelText('Nombre del proyecto'), { target: { value: 'Mi proyecto' } })
    fireEvent.click(screen.getByRole('button', { name: /Crear proyecto/i }))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Mi proyecto',
        visibility: 'team',
        template: 'kanban',
        aiSuggest: true,
      })
    )
  })

  it('llama a onClose al cancelar', () => {
    const { onClose } = render()
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('llama a onClose al pulsar el botón ✕', () => {
    const { onClose } = render()
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('no renderiza nada cuando open=false', () => {
    render({ open: false })
    expect(screen.queryByText('Crear proyecto')).not.toBeInTheDocument()
  })

  it('envía con Enter en el campo nombre', () => {
    const { onSubmit } = render()
    const input = screen.getByLabelText('Nombre del proyecto')
    fireEvent.change(input, { target: { value: 'Teclado' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Teclado' }))
  })

  it('muestra las opciones de visibilidad Equipo y Privado', () => {
    render()
    expect(screen.getByRole('radio', { name: /Equipo/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /Privado/i })).toBeInTheDocument()
  })

  it('muestra miembro inicial y el chip Invitar', () => {
    render()
    expect(screen.getByText('Lucía')).toBeInTheDocument()
    expect(screen.getByText('Invitar')).toBeInTheDocument()
  })

  it('muestra el pie de resumen con miembros y visibilidad', () => {
    render()
    expect(screen.getByText(/1 miembro · Visible para el equipo/i)).toBeInTheDocument()
  })

  it('cambia el pie al seleccionar Privado', () => {
    render()
    fireEvent.click(screen.getByRole('radio', { name: /Privado/i }))
    expect(screen.getByText(/Solo para ti/i)).toBeInTheDocument()
  })
})
