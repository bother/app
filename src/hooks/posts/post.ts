import sumBy from 'lodash/sumBy'
import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Post, SupabasePost } from '../../types'

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
        .from<SupabasePost>('posts')
        .select(
          `*,
          votes(
            vote
          ),
          comments(
            id
          )`
        )
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error('Something went wrong')
      }

      const post: Post = {
        ...data,
        comments: data.comments.length,
        votes: sumBy(data.votes, 'vote')
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
