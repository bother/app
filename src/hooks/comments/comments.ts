import { parseISO } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Comment, SupabaseComment } from '../../types'

type Returns = {
  comments?: Array<Comment>
  error?: string
  loading: boolean

  reload: () => void
}

export const useComments = (postId: number): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const [comments, setComments] = useState<Array<Comment>>()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)

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

      const comments: Array<Comment> = data.map(
        ({ body, created_at, id, post_id, user_id }) => ({
          body,
          createdAt: parseISO(created_at),
          id,
          postId: post_id,
          userId: user_id
        })
      )

      setComments(comments)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    comments,
    error,
    loading,
    reload: fetch
  }
}
