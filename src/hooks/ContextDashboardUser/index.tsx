import React, { createContext, useState } from 'react'

export interface ContextData {
  isShowingWorkouts: boolean
  isShowAnamnesis: boolean
  handleWithShowWorkouts(isShowingWorkouts: boolean): void
  handleWithShowAnamnesis(isShowAnamnesis: boolean): void
}

export const ContextDashboardUser = createContext<ContextData>({
  isShowingWorkouts: false,
  isShowAnamnesis: false,
  handleWithShowWorkouts: () => {},
  handleWithShowAnamnesis: () => {},
})

type ContextDashboardUserProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardUserProvider({
  children,
}: ContextDashboardUserProviderProps) {
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowAnamnesis, setIsShowAnamnesis] = useState<boolean>(false)

  const handleWithShowWorkouts = (isShowingWorkouts: boolean) => {
    setIsShowingWorkouts(isShowingWorkouts)
  }

  const handleWithShowAnamnesis = (isShowAnamnesis: boolean) => {
    setIsShowAnamnesis(isShowAnamnesis)
  }

  return (
    <ContextDashboardUser.Provider
      value={{
        isShowingWorkouts,
        isShowAnamnesis,
        handleWithShowWorkouts,
        handleWithShowAnamnesis,
      }}
    >
      {children}
    </ContextDashboardUser.Provider>
  )
}
