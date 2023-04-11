import React, { createContext, useState } from 'react'

export interface ContextData {
  isShowingWorkouts: boolean
  handleWithShowWorkouts(isShowingWorkouts: boolean): void
}

export const ContextDashboardUser = createContext<ContextData>({
  isShowingWorkouts: false,
  handleWithShowWorkouts: () => {},
})

type ContextDashboardUserProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardUserProvider({
  children,
}: ContextDashboardUserProviderProps) {
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)

  const handleWithShowWorkouts = (isShowingWorkouts: boolean) => {
    setIsShowingWorkouts(isShowingWorkouts)
  }

  return (
    <ContextDashboardUser.Provider
      value={{
        isShowingWorkouts,
        handleWithShowWorkouts,
      }}
    >
      {children}
    </ContextDashboardUser.Provider>
  )
}
