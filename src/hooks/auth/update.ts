import { Alert } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '../../contexts'
import { supabase, transformProfile } from '../../lib'
import { Profile, SupabaseProfile, SupabaseProfileGender } from '../../types'

type Variables = {
  age: number
  gender: SupabaseProfileGender
}

type Returns = {
  error?: string
  loading: boolean

  updateProfile: (data: Variables) => Promise<Profile>
}

export const useUpdateProfile = (): Returns => {
  const { user } = useAuth()

  const client = useQueryClient()

  const { error, isLoading, mutateAsync } = useMutation<
    Profile,
    Error,
    Variables
  >(
    async ({ age, gender }) => {
      const { data, error } = await supabase
        .from<SupabaseProfile>('profiles')
        .update({
          age,
          gender
        })
        .match({
          id: user.id
        })

        .single()

      if (error) {
        throw new Error(error.message)
      }

      return transformProfile(data)
    },
    {
      onError({ message }) {
        Alert.alert('Error', message)
      },
      onSuccess(profile) {
        client.setQueryData<Profile>('profile', profile)
      }
    }
  )

  return {
    error: error?.message,
    loading: isLoading,
    updateProfile: mutateAsync
  }
}
