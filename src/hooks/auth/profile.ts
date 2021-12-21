import { useQuery } from 'react-query'

import { supabase, transformProfile } from '../../lib'
import { Profile, SupabaseProfile } from '../../types'

export type ProfileReturns = {
  profile?: Profile
  error?: string
  loading: boolean
  reloading: boolean

  reload: () => void
}

export const useProfile = (id: string): ProfileReturns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Profile,
    Error
  >('profile', async () => {
    const { data, error } = await supabase
      .from<SupabaseProfile>('profiles')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return transformProfile(data)
  })

  return {
    error: error?.message,
    loading: isLoading,
    profile: data,
    reload: refetch,
    reloading: isRefetching
  }
}
