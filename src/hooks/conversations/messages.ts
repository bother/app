import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Message, SupabaseMessage } from '../../types'

type Returns = {
  messages?: Array<Message>
  loading: boolean
  error?: string

  reload: () => void
}

export const useMessages = (conversationId: number): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const [messages, setMessages] = useState<Array<Message>>()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)

      const { data, error } = await supabase
        .from<SupabaseMessage>('messages')
        .select()
        .eq('conversation_id', conversationId)
        .order('created_at', {
          ascending: false
        })

      if (error) {
        throw new Error(error.message)
      }

      const messages: Array<Message> = data.map(
        ({ attachment, body, conversation_id, created_at, id, user_id }) => ({
          attachment,
          body,
          conversationId: conversation_id,
          createdAt: created_at,
          id,
          userId: user_id
        })
      )

      setMessages(messages)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [conversationId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    error,
    loading,
    messages,
    reload: fetch
  }
}
