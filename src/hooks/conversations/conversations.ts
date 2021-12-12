import { useCallback, useEffect, useState } from 'react'

import { supabase } from '../../lib'
import { Conversation, SupabaseConversation } from '../../types'

type Returns = {
  conversations?: Array<Conversation>
  loading: boolean
  error?: string

  reload: () => void
}

export const useConversations = (): Returns => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const [conversations, setConversations] = useState<Array<Conversation>>()

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)

      const { data, error } = await supabase
        .from<SupabaseConversation>('conversations')
        .select()
        .order('updated_at', {
          ascending: false
        })

      if (error) {
        throw new Error(error.message)
      }

      const conversations: Array<Conversation> = data.map(
        ({
          created_at,
          id,
          recipient_id,
          target_id,
          target_type,
          updated_at,
          user_id
        }) => ({
          createdAt: created_at,
          id,
          recipientId: recipient_id,
          targetId: target_id,
          targetType: target_type,
          updatedAt: updated_at,
          userId: user_id
        })
      )

      setConversations(conversations)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    conversations,
    error,
    loading,
    reload: fetch
  }
}
