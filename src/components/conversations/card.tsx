import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useUser } from '../../contexts'
import { ConversationsParamList } from '../../navigators'
import { tw } from '../../styles'
import { Conversation } from '../../types'
import { Avatar } from '../common/avatar'

type Props = {
  conversation: Conversation
}

export const ConversationCard: FunctionComponent<Props> = ({
  conversation
}) => {
  const { navigate } =
    useNavigation<StackNavigationProp<ConversationsParamList>>()

  const { user } = useUser()

  return (
    <Pressable
      onPress={() =>
        navigate('Conversation', {
          id: conversation.id
        })
      }
      style={tw`flex-row items-center p-4`}>
      <Avatar
        seed={`${conversation.id}_${
          conversation.userId === user.id
            ? conversation.recipientId
            : conversation.userId
        }`}
        size={48}
      />

      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-base text-black font-bother-regular`}>
          Last message
        </Text>

        <Text style={tw`mt-2 text-sm text-gray-600 font-bother-regular`}>
          {formatDistanceToNowStrict(parseISO(conversation.updatedAt))}
        </Text>
      </View>
    </Pressable>
  )
}
