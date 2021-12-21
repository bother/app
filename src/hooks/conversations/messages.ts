import { useQuery } from 'react-query'

import { supabase, transformMessage } from '../../lib'
import { Message, SupabaseMessage } from '../../types'

type Returns = {
  error?: string
  loading: boolean
  messages?: Array<Message>
  reloading: boolean

  reload: () => void
}

export const useMessages = (conversationId: number): Returns => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Message>,
    Error
  >(['messages', conversationId], async () => {
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

    return data.map(transformMessage)
  })

  return {
    error: error?.message,
    loading: isLoading,
    messages: data,
    reload: refetch,
    reloading: isRefetching
  }
}
