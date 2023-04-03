import React, { createContext, useState } from 'react'

export interface ContextData {
  userId: string
  isShowingUsers: boolean
  isShowingWorkouts: boolean
  isShowingFeedbacks: boolean
  changeUserId(newValue: string): void
  handleWithShowUsers(isShowingUsers: boolean): void
  handleWithShowWorkouts(isShowingWorkouts: boolean): void
  handleWithShowFeedbacks(isShowingFeedbacks: boolean): void
}

export const Context = createContext<ContextData>({
  userId: '',
  isShowingUsers: true,
  isShowingWorkouts: false,
  isShowingFeedbacks: false,
  changeUserId: () => {},
  handleWithShowUsers: () => {},
  handleWithShowWorkouts: () => {},
  handleWithShowFeedbacks: () => {},
})

export default function ContextProvider({ children }: any) {
  const [userId, setuserId] = useState<string>('')
  const [isShowingUsers, setIsShowingUsers] = useState<boolean>(true)
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [isShowingFeedbacks, setIsShowingFeedbacks] = useState<boolean>(false)

  const changeUserId = (newValue: string) => {
    setuserId(newValue)
  }

  const handleWithShowUsers = (isShowingUsers: boolean) => {
    setIsShowingUsers(isShowingUsers)
  }

  const handleWithShowWorkouts = (isShowingWorkouts: boolean) => {
    setIsShowingWorkouts(isShowingWorkouts)
  }

  const handleWithShowFeedbacks = (isShowingFeedbacks: boolean) => {
    setIsShowingFeedbacks(isShowingFeedbacks)
  }

  return (
    <Context.Provider
      value={{
        userId,
        isShowingUsers,
        isShowingWorkouts,
        isShowingFeedbacks,
        changeUserId,
        handleWithShowUsers,
        handleWithShowWorkouts,
        handleWithShowFeedbacks,
      }}
    >
      {children}
    </Context.Provider>
  )
}
