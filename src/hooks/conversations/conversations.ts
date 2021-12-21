import update from 'immutability-helper'
import orderBy from 'lodash/orderBy'
import { useEffect } from 'react'
import { QueryKey, useQuery, useQueryClient } from 'react-query'

import { supabase, transformConversation, transformMessage } from '../../lib'
import {
  Conversation,
  Message,
  SupabaseConversationWithData,
  SupabaseMessage
} from '../../types'

type Returns = {
  conversations?: Array<Conversation>
  error?: string
  loading: boolean
  reloading: boolean

  reload: () => void
}

export const useConversations = (): Returns => {
  const client = useQueryClient()

  const { data, error, isLoading, isRefetching, refetch } = useQuery<
    Array<Conversation>,
    Error
  >('conversations', async () => {
    const { data, error } = await supabase
      .from<SupabaseConversationWithData>('conversations')
      .select(
        '*, conversation_members!left(*, profile:profiles!left(*)), messages!left(*)'
      )
      .order('updated_at', {
        ascending: false
      })
      .order('created_at', {
        ascending: false,
        foreignTable: 'messages'
      })
      .limit(1, {
        foreignTable: 'messages'
      })

    if (error) {
      throw new Error(error.message)
    }

    return data.map(transformConversation)
  })

  useEffect(() => {
    const messages = supabase
      .from<SupabaseMessage>('messages')
      .on('INSERT', (data) => {
        const conversationId = data.new.conversation_id

        const key: QueryKey = ['messages', conversationId]

        const messages = client.getQueryData<Array<Message>>(key)

        if (messages) {
          client.setQueryData<Array<Message>>(key, (messages) => [
            transformMessage(data.new),
            ...messages
          ])
        }

        client.setQueryData<Array<Conversation>>(
          'conversations',
          (conversations) => {
            const index = conversations.findIndex(
              ({ id }) => id === conversationId
            )

            if (index < 0) {
              return conversations
            }

            return orderBy(
              update(conversations, {
                [index]: {
                  last: {
                    $set: transformMessage(data.new)
                  },
                  updatedAt: {
                    $set: new Date()
                  }
                }
              }),
              'updatedAt',
              'desc'
            )
          }
        )
      })
      .subscribe()

    return () => {
      messages.unsubscribe()
    }
  }, [client])

  return {
    conversations: data,
    error: error?.message,
    loading: isLoading,
    reload: refetch,
    reloading: isRefetching
  }
}
