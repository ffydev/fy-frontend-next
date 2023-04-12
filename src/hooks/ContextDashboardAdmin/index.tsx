import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  userId: string
  isShowingUsers: boolean
  isShowingWorkouts: boolean
  isShowingFeedbacks: boolean
  setuserId(newValue: string): void
  setIsShowingUsers(isShowingUsers: boolean): void
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowingFeedbacks(isShowingFeedbacks: boolean): void
}

export const ContextDashboardAdmin = createContext<ContextData>({
  userId: '',
  isShowingUsers: true,
  isShowingWorkouts: false,
  isShowingFeedbacks: false,
  setuserId: () => {},
  setIsShowingUsers: () => {},
  setIsShowingWorkouts: () => {},
  setIsShowingFeedbacks: () => {},
})

type ContextDashboardAdminProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardAdminProvider({
  children,
}: ContextDashboardAdminProviderProps) {
  const [userId, setuserId] = useState<string>('')
  const [isShowingUsers, setIsShowingUsers] = useState<boolean>(true)
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowingFeedbacks, setIsShowingFeedbacks] = useState<boolean>(false)

  return (
    <ContextDashboardAdmin.Provider
      value={{
        userId,
        isShowingUsers,
        isShowingWorkouts,
        isShowingFeedbacks,
        setuserId,
        setIsShowingUsers,
        setIsShowingWorkouts,
        setIsShowingFeedbacks,
      }}
    >
      {children}
    </ContextDashboardAdmin.Provider>
  )
}

export function useAdminProvider() {
  const context = useContext(ContextDashboardAdmin)
  return context
}
