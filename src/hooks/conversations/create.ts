import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { useUser } from '../../contexts'
import { supabase } from '../../lib'
import { ConversationsParamList } from '../../navigators'
import { Comment, Post } from '../../types'

type Returns = {
  loading?: boolean

  createConversation: () => Promise<void>
}

export const useCreateConversation = (
  type: 'comment' | 'post',
  source: Comment | Post
): Returns => {
  const { navigate } =
    useNavigation<StackNavigationProp<ConversationsParamList>>()

  const { user } = useUser()

  const [loading, setLoading] = useState(false)

  const createConversation = useCallback(async () => {
    try {
      setLoading(true)

      if (!user) {
        throw new Error('Not signed in')
      }

      const { data, error } = await supabase
        .rpc<number>('start_conversation', {
          recipientid: source.userId,
          targetid: source.id,
          targettype: type,
          userid: user.id
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      navigate('Conversation', {
        id: data
      })
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }, [navigate, source, type, user])

  return {
    createConversation,
    loading
  }
}
