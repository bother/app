import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { useAuth } from '../../contexts'
import { isComment, isConversation, supabase } from '../../lib'
import { MainParamList } from '../../navigators'
import { AvatarSource } from '../../types'

type Returns = {
  loading?: boolean

  startConversation: () => Promise<void>
}

export const useStartConversation = (source: AvatarSource): Returns => {
  const navigation = useNavigation<BottomTabNavigationProp<MainParamList>>()

  const { user } = useAuth()

  const [loading, setLoading] = useState(false)

  const startConversation = useCallback(async () => {
    try {
      setLoading(true)

      if (!user) {
        throw new Error('Not signed in')
      }

      if (isConversation(source)) {
        throw new Error('Invalid input')
      }

      const sourceIsComment = isComment(source)

      const { data, error } = await supabase
        .rpc<number>('start_conversation', {
          commentId: sourceIsComment ? source.id : null,
          postId: sourceIsComment ? source.postId : source.id,
          recipientId: source.userId
        })
        .single()

      if (error) {
        throw new Error(error.message)
      }

      navigation.dispatch(
        CommonActions.navigate('Chat', {
          initial: false,
          params: {
            id: data
          },
          screen: 'Conversation'
        })
      )
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }, [navigation, source, user])

  return {
    loading,
    startConversation
  }
}
