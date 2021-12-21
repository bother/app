import { useQuery } from 'react-query'

import { supabase, transformPost } from '../../lib'
import { Post, SupabaseFeedPost } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  post?: Post
  reloading: boolean

  reload: () => void
}

export const usePost = (id: number): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Post,
    Error
  >(['post', id], async () => {
    const { data, error } = await supabase
      .rpc<SupabaseFeedPost>('fetch_post', {
        postId: id
      })
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return transformPost(data)
  })

  return {
    error: error?.message,
    loading: isLoading,
    post: data,
    reload: refetch,
    reloading: isRefetching
  }
}
