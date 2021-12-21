import { Session, User } from '@supabase/supabase-js'
import React, {
  ContextType,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../lib'

export const AuthContext = createContext<{
  user: User | null
  session: Session | null
}>({
  session: null,
  user: null
})

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const session = supabase.auth.session()

    setSession(session)
    setUser(session?.user)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        user
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): ContextType<typeof AuthContext> => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }

  return context
}
