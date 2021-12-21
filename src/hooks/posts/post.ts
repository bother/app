import { parseISO } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Post, SupabaseFeedPost } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  post?: Post

  reload: () => void
}

export const usePost = (id: number): Returns => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  const [post, setPost] = useState<Post>()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)

      const { data, error } = await supabase
        .rpc<SupabaseFeedPost>('fetch_post', {
          postId: id
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error('Something went wrong')
      }

      const post: Post = {
        body: data.body,
        comments: data.comments,
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude
        },
        createdAt: parseISO(data.created_at),
        id: data.id,
        userId: data.user_id,
        votes: data.votes
      }

      setPost(post)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    error,
    loading,
    post,
    reload: () => fetch()
  }
}
