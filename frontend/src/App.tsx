import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import MainLayout from './components/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DocumentsPage from './pages/DocumentsPage'
import EditorPage from './pages/EditorPage'
import SettingsPage from './pages/SettingsPage'
import SharePage from './pages/SharePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Navigate to={ROUTES.DOCUMENTS} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.DOCUMENTS}
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path={ROUTES.DOCUMENT}
        element={
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.SHARE} element={<SharePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
