import DashboardAdmin from '@/components/Dashboards/DashboardAdmin'
import DashboardUser from '@/components/Dashboards/DashboardUser'
import { useAuth } from '@/hooks/ContextAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])

  return (
    <>
      {user?.userType.name === 'admin' && <DashboardAdmin />}
      {user?.userType.name === 'user' && <DashboardUser />}
    </>
  )
}
