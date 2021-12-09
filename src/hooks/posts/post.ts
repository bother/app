import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { FeedPost, Post } from '../../types'

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
        .rpc<FeedPost>('fetch_post', {
          _id: id
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error('Something went wrong')
      }

      console.log('data', data)

      const post: Post = {
        body: data.body,
        comments: data.comments,
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude
        },
        createdAt: data.created_at,
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
