import React, { createContext, useState } from 'react'

interface ContextData {
  userId: string
  isShowingUsers: boolean
  isShowingWorkouts: boolean
  changeUserId(newValue: string): void
  handleWithShowUsers(isShowingUsers: boolean): void
  handleWithShowWorkouts(isShowingWorkouts: boolean): void
}

export const Context = createContext<ContextData>({
  userId: '',
  isShowingUsers: true,
  isShowingWorkouts: false,
  changeUserId: () => {},
  handleWithShowUsers: () => {},
  handleWithShowWorkouts: () => {},
})

export default function ContextProvider({ children }: any) {
  const [userId, setuserId] = useState<string>('')
  const [isShowingUsers, setIsShowingUsers] = useState<boolean>(true)
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)

  const changeUserId = (newValue: string) => {
    setuserId(newValue)
  }

  const handleWithShowUsers = (isShowingUsers: boolean) => {
    setIsShowingUsers(isShowingUsers)
  }

  const handleWithShowWorkouts = (isShowingWorkouts: boolean) => {
    setIsShowingWorkouts(isShowingWorkouts)
  }

  return (
    <Context.Provider
      value={{
        userId,
        isShowingUsers,
        changeUserId,
        handleWithShowUsers,
        isShowingWorkouts,
        handleWithShowWorkouts,
      }}
    >
      {children}
    </Context.Provider>
  )
}
