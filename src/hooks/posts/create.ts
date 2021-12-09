import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'

import { useUser } from '../../contexts'
import { supabase } from '../../lib'
import { RootParamList } from '../../navigators'
import { Coordinates } from '../../types'

type Returns = {
  loading: boolean
  error?: string

  createPost: (body: string, coordinates: Coordinates) => Promise<boolean>
}

export const useCreatePost = (): Returns => {
  const { user } = useUser()

  const { navigate } = useNavigation<NativeStackNavigationProp<RootParamList>>()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const createPost = useCallback(
    async (body: string, coordinates: Coordinates) => {
      try {
        setLoading(true)
        setError(undefined)

        if (!user) {
          throw new Error('Not signed in')
        }

        const { data, error } = await supabase
          .rpc<number>('create_post', {
            ...coordinates,
            body,
            user_id: user.id
          })
          .single()

        if (error) {
          throw new Error(error.message)
        }

        if (!data) {
          throw new Error('Something went wrong')
        }

        navigate('Post', {
          id: data
        })

        return true
      } catch (error) {
        setError(error.message)

        return false
      } finally {
        setLoading(false)
      }
    },
    [navigate, user]
  )

  return {
    createPost,
    error,
    loading
  }
}
