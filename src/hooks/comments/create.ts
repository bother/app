import { Alert } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'

import { useAuth } from '../../contexts'
import { supabase, transformComment } from '../../lib'
import { Comment, SupabaseComment } from '../../types'

type Variables = {
  body: string
}

type Returns = {
  loading: boolean

  createComment: (data: Variables) => Promise<Comment>
}

export const useCreateComment = (postId: number): Returns => {
  const { user } = useAuth()

  const client = useQueryClient()

  const { isLoading, mutateAsync } = useMutation<Comment, Error, Variables>(
    async ({ body }) => {
      const { data, error } = await supabase
        .from<SupabaseComment>('comments')
        .insert({
          body,
          post_id: postId,
          user_id: user.id
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return transformComment(data)
    },
    {
      onError(error) {
        Alert.alert('Error', error.message)
      },
      onSuccess(comment) {
        client.setQueryData<Array<Comment>>(
          ['comments', postId],
          (comments) => [comment, ...comments]
        )
      }
    }
  )

  return {
    createComment: mutateAsync,
    loading: isLoading
  }
}
