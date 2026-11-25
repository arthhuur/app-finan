import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function RotaProtegida({ children }: { children: ReactNode }) {
  const { session, carregando } = useAuth()

  if (carregando) return <p>Carregando...</p>
  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}
