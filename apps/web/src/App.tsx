import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { ProjectsPage } from './features/projects/ProjectsPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { ComponentsPreview } from './pages/ComponentsPreview'

export default function App () {
  return (
    <Routes>
      {/* Ruta temporal de desarrollo — eliminar al construir el diálogo. */}
      <Route path='/dev/components' element={<ComponentsPreview />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to='/projects' replace />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/panel' element={<PlaceholderPage title='Panel' />} />
        <Route path='/tareas' element={<PlaceholderPage title='Mis tareas' />} />
        <Route path='/actividad' element={<PlaceholderPage title='Actividad' />} />
        <Route path='*' element={<Navigate to='/projects' replace />} />
      </Route>
    </Routes>
  )
}
