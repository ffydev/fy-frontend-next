import DashboardAdmin from '@/components/Dashboards/DashboardAdmin'
import DashboardUser from '@/components/Dashboards/DashboardUser'
import { useAuth } from '@/hooks/ContextAuth'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { findCurrentUser, getUserToken } from './api/providers/auth.provider'

export default function Dashboard() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  const [hasCurrentUser, setHasCurrentUser] = useState<boolean>(false)

  const fetchCurrentUserData = useCallback(
    async (token: string) => {
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
    },
    [router, setUser],
  )

  useEffect(() => {
    if (!user && !hasCurrentUser) {
      const token = getUserToken()
      if (token) {
        fetchCurrentUserData(token)
      } else {
        router.replace('/login')
      }
    }
  }, [fetchCurrentUserData, hasCurrentUser, router, user])

  return (
    <>
      {user?.userType.name === 'admin' && <DashboardAdmin />}
      {user?.userType.name === 'user' && <DashboardUser />}
    </>
  )
}
