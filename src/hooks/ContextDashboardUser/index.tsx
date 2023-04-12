import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  isShowingWorkouts: boolean
  isShowAnamnesis: boolean
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowAnamnesis(isShowAnamnesis: boolean): void
}

export const ContextDashboardUser = createContext<ContextData>({
  isShowingWorkouts: false,
  isShowAnamnesis: false,
  setIsShowingWorkouts: () => {},
  setIsShowAnamnesis: () => {},
})

type ContextDashboardUserProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardUserProvider({
  children,
}: ContextDashboardUserProviderProps) {
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowAnamnesis, setIsShowAnamnesis] = useState<boolean>(false)

  return (
    <ContextDashboardUser.Provider
      value={{
        isShowingWorkouts,
        isShowAnamnesis,
        setIsShowingWorkouts,
        setIsShowAnamnesis,
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
