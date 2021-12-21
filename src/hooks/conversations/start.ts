import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { useMutation } from 'react-query'

import { isComment, isConversation, isProfile, supabase } from '../../lib'
import { MainParamList } from '../../navigators'
import { AvatarSource } from '../../types'

type Returns = {
  loading?: boolean

  startConversation: () => Promise<number>
}

export const useStartConversation = (source: AvatarSource): Returns => {
  const navigation = useNavigation<BottomTabNavigationProp<MainParamList>>()

  const { isLoading, mutateAsync } = useMutation<number, Error>(
    async () => {
      if (isConversation(source) || isProfile(source)) {
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

      return data
    },
    {
      onError({ message }) {
        Alert.alert('Error', message)
      },
      onSuccess(id) {
        const action = CommonActions.navigate('Chat', {
          initial: false,
          params: {
            id
          },
          screen: 'Conversation'
        })

        navigation.dispatch(action)
      }
    }
  )

  return {
    loading: isLoading,
    startConversation: mutateAsync
  }
}
