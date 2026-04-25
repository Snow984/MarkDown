import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { fetchCurrentUser } from '../store/authSlice'
import { ROUTES } from '../constants/routes'
import { Spin } from 'antd'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading, token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(fetchCurrentUser())
    }
  }, [token, isAuthenticated, dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
