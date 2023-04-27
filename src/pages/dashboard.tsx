import DashboardMenuUser from '@/components/Dashboards/DashboardMenuUser'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'
import DashboardMenuOwner from '@/components/Dashboards/DashboardMenuOwner'

export default function Dashboard() {
  const router = useRouter()
  const { user, setUser, signOut } = useAuthStore()
  const [hasCurrentUser, setHasCurrentUser] = useState<boolean>(false)

  useEffect(() => {
    if (!user && !hasCurrentUser) {
      const token = getUserToken()
      if (token) {
        const fetchCurrentUserData = async (token: string) => {
          try {
            const currentUserData = await findCurrentUser(token)

            if (!currentUserData) {
              // Implementar mensagem personalizada
              router.push('/login')
              return
            }

            setUser(currentUserData)
            setHasCurrentUser(true)
          } catch (error) {
            console.error(error)
            router.push('/login')
          }
        }

        fetchCurrentUserData(token)
      } else {
        router.replace('/login')
      }
    }
  }, [hasCurrentUser, router, user, signOut, setUser])

  return (
    <>
      {user?.userType.name === 'Admin' && <DashboardMenuOwner />}
      {user?.userType.name === 'Owner' && <DashboardMenuOwner />}
      {user?.userType.name === 'User' && <DashboardMenuUser />}
    </>
  )
}
