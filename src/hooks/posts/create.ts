import { useCallback, useState } from 'react'

import { useUser } from '../../contexts'
import { supabase } from '../../lib'
import { Coordinates, Post, SupabasePost } from '../../types'

type Returns = {
  loading: boolean
  error?: string

  createPost: (
    body: string,
    coordinates: Coordinates
  ) => Promise<Post | undefined>
}

export const useCreatePost = (): Returns => {
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const createPost = useCallback(
    async (body: string, coordinates: Coordinates) => {
      try {
        setLoading(true)
        setError(undefined)

        if (!user) {
          throw new Error('Not signed in')
        }

        const { data, error } = await supabase
          .from<SupabasePost>('posts')
          .insert({
            body,
            userId: user?.id
          })
          .single()

        if (error) {
          throw new Error(error.message)
        }

        if (!data) {
          throw new Error('Something went wrong')
        }

        const post: Post = {
          body,
          comments: 0,
          createdAt: data.createdAt,
          id: data.id,
          userId: user.id,
          votes: 1
        }

        return post
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [user]
  )

  return {
    createPost,
    error,
    loading
  }
}
