import { useQuery } from 'react-query'

import { supabase, transformComment } from '../../lib'
import { Comment, SupabaseComment } from '../../types'

type Returns = {
  comments?: Array<Comment>
  error?: string
  loading: boolean
  reloading: boolean

  reload: () => void
}

export const useComments = (postId: number): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Comment>,
    Error
  >(['comments', postId], async () => {
    const { data, error } = await supabase
      .from<SupabaseComment>('comments')
      .select()
      .eq('post_id', postId)
      .order('created_at', {
        ascending: false
      })

    if (error) {
      throw new Error(error.message)
    }

    return data.map(transformComment)
  })

  return {
    comments: data,
    error: error?.message,
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching
  }
}
