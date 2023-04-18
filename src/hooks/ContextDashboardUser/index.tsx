import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  isShowingDashboard: boolean
  isShowingWorkouts: boolean
  isShowAnamnesis: boolean
  isShowingFeedbacks: boolean
  isShowingCreateFeedbacks: boolean
  setIsShowingDashboard(isShowingDashboard: boolean): void
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowAnamnesis(isShowAnamnesis: boolean): void
  setIsShowingFeedbacks(isShowingFeedbacks: boolean): void
  setIsShowingCreateFeedbacks(isShowingCreateFeedbacks: boolean): void
}

export const ContextDashboardUser = createContext<ContextData>({
  isShowingDashboard: false,
  isShowingWorkouts: false,
  isShowAnamnesis: false,
  isShowingFeedbacks: false,
  isShowingCreateFeedbacks: false,
  setIsShowingDashboard: () => {},
  setIsShowingWorkouts: () => {},
  setIsShowAnamnesis: () => {},
  setIsShowingFeedbacks: () => {},
  setIsShowingCreateFeedbacks: () => {},
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
  const [isShowingCreateFeedbacks, setIsShowingCreateFeedbacks] =
    useState<boolean>(false)

  return (
    <ContextDashboardUser.Provider
      value={{
        isShowingDashboard,
        isShowingWorkouts,
        isShowAnamnesis,
        isShowingFeedbacks,
        isShowingCreateFeedbacks,
        setIsShowingWorkouts,
        setIsShowAnamnesis,
        setIsShowingFeedbacks,
        setIsShowingCreateFeedbacks,
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
