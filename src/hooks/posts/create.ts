import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMutation } from 'react-query'

import { supabase } from '../../lib'
import { RootParamList } from '../../navigators'
import { Coordinates } from '../../types'

type Variables = {
  body: string
  coordinates: Coordinates
}

type Returns = {
  loading: boolean
  error?: string

  createPost: (data: Variables) => Promise<number>
}

export const useCreatePost = (): Returns => {
  const { navigate } = useNavigation<StackNavigationProp<RootParamList>>()

  const { error, isLoading, mutateAsync } = useMutation<
    number,
    Error,
    Variables
  >(
    async ({ body, coordinates }) => {
      const { data, error } = await supabase
        .rpc<number>('create_post', {
          ...coordinates,
          body
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    {
      onSuccess(id) {
        navigate('Post', {
          id
        })
      }
    }
  )

  return {
    createPost: mutateAsync,
    error: error?.message,
    loading: isLoading
  }
}
