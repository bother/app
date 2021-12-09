import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Coordinates, FeedPost, Post } from '../../types'

type Type = 'popular' | 'nearby' | 'latest'

type Returns = {
  error?: string
  loading: boolean
  posts: Array<Post>

  more: () => void
  reload: () => void
}

export const usePosts = (type: Type, coordinates?: Coordinates): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const [posts, setPosts] = useState<Array<Post>>([])

  const fetch = useCallback(async (type: Type, coordinates?: Coordinates) => {
    try {
      setLoading(true)
      setError(undefined)

      const { data, error } = await supabase.rpc<FeedPost>(
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

      if (!data) {
        throw new Error('Something went wrong')
      }

      const posts: Array<Post> = data.map(
        ({
          body,
          comments,
          created_at,
          id,
          latitude,
          longitude,
          user_id,
          votes
        }) => ({
          body,
          comments,
          coordinates: {
            latitude,
            longitude
          },
          createdAt: created_at,
          id,
          userId: user_id,
          votes
        })
      )

      setPosts(posts)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch(type, coordinates)
  }, [coordinates, fetch, type])

  return {
    error,
    loading,
    more: () => null,
    posts,
    reload: () => fetch(type, coordinates)
  }
}
