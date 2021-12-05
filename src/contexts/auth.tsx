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

export const UserContext = createContext<{
  user: User | null
  session: Session | null
}>({
  session: null,
  user: null
})

export const UserContextProvider: FunctionComponent = (props) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const session = supabase.auth.session()

    setSession(session)
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        session,
        user
      }}
      {...props}
    />
  )
}

export const useUser = (): ContextType<typeof UserContext> => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }

  return context
}
