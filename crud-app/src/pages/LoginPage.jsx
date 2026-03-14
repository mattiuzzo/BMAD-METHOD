import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { initiateOAuthFlow } from '../utils/mockOAuth'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  async function handleLogin() {
    setLoading(true)
    try {
      const payload = await initiateOAuthFlow()
      login(payload)
      navigate('/dashboard')
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>CRUD App</h1>
        <p className={styles.subtitle}>Faça login para continuar</p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={styles.oauthBtn}
        >
          {loading ? 'Autenticando...' : 'Entrar com OAuth'}
        </button>
      </div>
    </div>
  )
}
