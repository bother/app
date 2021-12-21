import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { useAuth } from '../../contexts'
import { supabase } from '../../lib'
import { SupabaseMessage } from '../../types'

type Returns = {
  loading: boolean

  sendMessage: (body: string) => Promise<void>
}

export const useSendMessage = (conversationId: number): Returns => {
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)

  const sendMessage = useCallback(
    async (body: string) => {
      try {
        setLoading(true)

        if (!user) {
          throw new Error('Not signed in')
        }

        const { error } = await supabase
          .from<SupabaseMessage>('messages')
          .insert({
            body,
            conversation_id: conversationId,
            user_id: user.id
          })

        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setLoading(false)
      }
    },
    [conversationId, user]
  )

  return {
    loading,
    sendMessage
  }
}
