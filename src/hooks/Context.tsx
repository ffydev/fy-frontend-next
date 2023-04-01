import React, { createContext, useState } from 'react'

interface ContextData {
  isShowingWorkouts: boolean
  handleWithShowWorkouts(isShowingWorkouts: boolean): void
  userId: string
  changeUserId(newValue: string): void
}

export const Context = createContext<ContextData>({
  isShowingWorkouts: false,
  handleWithShowWorkouts: () => {},
  userId: '',
  changeUserId: () => {},
})

export default function ContextProvider({ children }: any) {
  const [isShowingWorkouts, setIsShowingWorkouts] = useState<boolean>(false)
  const [userId, setuserId] = useState<string>('')

  const changeUserId = (newValue: string) => {
    setuserId(newValue)
  }

  const handleWithShowWorkouts = (isShowingWorkouts: boolean) => {
    setIsShowingWorkouts(isShowingWorkouts)
  }

  return (
    <Context.Provider
      value={{
        isShowingWorkouts,
        handleWithShowWorkouts,
        userId,
        changeUserId,
      }}
    >
      {children}
    </Context.Provider>
  )
}
