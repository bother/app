import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'

import { nanoid, supabase } from '../lib'

type Returns = {
  loading: boolean
}

export const useAuth = (): Returns => {
  const [loading, setLoading] = useState(true)

  const init = useCallback(async () => {
    setLoading(true)

    const id = await SecureStore.getItemAsync('id')
    const token = await AsyncStorage.getItem('supabase.auth.token')

    if (token) {
      return setLoading(false)
    }

    if (id) {
      await supabase.auth.signIn({
        email: `${id}@bother.app`,
        password: id
      })

      return setLoading(false)
    }

    const next = nanoid()

    await SecureStore.setItemAsync('id', next)

    await supabase.auth.signUp({
      email: `${next}@bother.app`,
      password: next
    })

    setLoading(false)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return {
    loading
  }
}
