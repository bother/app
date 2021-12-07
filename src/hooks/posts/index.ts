import orderBy from 'lodash/orderBy'
import sumBy from 'lodash/sumBy'
import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Coordinates, Post, SupabasePost } from '../../types'

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

      let query = supabase.from<SupabasePost>('posts').select(`
        *,
        votes(
          vote
        ),
        comments(
          id
        )
      `)

      if (type === 'latest') {
        query = query.order('createdAt', {
          ascending: false
        })
      }

      if (type === 'nearby' && !coordinates) {
        throw new Error('No location provided')
      }

      const { data, error } = await query

      if (error) {
        throw new Error(error.message)
      }

      if (data) {
        let posts = data.map((post) => ({
          ...post,
          comments: post.comments.length,
          votes: sumBy(post.votes, 'vote')
        }))

        if (type === 'popular') {
          posts = orderBy(posts, 'createdAt')
        }

        setPosts(posts)
      }

      setLoading(false)
    } catch (error) {
      setError(error.message)
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
