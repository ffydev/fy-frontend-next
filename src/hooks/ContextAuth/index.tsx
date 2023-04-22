import { IUser } from '@/pages/api/providers/auth.provider'
import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

type AuthContextData = {
  user: IUser | undefined
  setUser: (user: IUser) => void
  signOut: () => void
  setError: (error: string) => void
  error: string
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const [error, setError] = useState('')
  const router = useRouter()

  const signOut = () => {
    localStorage.removeItem('fyToken')
    setUser(undefined)
    setError('')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signOut, setError, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
