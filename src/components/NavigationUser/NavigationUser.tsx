import { useAuth } from '@/hooks/ContextAuth'
import CompleteUserRegistration from './CompleteUserRegistration'

export default function NavigationUser() {
  const { user } = useAuth()
  return (
    <>
      {!user?.isRegistered ? (
        <>
          <CompleteUserRegistration />
        </>
      ) : (
        <>
          <h1>Painel com dashboard workouts e etc</h1>
        </>
      )}
    </>
  )
}
