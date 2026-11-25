import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { sair } from '../services/authService'

export default function PainelPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleSair() {
    await sair()
    navigate('/login', { replace: true })
  }

  return (
    <main>
      <h1>Painel</h1>
      <p>Logado como: {user?.email}</p>
      <button onClick={handleSair}>Sair</button>
    </main>
  )
}
