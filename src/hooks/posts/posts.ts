import { useQuery } from 'react-query'

import { supabase, transformPost } from '../../lib'
import { Coordinates, Post, SupabaseFeedPost } from '../../types'

type Type = 'popular' | 'nearby' | 'latest'

export type PostsReturns = {
  error?: string
  loading: boolean
  posts: Array<Post>
  reloading: boolean

  more: () => void
  reload: () => void
}

export const usePosts = (
  type: Type,
  coordinates?: Coordinates
): PostsReturns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Post>,
    Error
  >(['posts', type], async () => {
    const { data, error } = await supabase.rpc<SupabaseFeedPost>(
      type === 'latest'
        ? 'feed_latest'
        : type === 'nearby'
        ? 'feed_nearby'
        : 'feed_popular',
      type === 'nearby' ? coordinates : undefined
    )

    if (error) {
      throw new Error(error.message)
    }

    return data.map(transformPost)
  })

  return {
    error: error?.message,
    loading: isLoading,
    more: () => null,
    posts: data,
    reload: refetch,
    reloading: isRefetching
  }
}
