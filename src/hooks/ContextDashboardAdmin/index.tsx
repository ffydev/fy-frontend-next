import React, { createContext, useContext, useState } from 'react'

export interface ContextData {
  userId: string
  selectedWorkoutId: string
  isShowingUsers: boolean
  isShowingWorkouts: boolean
  isShowingFeedbacks: boolean
  isShowingAnamnesis: boolean
  isFetchingWorkoutsNames: boolean
  setuserId(newValue: string): void
  setSelectedWorkoutId(newValue: string): void
  setIsShowingUsers(isShowingUsers: boolean): void
  setIsShowingWorkouts(isShowingWorkouts: boolean): void
  setIsShowingFeedbacks(isShowingFeedbacks: boolean): void
  setIsShowingAnamnesis(isShowingAnamnesis: boolean): void
  setIsFetchingWorkoutsNames(isFetchingWorkoutsNames: boolean): void
}

export const ContextDashboardAdmin = createContext<ContextData>({
  userId: '',
  selectedWorkoutId: '',
  isShowingUsers: true,
  isShowingWorkouts: false,
  isShowingFeedbacks: false,
  isShowingAnamnesis: false,
  isFetchingWorkoutsNames: false,
  setuserId: () => {},
  setSelectedWorkoutId: () => {},
  setIsShowingUsers: () => {},
  setIsShowingWorkouts: () => {},
  setIsShowingFeedbacks: () => {},
  setIsShowingAnamnesis: () => {},
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
  const [isShowingAnamnesis, setIsShowingAnamnesis] = useState<boolean>(false)
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
        isShowingAnamnesis,
        isFetchingWorkoutsNames,
        setuserId,
        setSelectedWorkoutId,
        setIsShowingUsers,
        setIsShowingWorkouts,
        setIsShowingFeedbacks,
        setIsShowingAnamnesis,
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
