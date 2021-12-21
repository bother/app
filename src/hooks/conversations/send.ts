import { Alert } from 'react-native'
import { useMutation } from 'react-query'

import { useAuth } from '../../contexts'
import { supabase, transformMessage } from '../../lib'
import { Message, SupabaseMessage } from '../../types'

type Variables = {
  body: string
}

type Returns = {
  loading: boolean

  sendMessage: (data: Variables) => Promise<Message>
}

export const useSendMessage = (conversationId: number): Returns => {
  const { user } = useAuth()

  const { isLoading, mutateAsync } = useMutation<Message, Error, Variables>(
    async ({ body }) => {
      const { data, error } = await supabase
        .from<SupabaseMessage>('messages')
        .insert({
          body,
          conversation_id: conversationId,
          user_id: user.id
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return transformMessage(data)
    },
    {
      onError(error) {
        Alert.alert('Error', error.message)
      }
    }
  )

  return {
    loading: isLoading,
    sendMessage: mutateAsync
  }
}
