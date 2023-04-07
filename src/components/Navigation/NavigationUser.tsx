import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/ContextAuth'

export default function NavigationUser() {
  const router = useRouter()
  const { user } = useAuth()
  return (
    <>
      {!user?.isRegistered ? (
        <>
          <h1>Atualizar usuário</h1>
        </>
      ) : (
        <>
          <h1>Painel com dashboard workouts e etc</h1>
        </>
      )}
    </>
  )
}
