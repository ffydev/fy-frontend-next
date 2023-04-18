import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  isShowingDashboard: boolean
  isShowingWorkouts: boolean
  isShowAnamnesis: boolean
  isShowingFeedbacks: boolean
  setIsShowingDashboard(isShowingDashboard: boolean): void
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowAnamnesis(isShowAnamnesis: boolean): void
  setIsShowingFeedbacks(isShowingFeedbacks: boolean): void
}

export const ContextDashboardUser = createContext<ContextData>({
  isShowingDashboard: false,
  isShowingWorkouts: false,
  isShowAnamnesis: false,
  isShowingFeedbacks: false,
  setIsShowingDashboard: () => {},
  setIsShowingWorkouts: () => {},
  setIsShowAnamnesis: () => {},
  setIsShowingFeedbacks: () => {},
})

type ContextDashboardUserProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardUserProvider({
  children,
}: ContextDashboardUserProviderProps) {
  const [isShowingDashboard, setIsShowingDashboard] = useState<boolean>(true)
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowAnamnesis, setIsShowAnamnesis] = useState<boolean>(false)
  const [isShowingFeedbacks, setIsShowingFeedbacks] = useState<boolean>(false)

  return (
    <ContextDashboardUser.Provider
      value={{
        isShowingDashboard,
        isShowingWorkouts,
        isShowAnamnesis,
        isShowingFeedbacks,
        setIsShowingWorkouts,
        setIsShowAnamnesis,
        setIsShowingFeedbacks,
        setIsShowingDashboard,
      }}
    >
      {children}
    </ContextDashboardUser.Provider>
  )
}

export function useUserProvider() {
  const context = useContext(ContextDashboardUser)
  return context
}
