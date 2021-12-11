import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { useUser } from '../../contexts'
import { supabase } from '../../lib'
import { SupabaseComment } from '../../types'

type Returns = {
  loading: boolean

  createComment: (body: string) => Promise<void>
}

export const useCreateComment = (
  postId: number,
  reload: () => void
): Returns => {
  const { user } = useUser()

  const [loading, setLoading] = useState(false)

  const createComment = useCallback(
    async (body: string) => {
      try {
        setLoading(true)

        if (!user) {
          throw new Error('Not signed in')
        }

        const { error } = await supabase
          .from<SupabaseComment>('comments')
          .insert({
            body,
            post_id: postId,
            user_id: user.id
          })

        if (error) {
          throw new Error(error.message)
        }

        reload()
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setLoading(false)
      }
    },
    [postId, reload, user]
  )

  return {
    createComment,
    loading
  }
}
