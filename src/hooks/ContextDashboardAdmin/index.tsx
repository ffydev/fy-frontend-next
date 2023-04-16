import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  userId: string
  selectedWorkoutId: string
  isShowingUsers: boolean
  isShowingWorkouts: boolean
  isShowingFeedbacks: boolean
  isFetchingWorkoutsNames: boolean
  setuserId(newValue: string): void
  setSelectedWorkoutId(newValue: string): void
  setIsShowingUsers(isShowingUsers: boolean): void
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowingFeedbacks(isShowingFeedbacks: boolean): void
  setIsFetchingWorkoutsNames(isFetchingWorkoutsNames: boolean): void
}

export const ContextDashboardAdmin = createContext<ContextData>({
  userId: '',
  selectedWorkoutId: '',
  isShowingUsers: true,
  isShowingWorkouts: false,
  isShowingFeedbacks: false,
  isFetchingWorkoutsNames: false,
  setuserId: () => {},
  setSelectedWorkoutId: () => {},
  setIsShowingUsers: () => {},
  setIsShowingWorkouts: () => {},
  setIsShowingFeedbacks: () => {},
  setIsFetchingWorkoutsNames: () => {},
})

type ContextDashboardAdminProviderProps = {
  children: React.ReactNode
}

export default function ContextDashboardAdminProvider({
  children,
}: ContextDashboardAdminProviderProps) {
  const [userId, setuserId] = useState<string>('')
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('')
  const [isShowingUsers, setIsShowingUsers] = useState<boolean>(true)
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowingFeedbacks, setIsShowingFeedbacks] = useState<boolean>(false)
  const [isFetchingWorkoutsNames, setIsFetchingWorkoutsNames] =
    useState<boolean>(false)

  return (
    <ContextDashboardAdmin.Provider
      value={{
        userId,
        selectedWorkoutId,
        isShowingUsers,
        isShowingWorkouts,
        isShowingFeedbacks,
        isFetchingWorkoutsNames,
        setuserId,
        setSelectedWorkoutId,
        setIsShowingUsers,
        setIsShowingWorkouts,
        setIsShowingFeedbacks,
        setIsFetchingWorkoutsNames,
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
